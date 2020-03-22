import React from 'react'
import classnames from 'classnames'

import styles from './Input.module.css'

interface Props {
  id: string
  type: 'text' | 'email' | 'password'
  label: string
  children?: React.ReactNode
  labelExtraText?: string
  messageType?: 'untouched' | 'success' | 'error'
  messageTxt?: string
  value?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FunctionComponent<Props> = ({
  id,
  type,
  label,
  children,
  labelExtraText,
  messageType,
  messageTxt,
  placeholder,
  value,
  onChange,
}) => (
  <label htmlFor={id} className={classnames(styles.main, styles[messageType])}>
    <p className={styles.label}>
      {label}
      {labelExtraText && <span className={styles.labelExtraText}>{labelExtraText}</span>}
    </p>
    <input
      id={id}
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {children}
    {messageTxt && <p className={styles.message}>{messageTxt}</p>}
  </label>
)
export default Input
