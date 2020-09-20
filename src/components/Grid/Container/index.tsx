import React from 'react'
import cn from 'classnames'

import { IContainerProps } from './types'

import styles from './style.module.scss'

const Container: React.FC<IContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={cn(styles.container, className)}>
      {children}
    </div>
  )
}

export default Container