import { FormQuestionModel, FormQuestionOptionModel } from '../model';

import type { FormQuestionType } from '../types';

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

  static addOption(prev: FormQuestionModel, isClone = false) {
    const prevOptions = prev.getValue('options') ?? [];
    const newOption = new FormQuestionOptionModel({ content: '' });
    const newOptions = [...prevOptions, newOption];

    if (isClone) {
      return prev.clone({ options: newOptions });
    }
    return prev.setValue('options', newOptions);
  }

  static removeOption(prev: FormQuestionModel, optionId: string, isClone = false) {
    const prevOptions = prev.getValue('options');
    if (!prevOptions) {
      return prev;
    }

    const newOptions = prevOptions.filter(opt => opt.getValue('id') !== optionId);

    if (isClone) {
      return prev.clone({ options: newOptions });
    }
    return prev.setValue('options', newOptions);
  }
}

export default QuestionStateService;
