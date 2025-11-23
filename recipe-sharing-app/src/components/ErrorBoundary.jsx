import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    // optionally log to an external service here
    // console.error(error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
          {this.state.info && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.info.componentStack}
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
