import React from 'react'

export default function VerticalFeed() {
  return (
    <div className='min-h-svh bg-black text-white'>
      <div className="snap-y snap-mandatory h-svh overflow-y-auto overflow-x-hidden">

        <div className="snap-start h-svh w-full bg-red-500 flex items-center justify-center">
          <h1 className="text-4xl">Vertical Feed 1</h1>
        </div>
        <div className="snap-start h-svh w-full bg-blue-500 flex items-center justify-center">
          <h1 className="text-4xl">Vertical Feed 2</h1>
        </div>
        <div className="snap-start h-svh w-full bg-green-500 flex items-center justify-center">
          <h1 className="text-4xl">Vertical Feed 3</h1>
        </div>

      </div>
    </div>
  )
}
