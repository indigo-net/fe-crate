import { createContext, useContext, useMemo, useCallback, ReactNode } from 'react';

import { TypeGuard } from '@/shared/lib';

interface RadioContextState<T> {
  value: T;
  onChange: (value: T) => void;
}

interface RadioGroupProps<T> {
  value: T;
  children: ReactNode;
  onChange: (value: T) => void;
}

interface RadioItemProps<T> {
  value: T;
  children: (props: { isActive: boolean; handleClick: () => void }) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RadioContext = createContext<RadioContextState<any> | null>(null);

const RadioGroup = <T,>(props: RadioGroupProps<T>) => {
  const { value, onChange, children } = props;
  return <RadioContext.Provider value={{ value, onChange }}>{children}</RadioContext.Provider>;
};

const RadioItem = <T,>(props: RadioItemProps<T>) => {
  const context = useContext(RadioContext);
  if (TypeGuard.checkNull(context)) {
    throw new Error('Radio components must be used within a RadioGroup');
  }

  const { value, onChange } = context as RadioContextState<T>;

  const isActive = useMemo(() => value === props.value, [value, props.value]);
  const handleClick = useCallback(() => {
    onChange(props.value);
  }, [props.value, onChange]);

  return (
    <div
      role={'radio'}
      aria-checked={isActive}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {props.children({ isActive, handleClick })}
    </div>
  );
};

const Radio = {
  Group: RadioGroup,
  Item: RadioItem,
};

export default Radio;
