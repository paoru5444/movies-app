import { useEffect, useState } from 'react';
import { api } from '../api/instance';
import { Linking } from 'react-native';
import { MovieVideo } from '../models/movie';

export default function useVideo(id: number) {
  const [video, setVideo] = useState<MovieVideo | {}>({});

  const getMovieVideos = async () => {
    const { data } = await api.get(`/movie/${id}/videos`);
    setVideo(data.results[0]);
  };

  useEffect(() => {
    getMovieVideos();
  }, []);

  const openTrailer = () => {
    Linking.openURL(`https://www.youtube.com/watch?v=${video?.key}`);
  };

  return {
    hasVideo: !!video?.key && video?.site.toLowerCase() === 'youtube',
    openTrailer: openTrailer,
  };
}
