import React, { useEffect, useRef, useState } from 'react'
import { CardDTO, CardSort } from '../types'
import Card from './Card'
import CardList from './CardList'
import Input from './Input'

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

const CardShelf = ({id, cards, title, button, onCardClick}: Props) => {
  const [search, setSearch] = useState("")
  const [useSearchLock, setUseSearchLock] = useState(false)
  const [showProbability, setShowProbability] = useState(false)
  const [shelfType, setShelfType] = useState<"image"|"list">("image")
  const [sort, setSort] = useState<CardSort>(CardSort.name)
  const [sortDirection, setSortDirection] = useState<""|"ASC"|"DESC">("")
  const searchRef = useRef<HTMLInputElement>(null)
  const numColumns = 10

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  const CardDisplay = shelfType === "image" 
    ? ({card, index}: CardDisplayProps) => 
      <Card 
        cardProps={card} 
        onClick={() => onCardClick && onCardClick(card)}
        showProbability={showProbability}
        key={`${id}-${card.name}-${index}`}
      />
    : ({card, index}: CardDisplayProps) => 
      <CardList
        cardProps={card} 
        onClick={() => onCardClick && onCardClick(card)}
        key={`${id}-${card.name}-${index}`}
      />

  const imageLayout = [
    `justify-items-center`,
    `flex-col grid grid-flow-row gap-x-0`,
    `grid-cols-3`,
    `sm:grid-cols-4`,
    `md:grid-cols-5`,
    `lg:grid-cols-6`,
    `xl:grid-cols-7`,
    `2xl:grid-cols-${numColumns} grid-rows-${cards?.length/numColumns}`
    ].join(' ')

  return (
    <div className="relative mx-1 mt-10 border-2 border-black rounded-md">
      <div className={``}>
        {title }
      </div>
      <div className="flex items-center justify-center border-b-2 border-black">
        <div className="m-2">
          Lock Search
          <Input
            type="checkbox"
            onChange={() => setUseSearchLock(!useSearchLock)}
            classOverrides="m-2"
          />
        </div>
        <Input
          type="text"
          placeholder="Search Deck"
          onChange={(text) => setSearch(text.target.value)}
          classOverrides={`px-2 border border-2 border-gray-600 rounded-lg`}
          onBlur={() => {
            console.log("ref")
            useSearchLock && searchRef.current?.focus()
          }}
          inputRef={searchRef}
        />

        {
          Object.keys(CardSort)?.map((key, index) => {
            return (
              <div 
                className={`m-2 cursor-pointer ${sort === key && "border-b-2 border-gray-600"}`} 
                key={`${key}-${index}`} 
                onClick={() => {
                  let direction: ""|"ASC"|"DESC" = ""
                  switch (sortDirection) { 
                    case "ASC":
                      direction = "DESC"
                      break;
                    case "DESC":
                    case "":
                    default:
                      direction = "ASC"
                      break;
                  }
                  setSort((prev) => {
                    setSortDirection(prev !== sort ? sortDirection : direction)
                    return key as CardSort
                  })
              }}>
                {`${key}`}
              </div>
            )
          })
        }


      <div>
        Display Cards
        <Input
          type="checkbox"
          onChange={() => {setShelfType(shelfType === "image" ? "list" : "image")}}
        />
      </div>

      <div className="mx-4">
        Show Probability
        <Input
          type="checkbox"
          checked={showProbability}
          onChange={() => setShowProbability(!showProbability)}
        />
      </div>
    </div>

      <div className={shelfType === "image" ? imageLayout : `grid grid-cols-6 gap-x-0`}>
        {/* deepcode ignore NoZeroReturnedInSort: <please specify a reason of ignoring this> */}
        {cards?.sort((a, b) => {
          const direction = sortDirection === "DESC" ? -1 : 1
          return (a[sort] ?? 0) > (b[sort] ?? 0) ? 1 * direction : -1 * direction
        })
        .filter(card => card.name.toLowerCase().includes(search.toLowerCase()))
        ?.map((card, index) => {
          return (
            <CardDisplay card={card} index={index} key={`${title}-${index}`}/>)
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
