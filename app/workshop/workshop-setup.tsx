"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import styles from "./workshop.module.css";

const apps = [
  { id: "codex", label: "ChatGPT + Codex" },
  { id: "claude", label: "Claude + Claude Code" },
] as const;

type WorkshopApp = (typeof apps)[number]["id"];

export function WorkshopSetup() {
  const [app, setApp] = useState<WorkshopApp>("codex");
  const isClaude = app === "claude";

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, current: WorkshopApp) {
    let next: WorkshopApp;
    switch (event.key) {
      case "Home":
        next = "codex";
        break;
      case "End":
        next = "claude";
        break;
      case "ArrowLeft":
      case "ArrowRight":
        next = current === "codex" ? "claude" : "codex";
        break;
      default:
        return;
    }
    event.preventDefault();
    setApp(next);
    document.getElementById(`workshop-tab-${next}`)?.focus();
  }

  return (
    <section className={styles.setup} id="setup" tabIndex={-1} aria-labelledby="setup-title">
      <div className={styles.setupLead}>
        <div className={styles.setupIntro}>
          <h2 id="setup-title">Get ready for the workshop</h2>
          <p>Choose a desktop app and check that it can read a file from a folder on your laptop.</p>
        </div>
        <div className={styles.checklist}>
          <h3>What you’ll need</h3>
          <ul>
            <li><label><input type="checkbox" /> <span>A Mac or Windows laptop and charger</span></label></li>
            <li><label><input type="checkbox" /> <span>Your account sign-in for the app you choose</span></label></li>
            <li><label><input type="checkbox" /> <span>Permission to install the desktop app</span></label></li>
          </ul>
          <p>The setup check uses the practice file below.</p>
        </div>
        <div className={`actions ${styles.setupActions}`}>
          <a className="button" href="#workshop-tools">Choose your app</a>
          <a className="text-link" href="#readiness-check">Jump to the readiness check</a>
        </div>
      </div>

      <div className={styles.appTabs} id="workshop-tools" role="tablist" aria-label="Desktop app setup" tabIndex={-1}>
        {apps.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`workshop-tab-${id}`}
            aria-controls={`workshop-panel-${id}`}
            aria-selected={app === id}
            tabIndex={app === id ? 0 : -1}
            onClick={() => setApp(id)}
            onKeyDown={(event) => handleTabKey(event, id)}
          >
            {label}
          </button>
        ))}
      </div>
      {apps.map(({ id }) => (
        <div key={id} id={`workshop-panel-${id}`} role="tabpanel" aria-labelledby={`workshop-tab-${id}`} hidden={app !== id} tabIndex={0}>
          {app === id && (
            <>
              {isClaude ? <ClaudeInstall /> : <CodexInstall />}
              <ReadinessCheck isClaude={isClaude} />
            </>
          )}
        </div>
      ))}

      <section className={styles.setupStep} aria-labelledby="bring-title">
        <h3 id="bring-title">Bring something to work on</h3>
        <div className={styles.platforms}>
          <div>
            <h4>Writing and revision</h4>
            <p>Bring a short passage you have permission to use in the app and one feedback question, such as “Where does my main point get lost?”</p>
          </div>
          <div>
            <h4>Experimental planning</h4>
            <p>Bring a research question or decision, plus one record you’re permitted to use in the app, such as a short protocol excerpt or results note.</p>
          </div>
        </div>
      </section>

      <details className={styles.setupHelp}>
        <summary>Troubleshooting</summary>
        <ul>
          <li><strong>Install blocked.</strong> Ask your IT service desk to install the desktop app you selected. Include your operating system, the download link, and the error message.</li>
          {isClaude ? (
            <li><strong>Can’t sign in or open Code.</strong> Check that your Claude account has a paid plan. If it’s provided by your institution, ask your workspace administrator to check access. On Windows, update Claude Desktop if a local session asks for Git. <a href="https://code.claude.com/docs/en/desktop#troubleshooting">More Claude Code troubleshooting</a></li>
          ) : (
            <li><strong>Can’t sign in or find Codex.</strong> Check that you opened <strong>ChatGPT</strong> and try your <a href="https://help.openai.com/en/articles/7426629-why-cant-i-log-in-to-chatgpt">original sign-in method</a>. If Codex is missing from your institution’s workspace, ask its ChatGPT administrator to check your access.</li>
          )}
          <li><strong>File missing or wrong folder.</strong> Check that the file is named <code>practice.txt</code> and is inside <code>Workshop Practice</code>. {isClaude ? <>In <strong>Code</strong>, check the folder selector beside the environment.</> : <>In the project menu, choose <strong>Edit project</strong> to check the folder, then start a new chat inside that project.</>}</li>
        </ul>
      </details>
    </section>
  );
}

function CodexInstall() {
  return (
    <section className={styles.setupStep} id="workshop-install" tabIndex={-1} aria-labelledby="install-title">
      <h3 id="install-title">Before you arrive</h3>
      <p className={styles.accessNote}><strong>Codex is available on ChatGPT Free.</strong> If you use a work or school account, access depends on your workspace settings.</p>
      <div className={styles.platforms}>
        <div>
          <h4>Mac</h4>
          <p>macOS 14 or later, Apple silicon or Intel. Open the installer from <strong>Downloads</strong>, then open <strong>ChatGPT</strong> from <strong>Applications</strong>.</p>
          <a className="text-link" href="https://chatgpt.com/download/">Download ChatGPT for Mac</a>
          <figure className={styles.installShot}>
            <Image src="/workshop-setup/mac.jpg" alt="OpenAI’s download button for an Apple silicon Mac" width={328} height={64} />
            <figcaption>Apple silicon download shown on ChatGPT Learn.</figcaption>
          </figure>
        </div>
        <div>
          <h4>Windows</h4>
          <p>Install <strong>ChatGPT</strong> from the Microsoft Store. When the installation finishes, open <strong>ChatGPT</strong> from <strong>Start</strong>.</p>
          <a className="text-link" href="https://apps.microsoft.com/detail/9plm9xgg6vks">Open the Microsoft Store listing</a>
          <figure className={styles.installShot}>
            <Image src="/workshop-setup/windows.jpg" alt="The Microsoft Store lists ChatGPT with OpenAI as the publisher" width={320} height={83} />
            <figcaption>ChatGPT by OpenAI in the Microsoft Store.</figcaption>
          </figure>
        </div>
      </div>
      <div className={styles.signIn}>
        <p><strong>Sign in and switch to Codex.</strong> Use your ChatGPT account and your usual sign-in method. In the app, open the <strong>ChatGPT</strong> menu and select <strong>Codex</strong>.</p>
        <p><strong>Institution-managed laptop?</strong> Send the download link to your IT service desk. Ask them to approve or install ChatGPT and check access to Codex.</p>
      </div>
    </section>
  );
}

function ClaudeInstall() {
  return (
    <section className={styles.setupStep} id="workshop-install" tabIndex={-1} aria-labelledby="install-title">
      <h3 id="install-title">Before you arrive</h3>
      <p className={styles.accessNote}><strong>Claude Code requires a paid Claude plan.</strong> If you already have access through work or school, sign in to that account.</p>
      <div className={styles.platforms}>
        <div>
          <h4>Mac</h4>
          <p>macOS 13 or later, Apple silicon or Intel. Choose <strong>Download for macOS</strong>. Open the installer, follow the prompts, then open <strong>Claude</strong> from <strong>Applications</strong>.</p>
          <a className="text-link" href="https://code.claude.com/docs/en/desktop-quickstart">Download Claude for Mac</a>
          <figure className={`${styles.installShot} ${styles.claudeInstallShot}`}>
            <Image src="/workshop-setup/claude-mac.jpg" alt="Anthropic’s Download for macOS card, labeled Universal build for Intel and Apple Silicon" width={165} height={206} />
            <figcaption>The same Mac download works for Apple silicon and Intel.</figcaption>
          </figure>
        </div>
        <div>
          <h4>Windows</h4>
          <p>Windows 10 or later. Choose <strong>Download for Windows</strong> for x64 or <strong>ARM64 installer</strong> for an Arm PC. Run the installer, then open <strong>Claude</strong> from <strong>Start</strong>.</p>
          <a className="text-link" href="https://code.claude.com/docs/en/desktop-quickstart">Download Claude for Windows</a>
          <figure className={`${styles.installShot} ${styles.claudeInstallShot}`}>
            <Image src="/workshop-setup/claude-windows.jpg" alt="Anthropic’s Download for Windows card, labeled For x64 processors" width={165} height={206} />
            <figcaption>The x64 option is shown. The ARM64 link is below the download cards.</figcaption>
          </figure>
        </div>
      </div>
      <div className={styles.signIn}>
        <p><strong>Sign in and open Code.</strong> Sign in with your Claude account, then select <strong>Code</strong> at the top of the app’s sidebar. The desktop app includes Claude Code.</p>
        <p><strong>Institution-managed laptop?</strong> Send the download link to your IT service desk. Ask them to approve or install Claude and check access to the <strong>Code</strong> tab.</p>
      </div>
    </section>
  );
}

function ReadinessCheck({ isClaude }: { isClaude: boolean }) {
  return (
    <section className={`${styles.setupStep} ${styles.readiness}`} id="readiness-check" tabIndex={-1} aria-labelledby="readiness-title">
      <h3 id="readiness-title">Check you’re ready</h3>
      <ol className={styles.walkthrough}>
        <li>
          <h4>Make a practice folder</h4>
          <p>In Finder on Mac or File Explorer on Windows, create a new folder named <code>Workshop Practice</code>. Download the file and move it from <strong>Downloads</strong> into that folder.</p>
          <a className="button" href="/workshop-setup/practice.txt" download>Download practice.txt</a>
          <details className={styles.manualFile}>
            <summary>Make the file yourself</summary>
            <p>On Mac, use TextEdit and choose <strong>Format → Make Plain Text</strong>. On Windows, use Notepad and choose <strong>File → Save As</strong> when you’re ready to save. Copy both lines and save the file as <code>practice.txt</code> inside <code>Workshop Practice</code>.</p>
            <pre><code>{`This is my workshop practice file.
The blue notebook is on the shelf.`}</code></pre>
          </details>
        </li>
        {isClaude ? (
          <li>
            <h4>Open the folder in Claude Code</h4>
            <p>In the <strong>Code</strong> tab, open the environment selector below the message box and choose the first entry under <strong>Local</strong>. Open the folder selector beside it, choose <strong>Open folder…</strong>, and select <code>Workshop Practice</code>.</p>
            <figure className={styles.claudeFolderGuide}>
              <div className={styles.claudeControls}>
                <div><span>Sidebar</span><strong>Code</strong></div>
                <div><span>Environment selector</span><strong>Local</strong></div>
                <div><span>Folder selector</span><strong>Open folder…</strong></div>
              </div>
              <figcaption>Illustrated guide to the controls. <a href="https://code.claude.com/docs/en/desktop-quickstart#start-your-first-session">Anthropic’s desktop quickstart</a></figcaption>
            </figure>
          </li>
        ) : (
          <li>
            <h4>Open the folder in Codex</h4>
            <p>In the sidebar, select <strong>+</strong> beside <strong>Projects</strong>. Choose <strong>Local</strong>, then <strong>Next</strong>. Name the project <code>Workshop Practice</code>, add your folder under <strong>Source folders</strong>, and select <strong>Create project</strong>.</p>
            <div className={styles.screenshotPair}>
              <figure>
                <Image src="/workshop-setup/local.jpg" alt="Create project dialog with Local selected and the Next button in the lower right" width={680} height={355} />
                <figcaption>Choose <strong>Local</strong>, then select <strong>Next</strong>.</figcaption>
              </figure>
              <figure>
                <Image src="/workshop-setup/folder.jpg" alt="Create project dialog showing a selected folder under Source folders" width={520} height={322} />
                <figcaption>Choose your folder under <strong>Source folders</strong>, then select <strong>Create project</strong>.</figcaption>
              </figure>
            </div>
            <p className={styles.screenshotCredit}>Screenshots from <a href="https://learn.chatgpt.com/training/codex-lab/index.html?step=project">OpenAI’s Codex training</a>, which uses an example project called Blossom Bank.</p>
          </li>
        )}
        <li>
          <h4>Ask {isClaude ? "Claude" : "Codex"} to read one line</h4>
          <div className={styles.promptGrid}>
            <div>
              {isClaude ? (
                <p>Check that <code>Workshop Practice</code> is selected beside the environment. Use <strong>Manual</strong> if you want Claude to ask before making changes.</p>
              ) : (
                <p>Start a new chat inside <code>Workshop Practice</code>. Check that the composer shows your project and <strong>Local</strong>. If you see <strong>Work in</strong>, choose <strong>This computer</strong>.</p>
              )}
              <p>Send this message.</p>
              <pre><code>Read line 2 of practice.txt and quote it exactly. Leave the file as it is.</code></pre>
            </div>
            <div>
              {!isClaude && (
                <figure className={styles.composerShot}>
                  <Image src="/workshop-setup/chat.jpg" alt="OpenAI’s example chat composer with the project name beside the Local indicator" width={619} height={573} />
                  <figcaption>Check the project name and <strong>Local</strong> above the message box.</figcaption>
                </figure>
              )}
              <p className={styles.success}><strong>You’re ready when the reply says</strong> “The blue notebook is on the shelf.”</p>
            </div>
          </div>
        </li>
      </ol>
    </section>
  );
}
