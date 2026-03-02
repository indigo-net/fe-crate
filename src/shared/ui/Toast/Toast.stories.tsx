import Toast from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text', description: '토스트 메시지' },
    isVisible: { control: 'boolean', description: '표시 여부' },
  },
  decorators: [
    Story => (
      <div className="relative h-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: '저장되었습니다.',
    isVisible: true,
  },
};

export const Hidden: Story = {
  args: {
    message: '이 메시지는 보이지 않습니다.',
    isVisible: false,
  },
};

export const LongMessage: Story = {
  args: {
    message: '이것은 매우 긴 토스트 메시지입니다. 여러 줄에 걸쳐서 표시될 수 있으며, 최대 너비가 90vw로 제한됩니다.',
    isVisible: true,
  },
};

export const SuccessMessage: Story = {
  args: {
    message: '성공적으로 처리되었습니다!',
    isVisible: true,
  },
};

export const ErrorMessage: Story = {
  args: {
    message: '오류가 발생했습니다. 다시 시도해주세요.',
    isVisible: true,
  },
};
