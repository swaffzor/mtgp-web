import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import NavBar from '../components/NavBar'
import { fetchCards } from '../service'
import { CardDTO } from '../types'


const Home = () => {
  const [cards, setCards] = useState<CardDTO[]>([])

  useEffect(() => {
    fetchCards({name: "elder g"}).then((results) => {
      setCards(results)
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

      {cards.map((card, index) => {
        return (<Card name={card.name} key={index}/>)
      })}
    </div>
  )
}

export default Home