import React from 'react'

import { IButtonProps } from './types'

const Button: React.FC<IButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export default Button