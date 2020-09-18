import React, { useCallback, useState } from 'react'
import noop from 'lodash/noop'

import { InputProps } from './types'

const Input: React.FC<InputProps> = ({ onChange = noop, onKeyPress = noop, className = '', placeholder = '' }) => {
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