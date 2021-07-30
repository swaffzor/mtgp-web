import React, { useEffect, useState } from 'react'
import { CardDTO } from '../types'

interface props {
  cardProps: Partial<CardDTO>
  onClick?: () => void
}

const CardList = ({cardProps, onClick}: props) => {
  const [probability, setProbability] = useState("")
  
  useEffect(() => {
    setProbability(`${cardProps.drawProbability?.toFixed(1) ?? ""} %`)
  }, [cardProps?.drawProbability, cardProps?.quantity])

  return (
    <div 
      className={
        [
          `relative`,
          `m-1`,
          onClick && "cursor-pointer"
        ].join(' ')
      }
      onClick={() => onClick && onClick()}
    >
      <div className={`my-2 border-2 border-blue-800 rounded-lg p-2 w-1/4`}>
        <div className={`flex items-center relative text-md justify-start h-12`}>
          <div className={`absolute top-0`}>
            {cardProps.quantity}
          </div>
          <div className={`absolute bottom-0`}>
            {`${cardProps.drawProbability?.toFixed(1)}%`}
          </div>
          <div className={`pl-16`}>
            {cardProps.name} 
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardList