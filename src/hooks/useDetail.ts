import { useEffect, useState } from 'react';
import { api } from '../api/instance';

export default function useDetail(itemId: number) {
  const [detail, setDetail] = useState({
    release_date: '',
    genres: [],
    runtime: '',
  });

  const getMovieDetail = async (id: number) => {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  };

  useEffect(() => {
    getMovieDetail(itemId).then(setDetail);
  }, []);

  const year = detail.release_date?.split('-')[0];
  const genre = detail.genres?.[0]?.name || '';
  const runtime = detail?.runtime;

  return {
    year,
    genre,
    runtime,
  };
}
