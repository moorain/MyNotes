import { add, read } from '../database/index'

export const myIndexdbFetch = async (url: string) => {
  return new Promise(async (resolve, reject) => {
    const res: any = await read(url);
    if (res?.url) {
      resolve(res.blob);
    } else {
      const respoese = fetch(url);
      const currentResponseBlob = res.blob();
      add({ url: url, blob: currentResponseBlob });
      resolve(respoese)
    }
  });
}