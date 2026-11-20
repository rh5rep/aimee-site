"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { draftLimits, paragraphs, quickReview, reviewPath, sampleInput, sampleReview, type DraftReview, type ReviewInput } from "../../lib/draft-review";
import styles from "./review.module.css";

type Result = { mode: "sample" | "quick" | "live"; input: ReviewInput; review: DraftReview };
const emptyInput: ReviewInput = { draft: "", goal: "", sources: "" };
const resultLabel = { sample: "Sample review", quick: "Quick checks", live: "AI review" };

export function DraftReviewer() {
  const [input, setInput] = useState<ReviewInput>(emptyInput);
  const [result, setResult] = useState<Result | null>(null);
  const [selected, setSelected] = useState(0);
  const [liveAvailable, setLiveAvailable] = useState(false);
  const [fileName, setFileName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const resultTitle = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(reviewPath, { cache: "no-store", signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((status) => setLiveAvailable(status?.available === true))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (result) resultTitle.current?.focus();
  }, [result]);

  function update(field: keyof ReviewInput, value: string) {
    setInput((previous) => ({ ...previous, [field]: value }));
    setResult(null);
    setError("");
    if (field === "draft") setFileName("");
  }

  function showReview(mode: Result["mode"], review: DraftReview, reviewed: ReviewInput) {
    setSelected(0);
    setResult({ mode, input: reviewed, review });
  }

  function loadSample() {
    setInput(sampleInput);
    setError("");
    setFileName("");
    showReview("sample", sampleReview, sampleInput);
  }

  async function loadFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;

    if (!/\.(?:txt|md|markdown)$/i.test(file.name) || file.size > draftLimits.fileBytes) {
      setError("Choose a plain text or Markdown file under 32 KB.");
      return;
    }

    setBusy(true);
    try {
      const draft = await file.text();
      if (!draft.trim() || draft.includes("\0") || draft.length > draftLimits.draft) {
        setError("Choose a readable text file with between 1 and 7,000 characters.");
        return;
      }

      update("draft", draft);
      setFileName(file.name);
    } catch {
      setError("The file couldn’t be opened. You can paste the text instead.");
    } finally {
      setBusy(false);
    }
  }

  function runQuickChecks() {
    if (busy || !input.draft.trim()) return;
    setError("");
    showReview("quick", quickReview(input.draft), input);
  }

  async function reviewDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !input.draft.trim()) return;
    if (!liveAvailable) {
      runQuickChecks();
      return;
    }

    setBusy(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch(reviewPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !Array.isArray(data?.findings)) {
        setError(typeof data?.error === "string" ? data.error : "The AI reviewer is busy. Try again or run quick checks.");
        return;
      }
      showReview("live", data, input);
    } catch {
      setError("The AI reviewer couldn’t be reached. Try again or run quick checks.");
    } finally {
      setBusy(false);
    }
  }

  const finding = result?.review.findings[selected];
  const block = result && finding ? paragraphs(result.input.draft)[finding.paragraph - 1] : "";
  const quoteAt = finding ? block.indexOf(finding.quote) : -1;
  const quoteEnd = finding ? quoteAt + finding.quote.length : -1;

  return (
    <div className={styles.workspace}>
      <form className={styles.editor} onSubmit={reviewDraft}>
        <fieldset disabled={busy} className={styles.fields}>
          <div className={styles.editorHeading}>
            <h2>Your draft</h2>
            <button className="text-link" type="button" onClick={loadSample}>Try the sample</button>
          </div>
          <label htmlFor="review-draft">Draft text</label>
          <textarea
            id="review-draft"
            value={input.draft}
            rows={6}
            required
            maxLength={draftLimits.draft}
            placeholder="Paste a passage, proposal, or update."
            aria-describedby="review-draft-hint"
            onChange={(event) => update("draft", event.target.value)}
          />
          <div className={styles.fileBar}>
            <label className={styles.upload}>
              <input className="sr-only" type="file" accept=".txt,.md,.markdown,text/plain,text/markdown" onChange={loadFile} />
              <span>Upload a text or Markdown file</span>
            </label>
            <span id="review-draft-hint">Up to 7,000 characters</span>
          </div>
          {fileName && <p className={styles.uploaded} role="status">Loaded {fileName}</p>}
          {liveAvailable && (
            <details className={styles.context}>
              <summary>Add a goal or source notes</summary>
              <label htmlFor="review-goal">Who’s it for, or what’s it meant to do?</label>
              <input
                id="review-goal"
                value={input.goal}
                maxLength={draftLimits.goal}
                onChange={(event) => update("goal", event.target.value)}
              />
              <label htmlFor="review-sources">Source notes</label>
              <textarea
                id="review-sources"
                rows={4}
                value={input.sources}
                maxLength={draftLimits.sources}
                placeholder="Paste the evidence you want the reviewer to use."
                onChange={(event) => update("sources", event.target.value)}
              />
            </details>
          )}
          <div className={styles.actions}>
            <button className="button" type="submit" disabled={!input.draft.trim()}>
              {busy ? "Working…" : liveAvailable ? "Run AI review" : "Run quick checks"}
            </button>
            {liveAvailable && (
              <button className="text-link" type="button" onClick={runQuickChecks} disabled={!input.draft.trim()}>
                Run quick checks
              </button>
            )}
          </div>
          <p className={styles.note}>
            {liveAvailable
              ? "AI review sends your draft, goal, and notes to Claude. Use material you’re allowed to share. Quick checks stay in your browser."
              : "Quick checks stay in your browser. They flag wordiness and claims worth checking. Live AI review is unavailable here."}
          </p>
        </fieldset>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </form>

      <section className={styles.result} aria-labelledby="review-result-title" aria-busy={busy}>
        <h2 id="review-result-title" ref={resultTitle} tabIndex={-1}>
          {result ? resultLabel[result.mode] : "Review notes"}
        </h2>
        {result ? (
          <>
            {result.review.findings.length > 0 ? (
              <div className={styles.findings} role="group" aria-label="Findings">
                {result.review.findings.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-pressed={selected === index}
                    aria-controls="selected-review-finding"
                    onClick={() => setSelected(index)}
                  >
                    {index + 1}. {item.lens}
                  </button>
                ))}
              </div>
            ) : <p className={styles.note}>This pass surfaced no specific edits. Read the draft against your sources and purpose before sharing it.</p>}
            {finding && quoteAt >= 0 && (
              <div className={styles.finding} id="selected-review-finding" aria-live="polite">
                <div className={styles.passage}>
                  <h3>In the draft</h3>
                  <p>
                    {quoteAt > 70 && "…"}
                    {block.slice(Math.max(0, quoteAt - 70), quoteAt)}
                    <mark>{finding.quote}</mark>
                    {block.slice(quoteEnd, quoteEnd + 70)}
                    {quoteEnd + 70 < block.length && "…"}
                  </p>
                </div>
                <dl className={styles.details}>
                  <div><dt>Why we’d flag it</dt><dd>{finding.why}</dd></div>
                  {finding.revision && <div><dt>Consider changing it to</dt><dd className={styles.revision}>{finding.revision}</dd></div>}
                  {finding.sourceQuote && <div><dt>From the source notes</dt><dd>{finding.sourceQuote}</dd></div>}
                  {finding.check && <div><dt>What to check</dt><dd>{finding.check}</dd></div>}
                </dl>
              </div>
            )}
            {result.review.question && (
              <div className={styles.question}>
                <h3>A question for the author</h3>
                <p>{result.review.question}</p>
              </div>
            )}
          </>
        ) : (
          <p className={styles.note} role="status">
            {busy ? "Working on your draft…" : "Run a review to see highlighted text and a reason for each suggestion."}
          </p>
        )}
      </section>
    </div>
  );
}
