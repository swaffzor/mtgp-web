import React from 'react'
import { CardDTO } from '../types'
import Card from './Card'

interface Props {
  cards: CardDTO[]
  title?: string
  onCardClick?: (card: CardDTO) => void
}

const CardShelf = ({cards, title, onCardClick}: Props) => {

  return (
    <div className="flex mx-1 mt-10">
      {title}
      {cards.map((card, index) => {
        return (
          <Card 
            cardProps={card}
            onClick={() => onCardClick && onCardClick(card)}
            key={index}
          />)
      })}
    </div>
  )
}

export default CardShelf
