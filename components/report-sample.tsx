export function ReportSample() {
  return (
    <figure className="sample-figure">
      <figcaption>Sample workflow · weekly reporting</figcaption>
      <div className="sample-paper">
        <div className="sample-header">
          <strong>Weekly operations report</strong>
          <span>Draft</span>
        </div>
        <p>18 of 20 requests closed this week. Two remain open.</p>
        <dl className="sample-rows">
          <div>
            <dt>Source</dt>
            <dd>Request tracker, Friday export</dd>
          </div>
          <div>
            <dt>Follow-up</dt>
            <dd><mark>Confirm an owner for request 42.</mark></dd>
          </div>
        </dl>
      </div>
    </figure>
  );
}
