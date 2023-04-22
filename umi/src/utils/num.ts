interface IMonitor {
  beforeLog: any;
}

class Monitor {
  config: any;
  constructor(config?: any) {
    this.config = config;
  }

  log(config: any) {
    if (config.beforeLog) {
      console.log('log', config.beforeLog(config));
    } else {
      console.log('log', config.msg);
    }
  }
}

class MyMonitor {
  monitor: any;
  constructor(monitor?: any) {
    this.monitor = monitor || new Monitor();
    this.monitor.beforeLog = (item: any) => {
      if (sessionStorage.getItem('monitor') === 'true') {
        return {
          ...item,
          msg: '[]' + item.msg,
        }
      } else {
        return item;
      }
    }
  }

  setContext() {
    sessionStorage.setItem('monitor', 'true');
  }

  logError(message: string, config: any) {

    this.monitor.log({
      msg: message,
      ...config,
    })
  }
}

const currentContext = new MyMonitor();

export default currentContext;