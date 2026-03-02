---
name: storybook-guide
description: "Use when writing Storybook stories for React components. Triggers: 'story', 'storybook', '.stories.tsx', 'component documentation'. Do NOT use for test files or general component implementation."
license: Proprietary
---

# Storybook Writing Guide

React 컴포넌트의 Storybook 스토리 작성 가이드입니다.

## Quick Reference

| 작업 | 규칙 |
|------|------|
| 파일 위치 | 컴포넌트 옆 `ComponentName.stories.tsx` |
| 네이밍 | FSD 계층 구조 (`shared/Alert`, `entities/form/QuestionCard`) |
| 기본 템플릿 | Meta + Default + Variants |
| 실행 | `pnpm storybook` |

## 스토리 파일 구조

### 파일 위치 및 네이밍

스토리 파일은 컴포넌트와 같은 디렉토리에 위치합니다:

```
src/shared/ui/Alert/
├── index.tsx              # 컴포넌트
└── Alert.stories.tsx      # 스토리
```

### 기본 스토리 템플릿

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import Alert from '.';

const meta = {
  title: 'shared/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '알림 제목' },
    content: { control: 'text', description: '알림 내용' },
    confirmLabel: { control: 'text', description: '확인 버튼 텍스트' },
    onConfirm: { action: 'confirmed' },
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
```

## FSD 레이어별 title 패턴

| 레이어 | title 패턴 | 예시 |
|--------|-----------|------|
| shared | `shared/{ComponentName}` | `shared/Alert`, `shared/Modal` |
| entities | `entities/{domain}/{ComponentName}` | `entities/form/QuestionCard` |
| features | `features/{feature}/{ComponentName}` | `features/edit-form/QuestionList` |
| widgets | `widgets/{widget}/{ComponentName}` | `widgets/form-builder/FormCanvas` |

## argTypes 작성 규칙

### 기본 타입별 control

```tsx
argTypes: {
  // string
  title: { control: 'text', description: '제목' },

  // boolean
  disabled: { control: 'boolean', description: '비활성화 여부' },

  // number
  count: { control: { type: 'number', min: 0, max: 100 } },

  // select (enum)
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'danger'],
    description: '버튼 스타일',
  },

  // radio
  size: {
    control: 'radio',
    options: ['sm', 'md', 'lg'],
  },

  // action (callback)
  onClick: { action: 'clicked' },
  onConfirm: { action: 'confirmed' },
  onCancel: { action: 'cancelled' },

  // ReactNode (비활성화)
  children: { control: false },
}
```

### ReactNode props 처리

ReactNode 타입의 props는 control을 비활성화하고 스토리에서 직접 지정합니다:

```tsx
argTypes: {
  content: { control: false, description: 'ReactNode 컨텐츠' },
},

// 각 스토리에서 직접 지정
export const WithCustomContent: Story = {
  args: {
    content: (
      <div className="flex flex-col gap-2">
        <p>커스텀 컨텐츠입니다.</p>
        <span className="text-sm text-gray-500">추가 설명</span>
      </div>
    ),
  },
};
```

## 변형(Variants) 스토리 작성

각 컴포넌트의 주요 상태와 변형을 스토리로 작성합니다:

```tsx
// 기본 상태
export const Default: Story = {
  args: {
    content: '기본 상태',
  },
};

// 주요 변형들
export const WithTitle: Story = {
  args: {
    title: '제목 있음',
    content: '내용',
  },
};

export const LongContent: Story = {
  args: {
    content: '매우 긴 내용이 들어갈 때 레이아웃이 어떻게 변하는지 확인합니다. '.repeat(5),
  },
};

export const CustomLabel: Story = {
  args: {
    content: '커스텀 레이블',
    confirmLabel: '동의합니다',
  },
};
```

## 다크모드 데코레이터

다크모드 테스트를 위한 데코레이터:

```tsx
// .storybook/preview.ts에서 전역 설정
export const decorators = [
  Story => (
    <div className="p-4">
      <Story />
    </div>
  ),
];

// 개별 스토리에서 다크모드 테스트
export const DarkMode: Story = {
  decorators: [
    Story => (
      <div className="dark bg-gray-900 p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    content: '다크모드 테스트',
  },
};
```

## 인터랙션 테스트

Storybook의 play 함수를 사용한 인터랙션 테스트:

```tsx
import { expect, userEvent, within } from '@storybook/test';

export const ClickTest: Story = {
  args: {
    content: '클릭 테스트',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await userEvent.click(button);
    await expect(button).toBeVisible();
  },
};
```

## 체크리스트

- [ ] 파일 위치: 컴포넌트와 같은 디렉토리
- [ ] 파일명: `{ComponentName}.stories.tsx`
- [ ] title: FSD 레이어 구조 준수
- [ ] Meta: component, parameters, tags, argTypes 설정
- [ ] Default: 기본 상태 스토리
- [ ] Variants: 주요 변형 스토리들
- [ ] argTypes: 모든 props에 대한 control 및 description

**CRITICAL**: 스토리의 title은 반드시 FSD 레이어 구조를 따라야 합니다. 이를 통해 Storybook 사이드바에서 계층적으로 컴포넌트를 탐색할 수 있습니다.
