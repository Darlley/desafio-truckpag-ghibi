import apiClient from "@/services/api";
import useMovieStore from "@/store/MovieStore";
import { MovieType } from "@/types/movie.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

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
  console.log("fetchFilms", data);
  return data;
};

export const useFetchFilms = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["films"],
    queryFn: fetchFilms,
  });

  const { movies: storedMovies, setFilms } = useMovieStore();

  const moviesWithState = data?.map((movie: MovieType) => {
    const storedMovie = storedMovies.find((current) => current.id === movie.id) || {};
    return { ...movie, ...storedMovie };
  });

  useEffect(() => {
    // somente a primeira vez que o usuário acessa o site
    if (moviesWithState?.length && storedMovies.length === 0) {
      setFilms(moviesWithState);
    }
  }, [moviesWithState, storedMovies, setFilms]);

  return {
    data: moviesWithState,
    ...rest
  };
};
