import React from 'react'

import Text, { ITextProps } from '../Text'

const Title = ({ children, className } : ITextProps) => {
  return (
    <Text fontSize="m" fontWeight="medium" className={className}>{children}</Text>
  )
}

export default Title