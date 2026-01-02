import { FormQuestionModel, type FormQuestionType } from '../model';

class QuestionStateService {
  static getInitialQuestion(type: FormQuestionType) {
    return new FormQuestionModel({
      title: '',
      type,
    });
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

export default QuestionStateService;
