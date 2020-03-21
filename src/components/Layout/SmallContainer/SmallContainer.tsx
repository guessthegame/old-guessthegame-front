import React from 'react'

import styles from './SmallContainer.module.css'

interface Props {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

const SmallContainer: React.FunctionComponent<Props> = ({ children, title, subtitle }) => (
  <div className={styles.main}>
    {title && <h1 className={styles.title}>{title}</h1>}
    {subtitle && <h1 className={styles.subtitle}>{subtitle}</h1>}
    <div>{children}</div>
  </div>
)
export default SmallContainer
