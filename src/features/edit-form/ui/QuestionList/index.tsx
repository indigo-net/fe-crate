import { memo } from 'react';

import {
  ShortTextQuestionCard,
  LongTextQuestionCard,
  SingleChoiceQuestionCard,
  MultipleChoiceQuestionCard,
} from '@/entities/form/ui';

import useQuestionListController from './hook';

const QuestionList = () => {
  const {
    questions,
    handleTitleChange,
    handleTypeChange,
    handleDeleteQuestion,
    handleUpdateOption,
    handleAddOption,
    handleRemoveOption,
  } = useQuestionListController();

  return (
    <div className="flex flex-col gap-[24px] w-full">
      {questions.map(question => {
        const questionId = question.getValue('id');
        const questionType = question.getValue('type');

        switch (questionType) {
          case 'SHORT_TEXT':
            return (
              <ShortTextQuestionCard
                key={questionId}
                question={question}
                onChangeTitle={handleTitleChange}
                onDeleteQuestion={handleDeleteQuestion}
                onTypeChange={handleTypeChange}
              />
            );
          case 'LONG_TEXT':
            return (
              <LongTextQuestionCard
                key={questionId}
                question={question}
                onChangeTitle={handleTitleChange}
                onDeleteQuestion={handleDeleteQuestion}
                onTypeChange={handleTypeChange}
              />
            );
          case 'SINGLE_CHOICE':
            return (
              <SingleChoiceQuestionCard
                key={questionId}
                question={question}
                onChangeTitle={handleTitleChange}
                onAddOption={handleAddOption}
                onRemoveOption={handleRemoveOption}
                onUpdateOption={handleUpdateOption}
                onDeleteQuestion={handleDeleteQuestion}
                onTypeChange={handleTypeChange}
              />
            );
          case 'MULTIPLE_CHOICE':
            return (
              <MultipleChoiceQuestionCard
                key={questionId}
                question={question}
                onChangeTitle={handleTitleChange}
                onAddOption={handleAddOption}
                onRemoveOption={handleRemoveOption}
                onUpdateOption={handleUpdateOption}
                onDeleteQuestion={handleDeleteQuestion}
                onTypeChange={handleTypeChange}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default memo(QuestionList);
