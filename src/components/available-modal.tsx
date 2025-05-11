"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback } from './ui/avatar'
import useMovieStore, { MovieTypeStore } from '@/store/MovieStore'
import { toast } from 'sonner'

export default function AvailableModal({ movie }: { movie: MovieTypeStore }) {
  const [hoveredRating, setHoveredRating] = useState(0)
  const [rating, setRating] = useState(movie?.note?.rating || 0)
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
              className="stroke-1 size-6 stroke-yellow-600 fill-yellow-400"
            />
            {movie?.note?.rating || 0} stars
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
                    key={`rating-movieid-${movie.id}-star${starValue}`}
                    className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-full"
                    onMouseEnter={() => setHoveredRating(starValue)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(starValue)}
                    aria-label={`Rate ${starValue} out of 5 stars`}
                  >
                    <Star
                      className={`stroke-1 size-6 ${starValue <= (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : ""
                        }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Adicione seu comentário..."
            className="w-full rounded p-2 text-sm focus:outline-none focus:ring-1 min-h-[80px]"
          />
        </div>


        <DialogFooter>
          <div className="w-full">
            <div className="flex justify-between mt-2">
              <div className='flex items-center text-sm'>
                <Star
                  className="stroke-1 size-6 text-yellow-400 fill-yellow-400"
                />
                {movie?.note?.rating || 0} stars
              </div>
              <Button
                disabled={movie?.note?.comment === comment && movie?.note?.rating === rating}
                onClick={() => {
                  try {
                    addRating(movie.id, { comment, rating })
                    toast("Avaliação salva com sucesso ✅")
                  }
                  catch (error) {
                    console.error("Error adding rating:", error)
                    toast("Erro ao salvar avaliação ❌")
                  }
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
