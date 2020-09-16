import React from 'react'

import Text, { TextProps } from '../Text'

const Title = ({ children, className } : TextProps) => {
  return (
    <Text fontSize="m" fontWeight="medium" className={className}>{children}</Text>
  )
}

export default Title