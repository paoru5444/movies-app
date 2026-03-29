import React, { useEffect, useRef, useState } from 'react';
import Search from '../components/search';
import { api } from '@/src/api/instance';
import { Movie } from '@/src/models/movie';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TextInput } from 'react-native';

type RootStackParamList = {
  Detail: { movie: Movie };
};

type Props = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

export default function SearchScreen() {
  const navigation = useNavigation<Props>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');

  const inputRef = useRef<TextInput>(null);

  const getMovies = async (movie?: string) => {
    const { data } = await api.get('/search/movie', {
      params: { query: movie },
    });
    setMovies(data?.results);
  };

  const getMovieDetail = async (id: number) => {
    const { data } = await api.get(`/movie/${id}`);
    return data;
  };

  const goToDetail = (item: Movie) => {
    navigation.navigate('Detail', { movie: item });
  };

  const onChangeSearch = (text: string) => {
    setSearch(text);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const ref = setTimeout(() => {
      getMovies(search);
    }, 1000);

    return () => {
      clearInterval(ref);
    };
  }, [search]);

  return (
    <Search
      movies={movies}
      goToDetail={goToDetail}
      search={search}
      onChangeSearch={onChangeSearch}
      getMovieDetail={getMovieDetail}
      inputRef={inputRef}
    />
  );
}
