import type { FormQuestionModel, FormQuestionType } from '../model';

class FormQuestionStateService {
  static pushQuestionToList(prevList: FormQuestionModel[], question: FormQuestionModel) {
    return [...prevList, question];
  }

  //   static removeQuestionFromList(prevList: FormQuestionModel[], questionId: string) {
  //     const newList = prevList.filter(question => question.getValue('id') !== questionId);
  //     return newList.length === prevList.length ? prevList : newList;
  //   }

  static findQuestionById(prevList: FormQuestionModel[], questionId: string): FormQuestionModel | null {
    return prevList.find(question => question.getValue('id') === questionId) || null;
  }

  static replaceQuestionById(
    prevList: FormQuestionModel[],
    newQuestion: FormQuestionModel,
    targetId: string,
  ): FormQuestionModel[] {
    return prevList.map(question => (question.getValue('id') === targetId ? newQuestion : question));
  }

  static editQuestionTitle(prev: FormQuestionModel, title: string, isClone = false) {
    if (isClone) {
      return prev.clone({ title });
    }
    return prev.setValue('title', title);
  }

  static editQuestionType(prev: FormQuestionModel, type: FormQuestionType, isClone = false) {
    if (isClone) {
      return prev.clone({ type });
    }
    return prev.setValue('type', type);
  }
}

export default FormQuestionStateService;
