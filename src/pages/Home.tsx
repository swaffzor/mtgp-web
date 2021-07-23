import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import { fetchCards } from '../service'
import { Card as CardType } from '../types'


const Home = () => {
  const [cards, setCards] = useState<CardType[]>([])

  useEffect(() => {
    fetchCards<CardType[]>().then((results) => {
      // debugger
      setCards((self) => {
        const temp = [...self]
        temp.push(...results.cards)
        return temp
      })
      // setCards(results)
        
    })
  }, [])

  return (
    <div>
      <h1>
        Magic Stats Gathering  
      </h1>
      <div className="m-2">
        <NavBar/>
      </div>

      {/* <Card 
        name="Garuk"
      /> */}

      {cards.map((card, index) => {
        return (<Card name={card.name} key={index}/>)
      })}
    </div>
  )
}

export default Home