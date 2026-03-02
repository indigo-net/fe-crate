import { TypeGuard } from '@/shared/lib';

import type { FormSignatureModel } from '../model';
import type { FormQuestionModel } from '../model';

type ValidationError =
  | {
      isValid: false;
      error: 'TITLE_EMPTY' | 'NO_QUESTIONS' | 'QUESTION_TITLE_EMPTY';
      message: string;
    }
  | { isValid: true; error: null; message: null };

class FormValidationService {
  static validate(
    formSignature: FormSignatureModel | null,
    questions: FormQuestionModel[],
  ): ValidationError {
    // 1. 제목 검증
    if (TypeGuard.checkNull(formSignature) || !formSignature.getValue('title')?.trim()) {
      return {
        isValid: false,
        error: 'TITLE_EMPTY',
        message: '폼 제목을 입력해주세요',
      };
    }

    // 2. 질문 존재 여부 검증
    if (questions.length === 0) {
      return {
        isValid: false,
        error: 'NO_QUESTIONS',
        message: '최소 1개의 질문을 추가해주세요',
      };
    }

    // 3. 질문 내용 비어있음 검증
    const hasEmptyQuestionTitle = questions.some(q => !q.getValue('title')?.trim());
    if (hasEmptyQuestionTitle) {
      return {
        isValid: false,
        error: 'QUESTION_TITLE_EMPTY',
        message: '모든 질문의 내용을 입력해주세요',
      };
    }

    return {
      isValid: true,
      error: null,
      message: null,
    };
  }
}

export { FormValidationService };
