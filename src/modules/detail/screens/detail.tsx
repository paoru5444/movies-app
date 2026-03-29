import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Header } from '@/src/components';
import { colors } from '@/src/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Movie } from '@/src/models/movie';
import { api, IMAGE_BASE_URL } from '@/src/api/instance';
import Star from '@/assets/icons/star.svg';
import CalendarBlank from '@/assets/icons/calendar-blank.svg';
import Clock from '@/assets/icons/clock.svg';
import Ticket from '@/assets/icons/ticket.svg';

export default function DetailScreen() {
  const route = useRoute();
  const { movie }: { movie: Movie } = route.params;
  const insets = useSafeAreaInsets();

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
    getMovieDetail(movie.id).then(setDetail);
  }, []);

  const year = detail.release_date?.split('-')[0];
  const genre = detail.genres?.[0]?.name || '';
  const runtime = detail?.runtime;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header pageTitle="Detail" containerStyle={{ paddingHorizontal: 24 }} />

      <View style={styles.header_card}>
        <ImageBackground
          source={{ uri: IMAGE_BASE_URL + movie.backdrop_path }}
          style={styles.backdrop_image}
        >
          <View style={styles.movie_showcase}>
            <Star />
            <Text style={styles.text_vote_average}>
              {movie.vote_average.toFixed(1)}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.poster_image__container}>
          <Image
            source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
            style={styles.poster_image}
          />
          <Text style={styles.movie_title}>{movie.title}</Text>
        </View>
      </View>

      <View style={styles.detail_section}>
        <View style={styles.detail_section__container}>
          <CalendarBlank />
          <Text style={styles.detail_section__text}>{year} |</Text>
        </View>

        <View style={styles.detail_section__container}>
          <Clock />
          <Text style={styles.detail_section__text}>{runtime} Minutes |</Text>
        </View>

        <View style={styles.detail_section__container}>
          <Ticket />
          <Text style={styles.detail_section__text}>{genre}</Text>
        </View>
      </View>

      <Text style={styles.overview_text}>{movie.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
    gap: 24,
  },
  header_card: { height: 250 },
  backdrop_image: {
    width: '100%',
    height: 200,
    overflow: 'hidden',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  poster_image__container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 24,
    gap: 12,
  },
  poster_image: {
    width: 95,
    height: 120,
    borderRadius: 16,
  },
  movie_showcase: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.dark,
    margin: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text_vote_average: {
    color: colors.orange,
    fontSize: 12,
    letterSpacing: 0.12,
    fontWeight: 600,
  },
  movie_title: {
    fontSize: 18,
    fontWeight: 600,
    flexShrink: 1,
    width: '60%',
    top: '30%',
    color: colors.white,
  },
  detail_section: { flexDirection: 'row', justifyContent: 'center', gap: 4 },
  detail_section__text: {
    color: colors.mediumGray,
    fontSize: 12,
    letterSpacing: 0.12,
    fontWeight: 500,
  },
  detail_section__container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  overview_text: {
    color: colors.white,
    paddingHorizontal: 24,
    fontSize: 12,
    fontWeight: 400,
  },
});
