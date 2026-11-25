const destination = "/work#how-we-start";

export default function ApproachPage() {
  return (
    <main className="container interior" id="main">
      <meta httpEquiv="refresh" content={`0;url=${destination}`} />
      <p><a className="text-link" href={destination}>How we’d start with your team</a></p>
    </main>
  );
}
