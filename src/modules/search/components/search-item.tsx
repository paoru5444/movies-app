import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IMAGE_BASE_URL } from '@/src/api/instance';
import { colors } from '@/src/constants/colors';
import { Movie } from '@/src/models/movie';
import Star from '@/assets/icons/star.svg';
import Ticket from '@/assets/icons/ticket.svg';
import CalendarBlank from '@/assets/icons/calendar-blank.svg';
import Clock from '@/assets/icons/clock.svg';

interface SearchItemProps {
  item: Movie;
  goToDetail: (item: Movie) => void;
  getMovieDetail: (id: number) => any;
}

export default function SearchItem({
  item,
  goToDetail,
  getMovieDetail,
}: SearchItemProps) {
  const [detail, setDetail] = useState({
    release_date: '',
    genres: [],
    runtime: '',
  });

  useEffect(() => {
    getMovieDetail(item.id).then(setDetail);
  }, []);

  const year = detail.release_date?.split('-')[0];
  const genre = detail.genres?.[0]?.name || '';
  const runtime = detail?.runtime;

  return (
    <Pressable style={styles.search_card} onPress={() => goToDetail(item)}>
      <Image
        source={{ uri: IMAGE_BASE_URL + item?.poster_path }}
        style={styles.search_card__image}
      />

      <View style={styles.search_card__text_area}>
        <Text style={styles.search_title}>{item.original_title}</Text>

        <View style={styles.search_card__detail_area}>
          {item?.vote_average && (
            <View style={styles.search_detail__container}>
              <Star />
              <Text style={styles.search_detail__vote_average}>
                {item.vote_average}
              </Text>
            </View>
          )}
          {genre && (
            <View style={styles.search_detail__container}>
              <Ticket />
              <Text style={styles.search_detail__text}>{genre}</Text>
            </View>
          )}
          {year && (
            <View style={styles.search_detail__container}>
              <CalendarBlank />
              <Text style={styles.search_detail__text}>{year}</Text>
            </View>
          )}
          {runtime && (
            <View style={styles.search_detail__container}>
              <Clock />
              <Text style={styles.search_detail__text}>{runtime} minutes</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  search_card: {
    // width: 95,
    height: 120,
    flexDirection: 'row',
    gap: 16,
  },
  search_card__image: {
    width: 95,
    height: 120,
    borderRadius: 16,
  },
  search_title: { fontSize: 16, color: colors.white },
  search_detail__container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  search_detail__text: { fontSize: 12, color: colors.white },
  search_detail__vote_average: {
    fontSize: 12,
    color: colors.orange,
    fontWeight: 600,
  },
  search_card__text_area: {
    justifyContent: 'space-around',
    gap: 12,
  },
  search_card__detail_area: {
    gap: 5,
    flex: 1,
  },
});
