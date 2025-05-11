import apiClient from "@/services/api";
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
  return useQuery({
    queryKey: ["films"],
    queryFn: fetchFilms,
  });
};
