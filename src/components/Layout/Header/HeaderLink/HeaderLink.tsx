import React from 'react'
import Link from 'next/link'
import classnames from 'classnames'

import styles from './HeaderLink.module.css'

interface Props {
  active?: boolean
  href: string
  children: React.ReactNode
  onClick?: () => {}
}

const HeaderLink: React.FunctionComponent<Props> = ({ href, active, children, onClick }) => (
  <Link href={href}>
    <a onClick={onClick} className={classnames(styles.main, active ? styles.active : null)}>
      {children}
    </a>
  </Link>
)
export default HeaderLink
