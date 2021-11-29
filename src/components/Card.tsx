import React, { useEffect, useState } from 'react'
import { CardDTO } from '../types'

interface props {
  cardProps: Partial<CardDTO>
  showProbability?: boolean
  onClick?: () => void
}
const style = {
  height: "h-44",
  width: "w-30",
  vitalWidth: "w-12"
}

const Card = ({cardProps, showProbability = true, onClick}: props) => {
  const [probability, setProbability] = useState("")
  const [hasImage, setHasImage] = useState(!!cardProps?.imageUrl)
  
  useEffect(() => {
    setProbability(`${cardProps?.drawProbability?.toFixed(1) ?? ""} %`)
  }, [cardProps?.drawProbability, cardProps?.quantity])

  useEffect(() => {
    setHasImage(!!cardProps?.imageUrl)
  }, [cardProps?.imageUrl])
  
  return (
    <div 
      className={
        [
          `relative`,
          `m-auto w-32`,
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
            onError={() => setHasImage(false)}
            className={`${cardProps?.isSaved ? "" : "border-2 border-red-400 rounded-lg border-dashed"}`}
          />
          : 
          <div className={`relative ${style.height} ${cardProps?.isSaved ? !hasImage && "border-2 rounded-lg" : "border-2 border-red-400 rounded-lg border-dashed"}`}>
            {cardProps?.type === "imageless" && "No Data Available"}
            <div className={`absolute bottom-0 right-1`}>
              {cardProps?.power && `${cardProps?.power}/${cardProps?.toughness}`}
            </div>
          </div> 
        }
        <div className={`relative`}>
          {showProbability && <div className={`absolute text-red-600 bg-green-200 h-8 bottom-28 left-12 px-2 rounded-lg`}>
            {probability}
          </div>}
        </div>
        <div className={`text-xs`}>
          {cardProps?.name} {cardProps?.quantity && `(${cardProps?.quantity})`}
        </div>
      </div>
    </div>
  )
}

export default Card