import { useEffect, useState } from 'react';
import ctx from './index';

export default (code: string) => {
  const [state, setState] = useState(ctx.data[code]);

  useEffect(() => {
    const handler = (res: any) => {
      setState(res);
    };

    ctx.on(code, handler);
    return () => {
      ctx.off(code, handler);
    };
  }, []);

  return state;
};
