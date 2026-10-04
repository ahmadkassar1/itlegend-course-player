import type { Exam, Worksheet } from "@/types/interaction";
import worksheetData from "./worksheet.json";

export const worksheet: Worksheet = worksheetData;

export const overviewExam: Exam = {
  id: "course-overview-check",
  questions: [
    {
      id: "goal",
      prompt: "What makes a useful first learning goal?",
      options: [
        { id: "specific", label: "One small, specific outcome" },
        { id: "everything", label: "Learning everything at once" },
        { id: "speed", label: "Finishing as quickly as possible" },
        { id: "copy", label: "Copying without understanding" },
      ],
      correctOptionId: "specific",
      explanation:
        "A small, specific goal makes practice and review manageable.",
    },
    {
      id: "practice",
      prompt: "After watching a lesson, what is the most useful next step?",
      options: [
        { id: "skip", label: "Skip directly to the last lesson" },
        { id: "try", label: "Try a simple example yourself" },
        { id: "only-watch", label: "Only watch the same video again" },
        { id: "avoid", label: "Avoid anything unfamiliar" },
      ],
      correctOptionId: "try",
      explanation:
        "Applying the idea helps reveal what you understand and what needs another look.",
    },
    {
      id: "notes",
      prompt: "What should you include in your learning notes?",
      options: [
        { id: "every-word", label: "Every word from the lesson" },
        { id: "nothing", label: "Nothing until the course is finished" },
        { id: "insights", label: "Key ideas, observations and questions" },
        { id: "titles", label: "Only the lesson titles" },
      ],
      correctOptionId: "insights",
      explanation:
        "Useful notes capture the key ideas and questions you want to revisit.",
    },
    {
      id: "question",
      prompt:
        "When an example does not work, how can you ask a clearer question?",
      options: [
        { id: "context", label: "Describe what you tried and what happened" },
        { id: "vague", label: "Say only that it is broken" },
        { id: "silent", label: "Keep the question to yourself" },
        { id: "guess", label: "Guess what the instructor would answer" },
      ],
      correctOptionId: "context",
      explanation:
        "Concrete context makes a question easier to understand and answer.",
    },
    {
      id: "review",
      prompt: "How can you check that you understand a lesson?",
      options: [
        { id: "time", label: "Count how long the video took" },
        { id: "tabs", label: "Open more browser tabs" },
        { id: "memorize", label: "Memorize the title" },
        {
          id: "explain",
          label: "Explain and apply the idea in your own words",
        },
      ],
      correctOptionId: "explain",
      explanation:
        "Explaining and applying an idea provides more useful feedback than watching alone.",
    },
  ],
};
