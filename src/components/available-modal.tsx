"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback } from './ui/avatar'
import useMovieStore, { MovieTypeStore } from '@/store/MovieStore'

export default function AvailableModal({ movie }: { movie: MovieTypeStore }) {
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState(movie?.note?.comment || "")
  const { addRating } = useMovieStore()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center">
          <Button
            variant="secondary"
          >
            <Star
              className={cn(
                "size-4",
              )}
            />
            Avaliação
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sua opinião</DialogTitle>
          <DialogDescription>
            Descreva sua experiência e dê uma nota a ele.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <Avatar>
              <AvatarFallback>Eu</AvatarFallback>
            </Avatar>

            <div className="flex w-full justify-end">
              {[1, 2, 3, 4, 5].map((_, index) => {
                const starValue = index + 1
                return (
                  <button
                    key={starValue}
                    className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-full"
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => addRating(movie.id, {
                      comment,
                      rating: starValue,
                    })}
                    aria-label={`Rate ${starValue} out of 5 stars`}
                  >
                    <Star
                      className={`stroke-1 size-6 ${starValue <= (hoveredRating || movie?.note?.rating || 0) ? "text-yellow-400 fill-yellow-400" : ""
                        }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <div className='flex'>



            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Adicione seu comentário..."
              className="w-full rounded p-2 text-sm focus:outline-none focus:ring-1 min-h-[80px]"
            />
          </div>
        </div>


        <DialogFooter>
          <div className="w-full">
            <div className="flex justify-end mt-2">
              <Button onClick={() => {
                addRating(movie.id, {
                  comment,
                  rating: movie?.note?.rating || 0,
                })
              }}>
                Salvar
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
