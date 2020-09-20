import React from 'react'

import { ISelectProps } from './types'

const Select: React.FC<ISelectProps> = ({ id, options, className = '', onChange }) => {
  return (
    <select id={id} onChange={onChange} className={className}>
      {options.map(({ value, title }) => (
        <option value={value} key={value}>
          {title}
        </option>
      ))}
    </select>
  )
}

export default Select