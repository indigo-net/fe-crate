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
cache/
  lib/
    cache-service.ts
    index.ts
  model/
    cache-model.ts
    index.ts
    type.d.ts
form/
  lib/
    form-signature-state-service.ts
    index.ts
    question-list-state-service.ts
    question-state-service.ts
  model/
    form-question/
      index.ts
      option.ts
    form-signature/
      index.ts
    index.ts
    type.d.ts
  store/
    index.ts
    use-form-question-list-store.ts
    use-form-signature-store.ts
  ui/
    LongTextQuestionCard/
      index.tsx
    MultipleChoiceQuestionCard/
      index.tsx
    ShortTextQuestionCard/
      index.tsx
    SingleChoiceQuestionCard/
      index.tsx
    index.ts
README.md
```

# Files

## File: cache/lib/cache-service.ts
```typescript
import { TypeGuard } from '@/shared/lib';

import { type CacheData, CacheModel } from '../model';

class CacheService {
  static CACHE_MAP = new Map<string, CacheModel<CacheData>>();

  static get<T extends CacheData>(key: string): T | null {
    const cached = this.CACHE_MAP.get(key);
    if (TypeGuard.checkUndefined(cached) || cached.isExpired) {
      this.CACHE_MAP.delete(key);
      return null;
    } else {
      return cached.data as T;
    }
  }

  static set<T extends CacheData>(key: string, data: T, ttlMs?: number): boolean {
    if (this.CACHE_MAP.has(key)) {
      return false;
    }

    this.CACHE_MAP.set(key, new CacheModel({ data, ttlMs }));
    return true;
  }

  static invalidate(key: string) {
    this.CACHE_MAP.delete(key);
  }
}

export default CacheService;
```

## File: cache/lib/index.ts
```typescript
export { default as CacheService } from './cache-service';
```

## File: cache/model/cache-model.ts
```typescript
import { TypeGuard } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

import type { CacheData } from './type';

interface State<T extends CacheData = null> {
  data: T;
  // NOTE: null 인 경우, 기한없는 캐싱
  expiredAt: number | null;
}

interface Props<T extends CacheData = null> {
  data: T;
  // Time To Live (milliseconds)
  ttlMs?: number;
}

class CacheModel<T extends CacheData = null> extends CustomModel<State<T>> {
  private state: State<T>;

  constructor(props: Props<T>) {
    super();
    const { data, ttlMs } = props;
    const now = Date.now();

    this.state = {
      data,
      expiredAt: TypeGuard.checkUndefined(ttlMs) ? null : Math.max(now + ttlMs, now),
    };
  }

  get isExpired(): boolean {
    const { expiredAt } = this.state;

    if (TypeGuard.checkNull(expiredAt)) {
      return false;
    }

    return expiredAt < Date.now();
  }

  get data(): T {
    return this.state.data;
  }

  toJSON(): State<T> {
    return this.state;
  }

  clone(): CacheModel<T> {
    const { data, expiredAt } = this.state;

    return new CacheModel({
      data,
      ttlMs: !TypeGuard.checkNull(expiredAt) ? Math.max(expiredAt - Date.now(), 0) : undefined,
    });
  }
}

export default CacheModel;
```

## File: cache/model/index.ts
```typescript
export { default as CacheModel } from './cache-model';

export * from './type';
```

## File: cache/model/type.d.ts
```typescript
type CacheData = string | number | boolean | object | null;

export type { CacheData };
```

## File: form/lib/form-signature-state-service.ts
```typescript
import { FormSignatureModel } from '../model';

class FormSignatureStateService {
  static getInitialFormSignature() {
    return new FormSignatureModel({});
  }

  static editTitle(prev: FormSignatureModel, title: string) {
    return prev.setValue('title', title);
  }

  static editDescription(prev: FormSignatureModel, description: string) {
    return prev.setValue('description', description);
  }
}

export default FormSignatureStateService;
```

## File: form/lib/index.ts
```typescript
export { default as FormSignatureStateService } from './form-signature-state-service';
export { default as QuestionStateService } from './question-state-service';
export { default as QuestionListStateService } from './question-list-state-service';
```

## File: form/lib/question-list-state-service.ts
```typescript
import type { FormQuestionModel } from '../model';

class QuestionListStateService {
  static pushQuestion(prevList: FormQuestionModel[], question: FormQuestionModel) {
    return [...prevList, question];
  }

  static removeQuestionFromList(prevList: FormQuestionModel[], questionId: string) {
    const newList = prevList.filter(question => question.getValue('id') !== questionId);
    return newList.length === prevList.length ? prevList : newList;
  }

  static findQuestionById(
    prevList: FormQuestionModel[],
    questionId: string,
  ): FormQuestionModel | null {
    return prevList.find(question => question.getValue('id') === questionId) || null;
  }

  static replaceQuestionById(
    prevList: FormQuestionModel[],
    newQuestion: FormQuestionModel,
    targetId: string,
  ): FormQuestionModel[] {
    return prevList.map(question =>
      question.getValue('id') === targetId ? newQuestion : question,
    );
  }
}

export default QuestionListStateService;
```

## File: form/lib/question-state-service.ts
```typescript
import { FormQuestionModel, FormQuestionOptionModel, type FormQuestionType } from '../model';

class QuestionStateService {
  static getInitialQuestion(type: FormQuestionType) {
    return new FormQuestionModel({
      title: '',
      type,
    });
  }

  static editQuestionTitle(prev: FormQuestionModel, title: string, isClone = false) {
    if (isClone) {
      return prev.clone({ title });
    }
    return prev.setValue('title', title);
  }

  static editQuestionType(prev: FormQuestionModel, type: FormQuestionType, isClone = false) {
    if (isClone) {
      return prev.clone({ type });
    }
    return prev.setValue('type', type);
  }

  static editOptionContent(
    prev: FormQuestionModel,
    optionId: string,
    content: string,
    isClone = false,
  ) {
    const prevOptions = prev.getValue('options');
    if (!prevOptions) {
      return prev;
    }

    const newOptions = prevOptions.map(option => {
      if (option.getValue('id') === optionId) {
        return option.clone({ content });
      }
      return option;
    });

    if (isClone) {
      return prev.clone({ options: newOptions });
    }
    return prev.setValue('options', newOptions);
  }

  static addOption(prev: FormQuestionModel, isClone = false) {
    const prevOptions = prev.getValue('options') ?? [];
    const newOption = new FormQuestionOptionModel({ content: '' });
    const newOptions = [...prevOptions, newOption];

    if (isClone) {
      return prev.clone({ options: newOptions });
    }
    return prev.setValue('options', newOptions);
  }

  static removeOption(prev: FormQuestionModel, optionId: string, isClone = false) {
    const prevOptions = prev.getValue('options');
    if (!prevOptions) return prev;

    const newOptions = prevOptions.filter(opt => opt.getValue('id') !== optionId);

    if (isClone) {
      return prev.clone({ options: newOptions });
    }
    return prev.setValue('options', newOptions);
  }
}

export default QuestionStateService;
```

## File: form/model/form-question/index.ts
```typescript
import { TypeGuard, UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

import FormQuestionOptionModel from './option';

import type { FormQuestionType } from '../';

interface State {
  id: string;
  type: FormQuestionType;
  // 질문 내용
  title: string;
  // 질문 설명
  description: string | null;
  // 필수 질문 여부
  required: boolean;
  // (객관식 질문일 경우), 선택지 목록)
  options: FormQuestionOptionModel[] | null;
}

interface Props {
  id?: string;
  type: FormQuestionType;
  title: string;
  description?: string | null;
  required?: boolean;
  options?: FormQuestionOptionModel[] | null;
}

class FormQuestionModel extends CustomModel<State> {
  private state: State;
  constructor(props: Props) {
    super();
    const { id, type, title, description, required, options } = props;

    const isValidateOptions =
      !!options && options.length !== 0 && type !== 'SHORT_TEXT' && type !== 'LONG_TEXT';

    this.state = {
      id: id || UUID.v4(),
      type: type,
      title: title,
      description: description || null,
      required: required || false,
      options: isValidateOptions ? options : null,
    };
  }

  getValue<K extends keyof State>(key: K): State[K] {
    return this.state[key];
  }

  setValue<K extends keyof State>(key: K, value: State[K]): FormQuestionModel {
    return this.clone({
      [key]: value,
    });
  }

  pushOption(option: FormQuestionOptionModel): FormQuestionModel {
    const options = this.state.options;
    if (TypeGuard.checkNull(options)) {
      return this;
    }
    return this.clone({
      options: [...options, option],
    });
  }

  toJSON(): State {
    return this.state;
  }

  clone(props?: Partial<Exclude<State, 'id'>>): FormQuestionModel {
    return new FormQuestionModel({
      id: this.state.id,
      type: props?.type ?? this.state.type,
      title: props?.title ?? this.state.title,
      required: TypeGuard.checkBoolean(props?.required) ? props?.required : this.state.required,
      description: !TypeGuard.checkUndefined(props?.description)
        ? props.description
        : this.state.description,
      options: !TypeGuard.checkUndefined(props?.options) ? props.options : this.state.options,
    });
  }
}

export default FormQuestionModel;
```

## File: form/model/form-question/option.ts
```typescript
import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

interface State {
  id: string;
  // 선택지 내용
  content: string;
  // 선택 여부
  checked: boolean;
  // 기본 선택 여부
  defaultChecked: boolean;
}

interface Props {
  id?: string;
  content: string;
  checked?: boolean;
  defaultChecked?: boolean;
}

class FormQuestionOptionModel extends CustomModel<State> {
  private state: State;

  constructor(props: Props) {
    super();
    const { id, content, checked, defaultChecked } = props;
    this.state = {
      id: id || UUID.v4(),
      content,
      checked: checked || false,
      defaultChecked: defaultChecked || false,
    };
  }

  getValue<K extends keyof State>(key: K): State[K] {
    return this.state[key];
  }

  setValue<K extends keyof State>(key: K, value: State[K]): FormQuestionOptionModel {
    return this.clone({
      [key]: value,
    });
  }

  toJSON(): State {
    return this.state;
  }

  clone(props?: Partial<State>): FormQuestionOptionModel {
    return new FormQuestionOptionModel({
      ...this.toJSON(),
      ...props,
    });
  }
}

export default FormQuestionOptionModel;
```

## File: form/model/form-signature/index.ts
```typescript
import { UUID } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

interface State {
  id: string;
  title: string;
  description: string;
  questionIds: string[];
}

interface Props {
  id?: string;
  title?: string;
  description?: string;
  questionIds?: string[];
}

class FormSignatureModel extends CustomModel<State> {
  private state: State;

  constructor(props: Props) {
    super();
    const { id, title, description, questionIds } = props;
    this.state = {
      id: id || UUID.v4(),
      title: title || '',
      description: description || '',
      questionIds: questionIds || [],
    };
  }

  getValue<K extends keyof State>(key: K): State[K] {
    return this.state[key];
  }

  setValue<K extends keyof State>(key: K, value: State[K]): FormSignatureModel {
    return this.clone({
      [key]: value,
    });
  }

  toJSON(): State {
    return this.state;
  }

  clone(props?: Partial<State>): FormSignatureModel {
    return new FormSignatureModel({
      ...this.toJSON(),
      ...props,
    });
  }
}

export default FormSignatureModel;
```

## File: form/model/index.ts
```typescript
export { default as FormQuestionModel } from './form-question';
export { default as FormQuestionOptionModel } from './form-question/option';
export { default as FormSignatureModel } from './form-signature';

export * from './type.d';
```

## File: form/model/type.d.ts
```typescript
type FormQuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';

export type { FormQuestionType };
```

## File: form/store/index.ts
```typescript
export { default as useFormSignatureStore } from './use-form-signature-store';
export { default as useFormQuestionListStore } from './use-form-question-list-store';
```

## File: form/store/use-form-question-list-store.ts
```typescript
import { create } from 'zustand';

import type { FormQuestionModel } from '../model';

interface State {
  formQuestions: FormQuestionModel[];
  setFormQuestions: (
    next: FormQuestionModel[] | ((prev: FormQuestionModel[]) => FormQuestionModel[]),
  ) => void;
}

const useFormQuestionListStore = create<State>(set => ({
  formQuestions: [],
  setFormQuestions: next => {
    set(state => {
      return {
        formQuestions: typeof next === 'function' ? next(state.formQuestions) : next,
      };
    });
  },
}));

export default useFormQuestionListStore;
```

## File: form/store/use-form-signature-store.ts
```typescript
import { create } from 'zustand';

import FormSignatureModel from '../model/form-signature';

interface State {
  formSignature: null | FormSignatureModel;
  setFormSignature: (
    next: FormSignatureModel | ((prev: null | FormSignatureModel) => FormSignatureModel),
  ) => void;
}

const useFormSignatureStore = create<State>(set => ({
  formSignature: null,
  setFormSignature: next => {
    set(state => {
      return {
        formSignature: typeof next === 'function' ? next(state.formSignature) : next,
      };
    });
  },
}));

export default useFormSignatureStore;
```

## File: form/ui/LongTextQuestionCard/index.tsx
```typescript
import { memo } from 'react';

import { FormQuestionModel, FormQuestionType } from '@/entities/form/model';
import { Iconography } from '@/shared/ui';

interface Props {
  question: FormQuestionModel;
  onChangeTitle?: (questionId: string, value: string) => void;
  onTypeChange?: (questionId: string, value: FormQuestionType) => void;
  onDeleteQuestion?: (questionId: string) => void;
}

const LongTextQuestionCard = (props: Props) => {
  const { question, onChangeTitle, onTypeChange, onDeleteQuestion } = props;

  return (
    <section className="w-full flex flex-col gap-6 p-8 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm hover:shadow-md transition-all">
      <div className="w-full flex justify-between items-center">
        <div className="relative">
          <select
            value={question?.getValue('type') ?? 'LONG_TEXT'}
            className="cursor-pointer px-3 py-1.5 text-xs font-slim-semibold rounded-slim-lg bg-bg-subtle border border-transparent hover:border-border-default text-text-secondary transition-all outline-none"
            onChange={e =>
              onTypeChange?.(question.getValue('id'), e.target.value as FormQuestionType)
            }
          >
            <option value="SHORT_TEXT">단답형</option>
            <option value="LONG_TEXT">장답형</option>
            <option value="MULTIPLE_CHOICE">객관식(복수선택)</option>
            <option value="SINGLE_CHOICE">객관식(단일선택)</option>
          </select>
        </div>

        <button
          type="button"
          aria-label="질문 삭제"
          className="group w-9 h-9 flex items-center justify-center rounded-slim-lg bg-bg-subtle hover:bg-neon-pink-50 dark:hover:bg-neon-pink-950/30 transition-all cursor-pointer"
          onClick={() => onDeleteQuestion?.(question.getValue('id'))}
        >
          <Iconography.Stroke.Trash
            className="w-5 h-5 text-text-tertiary group-hover:text-neon-pink-600 dark:group-hover:text-neon-pink-400 transition-colors"
            aria-hidden
          />
        </button>
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="질문을 입력해주세요"
            className="w-full py-2 text-2xl font-slim-bold bg-transparent border-b-2 border-border-default text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
            maxLength={50}
            value={question.getValue('title')}
            onChange={e => onChangeTitle?.(question.getValue('id'), e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="w-full">
            <textarea
              disabled
              placeholder="답변자가 여러 줄의 내용을 입력할 공간입니다"
              className="resize-none w-full h-32 px-4 py-3 text-sm rounded-slim-xl border border-dashed border-border-default bg-bg-subtle/50 text-text-tertiary cursor-not-allowed select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(LongTextQuestionCard);
```

## File: form/ui/MultipleChoiceQuestionCard/index.tsx
```typescript
import { memo } from 'react';

import { FormQuestionModel, FormQuestionType } from '@/entities/form/model';
import { Iconography } from '@/shared/ui';

interface Props {
  question: FormQuestionModel;
  onChangeTitle?: (questionId: string, value: string) => void;
  onTypeChange?: (questionId: string, value: FormQuestionType) => void;
  onDeleteQuestion?: (questionId: string) => void;
  onAddOption?: (questionId: string) => void;
  onRemoveOption?: (questionId: string, optionId: string) => void;
  onUpdateOption?: (questionId: string, optionId: string, value: string) => void;
}

const MultipleChoiceQuestionCard = (props: Props) => {
  const {
    question,
    onChangeTitle,
    onTypeChange,
    onDeleteQuestion,
    onAddOption,
    onRemoveOption,
    onUpdateOption,
  } = props;

  return (
    <section className="w-full flex flex-col gap-6 p-8 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm hover:shadow-md transition-all">
      <div className="w-full flex justify-between items-center">
        <div className="relative">
          <select
            aria-label={'질문 유형'}
            value={question?.getValue('type') ?? 'MULTIPLE_CHOICE'}
            className="cursor-pointer px-3 py-1.5 text-xs font-slim-semibold rounded-slim-lg bg-bg-subtle border border-transparent hover:border-border-default text-text-secondary transition-all outline-none"
            onChange={e =>
              onTypeChange?.(question.getValue('id'), e.target.value as FormQuestionType)
            }
          >
            <option value="SHORT_TEXT">단답형</option>
            <option value="LONG_TEXT">장답형</option>
            <option value="MULTIPLE_CHOICE">객관식(복수선택)</option>
            <option value="SINGLE_CHOICE">객관식(단일선택)</option>
          </select>
        </div>

        <button
          type="button"
          aria-label="질문 삭제"
          className="group w-9 h-9 flex items-center justify-center rounded-slim-lg bg-bg-subtle hover:bg-neon-pink-50 dark:hover:bg-neon-pink-950/30 transition-all cursor-pointer"
          onClick={() => onDeleteQuestion?.(question.getValue('id'))}
        >
          <Iconography.Stroke.Trash
            className="w-5 h-5 text-text-tertiary group-hover:text-neon-pink-600 dark:group-hover:text-neon-pink-400 transition-colors"
            aria-hidden
          />
        </button>
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="질문을 입력해주세요"
            className="w-full py-2 text-2xl font-slim-bold bg-transparent border-b-2 border-border-default text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
            maxLength={50}
            value={question.getValue('title')}
            onChange={e => onChangeTitle?.(question.getValue('id'), e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-3">
            {question.getValue('options')?.map(option => {
              const { id, content } = option.toJSON();
              return (
                <div key={id} className="group/option w-full flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-border-default bg-bg-base flex-shrink-0 rounded-slim-sm group-focus-within/option:border-brand-primary transition-colors" />
                  <input
                    type="text"
                    value={content}
                    placeholder="옵션을 입력해주세요"
                    className="flex-1 text-base text-text-primary bg-transparent border-b border-transparent focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors py-1"
                    onChange={e => onUpdateOption?.(question.getValue('id'), id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveOption?.(question.getValue('id'), id)}
                    className="p-1.5 rounded-slim-md bg-bg-subtle hover:bg-neon-pink-50 dark:hover:bg-neon-pink-950/30 opacity-0 group-hover/option:opacity-100 group-focus-within/option:opacity-100 transition-all"
                    aria-label="옵션 삭제"
                  >
                    <Iconography.Stroke.Minus
                      className="w-4 h-4 text-text-tertiary hover:text-neon-pink-600"
                      aria-hidden
                    />
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => onAddOption?.(question.getValue('id'))}
              className="w-fit flex items-center gap-2 px-3 py-1.5 rounded-slim-lg hover:bg-bg-subtle transition-all text-sm text-brand-primary font-slim-semibold"
            >
              <Iconography.Stroke.Plus className="w-4 h-4" />
              <span>옵션 추가하기</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(MultipleChoiceQuestionCard);
```

## File: form/ui/ShortTextQuestionCard/index.tsx
```typescript
import { memo } from 'react';

import { Iconography } from '@/shared/ui';

import type { FormQuestionModel, FormQuestionType } from '@/entities/form/model';

interface Props {
  question: FormQuestionModel;
  onChangeTitle?: (questionId: string, value: string) => void;
  onTypeChange?: (questionId: string, value: FormQuestionType) => void;
  onDeleteQuestion?: (questionId: string) => void;
}

const ShortTextQuestionCard = (props: Props) => {
  const { question, onChangeTitle, onTypeChange, onDeleteQuestion } = props;

  return (
    <section className="w-full flex flex-col gap-6 p-8 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm hover:shadow-md transition-all">
      <div className="w-full flex justify-between items-center">
        <div className="relative">
          <select
            value={question?.getValue('type') ?? 'SHORT_TEXT'}
            className="cursor-pointer px-3 py-1.5 text-xs font-slim-semibold rounded-slim-lg bg-bg-subtle border border-transparent hover:border-border-default text-text-secondary transition-all outline-none"
            onChange={e =>
              onTypeChange?.(question.getValue('id'), e.target.value as FormQuestionType)
            }
          >
            <option value="SHORT_TEXT">단답형</option>
            <option value="LONG_TEXT">장답형</option>
            <option value="MULTIPLE_CHOICE">객관식(복수선택)</option>
            <option value="SINGLE_CHOICE">객관식(단일선택)</option>
          </select>
        </div>

        <button
          type="button"
          aria-label="질문 삭제"
          className="group w-9 h-9 flex items-center justify-center rounded-slim-lg bg-bg-subtle hover:bg-neon-pink-50 dark:hover:bg-neon-pink-950/30 transition-all cursor-pointer"
          onClick={() => onDeleteQuestion?.(question.getValue('id'))}
        >
          <Iconography.Stroke.Trash
            className="w-5 h-5 text-text-tertiary group-hover:text-neon-pink-600 dark:group-hover:text-neon-pink-400 transition-colors"
            aria-hidden
          />
        </button>
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="질문을 입력해주세요"
            className="w-full py-2 text-2xl font-slim-bold bg-transparent border-b-2 border-border-default text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
            maxLength={50}
            value={question.getValue('title')}
            onChange={e => onChangeTitle?.(question.getValue('id'), e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="w-full max-w-sm">
            <input
              disabled
              type="text"
              placeholder="답변자가 입력할 공간입니다"
              className="w-full px-4 py-3 text-sm rounded-slim-xl border border-dashed border-border-default bg-bg-subtle/50 text-text-tertiary cursor-not-allowed select-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(ShortTextQuestionCard);
```

## File: form/ui/SingleChoiceQuestionCard/index.tsx
```typescript
import { memo } from 'react';

import { FormQuestionModel, FormQuestionType } from '@/entities/form/model';
import { Iconography } from '@/shared/ui';

interface Props {
  question: FormQuestionModel;
  onTypeChange?: (questionId: string, value: FormQuestionType) => void;
  onDeleteQuestion?: (questionId: string) => void;
  onChangeTitle?: (questionId: string, value: string) => void;
  onAddOption?: (questionId: string) => void;
  onRemoveOption?: (questionId: string, optionId: string) => void;
  onUpdateOption?: (questionId: string, optionId: string, value: string) => void;
}

const SingleChoiceQuestionCard = (props: Props) => {
  const {
    question,
    onChangeTitle,
    onAddOption,
    onRemoveOption,
    onUpdateOption,
    onTypeChange,
    onDeleteQuestion,
  } = props;

  return (
    <section className="w-full flex flex-col gap-6 p-8 bg-bg-base border border-border-default rounded-slim-2xl shadow-sm hover:shadow-md transition-all">
      <div className="w-full flex justify-between items-center">
        <div className="relative">
          <select
            aria-label={'질문 유형'}
            value={question?.getValue('type') ?? 'SINGLE_CHOICE'}
            className="cursor-pointer px-3 py-1.5 text-xs font-slim-semibold rounded-slim-lg bg-bg-subtle border border-transparent hover:border-border-default text-text-secondary transition-all outline-none"
            onChange={e =>
              onTypeChange?.(question.getValue('id'), e.target.value as FormQuestionType)
            }
          >
            <option value="SHORT_TEXT">단답형</option>
            <option value="LONG_TEXT">장답형</option>
            <option value="MULTIPLE_CHOICE">객관식(복수선택)</option>
            <option value="SINGLE_CHOICE">객관식(단일선택)</option>
          </select>
        </div>

        <button
          type="button"
          aria-label="질문 삭제"
          className="group w-9 h-9 flex items-center justify-center rounded-slim-lg bg-bg-subtle hover:bg-neon-pink-50 dark:hover:bg-neon-pink-950/30 transition-all cursor-pointer"
          onClick={() => onDeleteQuestion?.(question.getValue('id'))}
        >
          <Iconography.Stroke.Trash
            className="w-5 h-5 text-text-tertiary group-hover:text-neon-pink-600 dark:group-hover:text-neon-pink-400 transition-colors"
            aria-hidden
          />
        </button>
      </div>

      <div className="w-full flex flex-col gap-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="질문을 입력해주세요"
            className="w-full py-2 text-2xl font-slim-bold bg-transparent border-b-2 border-border-default text-text-primary focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors"
            maxLength={50}
            value={question.getValue('title')}
            onChange={e => onChangeTitle?.(question.getValue('id'), e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-3">
            {question.getValue('options')?.map(option => {
              const { id, content } = option.toJSON();
              return (
                <div key={id} className="group/option w-full flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-border-default bg-bg-base flex-shrink-0 rounded-full group-focus-within/option:border-brand-primary transition-colors" />
                  <input
                    type="text"
                    value={content}
                    placeholder="옵션을 입력해주세요"
                    className="flex-1 text-base text-text-primary bg-transparent border-b border-transparent focus:border-brand-primary focus:outline-none placeholder:text-text-tertiary transition-colors py-1"
                    onChange={e => onUpdateOption?.(question.getValue('id'), id, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveOption?.(question.getValue('id'), id)}
                    className="p-1.5 rounded-slim-md bg-bg-subtle hover:bg-neon-pink-50 dark:hover:bg-neon-pink-950/30 opacity-0 group-hover/option:opacity-100 group-focus-within/option:opacity-100 transition-all"
                    aria-label="옵션 삭제"
                  >
                    <Iconography.Stroke.Minus
                      className="w-4 h-4 text-text-tertiary hover:text-neon-pink-600"
                      aria-hidden
                    />
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => onAddOption?.(question.getValue('id'))}
              className="w-fit flex items-center gap-2 px-3 py-1.5 rounded-slim-lg hover:bg-bg-subtle transition-all text-sm text-brand-primary font-slim-semibold"
            >
              <Iconography.Stroke.Plus className="w-4 h-4" />
              <span>옵션 추가하기</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(SingleChoiceQuestionCard);
```

## File: form/ui/index.ts
```typescript
export { default as ShortTextQuestionCard } from './ShortTextQuestionCard';
export { default as LongTextQuestionCard } from './LongTextQuestionCard';
export { default as SingleChoiceQuestionCard } from './SingleChoiceQuestionCard';
export { default as MultipleChoiceQuestionCard } from './MultipleChoiceQuestionCard';
```

## File: README.md
```markdown
- 데이터 모델과 해당 데이터에 대한 로직을 포함
```
