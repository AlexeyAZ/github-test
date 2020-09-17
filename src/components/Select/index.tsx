import React from 'react'

interface IOptionAttributes {
  value: string,
  title: string,
  selected?: boolean,
}

interface ISelectProps {
  options: IOptionAttributes[],
  id?: string,
  className?: string,
  onChange: (e: object) => void,
}

const Select = ({ id, options, className = '', onChange } : ISelectProps) => {
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