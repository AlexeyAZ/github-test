import React from 'react'
import noop from 'lodash/noop'

import Input from '../Input'
import Select from '../Select'
import { Container } from '../Grid'

import { IHeaderProps } from './types'

import styles from './style.module.scss'

const Header: React.FC<IHeaderProps> = ({ licenses = [], onSearchInputChange, onLicenseChange = noop }) => {
  return (
    <div className={styles.header}>
      <Container className={styles.container}>
        <span>
          <label htmlFor="licenseSelect">License: </label>
          <Select className={styles.select} id="licenseSelect" options={licenses} onChange={onLicenseChange} />
        </span>
        <span>
          <Input placeholder="Search" onChange={onSearchInputChange} />
        </span>
      </Container>
    </div>
  )
}

export default Header