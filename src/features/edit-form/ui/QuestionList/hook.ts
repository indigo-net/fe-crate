import { QuestionStateService, QuestionListStateService } from '@/entities/form/lib';
import { useFormQuestionListStore } from '@/entities/form/store';
import { TypeGuard } from '@/shared/lib';

import type { FormQuestionType } from '@/entities/form';

const useQeustionListController = () => {
  const { formQuestions, setFormQuestions } = useFormQuestionListStore();

  const handleTitleChange = (questionId: string, title: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.editQuestionTitle(prevQuestion, title);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleTypeChange = (questionId: string, type: FormQuestionType) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.editQuestionType(prevQuestion, type);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    setFormQuestions(prevList => {
      return QuestionListStateService.removeQuestionFromList(prevList, questionId);
    });
  };

  const handleUpdateOption = (questionId: string, optionId: string, content: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.editOptionContent(prevQuestion, optionId, content);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleAddOption = (questionId: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.addOption(prevQuestion);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleRemoveOption = (questionId: string, optionId: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.removeOption(prevQuestion, optionId);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  return {
    questions: formQuestions,
    handleTitleChange,
    handleTypeChange,
    handleDeleteQuestion,
    handleUpdateOption,
    handleAddOption,
    handleRemoveOption,
  };
};

export default useQeustionListController;
