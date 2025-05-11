// src/store/MovieStore.ts - Atualização com filtros

import { MovieType } from '@/types/movie.type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type MovieAvailable = {
  rating: number;
  comment: string;
}

export type MovieTypeStore = {
  favorite: boolean;
  watched: boolean;
  note: MovieAvailable;
} & MovieType

// Tipos para filtros
export type FilterOptions = {
  search: string;
  onlyWatched: boolean;
  onlyFavorite: boolean;
  onlyWithNotes: boolean;
  minRating: number;
  sortBy: 'title' | 'running_time' | 'rt_score' | 'rating';
}

export type MovieStore = {
  movies: Array<MovieTypeStore>;
  // Filtros
  filters: FilterOptions;
  
  // Ações existentes
  setFilms: (movies: MovieTypeStore[]) => void;
  toggleFavorite: (id: string) => void;
  toggleWatched: (id: string) => void;
  addRating: (id: string, note: MovieAvailable) => void;
  
  // Novas ações para filtros
  setFilter: <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => void;
  resetFilters: () => void;
  
  // Seletores
  getFilteredMovies: () => MovieTypeStore[];
};

// Valores iniciais para filtros
const initialFilters: FilterOptions = {
  search: '',
  onlyWatched: false,
  onlyFavorite: false,
  onlyWithNotes: false,
  minRating: 0,
  sortBy: 'title'
};

const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      movies: [],
      filters: initialFilters,
      
      setFilms: (movies: MovieTypeStore[]) => {
        set((state) => {
          const newMovies = movies.filter(
            (movie) => !state.movies.some((stored) => stored.id === movie.id)
          );
          
          return { movies: [...state.movies, ...newMovies] };
        });
      },
      
      toggleFavorite: (id: string) => {
        set((state) => ({
          movies: state.movies.map((movie) =>
            movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
          ),
        }));
      },
      
      toggleWatched: (id: string) => {
        set((state) => ({
          movies: state.movies.map((movie) =>
            movie.id === id ? { ...movie, watched: !movie.watched } : movie
          ),
        }));
      },
      
      addRating: (id: string, note: MovieAvailable) => {
        set((state) => ({
          movies: state.movies.map((movie) =>
            movie.id === id
              ? {
                  ...movie,
                  note,
                }
              : movie
          ),
        }));
      },
      
      setFilter: (key, value) => {
        set((state) => ({
          filters: {
            ...state.filters,
            [key]: value
          }
        }));
      },
      
      resetFilters: () => {
        set({ filters: initialFilters });
      },
      
      getFilteredMovies: () => {
        const { movies, filters } = get();
        
        return movies
          .filter(movie => {
            // Filtro de texto
            if (filters.search && !movie.title.toLowerCase().includes(filters.search.toLowerCase())) {
              return false;
            }
            
            // Filtros de status
            if (filters.onlyWatched && !movie.watched) {
              return false;
            }
            
            if (filters.onlyFavorite && !movie.favorite) {
              return false;
            }
            
            if (filters.onlyWithNotes && (!movie.note || !movie.note.comment)) {
              return false;
            }
            
            if (filters.minRating > 0 && (!movie.note || movie.note.rating < filters.minRating)) {
              return false;
            }
            
            return true;
          })
          .sort((a, b) => {
            // Ordenação
            switch (filters.sortBy) {
              case 'title':
                return a.title.localeCompare(b.title);
              case 'running_time':
                return Number(a.running_time) - Number(b.running_time);
              case 'rt_score':
                return Number(b.rt_score) - Number(a.rt_score);
              case 'rating':
                const ratingA = a.note?.rating || 0;
                const ratingB = b.note?.rating || 0;
                return ratingB - ratingA;
              default:
                return 0;
            }
          });
      }
    }),
    {
      name: 'movies',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMovieStore;