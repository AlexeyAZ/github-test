import React from 'react'

import styles from './style.module.scss'

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}

export default Layout