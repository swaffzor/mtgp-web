import React from 'react'
import { CardDTO } from '../types'
import Card from './Card'

interface Props {
  id: string
  cards: CardDTO[]
  title?: string
  button?: {text: string, onClick?: () => void}
  onCardClick?: (card: CardDTO) => void
}

const CardShelf = ({id, cards, title, button, onCardClick}: Props) => {
  const numColumns = 10

  return (
    <div className="mx-1 mt-10 border-2 border-black rounded-md">
      <div className="border-b-2 border-black">
        {title}
      </div>
      <div className={[
        `flex-col grid grid-flow-row gap-x-0`,
        `grid-cols-3`,
        `sm:grid-cols-4`,
        `md:grid-cols-5`,
        `lg:grid-cols-6`,
        `xl:grid-cols-7`,
        `2xl:grid-cols-${numColumns} grid-rows-${cards.length/numColumns}`
        ].join(' ')
      }>
        {cards.map((card, index) => {
          return (
            <Card 
              cardProps={card}
              onClick={() => onCardClick && onCardClick(card)}
              key={`${id}-${card.name.replaceAll(" ", "-")}-${index}`}
          />)
        })}
      </div>
      {button?.text && <div className="border-t-2 border-black">
        <button 
          onClick={() => button.onClick && button.onClick()} 
        >
          {button.text}
        </button>
      </div>}
    </div>
  )
}

export default CardShelf
