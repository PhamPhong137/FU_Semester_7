import { TypeSelectAnswer } from "@/constants/editor";
import { IKeyValueObject } from "./types";

export interface ISentenceQuiz {
  question: string;
  answers: IKeyValueObject<TypeSelectAnswer, string>[];
  correctAnswer: TypeSelectAnswer;
}
