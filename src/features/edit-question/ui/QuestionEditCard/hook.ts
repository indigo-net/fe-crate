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
    setFormQuestions(prev => {
      if (TypeGuard.checkNull(question)) {
        return prev;
      }
      const newQuestion = FormQuestionStateService.editQuestionTitle(question, title);
      return FormQuestionStateService.replaceQuestionById(prev, newQuestion, questionId);
    });
  };

  const handleTypeChange = (type: FormQuestionType) => {
    setFormQuestions(prev => {
      if (TypeGuard.checkNull(question)) {
        return prev;
      }
      const newQuestion = FormQuestionStateService.editQuestionType(question, type);
      return FormQuestionStateService.replaceQuestionById(prev, newQuestion, questionId);
    });
  };

  return {
    question,
    handleTitleChange,
    handleTypeChange,
  };
};

export default useQuestionEditCardController;
