import { initDatabase } from './database/index';

export const render = (oldRender: any) => {
  try {
    initDatabase(() => {
      oldRender();
    });
  } catch (err) {
    oldRender();
  }
}