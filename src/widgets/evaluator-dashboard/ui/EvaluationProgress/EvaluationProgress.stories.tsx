import { useState } from 'react';

import EvaluationProgress from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

type FilterType = 'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

const meta = {
  title: 'widgets/EvaluationProgress',
  component: EvaluationProgress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    progressPercent: {
      description: '진행률 (0-100)',
      control: { type: 'number', min: 0, max: 100 },
    },
    currentFilter: {
      description: '현재 선택된 필터',
      control: { type: 'select' },
      options: ['ALL', 'PENDING', 'COMPLETED'],
    },
    counts: {
      description: '각 필터별 개수',
    },
    onFilterChange: {
      action: 'onFilterChange',
      description: '필터 변경 핸들러',
    },
  },
} satisfies Meta<typeof EvaluationProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progressPercent: 25,
    currentFilter: 'ALL',
    counts: {
      all: 8,
      pending: 6,
      completed: 2,
    },
  },
};

export const HalfProgress: Story = {
  args: {
    progressPercent: 50,
    currentFilter: 'ALL',
    counts: {
      all: 10,
      pending: 5,
      completed: 5,
    },
  },
};

export const FilteredByPending: Story = {
  args: {
    progressPercent: 25,
    currentFilter: 'PENDING',
    counts: {
      all: 8,
      pending: 6,
      completed: 2,
    },
  },
};

export const FilteredByCompleted: Story = {
  args: {
    progressPercent: 75,
    currentFilter: 'COMPLETED',
    counts: {
      all: 12,
      pending: 3,
      completed: 9,
    },
  },
};

export const Interactive: Story = {
  render: function Render(args) {
    const [filter, setFilter] = useState<FilterType>('ALL');
    return (
      <EvaluationProgress
        {...args}
        currentFilter={filter}
        onFilterChange={setFilter}
      />
    );
  },
  args: {
    progressPercent: 40,
    currentFilter: 'ALL',
    counts: {
      all: 15,
      pending: 9,
      completed: 6,
    },
  },
};
