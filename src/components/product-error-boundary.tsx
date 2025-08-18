"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ProductErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Product loading error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="border border-red-200 bg-red-50 rounded-lg p-8 text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Unable to load products
            </h3>
            <p className="text-red-600 mb-4">
              Something went wrong while loading the products. Please try again.
            </p>
            <Button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              variant="outline"
            >
              Retry
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
