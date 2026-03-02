import { FormQuestionModel, FormQuestionOptionModel } from '@/entities/form';

import QuestionPreview from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'widgets/form-detail/QuestionPreview',
  component: QuestionPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof QuestionPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleChoice: Story = {
  args: {
    questions: [
      new FormQuestionModel({
        type: 'SINGLE_CHOICE',
        title: '지원 분야를 선택해 주세요.',
        required: true,
        options: [
          new FormQuestionOptionModel({ content: '개발' }),
          new FormQuestionOptionModel({ content: '디자인' }),
          new FormQuestionOptionModel({ content: '마케팅' }),
        ],
      }),
    ],
  },
};

export const MultipleChoice: Story = {
  args: {
    questions: [
      new FormQuestionModel({
        type: 'MULTIPLE_CHOICE',
        title: '관심 있는 기술 스택을 모두 선택해 주세요.',
        required: false,
        options: [
          new FormQuestionOptionModel({ content: 'React' }),
          new FormQuestionOptionModel({ content: 'Vue' }),
          new FormQuestionOptionModel({ content: 'Angular' }),
          new FormQuestionOptionModel({ content: 'Svelte' }),
        ],
      }),
    ],
  },
};

export const ShortText: Story = {
  args: {
    questions: [
      new FormQuestionModel({
        type: 'SHORT_TEXT',
        title: '지원자 이름을 입력해 주세요.',
        required: true,
      }),
    ],
  },
};

export const LongText: Story = {
  args: {
    questions: [
      new FormQuestionModel({
        type: 'LONG_TEXT',
        title: '자기소개를 작성해 주세요.',
        required: true,
      }),
    ],
  },
};

export const MixedQuestions: Story = {
  args: {
    questions: [
      new FormQuestionModel({
        type: 'SHORT_TEXT',
        title: '지원자 이름을 입력해 주세요.',
        required: true,
      }),
      new FormQuestionModel({
        type: 'SINGLE_CHOICE',
        title: '지원 분야를 선택해 주세요.',
        required: true,
        options: [
          new FormQuestionOptionModel({ content: '개발' }),
          new FormQuestionOptionModel({ content: '디자인' }),
          new FormQuestionOptionModel({ content: '마케팅' }),
        ],
      }),
      new FormQuestionModel({
        type: 'MULTIPLE_CHOICE',
        title: '관심 있는 기술 스택을 모두 선택해 주세요.',
        required: false,
        options: [
          new FormQuestionOptionModel({ content: 'React' }),
          new FormQuestionOptionModel({ content: 'TypeScript' }),
          new FormQuestionOptionModel({ content: 'Node.js' }),
        ],
      }),
      new FormQuestionModel({
        type: 'LONG_TEXT',
        title: '자기소개를 작성해 주세요.',
        required: true,
      }),
    ],
  },
};

export const Empty: Story = {
  args: {
    questions: [],
  },
};
