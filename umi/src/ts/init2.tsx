import React, { useEffect, useRef, ReactNode } from 'react';

interface WithControlledValueProps<T> {
  value?: T;
  onChange?: (value: T) => void;
  in?: (value: any) => T;
  out?: (value: T) => any;
  children: ReactNode;
  init?: (value: any) => void;
}

const WithControlledValue = <T extends any>({
  value,
  onChange,
  in: valueIn = (v: any) => v as T,
  out: valueOut = (v: T) => v,
  children,
  init,
}: WithControlledValueProps<T>) => {
  const initializedRef = useRef(false);

  useEffect(() => {
    if (value !== undefined && !initializedRef.current) {
      init?.(value);
      initializedRef.current = true;
    }
  }, [value]);

  const handleChange = (newValue: T) => {
    onChange?.(newValue);
    initializedRef.current = true;
  };

  const valueInternal = value !== undefined ? valueIn(value) : undefined;

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value: valueInternal, onChange: handleChange });
        }
        return child;
      })}
    </>
  );
};

export default WithControlledValue;