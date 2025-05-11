import apiClient from "@/services/api";
import useMovieStore from "@/store/MovieStore";
import { MovieType } from "@/types/movie.type";
import { useQuery } from "@tanstack/react-query";

const QUERY_PARAMS = {
  fields: [
    "id",
    "title",
    "image",
    "movie_banner",
    "release_date",
    "running_time",
    "description",
    "director",
    "producer",
    "rt_score"
  ]
}

const fetchFilms = async () => {
  const { data } = await apiClient.get(`/films?fields=${QUERY_PARAMS.fields.join(",")}`);
  return data;
};

export const useFetchFilms = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["films"],
    queryFn: fetchFilms,
  });

  
  /**
   * Ocorre a junção dos filmes retornados pela API com React Query 
   * e os filmes armazenados no localStorage pelo Zustand
   * com estados da aplicação (favorito, assistido, avaliação).
  */

  const { movies: storedMovies } = useMovieStore();

  const moviesWithState = data?.map((movie: MovieType) => {
    const storedMovie = storedMovies.find((current) => current.id === movie.id) || {};
    return { ...movie, ...storedMovie };
  });

  return {
    data: moviesWithState,
    ...rest
  };
};
