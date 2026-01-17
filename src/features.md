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
    <section className="w-full flex flex-col gap-[12px] p-[24px] bg-bg-default border-t-[8px] border-x border-b border-t-brand-primary border-x-divider-default border-b-divider-default rounded-[12px] shadow-sm">
      <div className="w-full">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="w-full py-[8px] text-[32px] font-bold bg-transparent border-b border-gray-200 text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
          maxLength={100}
          value={formSignature?.getValue('title') ?? ''}
          onChange={e => handleTitleChange(e.target.value)}
        />
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="필요할 경우, 추가적인 설명을 입력해주세요."
          className="w-full py-[4px] text-[14px] bg-transparent border-b border-gray-200 text-text-secondary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
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

import useQuestionAddSectionController from './hook';

const QuestionAddSection = () => {
  const { handleAddQuestion } = useQuestionAddSectionController();

  const buttonBaseClass =
    'border-[2px] border-divider-default rounded-[8px] py-[12px] px-[16px] flex justify-center items-center flex-nowrap w-full text-[14px] text-center text-nowrap transition-colors duration-100 ease-in-out';
  const activeClass =
    'hover:bg-brand-primary/10 hover:border-brand-primary hover:text-brand-primary cursor-pointer text-text-secondary';

  return (
    <section className="shadow-sm border border-divider-default rounded-[16px] p-[24px] flex flex-col gap-[16px] bg-bg-default w-full">
      <h3 className="text-[20px] font-bold text-text-primary">질문 추가</h3>
      <div className="flex-1 w-full flex items-center gap-[12px]">
        <button
          className={`${buttonBaseClass} ${activeClass}`}
          onClick={() => handleAddQuestion('SHORT_TEXT')}
        >
          단답형
        </button>
        <button
          className={`${buttonBaseClass} ${activeClass}`}
          onClick={() => handleAddQuestion('LONG_TEXT')}
        >
          장문형
        </button>
        <button
          className={`${buttonBaseClass} ${activeClass}`}
          onClick={() => handleAddQuestion('MULTIPLE_CHOICE')}
        >
          복수선택
        </button>
        <button
          className={`${buttonBaseClass} ${activeClass}`}
          onClick={() => handleAddQuestion('SINGLE_CHOICE')}
        >
          단일선택
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
