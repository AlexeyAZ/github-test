import React from 'react'

interface IButtonProps {
  children: React.ReactNode,
  onClick: (e: React.MouseEvent<HTMLButtonElement>)  => void,
}

const Button = ({ onClick, children } : IButtonProps) => {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

export default Button