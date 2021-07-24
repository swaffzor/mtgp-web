import React, { MouseEventHandler } from 'react'
import { CardDTO } from '../types'

interface props {
  cardProps: Partial<CardDTO>
  onClick?: () => void
}

const Card = ({cardProps, onClick}: props) => {
  const hasImage = !!cardProps.imageUrl
  return (
    <div 
      className={`m-1 w-32 ${!hasImage && "border-2 rounded-lg h-46"}`}
      onClick={() => onClick && onClick()}
    >
      {hasImage
            ? 
            <img 
              src={cardProps?.imageUrl}
              alt="card art"
            />
        : cardProps?.name}
    </div>
  )
}

export default Card