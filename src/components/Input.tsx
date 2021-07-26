import React from 'react'

interface Props {
  type: string
  value?: string
  placeholder?: string
  classOverrides?: string
  onChange?: (text: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
}

const Input = ({type, value, placeholder, classOverrides, onChange, onKeyPress}: Props) => {

  return (
    <div className="relative h-10">
      <input type={type}
        value={value}
        className={classOverrides} 
        placeholder={placeholder} 
        onChange={(text) => {onChange && onChange(text)}}
        onKeyPress={(e) => onKeyPress && onKeyPress(e)}
      />
    </div>
  )
}

export default Input