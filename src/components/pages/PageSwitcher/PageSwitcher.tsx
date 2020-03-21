import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'

import styles from './PageSwitcher.module.css'

interface Props {
  links: Array<{
    label: string
    href: string
    onClick?: () => {}
  }>
}

const PageSwitcher: React.FunctionComponent<Props> = ({ links }) => {
  const router = useRouter()

  const isPathActive = (path: string): boolean => {
    return router.pathname.indexOf(path) === 0
  }

  return (
    <div className={styles.main}>
      {links.map(link => (
        <Link href={link.href} key={link.label}>
          <a
            className={classnames(styles.link, isPathActive(link.href) ? styles.active : null)}
            onClick={link.onClick}
          >
            {link.label}
          </a>
        </Link>
      ))}
    </div>
  )
}
export default PageSwitcher
