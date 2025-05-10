import React from 'react'

import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Check, Heart, Info, MessageSquare, Play, Plus } from 'lucide-react'

export default function FilmCard() {
  return (
    <div className="snap-start h-svh w-full bg-white flex justify-start relative">
      <div className="absolute inset-0">
        image
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black" />
      </div>

      <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">title</h1>
        <div className="flex items-center text-sm space-x-2 mb-4">
          <span className="text-green-500 font-semibold">Match</span>
          <span>year</span>
          <span>duration</span>
          <span className="border border-gray-600 px-1 text-xs">rating</span>
        </div>
        <p className="text-gray-200 mb-6 line-clamp-3 md:line-clamp-none">description</p>

        <div className="flex space-x-3">
          <Button className="px-6">
            <Play className="mr-2 h-5 w-5" /> Assistir
          </Button>
          <Button variant="secondary" className="px-6">
            <Info className="mr-2 h-5 w-5" /> Mais Informações
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "absolute right-4 bottom-20 flex flex-col items-center space-y-6 z-10",
        )}
      >
        {/* Favoritar */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 h-12 w-12"
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-all duration-300"
              )}
            />
          </Button>
          <span className="text-xs mt-1">Favoritar</span>
        </div>

        {/* Assistido */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 h-12 w-12"
          >
            <Check
              className={cn(
                "h-6 w-6 transition-all duration-300",
              )}
            />
          </Button>
          <span className="text-xs mt-1">Marcar</span>
        </div>

        {/* Comentar (estilo GitHub) */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 h-12 w-12"
          >
            <MessageSquare
              className={cn(
                "h-6 w-6 transition-all duration-300",
              )}
            />
          </Button>
          <span className="text-xs mt-1">Comentários</span>
        </div>
      </div>
    </div>
  )
}
