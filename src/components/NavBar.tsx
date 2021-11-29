import React from 'react'
import Input from './Input'
import NavLink from './NavLink'

interface Props {
  setShowHand?: () => void
}

const NavBar = ({setShowHand}: Props) => {
  return (
    <div className="border border-b-2 border-blue-400 my-2 rounded">
      <NavLink 
        content="Home"
        url=""
      />
      <div className="flex justify-center">
        <span className="mx-2">Show Hand?</span>
        <NavLink
          content={
            <Input
              type="checkbox"
              onChange={setShowHand}
            />
          }
          url=""
        />
      </div>
    </div>
  )
}

export default NavBar