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

  static editOptionContent(
    prev: FormQuestionModel,
    optionId: string,
    content: string,
    isClone = false,
  ) {
    const prevOptions = prev.getValue('options');
    if (!prevOptions) {
      return prev;
    }

    const newOptions = prevOptions.map(option => {
      if (option.getValue('id') === optionId) {
        return option.clone({ content });
      }
      return option;
    });

    if (isClone) {
      return prev.clone({ options: newOptions });
    }
    return prev.setValue('options', newOptions);
  }
}

export default QuestionStateService;
