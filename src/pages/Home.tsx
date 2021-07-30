import React, { useEffect, useState } from 'react'
import CardShelf from '../components/CardShelf'
import DeckImport from '../components/DeckImport'
import Input from '../components/Input'
import NavBar from '../components/NavBar'
import { cardSearch } from '../service'
import { CardDTO, CardSort } from '../types'
import { calculateProbability } from '../utils'


const Home = () => {
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState<CardDTO[]>([])
  const [myDeck, setMyDeck] = useState<CardDTO[]>([])
  const [myHand, setMyHand] = useState<CardDTO[]>([])
  const [notFound, setNotFound] = useState<string[]>([])
  const [sort, setSort] = useState<CardSort>(CardSort.name)
  const [sortDirection, setSortDirection] = useState<""|"ASC"|"DESC">("")

  useEffect(() => {
    const savedCards = localStorage.getItem("my-deck")
    savedCards && setMyDeck(JSON.parse(savedCards))
  }, [])

  const searchCards = async (e: React.KeyboardEvent) => {
    if (e.key.toLowerCase() === "enter") {
      const response = await cardSearch(searchText)
      setSearchResults(response)
    }
  }

  const saveCards = () => {
    myDeck.forEach(card => card.isSaved = true)
    localStorage.setItem("my-deck", JSON.stringify(myDeck))
  }

  const drawCard = (card: CardDTO) => {
    card.quantity = card?.quantity && card?.quantity - 1
    calculateProbability(myDeck)
    removeCardFromDeck(card, myDeck, setMyDeck)
    setMyHand([...myHand, card])
  }

  const removeCardFromDeck = (card: CardDTO, deck: CardDTO[], setDeckFn: (deck: CardDTO[])=>void) => {
    const tempDeck = [...deck]
    const index = tempDeck.findIndex(deckCard => deckCard.name === card.name)
    card.quantity ? tempDeck.splice(index, 1, card) : tempDeck.splice(index, 1)
    setDeckFn(tempDeck)
  }

  return (
    <div>
      <h1>
        Magic Stats Gathering  
      </h1>

      <NavBar/>

      <DeckImport
        setDeck={setMyDeck}
        setNotFound={(cardNames: string[]) => setNotFound([...notFound, ...cardNames])}
      />

      <Input
        placeholder="search" 
        type="text"
        classOverrides="absolute left-1 w-1/4 border rounded-md my-2 pl-1" 
        onChange={(text) => {setSearchText(text.target.value)}}
        onKeyPress={async (e) => {await searchCards(e)}}
      />

      {searchText && (
      <CardShelf
        id="search-results"
        title="Search Results"
        cards={searchResults}
        shelfType="image"
        sortBy={CardSort.name}
        onCardClick={(card) => setMyDeck([...myDeck, card])}
      />)}

      {notFound.length > 0 && 
        (<div>
          <h1>Not Found</h1>
          {notFound.map(c =>
            <div key={`notfound-${c}`}>
              {c}
            </div>
          )}
        </div>)
      }

      <CardShelf
        id="hand"
        title="In Hand"
        cards={myHand}
        shelfType="image"
        sortBy={sort}
        onCardClick={(card) => removeCardFromDeck(card, myHand, setMyHand)
        }
      />

      <CardShelf
        id="my-deck"
        title="My Deck"
        cards={myDeck}
        shelfType="list"
        sortBy={sort}
        sortDirection={sortDirection}
        button={{text: "Save", onClick: saveCards}}
        onCardClick={drawCard}
        onSortClick={(sort: CardSort) => {
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
            return sort
          })
          // setSortDirection(direction)
        }}
      />

    </div>
  )
}

export default Home