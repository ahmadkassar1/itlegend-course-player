import type { Exam } from "@/types/interaction";

// An independent study-habits exercise, not a creator exam.
export const studyPractice: Exam = {
  id: "study-skills",
  questions: [
    {
      id: "goal",
      prompt:
        "Which goal gives you a useful starting point for a study session?",
      options: [
        { id: "a", label: "Understand and explain one specific idea" },
        { id: "b", label: "Open as many videos as possible" },
        { id: "c", label: "Copy every sentence without reviewing it" },
        { id: "d", label: "Avoid asking any questions" },
      ],
      correctOptionId: "a",
      explanation:
        "A specific goal helps you decide what to practise and review.",
    },
    {
      id: "recall",
      prompt: "After a lesson, which action checks your understanding?",
      options: [
        { id: "a", label: "Leave the lesson open in another tab" },
        { id: "b", label: "Explain the main idea in your own words" },
        { id: "c", label: "Count how many tabs you opened" },
        { id: "d", label: "Only read the title again" },
      ],
      correctOptionId: "b",
      explanation:
        "Explaining an idea without copying helps reveal gaps in understanding.",
    },
    {
      id: "practice",
      prompt: "What is a useful first step when trying a new concept?",
      options: [
        { id: "a", label: "Start with the largest project you can imagine" },
        { id: "b", label: "Skip testing your result" },
        { id: "c", label: "Try a small example and inspect what happens" },
        { id: "d", label: "Assume the first attempt must be perfect" },
      ],
      correctOptionId: "c",
      explanation:
        "A small example makes it easier to observe and correct your approach.",
    },
    {
      id: "question",
      prompt: "Which question is easiest to investigate or answer?",
      options: [
        { id: "a", label: "Why is everything difficult?" },
        { id: "b", label: "Can someone do the entire task for me?" },
        { id: "c", label: "What should I learn forever?" },
        {
          id: "d",
          label: "Here is what I tried, what I expected and what happened",
        },
      ],
      correctOptionId: "d",
      explanation:
        "Concrete context makes the problem easier to reproduce and discuss.",
    },
    {
      id: "review",
      prompt: "How can you use a mistake during practice?",
      options: [
        {
          id: "a",
          label: "Find the gap, correct it and try a related example",
        },
        { id: "b", label: "Hide it and never review it" },
        { id: "c", label: "Treat it as proof that you cannot learn" },
        { id: "d", label: "Ignore the feedback and repeat unchanged" },
      ],
      correctOptionId: "a",
      explanation:
        "Reviewing a specific mistake gives you a concrete next practice step.",
    },
  ],
};
