import { useEffect, useRef } from 'react';

import { useFormQuestionList } from '@/entities/form-question/store';

const useNewFormPageController = () => {
  const { formQuestions } = useFormQuestionList();

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // NOTE: 질문이 추가되더라도, "질문추가용UI" 를 추적하기 위해 카드리스트의 가장 하단으로 스크롤 이동
    if (listRef.current) {
      listRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }, [formQuestions.length]);

  return { formQuestions, listRef };
};

export default useNewFormPageController;
