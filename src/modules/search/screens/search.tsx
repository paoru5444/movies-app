import React, { useEffect, useState } from 'react';
import Search from '../components/search';
import { api } from '@/src/api/instance';
import { Movie } from '@/src/models/movie';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Detail: { movie: Movie };
};

type Props = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

export default function SearchScreen() {
  const navigation = useNavigation<Props>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');

  const getMovies = async (movie?: string) => {
    const { data } = await api.get('/search/movie', {
      params: { query: movie },
    });
    setMovies(data?.results);
  };

  const goToDetail = (item: Movie) => {
    navigation.navigate('Detail', { movie: item });
  };

  const onChangeSearch = text => {
    setSearch(text);
    getMovies(text);
  };

  return (
    <Search
      movies={movies}
      goToDetail={goToDetail}
      search={search}
      onChangeSearch={onChangeSearch}
    />
  );
}
