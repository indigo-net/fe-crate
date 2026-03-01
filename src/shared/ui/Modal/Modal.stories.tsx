import Modal from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '모달 제목 (선택)' },
    content: { control: false, description: '모달 내용 (ReactNode)' },
    confirmLabel: { control: 'text', description: '확인 버튼 텍스트' },
    cancelLabel: { control: 'text', description: '취소 버튼 텍스트' },
    onConfirm: { action: 'confirmed', description: '확인 버튼 클릭 핸들러' },
    onCancel: { action: 'cancelled', description: '취소 버튼 클릭 핸들러' },
  },
  decorators: [
    Story => (
      <div className="h-[400px] w-[480px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: '기본 모달 내용입니다.',
  },
};

export const WithTitle: Story = {
  args: {
    title: '모달 제목',
    content: '제목이 있는 모달입니다.',
  },
};

export const CustomLabels: Story = {
  args: {
    title: '삭제 확인',
    content: '이 항목을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    confirmLabel: '삭제',
    cancelLabel: '취소',
  },
};

export const ConfirmAction: Story = {
  args: {
    title: '저장 확인',
    content: '변경사항을 저장하시겠습니까?',
    confirmLabel: '저장',
    cancelLabel: '아니오',
  },
};

export const WithForm: Story = {
  args: {
    title: '정보 입력',
    content: (
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none"
            placeholder="이메일을 입력하세요"
          />
        </div>
      </div>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: '이용약관',
    content: (
      <div className="space-y-4 text-sm text-gray-600">
        <p>
          본 서비스 이용약관(이하 "약관")은 회사(이하 "회사")가 제공하는 서비스의 이용조건 및
          절차, 회사와 이용자의 권리, 의무 및 책임사항을 규정합니다.
        </p>
        <p>
          제1조 (목적) 본 약관은 회사가 운영하는 서비스에서 제공하는 서비스를 이용함에 있어
          당사자의 권리, 의무 및 책임사항을 규정하는 것을 목적으로 합니다.
        </p>
        <p>
          제2조 (정의) 본 약관에서 사용하는 용어의 정의는 다음과 같습니다. "서비스"라 함은
          구현되는 단말기와 상관없이 회원이 이용할 수 있는 회사의 서비스를 의미합니다.
        </p>
        <p>
          제3조 (약관의 게시와 개정) 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스
          초기 화면에 게시합니다.
        </p>
      </div>
    ),
    confirmLabel: '동의합니다',
    cancelLabel: '동의하지 않습니다',
  },
};
