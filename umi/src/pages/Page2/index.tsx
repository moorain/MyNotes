import React from 'react';
import { Button, Checkbox, Input } from 'antd';
import { history } from 'umi'
import Lazy from '@/components/Lazy'

interface IProps {
  text: string
}

export default Lazy(function (props: IProps) {
  console.log(props, 'page2')
  return (
    <div>
      这是页2
      <Input />
      <Checkbox />
      <Button onClick={() => {
        history.push('/page1')
      }}>page2</Button>
      <Button onClick={() => {
        history.push('/page3')
      }}>page3</Button>
    </div>
  )
});