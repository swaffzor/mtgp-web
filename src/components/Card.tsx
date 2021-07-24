import React from 'react'
import { CardDTO } from '../types'

interface props {
  cardProps: Partial<CardDTO>
  onClick?: () => void
}

const Card = ({cardProps, onClick}: props) => {
  const hasImage = !!cardProps.imageUrl
  return (
    <div 
      className={
        [
          `m-1 w-32 ${!hasImage && "border-2 rounded-lg h-46"}`,
          onClick && "cursor-pointer"
        ].join(' ')
      }
      onClick={() => onClick && onClick()}
    >
      {hasImage
            ? 
            <img 
              src={cardProps?.imageUrl}
              alt="card art"
              className={cardProps?.isSaved ? "" : "border-2 border-red-400 rounded-lg border-dashed"}
            />
        : cardProps?.name}
    </div>
  )
}

export default Card