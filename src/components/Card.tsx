import React from 'react'
import { CardDTO } from '../types'

const Card = (props: Partial<CardDTO>) => {
  const hasImage = !!props.imageUrl
  return (
    <div className={`m-1 w-32 ${!hasImage && "border-2 rounded-lg h-46"}`}>
      {hasImage ? <img src={props?.imageUrl} alt="card art" /> : props?.name}
    </div>
  )
}

export default Card