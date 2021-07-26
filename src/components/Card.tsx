import React from 'react'
import { CardDTO } from '../types'

interface props {
  cardProps: Partial<CardDTO>
  onClick?: () => void
}
const style = {
  height: "h-44",
  width: "w-30",
  vitalWidth: "w-12"
}

const Card = ({cardProps, onClick}: props) => {
  const hasImage = !!cardProps.imageUrl
  return (
    <div 
      className={
        [
          `relative`,
          `m-1 w-32`,
          onClick && "cursor-pointer"
        ].join(' ')
      }
      onClick={() => onClick && onClick()}
    >
      <div className={`my-6`}>
        {
          hasImage
          ? 
          <img 
            src={cardProps?.imageUrl}
            alt="card art"
            className={`${cardProps?.isSaved ? "" : "border-2 border-red-400 rounded-lg border-dashed"}`}
          />
          : 
          <div className={`relative ${style.height} ${cardProps?.isSaved ? !hasImage && "border-2 rounded-lg" : "border-2 border-red-400 rounded-lg border-dashed"}`}>
            <div className={`absolute bottom-0 right-1`}>
              {cardProps?.power && `${cardProps?.power}/${cardProps?.toughness}`}
            </div>
          </div> 
        }
        <div className={`text-xs`}>
          {cardProps?.name} {cardProps.quantity && `(${cardProps.quantity})`}
        </div>
      </div>
    </div>
  )
}

export default Card