import { useCallback } from 'react';

import { QuestionListStateService, QuestionStateService } from '@/entities/form-question/lib';
import { useFormQuestionList } from '@/entities/form-question/store';

import type { FormQuestionType } from '@/entities/form-question/model';

const useQuestionAddSectionController = () => {
  const { setFormQuestions } = useFormQuestionList();

  // 질문 추가 핸들러
  const handleAddQuestion = useCallback(
    (questionType: FormQuestionType) => {
      const formQuestion = QuestionStateService.getInitialQuestion(questionType);
      setFormQuestions(prev => QuestionListStateService.pushQuestion(prev, formQuestion));
    },
    [setFormQuestions],
  );

  return { handleAddQuestion };
};

export default useQuestionAddSectionController;
