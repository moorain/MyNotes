import React from 'react';
import { Button, Checkbox, Input } from 'antd';
import { history } from 'umi'

interface IProps {
  text: string
}
export default function (props: IProps) {
  return (
    <div>
      这是页3
      <Input />
      <Checkbox />
      <Button onClick={() => {
        history.push('/page1')
      }}>page1</Button>
      <Button onClick={() => {
        history.push('/page2')
      }}>page2</Button>
    </div>
  )
};