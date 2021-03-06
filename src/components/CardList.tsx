import React, { useEffect, useState } from 'react'
import { CardDTO } from '../types'

interface props {
  cardProps: Partial<CardDTO>
  onClick?: () => void
}

const CardList = ({cardProps, onClick}: props) => {

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
      <div className={`my-2 border-2 border-blue-800 rounded-lg p-2`}>
        <div className={`flex items-center relative text-xs justify-start h-12`}>
          <div className={`absolute top-0`}>
            {cardProps.quantity}
          </div>
          <div className={`absolute bottom-0`}>
            {`${cardProps.drawProbability?.toFixed(1)}%`}
          </div>
          <div className={`ml-12`}>
            {cardProps.name} 
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardList