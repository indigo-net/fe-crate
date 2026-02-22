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
  AlertContext/
    index.tsx
  ModalContext/
    index.tsx
  ToastContext/
    index.tsx
  index.ts
lib/
  axios-manager/
    index.ts
  developer-console/
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
  Alert/
    hook.ts
    index.tsx
  iconography/
    logo/
      kakao-talk/
        index.tsx
      index.tsx
    stroke/
      angry/
        index.tsx
      balance/
        index.tsx
      Cancel/
        index.tsx
      dizzy/
        index.tsx
      Document/
        index.tsx
      flash/
        index.tsx
      graduation/
        index.tsx
      minus/
        index.tsx
      monitor/
        index.tsx
      moon/
        index.tsx
      plus/
        index.tsx
      rocket/
        index.tsx
      sad/
        index.tsx
      sparkles/
        index.tsx
      sun/
        index.tsx
      trash/
        index.tsx
      users/
        index.tsx
      index.tsx
    index.tsx
  Modal/
    hook.ts
    index.tsx
  Toast/
    index.tsx
  index.ts
```

# Files

## File: context/AlertContext/index.tsx
```typescript
import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { TypeGuard } from '@/shared/lib';
import { Alert } from '@/shared/ui';

import type { ComponentProps, ReactNode } from 'react';



type AlertProps = ComponentProps<typeof Alert>;

interface State {
  showAlert(alertProps: AlertProps): string;
  hideAlert(id?: string): void;
}

const AlertContext = createContext<State | null>(null);

interface Props {
  children: ReactNode;
}

const AlertProvider = (props: Props) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const showAlert = useCallback((alertProps: AlertProps) => {
    setAlerts(prev => [...prev, alertProps]);
    return alertProps.id;
  }, []);

  const hideAlert = useCallback((id?: string) => {
    setAlerts(prev => {
      if (TypeGuard.checkUndefined(id)) {
        const next = [...prev];
        next.pop();
        return next;
      } else {
        return prev.filter(alert => alert.id !== id);
      }
    });
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {props.children}
      {alerts.map(alert => {
        return createPortal(<Alert key={alert.id} {...alert} />, document.body);
      })}
    </AlertContext.Provider>
  );
};

const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (TypeGuard.checkNull(context)) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};

export { AlertProvider, useAlertContext };
```

## File: context/ModalContext/index.tsx
```typescript
import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

import { TypeGuard } from '@/shared/lib';
import { Modal } from '@/shared/ui';

import type { ComponentPropsWithRef, ReactNode } from 'react';

type ModalProps = ComponentPropsWithRef<typeof Modal>;

interface State {
  openModal: (modalProps: ModalProps) => string;
  closeModal: (id?: string) => void;
}

const ModalContext = createContext<State | null>(null);

interface Props {
  children: ReactNode;
}

const ModalProvider = (props: Props) => {
  const [modals, setModals] = useState<ModalProps[]>([]);

  const openModal = useCallback((modalProps: ModalProps) => {
    setModals(prev => [...prev, { ...modalProps }]);
    return modalProps.id;
  }, []);

  const closeModal = useCallback((id?: string) => {
    setModals(prev => {
      if (TypeGuard.checkUndefined(id)) {
        const next = [...prev];
        next.pop();
        return next;
      } else {
        return prev.filter(modal => modal.id !== id);
      }
    });
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {props.children}
      {modals.map(modal => {
        return createPortal(<Modal key={modal.id} {...modal} />, document.body);
      })}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (TypeGuard.checkNull(context)) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export { useModalContext, ModalProvider };
```

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
export { AlertProvider, useAlertContext } from './AlertContext';
export { ToastProvider, useToastContext } from './ToastContext';
export { ModalProvider, useModalContext } from './ModalContext';
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

## File: lib/developer-console/index.ts
```typescript
type PrintType = 'log' | 'warn' | 'error';

interface ILog<T> {
  message: string;
  data?: T;
  location?: string;
}

class DeveloperConsole {
  private static print<T>(type: PrintType, log: ILog<T>) {
    if (import.meta.env.DEV) {
      console[type]({
        message: log.message,
        location: log.location ?? '-',
        data: log.data ?? '-',
      });
    }
  }

  static log<T>(log: ILog<T>) {
    this.print('log', log);
  }
  static warn<T>(log: ILog<T>) {
    this.print('warn', log);
  }
  static error<T>(log: ILog<T>) {
    this.print('error', log);
  }
}

export default DeveloperConsole;
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

## File: ui/Alert/hook.ts
```typescript
import { BaseSyntheticEvent, useCallback } from 'react';

import DeveloperConsole from '@/shared/lib/developer-console';

import { useAlertContext } from '@/shared/context';

interface Props {
  id: string;
  confirmCallback?: () => void;
}

const useAlertController = (props: Props) => {
  const { id, confirmCallback } = props;
  const { hideAlert } = useAlertContext();

  const handleClose = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      hideAlert(id);
    },
    [hideAlert, id],
  );

  const handleConfirm = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      try {
        confirmCallback?.();
      } catch (error) {
        DeveloperConsole.error({
          message: 'Alert confirm callback error',
          data: error,
          location: '@/shared/ui/Alert/hook.ts',
        });
      } finally {
        setTimeout(() => {
          hideAlert(id);
        });
      }
    },
    [confirmCallback, hideAlert, id],
  );

  return { handleClose, handleConfirm };
};

export default useAlertController;
```

## File: ui/Alert/index.tsx
```typescript
import useAlertController from './hook';

import type { ReactNode } from 'react';

interface Props {
  id: string;
  title?: string;
  content: ReactNode;
  confirmLabel?: string;
  confirmCallback?: () => void;
}

const Alert = (props: Props) => {
  const { id, title, content, confirmLabel = '확인', confirmCallback } = props;
  const { handleClose, handleConfirm } = useAlertController({ id, confirmCallback });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all duration-300"
      onClick={handleClose}
      aria-modal="true"
      role="alertdialog"
    >
      <div className="bg-white rounded-[16px] shadow-2xl flex flex-col overflow-hidden animate-dialog-in w-[320px] max-w-[90%]">
        {title && (
          <div className="px-[20px] py-[8px] border-b border-gray-100">
            <h2 className="text-[17px] font-bold text-gray-900 line-clamp-1">{title}</h2>
          </div>
        )}

        <div className="px-[20px] py-[24px] text-gray-700 text-[15px] text-center">{content}</div>

        <div className="px-[20px] py-[12px] flex justify-center bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-[10px] rounded-[8px] text-[14px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-500/20"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

Alert.displayName = 'Alert';

export default Alert;
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

## File: ui/iconography/stroke/angry/index.tsx
```typescript
import type { SVGProps } from 'react';

const Angry = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'angry',
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <path d="M7.5 8 9 9" />
      <path d="m15 9 1.5-1" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
    </svg>
  );
};

export default Angry;
```

## File: ui/iconography/stroke/balance/index.tsx
```typescript
import type { SVGProps } from 'react';

const Balance = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'balance',
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

      <path d="M12 3V21" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M8 21H16" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M3 6H21" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />

      <path d="M6 6L2.5 12" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M6 6L9.5 12" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M18 6L14.5 12" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M18 6L21.5 12" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />

      <path d="M3.5 12H8.5" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
      <path d="M15.5 12H20.5" stroke="currentColor" strokeWidth={1.125} strokeLinecap="round" />
    </svg>
  );
};

export default Balance;
```

## File: ui/iconography/stroke/Cancel/index.tsx
```typescript
import type { SVGProps } from 'react';

const Cancel = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'cancel',
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
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Cancel;
```

## File: ui/iconography/stroke/dizzy/index.tsx
```typescript
import type { SVGProps } from 'react';

const Dizzy = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'dizzy',
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <circle cx="12" cy="12" r="10" />
      <path d="M8 9h.01" />
      <path d="M16 9h.01" />
      <path d="M10 15c.5-1 1-1.5 2-1.5s1.5.5 2 1.5" />
      <path d="M8 9.01V9" />
      <path d="M16 9.01V9" />
      <path d="M12 12c-2 0-3.5 1-4 2.5" />
      <path d="M12 12c2 0 3.5 1 4 2.5" />
    </svg>
  );
};

export default Dizzy;
```

## File: ui/iconography/stroke/Document/index.tsx
```typescript
import type { SVGProps } from 'react';

const Document = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'document',
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
        d="M7 3.75H14L18.25 8V20.25H7V3.75Z"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinejoin="round"
      />
      <path d="M14 3.75V8H18.25" stroke="currentColor" strokeWidth={1.125} strokeLinejoin="round" />
      <path
        d="M9.5 12H15.5M9.5 15.5H15.5"
        stroke="currentColor"
        strokeWidth={1.125}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Document;
```

## File: ui/iconography/stroke/flash/index.tsx
```typescript
import type { SVGProps } from 'react';

const Flash = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'flash',
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2 Z" />
    </svg>
  );
};

export default Flash;
```

## File: ui/iconography/stroke/graduation/index.tsx
```typescript
import type { SVGProps } from 'react';

const Graduation = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'graduation',
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
};

export default Graduation;
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

## File: ui/iconography/stroke/monitor/index.tsx
```typescript
import type { SVGProps } from 'react';

const Monitor = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'monitor',
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
};

export default Monitor;
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

## File: ui/iconography/stroke/rocket/index.tsx
```typescript
import type { SVGProps } from 'react';

const Rocket = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'rocket',
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
      stroke="currentColor"
      strokeWidth={1.125}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <g transform="rotate(45 12 12)">
        <path
          d="M12 2C15.5 4 18 7.5 18 11.5V14.5C18 16 16.5 17.5 15 17.5H9C7.5 17.5 6 16 6 14.5V11.5C6 7.5 8.5 4 12 2Z"
          stroke="currentColor"
          strokeWidth={1.125}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="12" cy="9" r="1.75" stroke="currentColor" strokeWidth={1.125} />

        <path
          d="M6 12L3.5 15V11L6 10"
          stroke="currentColor"
          strokeWidth={1.125}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 12L20.5 15V11L18 10"
          stroke="currentColor"
          strokeWidth={1.125}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M12 17.5
             C11.5 18.2 10.8 19.2 10.6 20.3
             C10.4 21.3 11.1 22.1 12 22.6
             C12.9 22.1 13.6 21.3 13.4 20.3
             C13.2 19.2 12.5 18.2 12 17.5Z"
          stroke="currentColor"
          strokeWidth={1.125}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
};

export default Rocket;
```

## File: ui/iconography/stroke/sad/index.tsx
```typescript
import type { SVGProps } from 'react';

const Sad = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'sad',
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
};

export default Sad;
```

## File: ui/iconography/stroke/sparkles/index.tsx
```typescript
import type { SVGProps } from 'react';

const Sparkles = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'sparkles',
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path d="m12 3 1.912 5.886L20 10.8l-5.888 1.914L12 18.6l-1.912-5.886L4.2 10.8l5.888-1.914z" />
      <path d="m19 19 1.5-1.5L22 19l-1.5 1.5z" />
      <path d="m5 5 1.5-1.5L8 5 6.5 6.5z" />
    </svg>
  );
};

export default Sparkles;
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

## File: ui/iconography/stroke/users/index.tsx
```typescript
import type { SVGProps } from 'react';

const Users = (props: SVGProps<SVGSVGElement>) => {
  const {
    width = 24,
    height = 24,
    'aria-label': ariaLabel = 'users',
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
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {!ariaHidden && <title>{ariaLabel}</title>}
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};

export default Users;
```

## File: ui/iconography/stroke/index.tsx
```typescript
import Angry from './angry';
import Balance from './balance';
import Cancel from './Cancel';
import Dizzy from './dizzy';
import Document from './Document';
import Flash from './flash';
import Graduation from './graduation';
import Minus from './minus';
import Monitor from './monitor';
import Moon from './moon';
import Plus from './plus';
import Rocket from './rocket';
import Sad from './sad';
import Sparkles from './sparkles';
import Sun from './sun';
import Target from './target';
import Trash from './trash';
import Users from './users';

const Stroke = {
  Angry,
  Balance,
  Cancel,
  Dizzy,
  Document,
  Flash,
  Graduation,
  Minus,
  Monitor,
  Moon,
  Plus,
  Rocket,
  Sad,
  Sparkles,
  Sun,
  Target,
  Trash,
  Users,
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

## File: ui/Modal/hook.ts
```typescript
import { BaseSyntheticEvent, useCallback } from 'react';

import DeveloperConsole from '@/shared/lib/developer-console';

import { useModalContext } from '@/shared/context';

interface Props {
  id: string;
  confirmCallback?(): void;
  cancelCallback?(): void;
}

const useModalController = (props: Props) => {
  const { id, confirmCallback, cancelCallback } = props;
  const { closeModal } = useModalContext();

  const handleClose = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      closeModal(id);
    },
    [id, closeModal],
  );

  const handleConfirm = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      try {
        confirmCallback?.();
      } catch (error) {
        DeveloperConsole.error({
          message: 'Modal confirm callback error',
          data: error,
          location: '@/shared/ui/Modal/hook.ts',
        });
      } finally {
        setTimeout(() => {
          closeModal(id);
        });
      }
    },
    [id, closeModal, confirmCallback],
  );

  const handleCancel = useCallback(
    (e: BaseSyntheticEvent) => {
      e.stopPropagation();
      try {
        cancelCallback?.();
      } catch (error) {
        DeveloperConsole.error({
          message: 'Modal cancel callback error',
          data: error,
          location: '@/shared/ui/Modal/hook.ts',
        });
      } finally {
        setTimeout(() => {
          closeModal(id);
        });
      }
    },
    [id, closeModal, cancelCallback],
  );

  return {
    handleClose,
    handleConfirm,
    handleCancel,
  };
};

export default useModalController;
```

## File: ui/Modal/index.tsx
```typescript
import { Iconography } from '@/shared/ui';

import useModalController from './hook';

import type { ReactNode } from 'react';

interface Props {
  id: string;
  title?: string;
  content: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmCallback?: () => void;
  cancelCallback?: () => void;
}

const Modal = (props: Props) => {
  const {
    id,
    title,
    content,
    confirmLabel = '확인',
    cancelLabel = '취소',
    confirmCallback,
    cancelCallback,
  } = props;
  const { handleClose, handleConfirm, handleCancel } = useModalController({
    id,
    confirmCallback,
    cancelCallback,
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all duration-300"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-[20px] shadow-2xl flex flex-col overflow-hidden animate-dialog-in w-[80%] h-[80%] max-w-[1200px] max-h-[90vh]">
        <div className="px-[24px] py-[8px] border-b border-gray-100 flex items-center justify-between">
          {title && <h2 className="text-[20px] font-bold text-gray-900">{title}</h2>}
          <button
            type="button"
            onClick={handleClose}
            className="p-2 -mr-2 ml-auto text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="닫기"
          >
            <Iconography.Stroke.Cancel />
          </button>
        </div>

        <div className="flex-1 px-[24px] py-[24px] overflow-y-auto text-gray-700 text-[16px]">
          {content}
        </div>

        <div className="px-[24px] py-[16px] flex justify-end gap-[12px] bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={handleCancel}
            className="px-[20px] py-[12px] rounded-[10px] text-[15px] font-medium text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-[24px] py-[12px] rounded-[10px] text-[15px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
Modal.displayName = 'Modal';

export default Modal;
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
export { default as Modal } from './Modal';
export { default as Alert } from './Alert';
```
