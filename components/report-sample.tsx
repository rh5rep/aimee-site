import { reportFollowUp, reportStatus } from "./report-example";

export function ReportSample() {
  return (
    <figure className="sample-figure">
      <figcaption>Sample workflow · weekly reporting</figcaption>
      <div className="sample-paper">
        <div className="sample-header">
          <strong>Weekly operations report</strong>
          <span>Draft</span>
        </div>
        <p>{reportStatus.line}</p>
        <dl className="sample-rows">
          <div>
            <dt>Source</dt>
            <dd>{reportStatus.source}</dd>
          </div>
          <div>
            <dt>Follow-up</dt>
            <dd><mark>{reportFollowUp.line}</mark></dd>
          </div>
        </dl>
      </div>
    </figure>
  );
}
