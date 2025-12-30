import { useCallback } from 'react';

import { QuestionListStateService } from '@/entities/form-question/lib';
import { FormQuestionModel } from '@/entities/form-question/model';
import { useFormQuestionList } from '@/entities/form-question/store';

import type { FormQuestionType } from '@/entities/form-question/model';

const useNewFormPageController = () => {
  const { formQuestions, setFormQuestions } = useFormQuestionList();

  // 질문 추가 핸들러
  const handleAddQuestion = useCallback(
    (questionType: FormQuestionType) => {
      const formQuestion = new FormQuestionModel({
        title: '',
        type: questionType,
      });
      setFormQuestions(prev => QuestionListStateService.pushQuestion(prev, formQuestion));
    },
    [setFormQuestions],
  );

  return { formQuestions, handleAddQuestion };
};

export default useNewFormPageController;
