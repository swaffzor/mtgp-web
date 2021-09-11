import React from 'react'

interface Props {
  title: string
  strength?: number
  defense?: number
  description?: string
  ability?: React.ReactElement
}

const Card = ({title, strength, defense, ability}: Props) => {

  return (
    <div className='m-4 border border-black h-80 w-48 rounded-2xl'>
      <div className="h-full relative mx-4">
        {title}
        <div className="border border-red-700 h-40 py-14 rounded-2xl">
          image here
        </div>
        <div className="mt-5">
          {ability}
        </div>
        <div className="flex absolute bottom-4">
          <div className="border border-black rounded-md mr-2">
            {`strength: ${strength}`}
          </div>
          <div className="border border-black rounded-md">
            {`defense: ${defense}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card