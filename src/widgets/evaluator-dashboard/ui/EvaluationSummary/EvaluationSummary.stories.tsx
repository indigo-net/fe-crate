import EvaluationSummary from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'widgets/EvaluationSummary',
  component: EvaluationSummary,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    totalAssigned: {
      description: '총 배분된 지원서 수',
      control: { type: 'number', min: 0 },
    },
    completedCount: {
      description: '완료된 평가 수',
      control: { type: 'number', min: 0 },
    },
    progressPercent: {
      description: '진행률 (0-100)',
      control: { type: 'number', min: 0, max: 100 },
    },
  },
} satisfies Meta<typeof EvaluationSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalAssigned: 8,
    completedCount: 2,
    progressPercent: 25,
  },
};

export const HalfCompleted: Story = {
  args: {
    totalAssigned: 10,
    completedCount: 5,
    progressPercent: 50,
  },
};

export const AllCompleted: Story = {
  args: {
    totalAssigned: 8,
    completedCount: 8,
    progressPercent: 100,
  },
};

export const NoApplicants: Story = {
  args: {
    totalAssigned: 0,
    completedCount: 0,
    progressPercent: 0,
  },
};
