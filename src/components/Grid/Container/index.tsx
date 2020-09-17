import React, { ReactNode } from 'react'
import cn from 'classnames'

import styles from './style.module.scss'

interface IContainerProps {
  children: ReactNode,
  className?: string
}

const Container = ({ children, className = '' }: IContainerProps) => {
  return (
    <div className={cn(styles.container, className)}>
      {children}
    </div>
  )
}

export default Container