import Alert from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '알림 제목 (선택)' },
    content: { control: false, description: '알림 내용 (ReactNode)' },
    confirmLabel: { control: 'text', description: '확인 버튼 텍스트' },
    onConfirm: { action: 'confirmed', description: '확인 버튼 클릭 핸들러' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: '기본 알림 메시지입니다.',
  },
};

export const WithTitle: Story = {
  args: {
    title: '알림',
    content: '제목이 있는 알림 메시지입니다.',
  },
};

export const CustomConfirmLabel: Story = {
  args: {
    title: '확인 필요',
    content: '이 작업을 진행하시겠습니까?',
    confirmLabel: '동의합니다',
  },
};

export const LongContent: Story = {
  args: {
    title: '긴 내용',
    content:
      '이것은 매우 긴 내용을 가진 알림입니다. 여러 줄에 걸쳐서 표시될 수 있으며, 레이아웃이 어떻게 처리되는지 확인할 수 있습니다.',
  },
};

export const WithCustomContent: Story = {
  args: {
    title: '커스텀 컨텐츠',
    content: (
      <div className="flex flex-col gap-2">
        <p className="font-medium">중요한 안내사항</p>
        <ul className="list-disc pl-4 text-left text-sm text-gray-500">
          <li>첫 번째 항목입니다.</li>
          <li>두 번째 항목입니다.</li>
          <li>세 번째 항목입니다.</li>
        </ul>
      </div>
    ),
  },
};
