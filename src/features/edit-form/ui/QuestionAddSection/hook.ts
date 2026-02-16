import { useCallback } from 'react';

import { QuestionListStateService, QuestionStateService } from '@/entities/form/lib';
import { useFormQuestionListStore } from '@/entities/form/store';

import type { FormQuestionType } from '@/entities/form';

const useQuestionAddSectionController = () => {
  const { setFormQuestions } = useFormQuestionListStore();

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
