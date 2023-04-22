class Monitor {
  private monitor: MyMonitor;

  constructor() {
    this.monitor = new MyMonitor();
  }

  public setMonitor(monitor: MyMonitor): void {
    this.monitor = monitor;
  }

  public log(message: string): void {
    this.monitor.log(message);
  }

  public init(): void {
    const handleError = (event: ErrorEvent | Event) => {
      let error = null;

      if (event instanceof ErrorEvent) {
        error = event.error;
      } else if ('error' in event) {
        error = event.error;
      }

      if (error) {
        const { message, filename: url, lineno: line, colno: column } = error;
        this.log(`[JS ERROR]: ${message} (${url}: ${line}:${column})`);
      } else if ('srcElement' in event && event.srcElement instanceof HTMLImageElement) {
        const { src: url } = event.srcElement;
        this.log(`[IMAGE LOAD ERROR]: ${url}`);
      } else if ('target' in event && event.target instanceof HTMLLinkElement) {
        const { href: url } = event.target;
        this.log(`[CSS LOAD ERROR]: ${url}`);
      } else if ('message' in event && 'filename' in event && 'lineno' in event && 'colno' in event) {
        const { message, filename: url, lineno: line, colno: column } = event as ErrorEvent;
        this.log(`[JS ERROR]: ${message} (${url}: ${line}:${column})`);
      } else {
        this.log(`[UNKNOWN ERROR]: ${JSON.stringify(event)}`);
      }
    };

    if ('addEventListener' in window) {
      window.addEventListener('error', handleError);
    } else {
      window.onerror = (message, url, line, column, error) => {
        handleError({
          message,
          error,
          filename: url,
          lineno: line,
          colno: column,
        });
      };
    }

    window.addEventListener('unhandledrejection', (event) => {
      const { reason } = event;
      this.log(`[PROMISE REJECTION]: ${reason}`);
    });
  }
}

export default new Monitor();