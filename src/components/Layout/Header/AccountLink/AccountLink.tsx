import React from 'react'
import Link from 'next/link'
import classnames from 'classnames'

import styles from './AccountLink.module.css'
import globalStyles from '../../../styles.module.css'
import HeaderLink from '../HeaderLink/HeaderLink'

interface Props {
  active?: boolean
  username?: string
}

const AccountLink: React.FunctionComponent<Props> = ({ active, username }) => {
  if (!username) {
    return (
      <Link href="/inscription">
        <a className={classnames(styles.main, active ? styles.active : null)}>
          <span className={globalStyles.hideOnTablets}>Mon compte</span>
          <span className={globalStyles.onlyOnTablets}>Compte</span>
        </a>
      </Link>
    )
  }
  return (
    <HeaderLink href="/moi/mon-compte" active={active}>
      <span className={globalStyles.hideOnSmartphones}>{username}</span>
      <svg
        className={classnames(styles.menuIcon, active ? styles.active : null)}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 17h-12v-2h12v2zm0-4h-12v-2h12v2zm0-4h-12v-2h12v2z" />
      </svg>
    </HeaderLink>
  )
}
export default AccountLink
