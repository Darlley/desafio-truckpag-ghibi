"use client"

import FilmCard from '@/components/film-card'
import { Button } from '@/components/ui/button'
import { useFetchFilms } from '@/hooks/useFetchFilms'
import { MovieTypeStore } from '@/store/MovieStore'
import { MovieType } from '@/types/movie.type'
import { ChevronDown } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export default function VerticalFeed() {

  const { data, status } = useFetchFilms()
  const moviesRef = useRef<HTMLDivElement[]>([]); // Referências para os filmes
  const currentIndex = useRef(0);

  if (status === "pending") return <p>Carregando...</p>;
  if (status === "error") return <p>Erro ao carregar os filmes.</p>;

  const scrollToNextMovie = () => {
    if (currentIndex.current < data.length - 1) {
      currentIndex.current += 1; // Avança para o próximo filme
      moviesRef.current[currentIndex.current]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className='min-h-svh bg-black text-white w-full relative'>

      <div className="snap-y snap-mandatory h-svh overflow-y-auto overflow-x-hidden">


        {data.map((movie: MovieTypeStore, index: number) => (
          <FilmCard
            key={`list-movies--id-${movie.id}`}
            ref={(el) => {
              if (el) moviesRef.current[index] = el;
            }}
            data={movie}
          />
        ))}

        <Button
          variant='default'
          size="icon"
          onClick={scrollToNextMovie}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 p-3 flex items-center justify-center transition-all active:scale-90 z-10">
          <ChevronDown className='pointer-events-none' />
        </Button>
      </div>
    </div>
  )
}
