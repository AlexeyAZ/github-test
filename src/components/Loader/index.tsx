import React from 'react'

import styles from './style.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderPic} />
    </div>
  )
}

export default Loader