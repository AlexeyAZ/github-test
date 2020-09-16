import React from 'react'
import noop from 'lodash/noop'

import Input from '../Input'
import Select from '../Select'
import { Container } from '../Grid'

import styles from './style.module.scss'

interface HeaderProps {
  licenses?: {
    value: string,
    title: string
  }[],
  onSearchInputChange: (e: object) => void,
  onLicenseChange?: (e: object) => void,
}

const Header = ({ licenses = [], onSearchInputChange, onLicenseChange = noop } : HeaderProps) => {
  return (
    <div className={styles.header}>
      <Container className={styles.container}>
        <span>
          <label htmlFor="licenseSelect">License: </label>
          <Select id="licenseSelect" options={licenses} onChange={onLicenseChange} />
        </span>
        <span>
          <Input placeholder="Search" onChange={onSearchInputChange} />
        </span>
      </Container>
    </div>
  )
}

export default Header