import React from 'react'

interface Props {
  type: string
  checked?: boolean
  value?: string
  placeholder?: string
  classOverrides?: string
  inputRef?: React.RefObject<HTMLInputElement>
  onChange?: (text: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Input = ({type, checked, value, placeholder, classOverrides, inputRef, onChange, onKeyPress, onBlur, onFocus}: Props) => {

  return (
    <div className="relative h-10">
      <input type={type}
        value={value}
        checked={checked}
        className={classOverrides} 
        placeholder={placeholder} 
        onChange={(text) => onChange && onChange(text)}
        onKeyPress={(e) => onKeyPress && onKeyPress(e)}
        onFocus={(e) => onFocus && onFocus(e)}
        onBlur={(e) => onBlur && onBlur(e)}
        ref={inputRef}
      />
    </div>
  )
}

export default Input