const GROUPS = [
  {
    name: "Noticing",
    questions: [1, 2, 3, 4],
  },
  {
    name: "Not-Distracting",
    questions: [5, 6, 7, 8, 9, 10],
  },
  {
    name: "Not-Worrying",
    questions: [11, 12, 13, 14, 15],
  },
  {
    name: "Attention Regulation",
    questions: [16, 17, 18, 19, 20, 21, 22],
  },
  {
    name: "Emotional Awareness",
    questions: [23, 24, 25, 26, 27],
  },
  {
    name: "Self-Regulation",
    questions: [28, 29, 30, 31],
  },
  {
    name: "Body Listening",
    questions: [32, 33, 34],
  },
  {
    name: "Trusting",
    questions: [35, 36, 37],
  },
];

export type Score = {
  [key: string]: number;
}

const REVERSED_QUESTIONS = [5, 6, 7, 8, 9, 10, 11, 12, 15];

export const calculateScore = (answers: { [key: string]: string }) => {
  // Keep track of grouped scores in an object with the group name as the key and value as score.
  // Make the type more accurate with string, Number
  try {
    var scores: Score = {};
    GROUPS.forEach((group) => {
      const groupScore = group.questions.reduce((acc, question) => {
        const answer = answers[`question${question}`];
        if (REVERSED_QUESTIONS.includes(question)) {
          return acc + (5 - parseInt(answer));
        }
        return acc + parseInt(answer);
      }, 0);
      scores[group.name] = groupScore / group.questions.length;
      if (isNaN(scores[group.name])) {
        throw new Error(`Invalid ${group.name}`);
      }
    });
    return scores;
  } catch (error) {
    return null;
  }
};
