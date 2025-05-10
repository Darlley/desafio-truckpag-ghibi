import React from 'react'

import FilmCard from './film-card'

export default function VerticalFeed() {
  return (
    <div className='min-h-svh bg-black text-white w-full'>
      <div className="snap-y snap-mandatory h-svh overflow-y-auto overflow-x-hidden">

        <FilmCard />
        <FilmCard />
        <FilmCard />

      </div>
    </div>
  )
}
