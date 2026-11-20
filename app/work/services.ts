export const services = [
  {
    id: "workshops",
    title: "Hands-on workshops",
    description: "We design a live exercise around your group’s work and experience. Participants try it, check what AI produces, and leave with instructions they can use again.",
    firstProject: {
      choice: "My team wants to get better at AI",
      headline: "Let the team practice on work they already know.",
      bring: "A task everyone recognizes, like responding to a tricky request.",
      try: "Draft a response together and check what the AI got right.",
      takeaway: "A set of instructions and checks to use on the next one.",
    },
  },
  {
    id: "one-on-one",
    title: "One-on-one sessions",
    description: "Work through a task with one of us. We help you choose the relevant inputs, make a first pass, and write down the checks you’ll want next time.",
  },
  {
    id: "workflow-design",
    title: "Team workflow design",
    description: "We map the process with your team, prototype one step, and document what goes in, who reviews the output, and how it moves to the next person.",
    firstProject: {
      choice: "This takes too long every week",
      headline: "Make the next handoff easier to pick up.",
      bring: "A recurring task and the notes people use to do it today.",
      try: "Draft a handoff checklist and test it on a second example.",
      takeaway: "A short set of steps someone else can follow.",
    },
  },
  {
    id: "implementation",
    title: "Workflow implementation",
    description: "We agree on the scope and acceptance criteria, then build and test the workflow on representative examples. Depending on the project, that can include connecting tools, adding a review step, and documenting how to run and maintain it.",
    firstProject: {
      choice: "We have a workflow worth building",
      headline: "Give a useful prototype a proper handoff.",
      bring: "The tools you already use and a few representative inputs.",
      try: "Build around those tools and test where a person needs to review.",
      takeaway: "A tested workflow and a guide for the people who’ll run it.",
    },
  },
];
