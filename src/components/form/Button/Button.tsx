import React from 'react'
import Link from 'next/link'
import Loading from '../../icons/Loading/Loading'
import classnames from 'classnames'

import styles from './Button.module.css'

interface Props {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  style?: 'dark' | 'light'
  disabled?: boolean
  loading?: boolean
  href?: string
  onClick?: () => {}
}

const Button: React.FunctionComponent<Props> = ({
  children,
  type,
  href,
  style,
  disabled,
  loading,
  onClick,
}) => {
  const className = classnames(
    styles.main,
    style && styles[style],
    disabled && styles.disabled,
    loading && styles.loading,
  )
  const content = loading ? <Loading /> : children
  if (href) {
    return (
      <Link href={href}>
        <a className={className} onClick={onClick}>
          {content}
        </a>
      </Link>
    )
  }
  return (
    <button
      type={type || 'button'}
      disabled={disabled || loading}
      className={className}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
export default Button
