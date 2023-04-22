import { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { history } from 'umi';
import { myIndexdbFetch } from '../myfetch'
import {
  loadMicroApp,
  MicroApp as MicroAppType,
} from "qiankun";

function unmountMicroApp(microApp?: MicroAppType) {
  if (microApp) {
    microApp.mountPromise.then(() => microApp.unmount());
  }
}

export default function IndexPage() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<any>();
  const microAppRef = useRef<MicroAppType>();

  useEffect(() => {
    microAppRef.current = loadMicroApp(
      {
        name: 'app1',
        entry: '//localhost:8000',
        container: containerRef.current as any,
      },
      {
        fetch: myIndexdbFetch as any,
      }
    );
    (["loadPromise", "bootstrapPromise", "mountPromise"] as const).forEach(
      (key) => {
        const promise = microAppRef.current?.[key];
        promise?.then(() => {
          setLoading(false);
        }).catch((e) => {
          setLoading(false);
        });
      }
    );
    return () => unmountMicroApp(microAppRef.current);
  }, [])

  return (
    <div>
      下面是子应用
      <div onClick={
        () => {
          history.push('../')
        }}>回到首页</div>
      <div style={{ padding: 20, position: 'relative', border: '1px solid red' }}>
        <div style={{ visibility: loading ? 'visible' : 'hidden', position: 'absolute', width: '100%', textAlign: 'center' }}> <Spin /></div>
        <div style={{ visibility: loading ? 'hidden' : 'visible' }} ref={containerRef} />
      </div>
    </div>
  );
}
