import { api } from '../api/instance';
import { useQuery } from '@tanstack/react-query';

const getPopularMovies = async () => {
  const { data } = await api.get('/movie/popular');
  return data?.results;
};
const getTopRatedMovies = async () => {
  const { data } = await api.get('/movie/top_rated');
  return data?.results;
};
const getUpcomingMovies = async () => {
  const { data } = await api.get('/movie/upcoming');
  return data?.results;
};
const getNowPlayingMovies = async () => {
  const { data } = await api.get('/movie/now_playing');
  return data?.results;
};

const STALE_TIME = 1000 * 60 * 5;

export default function useMovies() {
  const popularMovies = useQuery({
    queryKey: ['movies-popular'],
    queryFn: getPopularMovies,
    staleTime: STALE_TIME,
  });

  const topRatedMovies = useQuery({
    queryKey: ['movies-top-rated'],
    queryFn: getTopRatedMovies,
    staleTime: STALE_TIME,
  });

  const upcomingMovies = useQuery({
    queryKey: ['movies-upcoming'],
    queryFn: getUpcomingMovies,
    staleTime: STALE_TIME,
  });

  const nowPlayingMovies = useQuery({
    queryKey: ['movies-now-playing'],
    queryFn: getNowPlayingMovies,
    staleTime: STALE_TIME,
  });

  return {
    popularMovies: popularMovies.data ?? [],
    topRatedMovies: topRatedMovies.data ?? [],
    upcomingMovies: upcomingMovies.data ?? [],
    nowPlayingMovies: nowPlayingMovies.data ?? [],
    isLoading: popularMovies.isLoading || nowPlayingMovies.isLoading,
    isError:
      popularMovies.isError ||
      topRatedMovies.isError ||
      upcomingMovies.isError ||
      nowPlayingMovies.isError,
  };
}
