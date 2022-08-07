import React, { ReactElement } from 'react'

interface Props {
  content: string | ReactElement
  url: string
  onClick?: () => void
}

const NavLink = ({content, url, onClick}: Props) => {

  return (
    <div>
      <button onClick={() => onClick && onClick()}>
        {content}
      </button>
    </div>
  )
}

export default NavLink