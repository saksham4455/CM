import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI or just hide the component
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // For background components, just render nothing
      if (this.props.silent) {
        return null;
      }

      // Default error UI
      return (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h2 className="text-red-400 font-semibold mb-2">Something went wrong</h2>
          <p className="text-red-300 text-sm">
            {this.state.error?.message || 'An error occurred'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
