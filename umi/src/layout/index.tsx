import React from 'react';

interface IProps {
  text: string
}

export default function ({ children }: IProps) {
  return (
    <div>{children}
    </div>
  )
};