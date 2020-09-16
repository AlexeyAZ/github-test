import React from 'react'

interface OptionAttributes {
  value: string,
  title: string,
  selected?: boolean,
}

interface SelectProps {
  options: OptionAttributes[],
  id?: string,
  className?: string,
  onChange: (e: object) => void,
}

const Select = ({ id, options, className = '', onChange } : SelectProps) => {
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