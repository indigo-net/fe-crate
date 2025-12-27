import { useCallback } from 'react';

import { FormQuestionModel } from '@/entities/form-question/model';
import { useFormQuestionList } from '@/entities/form-question/store';

import type { FormQuestionType } from '@/entities/form-question/model';

const useNewForm = () => {
  const { formQuestions, addQuestion } = useFormQuestionList();

  // 질문 추가 핸들러
  const handleAddQuestion = useCallback(
    (questionType: FormQuestionType) => {
      const formQuestion = new FormQuestionModel({
        title: '',
        type: questionType,
      });
      addQuestion(formQuestion);
    },
    [addQuestion],
  );

  return { formQuestions, handleAddQuestion };
};

export default useNewForm;
