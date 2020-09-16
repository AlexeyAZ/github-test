import React, { useCallback, useState } from 'react'
import noop from 'lodash/noop'

interface InputProps {
  className?: string,
  placeholder?: string,
  onChange?: (event: object) => void,
  onKeyPress?: (event: object) => void
}

const Input = ({ onChange = noop, onKeyPress = noop, className = '', placeholder = '' } : InputProps) => {
  const [value, setValue] = useState('')
  const handleInputChange = useCallback((e) => {
    setValue(e.target.value)
    onChange(e.target.value)
  }, [onChange])
  return (
    <input onChange={handleInputChange} onKeyPress={onKeyPress} value={value} className={className} placeholder={placeholder} />
  )
}

export default Input