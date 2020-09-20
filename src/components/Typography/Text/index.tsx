import React from 'react'
import cn from 'classnames'

import { ITextProps } from '../types'

import styles from './style.module.scss'

const Text: React.FC<ITextProps> = ({ fontWeight = 'normal', fontSize = 's', children, className = '', as = 'p' }) => {
  const textFontWeight = styles[`font-weight-${fontWeight}`]
  const textFontSize = styles[`font-size-${fontSize}`]
  const Tag = as
  return (
    <Tag className={cn(textFontWeight, textFontSize, className)}>
      {children}
    </Tag>
  )
}

export default Text