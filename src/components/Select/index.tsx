import React from 'react'

interface OptionAttributes {
  value: string,
  title: string,
  selected?: boolean,
}

interface SelectProps {
  options: OptionAttributes[],
  id?: string,
  onChange: (e: object) => void,
}

const Select = ({ id, options, onChange } : SelectProps) => {
  return (
    <select id={id} onChange={onChange}>
      {options.map(({ value, title }) => (
        <option value={value} key={value}>
          {title}
        </option>
      ))}
    </select>
  )
}

export default Select