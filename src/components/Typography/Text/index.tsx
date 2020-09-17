import React, { ReactNode } from 'react'
import cn from 'classnames'

import styles from './style.module.scss'

export interface ITextProps {
  fontWeight?: string,
  fontSize?: string,
  children: ReactNode,
  className?: string,
  as?: keyof JSX.IntrinsicElements,
}

const Text = ({ fontWeight = 'normal', fontSize = 's', children, className = '', as = 'p' } : ITextProps) => {
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