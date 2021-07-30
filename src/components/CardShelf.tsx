import React from 'react'
import { CardDTO, CardSort } from '../types'
import Card from './Card'

interface Props {
  id: string
  cards: CardDTO[]
  sortBy: CardSort
  sortDirection?: ""|"ASC"|"DESC"
  title?: string
  button?: {text: string, onClick?: () => void}
  onCardClick?: (card: CardDTO) => void
  onSortClick?: (v: CardSort) => void
}

const CardShelf = ({id, cards, sortBy, sortDirection, title, button, onCardClick, onSortClick}: Props) => {
  const numColumns = 10

  return (
    <div className="mx-1 mt-10 border-2 border-black rounded-md relative">
      <div className="border-b-2 border-black flex items-center justify-center">
        <span className={`m-2`}>
          {title }
        </span>
      {
        Object.keys(CardSort).map(key => {
          return <div className={`m-2 cursor-pointer`} key={key} onClick={() => onSortClick && onSortClick(key as CardSort)}>
            {`${key}`}
          </div>
        })
      }
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
        {cards.sort((a, b) => {
          const direction = sortDirection === "DESC" ? -1 : 1
          return (a[sortBy] ?? 0) > (b[sortBy] ?? 0) ? 1 * direction : -1 * direction
        }).map((card, index) => {
          return (
            <Card 
              cardProps={card}
              onClick={() => onCardClick && onCardClick(card)}
              key={`${id}-${card.name}-${index}`}
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
