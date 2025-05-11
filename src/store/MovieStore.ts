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
  toggleFavorite: (id: string) => void;
  // markWatched: (id: string) => void;
  // addRating: (id: string, note: MovieAvailable) => void;
};

const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      movies: [],

      toggleFavorite: (id: string) => {
        set((state) => ({
          movies: state.movies.map((movie) =>
            movie.id === id ? { ...movie, favorite: !movie.favorite } : movie
          ),
        }));
      },
    }),
    {
      name: 'movie-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMovieStore;