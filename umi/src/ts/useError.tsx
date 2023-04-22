import { useEffect } from "react";

const useErrorMonitor = (monitor: MyMonitor) => {
  useEffect(() => {
    const originalError = console.error;
    console.error = function (error: Error) {
      monitor.log(error.stack);
      originalError.apply(console, arguments);
    };

    return () => {
      console.error = originalError;
    };
  }, [monitor]);

  class ErrorBoundary extends React.Component {
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      monitor.log(error.stack);
    }

    render() {
      return this.props.children;
    }
  }

  return ErrorBoundary;
};

export default useErrorMonitor;