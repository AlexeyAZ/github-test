import React from 'react'

import Text from '../Text'

import { ITextProps } from '../types'

const Title: React.FC<ITextProps> = ({ children, className }) => {
  return (
    <Text fontSize="m" fontWeight="medium" className={className}>{children}</Text>
  )
}

export default Title