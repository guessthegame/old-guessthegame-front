import React from 'react'
import Link from 'next/link'
import HeaderLink from './HeaderLink/HeaderLink'
import AccountLink from './AccountLink/AccountLink'
import { useRouter } from 'next/router'

import styles from './Header.module.css'
import globalStyles from '../../styles.module.css'

interface Props {
  username?: string
}

const Header: React.FunctionComponent<Props> = ({ username }) => {
  const router = useRouter()

  const isPathActive = (path: string): boolean => {
    return router.pathname.indexOf(path) === 0
  }

  return (
    <header className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Link href="/">
            <a>Guess The Game&nbsp;!</a>
          </Link>
        </h1>
        <div className={styles.nav}>
          <nav className={styles.navLeft}>
            <HeaderLink href="/screenshot" active={isPathActive('/screenshot')}>
              Jouer
            </HeaderLink>
            <HeaderLink href="/classement" active={isPathActive('/classement')}>
              Classement
            </HeaderLink>
            <HeaderLink
              href="/ajouter-un-screenshot"
              active={isPathActive('/ajouter-un-screenshot')}
            >
              Ajouter&nbsp;
              <span className={globalStyles.hideOnSmartphones}>un screenshot</span>
            </HeaderLink>
          </nav>
          <div className={styles.navRight}>
            <AccountLink username={username} active={isPathActive('/moi')} />
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
