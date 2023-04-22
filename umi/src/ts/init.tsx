import React, { ChangeEvent, useEffect, useRef, ReactNode } from 'react';

interface WithControlledInputProps<T> {
  value?: T;
  onChange?: (value: T) => void;
  children: ReactNode;
  init?: (value: T) => void;
}

const WithControlledInput = <T extends any>(props: WithControlledInputProps<T>) => {
  const { value, onChange, children } = props;
  const initializedRef = useRef(false);

  useEffect(() => {
    if (value && !initializedRef.current) {
      props?.init?.(value);
      initializedRef.current = true;
    }
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value as T);
    initializedRef.current = true;
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { value, onChange: handleChange });
        }
        return child;
      })}
    </>
  ) as React.ReactElement<WithControlledInputProps<T>>;
};

export default WithControlledInput;