import React from 'react'
import styles from './ErrorBoundary.module.css'

interface Props {
  children: React.ReactNode
}

interface State {
  error: boolean
  message: string
}

class ErrorBoundary extends React.Component<Props, State> {
  readonly state: State = {
    error: null,
    message: '',
  }

  componentDidCatch(err, errInfo) {
    console.error(err)
    console.error(errInfo)
    this.setState({
      error: true,
      message: errInfo.componentStack.toString(),
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.main}>
          <p>Oups ! On dirait que le site a crashé.</p>
          <p>
            <a className={styles.reload} href=".">
              Cliquez ici pour recharger la page
            </a>
          </p>
          {process.env.NODE_ENV !== 'production' ? (
            <details className={styles.details}>{this.state.message}</details>
          ) : null}
        </div>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary
