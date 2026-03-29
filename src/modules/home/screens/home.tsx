import React, { useEffect, useMemo, useState } from 'react';
import Home from '../components/home';
import { api } from '@/src/api/instance';
import { Movie, MovieListsTypes } from '@/src/models/movie';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Detail: { movie: Movie };
};

type Props = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

export default function HomeScreen() {
  const navigation = useNavigation<Props>();

  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);

  const [currentTab, setCurrentTab] = useState<MovieListsTypes>('now-playing');

  const getPopularMovies = async () => {
    const { data } = await api.get('/movie/popular');
    setPopularMovies(data?.results);
  };
  const getTopRatedMovies = async () => {
    const { data } = await api.get('/movie/top_rated');
    setTopRatedMovies(data?.results);
  };
  const getUpcomingMovies = async () => {
    const { data } = await api.get('/movie/upcoming');
    setUpcomingMovies(data?.results);
  };
  const getNowPlayingMovies = async () => {
    const { data } = await api.get('/movie/now_playing');
    setNowPlayingMovies(data?.results);
  };

  useEffect(() => {
    getPopularMovies();
    getNowPlayingMovies();
  }, []);

  const onChangeTab = (tab: MovieListsTypes) => {
    setCurrentTab(tab);

    if (tab === 'now-playing') {
      getNowPlayingMovies();
    }

    if (tab === 'top-rated') {
      getTopRatedMovies();
    }

    if (tab === 'upcoming') {
      getUpcomingMovies();
    }
  };

  const goToDetail = (item: Movie) => {
    navigation.navigate('Detail', { movie: item });
  };

  const goToSearch = () => {
    navigation.navigate('Search');
  };

  const data = useMemo(
    () => ({
      'now-playing': nowPlayingMovies,
      upcoming: upcomingMovies,
      'top-rated': topRatedMovies,
    }),
    [nowPlayingMovies, topRatedMovies, upcomingMovies],
  );

  return (
    <Home
      popularMovies={popularMovies}
      tabMovies={data[currentTab]}
      onChangeTab={onChangeTab}
      goToDetail={goToDetail}
      goToSearch={goToSearch}
      currentStep={currentTab}
    />
  );
}
