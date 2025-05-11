"use client"

import React from 'react'
import { useFetchFilms } from '@/hooks/useFetchFilms'
import useMovieStore, { MovieTypeStore } from '@/store/MovieStore'
import { AlertCircle } from 'lucide-react'
import FilmCard from '@/components/film-card'
import FilterModal from '@/components/filter-modal'
import GhibliIcon from '@/components/icons/ghibli-icon'

export default function VerticalFeed() {
  const { status } = useFetchFilms()
  const { getFilteredMovies } = useMovieStore()
  
  const filteredMovies = getFilteredMovies()
  
  if (status === "pending") return (
    <div className='w-full h-full flex items-center justify-center'>
      <GhibliIcon className='rounded-full animate-pulse' />
    </div>
  );
  if (status === "error") return <p>Erro ao carregar os filmes.</p>;

  return (
    <div className='min-h-svh bg-black text-white w-full absolute'>
      <FilterModal className="absolute top-4 right-8 z-10" />

      <div className="snap-y snap-mandatory h-svh overflow-y-auto overflow-x-hidden">
        {filteredMovies.length === 0 ? (
          <div className="h-svh flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="size-12 mb-4 text-muted-foreground" />
            <h2 className="text-xl font-bold mb-2">Nenhum filme encontrado</h2>
            <p className="text-muted-foreground">
              Não encontramos filmes com os filtros atuais. Tente ajustar seus critérios de busca.
            </p>
          </div>
        ) : (
          filteredMovies.map((movie: MovieTypeStore) => (
            <FilmCard
              key={`list-movies--id-${movie.id}`}
              data={movie}
            />
          ))
        )}
      </div>
    </div>
  )
}