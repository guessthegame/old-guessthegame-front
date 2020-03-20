import React from 'react'

import styles from './Footer.module.css'
import globalStyles from '../../styles.module.css'

const Footer: React.FunctionComponent = () => (
  <footer className={styles.main}>
    <div className={styles.content}>
      <p>Guess The Game&nbsp;!</p>
      <p>
        Un problème<span className={globalStyles.hideOnSmartphones}>, une suggestion</span> ?
        Email&nbsp;: <span className={styles.link}>dev@guess-the-game.com</span> ·{' '}
        <a
          className={styles.link}
          href="https://discord.gg/jW25Q67"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discord
        </a>
      </p>
    </div>
  </footer>
)
export default Footer
