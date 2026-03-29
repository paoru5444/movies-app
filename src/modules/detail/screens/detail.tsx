import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Movie } from '@/src/models/movie';

import useDetail from '@/src/hooks/useDetail';

import Detail from '../components/detail';
import storage from '@/src/store/storage';
import useVideo from '@/src/hooks/useVideo';

export default function DetailScreen() {
  const route = useRoute();
  const { movie }: { movie: Movie } = route.params;
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { genre, runtime, year } = useDetail(movie?.id);
  const { hasVideo, openTrailer } = useVideo(movie?.id);

  const watchListMovies: Movie[] | [] = storage().get('movies') || [];

  useEffect(() => {
    const isMovieBookmarked = watchListMovies.some(listMovie => {
      return listMovie.id === movie.id;
    });
    setIsBookmarked(isMovieBookmarked);
  }, []);

  const onPressBookmark = () => {
    if (isBookmarked) {
      const filteredMovies = watchListMovies.filter(
        item => item.id !== movie.id,
      );
      storage().set('movies', filteredMovies);
      setIsBookmarked(false);
    } else {
      storage().set('movies', [...watchListMovies, movie]);
      setIsBookmarked(true);
    }
  };

  return (
    <Detail
      movie={movie}
      detail={{ genre, runtime, year }}
      onPressBookmark={onPressBookmark}
      isBookmarked={isBookmarked}
      openTrailer={openTrailer}
      hasVideo={hasVideo}
    />
  );
}
