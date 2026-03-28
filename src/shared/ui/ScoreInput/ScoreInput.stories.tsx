import ScoreInput from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/ScoreInput',
  component: ScoreInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 100 },
      description: '선택된 점수 (null이면 미선택)',
    },
    onChange: {
      description: '점수 변경 핸들러',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    max: {
      control: { type: 'number', min: 1, max: 100 },
      description: '최대 점수 (기본값: 10)',
    },
    step: {
      control: { type: 'number', min: 1, max: 10 },
      description: '점수 간격 (기본값: 1)',
    },
  },
} satisfies Meta<typeof ScoreInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: null,
    onChange: () => {},
  },
};

export const Selected: Story = {
  args: {
    value: 7,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    value: 5,
    onChange: () => {},
    disabled: true,
  },
};

export const Max5: Story = {
  args: {
    value: 3,
    onChange: () => {},
    max: 5,
  },
};

export const Step5Max100: Story = {
  args: {
    value: 25,
    onChange: () => {},
    max: 100,
    step: 5,
  },
};
