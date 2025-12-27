import { memo } from 'react';

import { TypeGuard } from '@/shared/lib';

import type { FormQuestionType } from '@/entities/form-question/model';

import { useQuestionCardContext } from '../context';

interface Props {
  onChangeQuestionTitle?(title: string): void;
  onChangeQuestionType?(type: FormQuestionType): void;
}

const QuestionProfile = (props: Props) => {
  const { onChangeQuestionTitle, onChangeQuestionType } = props;

  const { question } = useQuestionCardContext();
  const { type, title } = question.toJSON();

  return (
    <div className="flex items-center gap-[12px] w-full">
      {
        <select
          value={type}
          onChange={e => {
            if (TypeGuard.checkUndefined(onChangeQuestionType)) {
              return;
            }
            onChangeQuestionType(e.target.value as FormQuestionType);
          }}
        >
          <option value="SHORT_TEXT">단답형</option>
          <option value="LONG_TEXT">장답형</option>
          <option value="MULTIPLE_CHOICE">객관식(복수선택)</option>
          <option value="SINGLE_CHOICE">객관식(단일선택)</option>
        </select>
      }
      <input
        type="text"
        value={title || ''}
        placeholder="질문을 입력해주세요."
        className="w-full text-[12px]"
        onChange={e => {
          if (TypeGuard.checkUndefined(onChangeQuestionTitle)) {
            return;
          }
          onChangeQuestionTitle(e.target.value);
        }}
      />
    </div>
  );
};

export default memo(QuestionProfile);
