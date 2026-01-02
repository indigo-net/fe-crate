import { useFormQuestionList } from '@/entities/form-question/store';

const useNewFormPageController = () => {
  const { formQuestions } = useFormQuestionList();
  return { formQuestions };
};

export default useNewFormPageController;
