export const draftLimits = { draft: 7_000, goal: 400, sources: 3_500, fileBytes: 32_000 };
export const reviewPath = "/api/review-draft";
export const lenses = ["Concision", "Clarity", "Evidence", "Audience", "Meaning"] as const;

export type ReviewInput = { draft: string; goal: string; sources: string };

export type Finding = {
  paragraph: number;
  quote: string;
  lens: (typeof lenses)[number];
  why: string;
  revision: string;
  check: string;
  sourceQuote: string;
};

export type DraftReview = { findings: Finding[]; question: string };

export const sampleInput: ReviewInput = {
  draft: "The new guide helped people finish faster and make fewer mistakes. In order to roll it out, we should share it with the next team.",
  goal: "Write a short update for the team deciding whether to try the new guide.",
  sources: "The pilot recorded a median completion time of 12 minutes before the guide and 8 minutes with it. The pilot did not record errors.",
};

export const sampleReview: DraftReview = {
  findings: [
    {
      paragraph: 1,
      quote: "The new guide helped people finish faster and make fewer mistakes.",
      lens: "Evidence",
      why: "The pilot recorded completion times. A claim about accuracy would need a comparison of error rates.",
      revision: "In the pilot, median completion time fell from 12 to 8 minutes with the new guide.",
      check: "Compare error rates before making a claim about mistakes.",
      sourceQuote: "The pilot did not record errors.",
    },
    {
      paragraph: 1,
      quote: "In order to",
      lens: "Concision",
      why: "The shorter phrase keeps the purpose of the sentence intact.",
      revision: "To",
      check: "",
      sourceQuote: "",
    },
  ],
  question: "What would the next team need to measure before deciding on a wider rollout?",
};

export function paragraphs(draft: string) {
  return draft.split(/\r?\n[^\S\r\n]*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
}

const shorterPhrases = [
  { phrase: /(?<!\w)in order to(?!\w)/i, revision: "to" },
  { phrase: /(?<!\w)due to the fact that(?!\w)/i, revision: "because" },
  { phrase: /(?<!\w)at this point in time(?!\w)/i, revision: "now" },
  { phrase: /(?<!\w)has the ability to(?!\w)/i, revision: "can" },
];

const evidenceCue = /\b(?:prove[sd]?|guarantee[sd]?|always|never|eliminate[sd]?|doubled|tripled|fewer (?:errors|mistakes)|more accurate(?:ly)?)\b|\b\d+(?:\.\d+)?\s*%/i;

export function quickReview(draft: string): DraftReview {
  const findings: Finding[] = [];
  const blocks = paragraphs(draft);

  for (const [index, block] of blocks.entries()) {
    const paragraph = index + 1;
    const sentences = block.split(/(?<=[.!?])\s+/u);
    const evidenceSentence = sentences.find((sentence) => evidenceCue.test(sentence));
    if (evidenceSentence) {
      const cue = evidenceSentence.match(evidenceCue)?.[0] ?? evidenceSentence;
      findings.push({
        paragraph,
        quote: evidenceSentence.length <= 250 ? evidenceSentence : cue,
        lens: "Evidence",
        why: "This wording makes a strong or measurable claim. Check what was measured and whether the comparison supports the wording.",
        revision: "",
        check: "Find the source and compare the exact claim with what it recorded.",
        sourceQuote: "",
      });
    }

    for (const { phrase, revision } of shorterPhrases) {
      const quote = block.match(phrase)?.[0];
      if (!quote) continue;
      findings.push({
        paragraph,
        quote,
        lens: "Concision",
        why: "The shorter wording may make the sentence easier to read.",
        revision: quote[0] === quote[0].toUpperCase() ? revision[0].toUpperCase() + revision.slice(1) : revision,
        check: "",
        sourceQuote: "",
      });
    }

    const longSentence = sentences.find((sentence) => sentence.split(/\s+/).length > 38);
    if (longSentence && longSentence !== evidenceSentence) {
      findings.push({
        paragraph,
        quote: longSentence.slice(0, 180).trimEnd(),
        lens: "Clarity",
        why: "This sentence is long enough that the main point may get buried.",
        revision: "",
        check: "See whether it helps the reader to give the main point its own sentence.",
        sourceQuote: "",
      });
    }
  }

  return {
    findings: findings.slice(0, 3),
    question: "What’s the one thing you want someone to understand or decide after reading this?",
  };
}
