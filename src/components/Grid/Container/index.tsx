import React, { ReactNode } from 'react'
import cn from 'classnames'

import styles from './style.module.scss'

interface ContainerProps { children: ReactNode, className?: string }

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={cn(styles.container, className)}>
      {children}
    </div>
  )
}

export default Container