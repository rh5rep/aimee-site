export type Milestone = {
  number: string;
  title: string;
  shortTitle: string;
  measure: string;
  status: "reported" | "next" | "later";
  reachedOn: string | null;
  reportedOn?: string;
  note: string;
};

// Public-safe summary of the proposed goals in the private MaxAndRami workspace.
// Only set reachedOn after Max and Rami agree on the date and evidence.
export const milestones: Milestone[] = [
  {
    number: "01",
    title: "Make the work useful.",
    shortTitle: "Material value",
    measure: "Give someone a useful first result and a reason to keep learning.",
    status: "reported",
    reachedOn: null,
    reportedOn: "2026-10-20",
    note: "The founders recorded useful early sessions and reported ‘aha’ moments. The milestone date and later independent reuse still need checking.",
  },
  {
    number: "02",
    title: "Make the first sale.",
    shortTitle: "First sale",
    measure: "Payment reaches the bank account.",
    status: "next",
    reachedOn: null,
    note: "This is the next commercial test. Interest, a proposal, or a verbal yes would be progress, but not a completed sale.",
  },
  {
    number: "03",
    title: "Reach $10,000.",
    shortTitle: "$10k received",
    measure: "$10,000 in revenue reaches the bank account.",
    status: "later",
    reachedOn: null,
    note: "A later marker, not a forecast. We will add a date when the amount has actually been received.",
  },
];
