const email = "aimee_workflows@proton.me";
const bookingUrl = process.env.NEXT_PUBLIC_AIMEE_BOOKING_URL?.trim();
const maxRole = process.env.NEXT_PUBLIC_AIMEE_MAX_ROLE?.trim();
const ramiRole = process.env.NEXT_PUBLIC_AIMEE_RAMI_ROLE?.trim();

const mailto = email
  ? `mailto:${email}?subject=${encodeURIComponent("A task to discuss with AImee")}&body=${encodeURIComponent("Hi Max and Rami,\n\nThe recurring work I'd like to discuss is:\n\nWhat makes it difficult today:\n\nPlease keep the first email free of confidential material.\n")}`
  : "#contact";

const steps = [
  { number: "01", title: "Start with the work", text: "Choose a real task and agree on what a useful result would look like." },
  { number: "02", title: "Make a first pass", text: "Try an AI-supported approach with the right context and a manageable example." },
  { number: "03", title: "Look closely", text: "Review the output, check what matters, and name where judgment is still needed." },
  { number: "04", title: "Make it reusable", text: "Capture the useful steps and try them on a fresh example." },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 16 16 4M6 4h10v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}

function Brand() {
  return <a className="brand" href="#top" aria-label="AImee, back to top"><span className="brand-symbol" aria-hidden="true"><span /><span /><span /></span><span>AImee<span className="brand-period">.</span></span></a>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <Brand />
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#where">Where it helps</a>
            <a href="#method">Our approach</a>
            <a href="#first-step">First step</a>
            <a className="nav-contact" href="#contact">Contact <ArrowIcon diagonal /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> Practical AI for real work</p>
              <h1 id="hero-title">Make AI useful in the work you <em>already do.</em></h1>
              <p className="hero-lede">AImee helps small teams and professionals explore AI through a real task—then understand the method, check the result, and make what works easier to use again.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={mailto}>{email ? "Email us about a task" : "Start a conversation"}<ArrowIcon diagonal /></a>
                <a className="button button-text" href="#method">See our approach <ArrowIcon /></a>
              </div>
              <p className="hero-footnote">Start with one piece of work, not a list of tools.</p>
            </div>
            <div className="hero-visual" aria-label="An illustration of a recurring task becoming a reviewed, reusable way of working">
              <div className="visual-orbit visual-orbit-one" /><div className="visual-orbit visual-orbit-two" />
              <div className="work-card">
                <div className="work-card-top"><span className="work-card-label">A working starting point</span><span className="work-card-mark" aria-hidden="true">✳</span></div>
                <div className="work-card-title">One real task.</div>
                <p>Something your team does often, or something you want to do better.</p>
                <div className="work-card-flow">
                  <div><span className="flow-dot">1</span><span>Try a useful first approach</span></div>
                  <div><span className="flow-dot">2</span><span>Review it with human judgment</span></div>
                  <div><span className="flow-dot">3</span><span>Save and test the method again</span></div>
                </div>
                <div className="work-card-bottom"><span>LEARN BY DOING</span><span aria-hidden="true">↗</span></div>
              </div>
              <span className="visual-stamp">WORK → METHOD → REUSE</span>
            </div>
          </div>
        </section>

        <section className="section-pad where-section" id="where" aria-labelledby="where-title">
          <div className="container">
            <div className="section-intro">
              <p className="eyebrow">Where we can help</p>
              <h2 id="where-title">Begin with work that already matters.</h2>
              <p>You do not need a perfect AI use case. A recurring task, an inconsistent result, or a process your team keeps rebuilding is enough to start a conversation.</p>
            </div>
            <div className="audience-grid">
              <article className="audience-card">
                <span className="card-index">01 / SMALL TEAMS</span>
                <div className="card-glyph" aria-hidden="true"><span /><span /><span /></div>
                <h3>Make a shared task easier to repeat.</h3>
                <p>Explore how a team might use AI to support a piece of work while keeping the people who know the work involved in reviewing it.</p>
                <span className="card-example">For example: drafting from meeting notes, organizing recurring research, or shaping a first version of a document.</span>
              </article>
              <article className="audience-card audience-card-alt">
                <span className="card-index">02 / INDIVIDUAL PROFESSIONALS</span>
                <div className="card-glyph card-glyph-single" aria-hidden="true"><span /></div>
                <h3>Get more from the work in front of you.</h3>
                <p>Bring a task you already own. We can work through an approach that fits your starting point and make the useful parts easier to return to.</p>
                <span className="card-example">For example: preparing a draft, comparing ideas, or creating a checklist for a task you do often.</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section-pad method-section" id="method" aria-labelledby="method-title">
          <div className="container method-layout">
            <div className="method-heading">
              <p className="eyebrow">How we approach AI</p>
              <h2 id="method-title">A useful result is a start. Understanding it makes it yours.</h2>
              <p>We teach through practical work. The aim is to make the choices behind a result visible, check its limits, and leave you with a method you can try again.</p>
              <div className="method-note"><span aria-hidden="true">✳</span><p>Human judgment belongs throughout the process, especially when the work has real consequences.</p></div>
            </div>
            <ol className="steps-list">
              {steps.map((step) => <li key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><span className="step-arrow" aria-hidden="true">↗</span></li>)}
            </ol>
          </div>
        </section>

        <section className="section-pad first-step-section" id="first-step" aria-labelledby="first-step-title">
          <div className="container first-step-layout">
            <div><p className="eyebrow">A possible first step</p><h2 id="first-step-title">Bring one task. We&apos;ll find a useful place to begin.</h2></div>
            <div className="first-step-copy"><p>Tell us about a recurring task or an AI result that has been hard to trust or repeat. A first conversation helps us understand the work before suggesting a format.</p><ul className="first-step-points"><li><strong>Bring</strong><span>A short description of the task and who does it.</span></li><li><strong>Discuss</strong><span>What would be useful, what needs review, and what information is appropriate to use.</span></li><li><strong>Decide</strong><span>Whether a task-focused working session is a sensible next step.</span></li></ul><a className="inline-link" href={mailto}>{email ? "Email us about your task" : "Get in touch"}<ArrowIcon diagonal /></a></div>
          </div>
        </section>

        <section className="section-pad about-section" id="about" aria-labelledby="about-title">
          <div className="container about-layout">
            <div><p className="eyebrow">The people behind AImee</p><h2 id="about-title">Practical teaching, with people at the center.</h2></div>
            <div><p>AImee is being built by Max and Rami. We are exploring how approachable AI education can help people do meaningful work with more confidence and care.</p><div className="founder-row"><div><strong>Max</strong>{maxRole && <span>{maxRole}</span>}</div><div><strong>Rami</strong>{ramiRole && <span>{ramiRole}</span>}</div></div></div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container contact-layout"><div><p className="eyebrow">Start a conversation</p><h2 id="contact-title">What piece of work would you bring?</h2><p>Tell us what you do repeatedly, what feels frustrating or inconsistent, and what a useful improvement might look like. You do not need to have the solution worked out.</p><p className="contact-privacy-note">A short description is enough. Please do not send confidential material in a first email.</p></div><div className="contact-actions">{email ? <><a className="button button-light" href={mailto}>Email us about a task <ArrowIcon diagonal /></a><a className="email-link" href={`mailto:${email}`}>{email}</a></> : <p className="review-note">Public contact details are pending founder review. This draft is not ready to share.</p>}{bookingUrl && <a className="booking-link" href={bookingUrl} target="_blank" rel="noopener noreferrer">Book a conversation <ArrowIcon diagonal /></a>}</div></div>
        </section>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><Brand /><p>Practical AI for the work you already do.</p><a href="#top">Back to top ↑</a></div></footer>
    </>
  );
}
