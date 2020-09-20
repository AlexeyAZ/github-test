import React, { FC } from 'react'
import cn from 'classnames'

import Loader from '../Loader'

import { ILoaderContainer } from './types'

import styles from './style.module.scss'

const LoaderContainer: FC<ILoaderContainer> = ({ children, isLoading = true, className = '' }) => {
  return (
    <div className={cn(styles.loaderContainer, className)}>
      {isLoading && (
        <div className={styles.loaderWrap}>
          <div className={styles.loaderSymbolWrap}>
            <Loader />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

export default LoaderContainer