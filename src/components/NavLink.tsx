import React from 'react'

interface Props {
  text: string
  url: string
}

const NavLink = ({text, url}: Props) => {

  return (
    <div>
      <button>
        {text}
      </button>
    </div>
  )
}

export default NavLink