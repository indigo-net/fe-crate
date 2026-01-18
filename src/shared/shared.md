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
context/
  ToastContext/
    index.tsx
  index.ts
lib/
  axios-manager/
    index.ts
  env-manager/
    index.ts
  type-guard/
    index.ts
  uuid/
    index.ts
  index.ts
model/
  custom-model/
    index.ts
  index.ts
ui/
  iconography/
    logo/
      kakao-talk/
        index.tsx
      index.tsx
    stroke/
      minus/
        index.tsx
      moon/
        index.tsx
      plus/
        index.tsx
      sun/
        index.tsx
      trash/
        index.tsx
      index.tsx
    index.tsx
  Toast/
    index.tsx
  index.ts
```

# Files

## File: context/ToastContext/index.tsx
```typescript
import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Toast } from '@/shared/ui';

import type { ReactNode } from 'react';

interface State {
  showToast: (message: string) => void;
}

const ToastContext = createContext<State | null>(null);

interface Props {
  children: ReactNode;
}

const ToastProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (newMessage: string) => {
    // 이전 타이머 제거
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setMessage(newMessage);
    setIsVisible(true);

    // 3초 후 자동 숨김
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={message} isVisible={isVisible} />
    </ToastContext.Provider>
  );
};

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToastContext };
```

## File: context/index.ts
```typescript
export { ToastProvider, useToastContext } from './ToastContext';
```

## File: lib/axios-manager/index.ts
```typescript
import axios, { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';

class AxiosManager {
  private static instance: AxiosInstance | null = null;

  private static createInstance(config?: CreateAxiosDefaults): AxiosInstance {
    const defaultConfig: CreateAxiosDefaults = {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 10000,
      withCredentials: true, // httpOnly 쿠키 전송을 위해 필요
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 기본 설정과 사용자 설정 병합
    const instance = axios.create({
      ...defaultConfig,
      ...config,
      headers: {
        ...defaultConfig.headers,
        ...config?.headers,
      },
    });

    instance.interceptors.response.use(
      response => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // TODO: refresh token
        }
        return Promise.reject(error);
      },
    );

    return instance;
  }

  static getAxiosInstance(config?: CreateAxiosDefaults): AxiosInstance {
    if (!this.instance) {
      this.instance = this.createInstance(config);
    }
    return this.instance;
  }
}

export default AxiosManager;
```

## File: lib/env-manager/index.ts
```typescript
class EnvManager {
  static getAppEnv(key: AppEnvKey): string | null {
    return import.meta.env[key] ?? null;
  }

  static checkDevMode(): boolean {
    return import.meta.env.DEV;
  }

  static checkProdMode(): boolean {
    return import.meta.env.PROD;
  }
}

export default EnvManager;
```

## File: lib/type-guard/index.ts
```typescript
class TypeGuard {
  static checkString(value: unknown): value is string {
    return typeof value === 'string';
  }

  static checkNumber(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  static checkBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
  }

  static checkNull(value: unknown): value is null {
    return value === null;
  }

  static checkUndefined(value: unknown): value is undefined {
    return value === undefined;
  }
}

export default TypeGuard;
```

## File: lib/uuid/index.ts
```typescript
class UUID {
  /**
   * @description
   * - 16바이트(128bit) 난수 배열을 반환
   * - 브라우저 환경: Web Crypto API (crypto.getRandomValues) 사용
   * - Node.js 환경: crypto.randomBytes 사용
   */
  private static getRandomBytes16(): Uint8Array {
    if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
      const out = new Uint8Array(16);
      globalThis.crypto.getRandomValues(out);
      return out;
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodeCrypto = require('crypto') as typeof import('crypto');
    return new Uint8Array(nodeCrypto.randomBytes(16));
  }

  static v4(): string {
    const randomBytes = this.getRandomBytes16();
    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;
    const hex = Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20),
    ].join('-');
  }

  static isValidV4(uuid: string): boolean {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  }
}
export default UUID;
```

## File: lib/index.ts
```typescript
export { default as AxiosManager } from './axios-manager';
export { default as EnvManager } from './env-manager';
export { default as TypeGuard } from './type-guard';
export { default as UUID } from './uuid';
```

## File: model/custom-model/index.ts
```typescript
abstract class CustomModel<T> {
  // 직렬화용 JSON 객체를 반환해야 한다.
  abstract toJSON(): T;
  // 자기 자신을 복제한 새 인스턴스를 반환해야 한다.
  abstract clone(props?: Partial<T>): CustomModel<T>;
}

export default CustomModel;
```

## File: model/index.ts
```typescript
export { default as CustomModel } from './custom-model';
```

## File: ui/iconography/logo/kakao-talk/index.tsx
```typescript
import type { SVGProps } from 'react';

const KakaoTalk = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'kakaotalk',
    'aria-hidden': ariaHidden = false,
  } = props;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path d="M4 11.2C4 7.78 7.58 5 12 5C16.42 5 20 7.78 20 11.2C20 14.62 16.42 17.4 12 17.4C11.19 17.4 10.4 17.31 9.66 17.15L6 19L6.78 15.93C5.05 14.95 4 13.18 4 11.2Z" />
    </svg>
  );
};

export default KakaoTalk;
```

## File: ui/iconography/logo/index.tsx
```typescript
import KakaoTalk from './kakao-talk';

const Logo = {
  KakaoTalk: KakaoTalk,
};

export default Logo;
```

## File: ui/iconography/stroke/minus/index.tsx
```typescript
import type { SVGProps } from 'react';

const Minus = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'minus',
    'aria-hidden': ariaHidden = false,
  } = props;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Minus;
```

## File: ui/iconography/stroke/moon/index.tsx
```typescript
import type { SVGProps } from 'react';

const Moon = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'moon',
    'aria-hidden': ariaHidden = false,
  } = props;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path
        d="M19.2 13.4A7.5 7.5 0 1 1 10.9 4.7A5.2 5.2 0 0 0 19.2 13.4Z"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Moon;
```

## File: ui/iconography/stroke/plus/index.tsx
```typescript
import type { SVGProps } from 'react';

const Plus = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'plus',
    'aria-hidden': ariaHidden = false,
  } = props;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Plus;
```

## File: ui/iconography/stroke/sun/index.tsx
```typescript
import type { SVGProps } from 'react';

const Sun = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'sun',
    'aria-hidden': ariaHidden = false,
  } = props;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <circle cx={12} cy={12} r={5} stroke="currentColor" strokeWidth={1.125} />
      <line
        x1={12}
        y1={0.5}
        x2={12}
        y2={3.5}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={12}
        y1={20.5}
        x2={12}
        y2={23.5}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={0.5}
        y1={12}
        x2={3.5}
        y2={12}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={20.5}
        y1={12}
        x2={23.5}
        y2={12}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={4.2}
        y1={4.2}
        x2={6.3}
        y2={6.3}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={17.7}
        y1={17.7}
        x2={19.8}
        y2={19.8}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={17.7}
        y1={6.3}
        x2={19.8}
        y2={4.2}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
      <line
        x1={4.2}
        y1={19.8}
        x2={6.3}
        y2={17.7}
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Sun;
```

## File: ui/iconography/stroke/trash/index.tsx
```typescript
import type { SVGProps } from 'react';

const Trash = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'trash',
    'aria-hidden': ariaHidden = false,
  } = props;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path
        d="M3 6H21"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6V4H16V6"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L7 20H17L18 6"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10V17M14 10V17"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Trash;
```

## File: ui/iconography/stroke/index.tsx
```typescript
import Minus from './minus';
import Moon from './moon';
import Plus from './plus';
import Sun from './sun';
import Trash from './trash';

const Stroke = {
  Moon: Moon,
  Plus: Plus,
  Sun: Sun,
  Trash: Trash,
  Minus: Minus,
};

export default Stroke;
```

## File: ui/iconography/index.tsx
```typescript
import Logo from './logo';
import Stroke from './stroke';

const Iconography = {
  Logo: Logo,
  Stroke: Stroke,
};

export default Iconography;
```

## File: ui/Toast/index.tsx
```typescript
import { createPortal } from 'react-dom';

interface Props {
  message: string;
  isVisible: boolean;
}

const Toast = (props: Props) => {
  const { message, isVisible } = props;

  return createPortal(
    <div
      className={`fixed bottom-[98px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-gray-600 text-white px-[20px] py-[12px] rounded-[8px] shadow-lg max-w-[90vw] break-words text-[14px]">
        {message}
      </div>
    </div>,
    document.body,
  );
};
Toast.displayName = 'Toast';

export default Toast;
```

## File: ui/index.ts
```typescript
export { default as Iconography } from './iconography';
export { default as Toast } from './Toast';
```
