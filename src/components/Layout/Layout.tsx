import React from 'react'
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import Header from './Header/Header'
import Footer from './Footer/Footer'

import styles from './Layout.module.css'

interface Props {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => (
  <section className={styles.main}>
    <ErrorBoundary>
      <Header />
      {children}
      <Footer />
    </ErrorBoundary>
  </section>
)
export default Layout
