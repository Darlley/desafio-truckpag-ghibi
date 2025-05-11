"use client"

import FilmCard from '@/components/film-card'
import FilterModal from '@/components/filter-modal'
import { useFetchFilms } from '@/hooks/useFetchFilms'
import { MovieTypeStore } from '@/store/MovieStore'
import React from 'react'

export default function VerticalFeed() {

  const { data, status } = useFetchFilms()

  if (status === "pending") return <p>Carregando...</p>;
  if (status === "error") return <p>Erro ao carregar os filmes.</p>;

  return (
    <div className='min-h-svh bg-black text-white w-full absolute'>
      <FilterModal className="absolute top-4 right-8 z-10" />

      <div className="snap-y snap-mandatory h-svh overflow-y-auto overflow-x-hidden">

        {data.map((movie: MovieTypeStore) => (
          <FilmCard
            key={`list-movies--id-${movie.id}`}
            data={movie}
          />
        ))}
      </div>
    </div>
  )
}
