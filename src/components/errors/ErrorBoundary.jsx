import React from "react";
import {ErrorBoundaryComponent} from "./ErrorBoundaryComponent.jsx";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught!");
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryComponent error={this.state.error?.message || ""} />;
    } else {
      return this.props.children;
    }
  }
}