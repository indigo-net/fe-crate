import { useMemo } from 'react';

import { QuestionStateService, QuestionListStateService } from '@/entities/form-question/lib';
import { useFormQuestionList } from '@/entities/form-question/store';
import { TypeGuard } from '@/shared/lib';

import type { FormQuestionModel, FormQuestionType } from '@/entities/form-question/model';

interface Props {
  questionId: string;
}

const useQuestionEditCardController = (props: Props) => {
  const { questionId } = props;
  const { formQuestions, setFormQuestions } = useFormQuestionList();

  const question = useMemo((): FormQuestionModel | null => {
    return QuestionListStateService.findQuestionById(formQuestions, questionId);
  }, [formQuestions, questionId]);

  const handleTitleChange = (title: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.editQuestionTitle(prevQuestion, title);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleTypeChange = (type: FormQuestionType) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.editQuestionType(prevQuestion, type);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  return {
    question,
    handleTitleChange,
    handleTypeChange,
  };
};

export default useQuestionEditCardController;
