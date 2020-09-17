import React, { ReactNode } from 'react'

import styles from './style.module.scss'

type ILayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}

export default Layout