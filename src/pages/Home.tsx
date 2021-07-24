import React, { useEffect, useState } from 'react'
import CardShelf from '../components/CardShelf'
import NavBar from '../components/NavBar'
import { cardSearch, fetchCards } from '../service'
import { CardDTO } from '../types'


const Home = () => {
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState<CardDTO[]>([])
  const [myDeck, setMyDeck] = useState<CardDTO[]>([])

  useEffect(() => {
    fetchCards({name: "elder g"}).then((results) => {setSearchResults(results)})
  }, [])

  const searchCards = async (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === "enter") {
      const response = await cardSearch(searchText)
      setSearchResults(response)
    }
  }  

  const setDeck = (card: CardDTO, setFunc: (aCard: React.SetStateAction<CardDTO[]>) => void) => {
    setFunc((deck) => {
      if (!deck.includes(card)) {
        deck.push(card)
      }
      return deck
    })
  }

  const saveCards = () => {
    localStorage.setItem("my-deck", JSON.stringify(myDeck))
    myDeck.forEach(card => card.isSaved = true)
  }

  return (
    <div>
      <h1>
        Magic Stats Gathering  
      </h1>
      <div className="m-2">
        <NavBar/>
      </div>
      <div className="relative">
        <input type="text" 
          className="absolute left-1 w-1/4 border rounded-md mx-1 pl-1" 
          placeholder="search" 
          onChange={(text) => {setSearchText(text.target.value)}}
          onKeyPress={(e) => {searchCards(e)}}
        />
      </div>

      {searchText && (
      <CardShelf
        title="Search Results"
        cards={searchResults}
        onCardClick={(card) => setDeck(card, setMyDeck)}
      />)}

      <CardShelf
        title="My Deck"
        cards={myDeck}
        button={{text: "Save", onClick: saveCards}}
      />
    </div>
  )
}

export default Home