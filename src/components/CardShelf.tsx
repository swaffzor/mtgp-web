import React, { useState } from 'react'
import { CardDTO, CardSort } from '../types'
import Card from './Card'
import CardList from './CardList'

interface Props {
  id: string
  cards: CardDTO[]
  shelfType: "image"|"list"
  title?: string
  button?: {text: string, onClick?: () => void}
  onCardClick?: (card: CardDTO) => void
}

interface CardDisplayProps {
  card: CardDTO
  index: number
}

const CardShelf = ({id, cards, shelfType, title, button, onCardClick}: Props) => {

  const [sort, setSort] = useState<CardSort>(CardSort.name)
  const [sortDirection, setSortDirection] = useState<""|"ASC"|"DESC">("")
  const numColumns = 10
  const CardDisplay = shelfType === "image" 
    ? ({card, index}: CardDisplayProps) => 
      <Card 
        cardProps={card} 
        onClick={() => onCardClick && onCardClick(card)}
        key={`${id}-${card.name}-${index}`}
      />
    : ({card, index}: CardDisplayProps) => 
      <CardList
        cardProps={card} 
        onClick={() => onCardClick && onCardClick(card)}
        key={`${id}-${card.name}-${index}`}
      />

  const imageLayout = [
    `flex-col grid grid-flow-row gap-x-0`,
    `grid-cols-3`,
    `sm:grid-cols-4`,
    `md:grid-cols-5`,
    `lg:grid-cols-6`,
    `xl:grid-cols-7`,
    `2xl:grid-cols-${numColumns} grid-rows-${cards.length/numColumns}`
    ].join(' ')

  return (
    <div className="mx-1 mt-10 border-2 border-black rounded-md relative">
      <div className="border-b-2 border-black flex items-center justify-center">
        <span className={`m-2`}>
          {title }
        </span>
      {
        Object.keys(CardSort).map(key => {
          return <div className={`m-2 cursor-pointer ${sort === key && "border-b-2 border-gray-600"}`} key={key} onClick={() => {
            let direction: ""|"ASC"|"DESC" = ""
            switch (sortDirection) { 
              case "":
                direction = "ASC"
                break;
              case "ASC":
                direction = "DESC"
                break;
              case "DESC":
                direction = "ASC"
                break;
              default:
                break;
            }
            setSort((prev) => {
              setSortDirection(prev !== sort ? sortDirection : direction)
              return key as CardSort
            })
          }}>
            {`${key}`}
          </div>
        })
      }
      </div>
      <div className={shelfType === "image" ? imageLayout : `grid grid-cols-6 gap-x-0`}>
        {cards.sort((a, b) => {
          const direction = sortDirection === "DESC" ? -1 : 1
          return (a[sort] ?? 0) > (b[sort] ?? 0) ? 1 * direction : -1 * direction
        }).map((card, index) => {
          return (
            <CardDisplay card={card} index={index} />)
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
