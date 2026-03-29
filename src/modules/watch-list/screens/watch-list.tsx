import React, { useCallback, useState } from 'react';
import WatchList from '../components/watch-list';
import storage from '@/src/store/storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Movie } from '@/src/models/movie';

export default function WatchListScreen() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState<Movie[] | []>([]);

  const getStoragedMovies = useCallback(() => {
    const stMovies = storage().get('movies');
    setMovies(stMovies);
  }, []);

  useFocusEffect(getStoragedMovies);

  const goToDetail = (item: Movie) => {
    navigation.navigate('Detail', { movie: item });
  };

  return <WatchList movies={movies} goToDetail={goToDetail} />;
}
