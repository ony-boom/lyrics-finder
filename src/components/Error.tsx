import React, { Component, ErrorInfo, ReactNode } from "react";

interface State {
  hasError: boolean;
}

interface Prop {
  children: JSX.Element;
  errMessage: string;
}
export class ErrorBoundary extends Component<Prop, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("uncaught error", error, errorInfo);
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return <p className="error">{this.props.errMessage}</p>;
    }

    return this.props.children;
  }
}

const Error: React.FC = () => {
  return <p className="error">Something went wrong 😵, sorry 😭, you can try again</p>;
};

export default Error;
