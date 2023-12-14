// 类型声明
type Action = 'SET_TREE';
type EventListener = Record<string | symbol, Function[]>;

export default class Context {
  public data: any;
  private events: EventListener;

  constructor() {
    this.events = {};
    this.setupProxy();
  }

  private setupProxy() {
    const that = this;
    const handler: ProxyHandler<any> = {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        that.triggerChange(prop, value);
        return true;
      },
      deleteProperty(target, prop) {
        delete target[prop];
        return true;
      },
    };
    this.data = new Proxy(
      {
        tree: [],
      },
      handler,
    );
  }

  private triggerChange(prop: string | symbol, value: any) {
    if (this.events[prop]) {
      this.events[prop].forEach((callback) => {
        callback(value);
      });
    }
  }

  do(action: { type: Action; params: any }) {
    switch (action.type) {
      case 'SET_TREE':
        console.log('action:', 'SET_TREE');
        break;
      default:
        break;
    }
  }

  on(code: string, callback: Function) {
    if (!this.events[code]) {
      this.events[code] = [callback];
    } else {
      this.events[code].push(callback);
    }
  }

  off(code: string, callback: Function) {
    const listeners = this.events[code];
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
}
