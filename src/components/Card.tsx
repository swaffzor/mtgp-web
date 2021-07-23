import React from 'react'

interface Props {
  name: string
}

const Card = ({name}: Props) => {

  return (
    <div className="border-2 w-32 h-32">
      {name}
    </div>
  )
}

export default Card