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
    console.error('Application Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-6 bg-slate-700 rounded-lg">
          <h2 className="text-xl text-red-400 mb-4">Algo salió mal</h2>
          <p className="text-slate-300 mb-4">
            Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;