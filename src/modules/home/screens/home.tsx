import React, { useEffect, useState } from 'react';
import Home from '../components/home';
import { api } from '../../../api/instance';

export default function HomeScreen() {
  const [popularMovies, setPopularMovies] = useState([]);

  const getMovies = async () => {
    const { data } = await api.get('/movie/popular');
    console.log('reponse: ', data);
    setPopularMovies(data?.results);
  };

  useEffect(() => {
    console.log('aqui');
    getMovies();
  }, []);

  return <Home popularMovies={popularMovies} />;
}
