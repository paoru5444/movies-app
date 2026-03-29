import React, { useState } from 'react';
import Home from '../components/home';
import { Movie, MovieListsTypes } from '@/src/models/movie';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useMovies from '@/src/hooks/useMovies';

type RootStackParamList = {
  Detail: { movie: Movie };
};

type Props = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

export default function HomeScreen() {
  const navigation = useNavigation<Props>();
  const { popularMovies, topRatedMovies, upcomingMovies, nowPlayingMovies } =
    useMovies();

  const [currentTab, setCurrentTab] = useState<MovieListsTypes>('now-playing');

  const onChangeTab = (tab: MovieListsTypes) => {
    setCurrentTab(tab);
  };

  const goToDetail = (item: Movie) => {
    navigation.navigate('Detail', { movie: item });
  };

  const goToSearch = () => {
    navigation.navigate('Search');
  };

  const data = {
    'now-playing': nowPlayingMovies,
    upcoming: upcomingMovies,
    'top-rated': topRatedMovies,
  };

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
