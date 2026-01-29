This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
authenticate/
  ui/
    login-button/
      kakao/
        index.tsx
      index.tsx
    index.ts
edit-form/
  ui/
    FormSignatureEditSection/
      hook.ts
      index.tsx
    QuestionAddSection/
      hook.ts
      index.tsx
    QuestionList/
      index.tsx
      use-question-list.ts
    index.ts
toggle-theme/
  ui/
    dark-mode-button/
      index.tsx
    index.ts
```

# Files

## File: authenticate/ui/login-button/kakao/index.tsx
```typescript
import { memo } from 'react';

import { EnvManager } from '@/shared/lib';

const Kakao = () => {
  const clientId = EnvManager.getAppEnv('VITE_KAKAO_CLIENT_ID') ?? '';
  const redirectUri = EnvManager.getAppEnv('VITE_KAKAO_REDIRECT_URI') ?? '';

  return (
    <a
      role="button"
      href={`https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`}
      aria-label="카카오 로그인"
      className="flex items-center justify-center gap-[12px] bg-[#FEE500] text-[rgba(0,0,0,0.85)] text-base p-[12px] rounded-[12px] hover:bg-[#FDD835] active:bg-[#FBC02D] transition-colors duration-200 w-fit"
    >
      <span>카카오 로그인</span>
    </a>
  );
};

export default memo(Kakao);
```

## File: authenticate/ui/login-button/index.tsx
```typescript
import KakaoLoginButton from './kakao';

const LoginButton = {
  Kakao: KakaoLoginButton,
};

export default LoginButton;
```

## File: authenticate/ui/index.ts
```typescript
export { default as LoginButton } from './login-button';
```

## File: edit-form/ui/FormSignatureEditSection/hook.ts
```typescript
import { useCallback } from 'react';

import { FormSignatureStateService } from '@/entities/form/lib';
import { useFormSignatureStore } from '@/entities/form/store';
import { TypeGuard } from '@/shared/lib';

const useFormSignatureEditSectionController = () => {
  const { formSignature, setFormSignature } = useFormSignatureStore();

  const handleTitleChange = useCallback(
    (title: string) => {
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.editTitle(newFormSignature, title);
        }
        const clonedFormSignature = prev.clone();
        return FormSignatureStateService.editTitle(clonedFormSignature, title);
      });
    },
    [setFormSignature],
  );

  const handleDescriptionChange = useCallback(
    (description: string) => {
      setFormSignature(prev => {
        if (TypeGuard.checkNull(prev)) {
          const newFormSignature = FormSignatureStateService.getInitialFormSignature();
          return FormSignatureStateService.editDescription(newFormSignature, description);
        }
        const clonedFormSignature = prev.clone();
        return FormSignatureStateService.editDescription(clonedFormSignature, description);
      });
    },
    [setFormSignature],
  );

  return {
    formSignature,
    handleTitleChange,
    handleDescriptionChange,
  };
};

export default useFormSignatureEditSectionController;
```

## File: edit-form/ui/FormSignatureEditSection/index.tsx
```typescript
import { memo } from 'react';

import useFormSignatureEditSectionController from './hook';

const FormSignatureEditSection = memo(() => {
  const { formSignature, handleTitleChange, handleDescriptionChange } =
    useFormSignatureEditSectionController();

  return (
    <section className="w-full flex flex-col gap-4 p-8 bg-bg-base border-t-8 border-x border-b border-t-brand-primary border-border-default rounded-slim-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full">
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          className="w-full py-2 text-4xl font-slim-bold bg-transparent border-b-2 border-border-default text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
          maxLength={100}
          value={formSignature?.getValue('title') ?? ''}
          onChange={e => handleTitleChange(e.target.value)}
        />
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="이 설문에 대한 설명을 입력해주세요 (선택 사항)"
          className="w-full py-2 text-base font-slim-normal bg-transparent border-b border-border-default text-text-secondary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
          maxLength={200}
          value={formSignature?.getValue('description') ?? ''}
          onChange={e => handleDescriptionChange(e.target.value)}
        />
      </div>
    </section>
  );
});
FormSignatureEditSection.displayName = 'FormSignatureEditSection';

export default FormSignatureEditSection;
```

## File: edit-form/ui/QuestionAddSection/hook.ts
```typescript
import { useCallback } from 'react';

import { QuestionListStateService, QuestionStateService } from '@/entities/form/lib';
import { useFormQuestionListStore } from '@/entities/form/store';

import type { FormQuestionType } from '@/entities/form/model';

const useQuestionAddSectionController = () => {
  const { setFormQuestions } = useFormQuestionListStore();

  // 질문 추가 핸들러
  const handleAddQuestion = useCallback(
    (questionType: FormQuestionType) => {
      const formQuestion = QuestionStateService.getInitialQuestion(questionType);
      setFormQuestions(prev => QuestionListStateService.pushQuestion(prev, formQuestion));
    },
    [setFormQuestions],
  );

  return { handleAddQuestion };
};

export default useQuestionAddSectionController;
```

## File: edit-form/ui/QuestionAddSection/index.tsx
```typescript
import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import useQuestionAddSectionController from './hook';

const QuestionAddSection = () => {
  const { handleAddQuestion } = useQuestionAddSectionController();

  const buttonClass =
    'group flex flex-col items-center justify-center gap-4 p-6 bg-bg-base border-2 border-border-default rounded-slim-2xl hover:border-brand-primary hover:bg-bg-subtle transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md cursor-pointer';

  const iconBoxClass =
    'w-12 h-12 flex items-center justify-center bg-bg-subtle group-hover:bg-brand-primary/10 rounded-slim-xl transition-colors';

  return (
    <section className="w-full py-12 flex flex-col gap-8 items-center bg-transparent">
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-2xl font-slim-bold text-text-primary flex items-center gap-2">
          <Iconography.Stroke.Plus className="w-6 h-6 text-brand-primary" />
          질문 추가하기
        </h3>
        <p className="text-text-secondary text-sm">
          필요한 질문 유형을 선택하여 설문을 구성해보세요.
        </p>
      </div>

      <div className="grid grid-cols-2 desktop:grid-cols-4 gap-4 w-full">
        <button
          type="button"
          className={buttonClass}
          onClick={() => handleAddQuestion('SHORT_TEXT')}
        >
          <div className={iconBoxClass}>
            <Iconography.Stroke.Document className="w-6 h-6 text-text-secondary group-hover:text-brand-primary" />
          </div>
          <span className="font-slim-semibold text-text-secondary group-hover:text-text-primary">
            단답형
          </span>
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() => handleAddQuestion('LONG_TEXT')}
        >
          <div className={iconBoxClass}>
            <Iconography.Stroke.Document className="w-6 h-6 text-text-secondary group-hover:text-brand-primary" />
          </div>
          <span className="font-slim-semibold text-text-secondary group-hover:text-text-primary">
            장문형
          </span>
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() => handleAddQuestion('MULTIPLE_CHOICE')}
        >
          <div className={iconBoxClass}>
            <Iconography.Stroke.Plus className="w-6 h-6 text-text-secondary group-hover:text-brand-primary" />
          </div>
          <span className="font-slim-semibold text-text-secondary group-hover:text-text-primary">
            복수선택
          </span>
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() => handleAddQuestion('SINGLE_CHOICE')}
        >
          <div className={iconBoxClass}>
            <Iconography.Stroke.Plus className="w-6 h-6 text-text-secondary group-hover:text-brand-primary" />
          </div>
          <span className="font-slim-semibold text-text-secondary group-hover:text-text-primary">
            단일선택
          </span>
        </button>
      </div>
    </section>
  );
};

export default memo(QuestionAddSection);
```

## File: edit-form/ui/QuestionList/index.tsx
```typescript
import { memo } from 'react';

import {
  ShortTextQuestionCard,
  LongTextQuestionCard,
  SingleChoiceQuestionCard,
  MultipleChoiceQuestionCard,
} from '@/entities/form/ui';

import useQeustionListController from './use-question-list';

const QuestionList = () => {
  const {
    questions,
    handleTitleChange,
    handleTypeChange,
    handleDeleteQuestion,
    handleUpdateOption,
    handleAddOption,
    handleRemoveOption,
  } = useQeustionListController();

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
```

## File: edit-form/ui/QuestionList/use-question-list.ts
```typescript
import { QuestionStateService, QuestionListStateService } from '@/entities/form/lib';
import { useFormQuestionListStore } from '@/entities/form/store';
import { TypeGuard } from '@/shared/lib';

import type { FormQuestionType } from '@/entities/form/model';

const useQeustionListController = () => {
  const { formQuestions, setFormQuestions } = useFormQuestionListStore();

  const handleTitleChange = (questionId: string, title: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.editQuestionTitle(prevQuestion, title);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleTypeChange = (questionId: string, type: FormQuestionType) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.editQuestionType(prevQuestion, type);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    setFormQuestions(prevList => {
      return QuestionListStateService.removeQuestionFromList(prevList, questionId);
    });
  };

  const handleUpdateOption = (questionId: string, optionId: string, content: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.editOptionContent(prevQuestion, optionId, content);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleAddOption = (questionId: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.addOption(prevQuestion);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  const handleRemoveOption = (questionId: string, optionId: string) => {
    setFormQuestions(prevList => {
      const prevQuestion = QuestionListStateService.findQuestionById(prevList, questionId);
      if (TypeGuard.checkNull(prevQuestion)) {
        return prevList;
      }
      const newQuestion = QuestionStateService.removeOption(prevQuestion, optionId);
      return QuestionListStateService.replaceQuestionById(prevList, newQuestion, questionId);
    });
  };

  return {
    questions: formQuestions,
    handleTitleChange,
    handleTypeChange,
    handleDeleteQuestion,
    handleUpdateOption,
    handleAddOption,
    handleRemoveOption,
  };
};

export default useQeustionListController;
```

## File: edit-form/ui/index.ts
```typescript
export { default as FormSignatureEditSection } from './FormSignatureEditSection';
export { default as QuestionAddSection } from './QuestionAddSection';
export { default as QuestionList } from './QuestionList';
```

## File: toggle-theme/ui/dark-mode-button/index.tsx
```typescript
import { memo, useCallback, useState } from 'react';

import { TypeGuard } from '@/shared/lib';
import { Iconography } from '@/shared/ui';

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = useState(
    document?.documentElement.classList.contains('dark') ?? false,
  );

  const handleToggle = useCallback(() => {
    if (TypeGuard.checkUndefined(document)) {
      return;
    }
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, [darkMode]);

  return (
    <button
      onClick={handleToggle}
      aria-pressed={darkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-full bg-gray-200 p-2 text-gray-800 w-fit h-fit aspect-square transition-colors hover:bg-gray-300 active:bg-gray-400"
    >
      {darkMode ? <Iconography.Stroke.Sun aria-hidden /> : <Iconography.Stroke.Moon aria-hidden />}
    </button>
  );
};

export default memo(DarkModeButton);
```

## File: toggle-theme/ui/index.ts
```typescript
export { default as DarkModeButton } from './dark-mode-button';
```
