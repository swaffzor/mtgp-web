import React from 'react'

interface Props {
  df: string
}

const Card = ({df}: Props) => {

  return (
    <div>
      {df}
    </div>
  )
}

export default Card