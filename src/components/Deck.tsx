import React from 'react'
import { CardDTO } from '../types'
import Card from './Card'
import CardList from './CardList'

interface Props {
  cards: CardDTO[]
  title?: string
  onClick?: () => void
}

const Deck = ({cards, title, onClick}: Props) => {

  return (
    <div 
      className="w-40 my-2"
      onClick={onClick}
    >
      {title}
      <div className="border rounded-lg w-40 my-2">
        <Card
          cardProps={cards?.length > 0 ? cards[0] : {}}
          showProbability={false}
        />
      </div>
    </div>
  )
}

export default Deck