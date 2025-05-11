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
  note: MovieAvailable
} & MovieType

export type MovieStore = {
  movies: Array<MovieTypeStore>;
  setFilms: (movies: MovieTypeStore[]) => void;
  toggleFavorite: (id: string) => void;
  // markWatched: (id: string) => void;
  // addRating: (id: string, note: MovieAvailable) => void;
};

const useMovieStore = create<MovieStore>()(
  persist(
    (set) => ({
      movies: [],

      toggleFavorite: (id: string) => {
        set((state) => ({
          movies: state.movies.map((movie) =>
            movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
          ),
        }));
      },

      setFilms: (movies: MovieTypeStore[]) => {
        set((state) => {
          const newMovies = movies.filter(
            (movie) => !state.movies.some((stored) => stored.id === movie.id)
          );

          return { movies: [...state.movies, ...newMovies] };
        });
      },

    }),
    {
      name: 'movies',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMovieStore;