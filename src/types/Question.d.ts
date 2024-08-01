export type Question = {
  id: number;
  content: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: string;
};
export type SearchQuestion = {
  page: number;
  pageSize: number;
  content?: string;
};