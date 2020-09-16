import React, { ReactNode } from 'react'
import noop from 'lodash/noop'

interface ButtonProps {
  children: ReactNode,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const Button = ({ onClick = noop, children } : ButtonProps) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export default Button