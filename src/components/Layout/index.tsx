import React, { ReactNode } from 'react'

import styles from './style.module.scss'

type LayoutProps = { children: ReactNode }

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}

export default Layout