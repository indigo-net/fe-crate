import type { FormQuestionModel } from '../model';

class QuestionListStateService {
  static pushQuestion(prevList: FormQuestionModel[], question: FormQuestionModel) {
    return [...prevList, question];
  }

  //   static removeQuestionFromList(prevList: FormQuestionModel[], questionId: string) {
  //     const newList = prevList.filter(question => question.getValue('id') !== questionId);
  //     return newList.length === prevList.length ? prevList : newList;
  //   }

  static findQuestionById(
    prevList: FormQuestionModel[],
    questionId: string,
  ): FormQuestionModel | null {
    return prevList.find(question => question.getValue('id') === questionId) || null;
  }

  static replaceQuestionById(
    prevList: FormQuestionModel[],
    newQuestion: FormQuestionModel,
    targetId: string,
  ): FormQuestionModel[] {
    return prevList.map(question =>
      question.getValue('id') === targetId ? newQuestion : question,
    );
  }
}

export default QuestionListStateService;
