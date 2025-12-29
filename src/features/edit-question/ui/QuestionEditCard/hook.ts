import { useMemo } from 'react';

import { FormQuestionStateService } from '@/entities/form-question/lib';
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
    return FormQuestionStateService.findQuestionById(formQuestions, questionId);
  }, [formQuestions, questionId]);

  const handleTitleChange = (title: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = FormQuestionStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = FormQuestionStateService.editQuestionTitle(prevQuestion, title);
      return FormQuestionStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleTypeChange = (type: FormQuestionType) => {
    setFormQuestions(prevList => {
      const prevQuestion = FormQuestionStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = FormQuestionStateService.editQuestionType(prevQuestion, type);
      return FormQuestionStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  return {
    question,
    handleTitleChange,
    handleTypeChange,
  };
};

export default useQuestionEditCardController;
