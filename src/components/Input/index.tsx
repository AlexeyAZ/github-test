import React, { useCallback, useRef } from 'react'
import noop from 'lodash/noop'
import get from 'lodash/get'

import { InputProps } from './types'

const Input: React.FC<InputProps> = ({ onChange = noop, onKeyPress = noop, className = '', placeholder = '' }) => {
  const inputEl = useRef(null)
  const handleInputChange = useCallback(() => {
    const value = get(inputEl, 'current.value')
    onChange(value)
  }, [onChange])
  return (
    <input ref={inputEl} onChange={handleInputChange} onKeyPress={onKeyPress} className={className} placeholder={placeholder} />
  )
}

export default Input