import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md" role="alert">
                <h2 className="text-2xl font-bold mb-4">おっと、問題が発生したようです。</h2>
                <p className="mb-4">
                    アプリケーションの一部で予期せぬエラーが発生しました。
                    ご不便をおかけして申し訳ありません。
                </p>
                <p className="mb-6">
                    下のボタンをクリックして、ページを再読み込みすることで解決する場合があります。
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 text-white font-bold py-2 px-6 rounded-full hover:bg-red-700 transition-colors"
                >
                    再読み込みしてやり直す
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}