import { View, Text, Image, ImageBackground } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Header } from '../../../components';
import { colors } from '../../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Movie } from '../../../models/movie';
import { IMAGE_BASE_URL } from '../../../api/instance';
import Star from '../../../../assets/icons/star.svg';
import CalendarBlank from '../../../../assets/icons/calendar-blank.svg';
import Clock from '../../../../assets/icons/clock.svg';
import Ticket from '../../../../assets/icons/ticket.svg';

export default function DetailScreen() {
  const route = useRoute();
  console.log('route: ', route);
  const { movie }: { movie: Movie } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: colors.dark,
        paddingTop: insets.top,
        flex: 1,
        gap: 24,
      }}
    >
      <Header pageTitle="Detail" containerStyle={{ paddingHorizontal: 24 }} />

      <View style={{ height: 250 }}>
        <ImageBackground
          source={{ uri: IMAGE_BASE_URL + movie.backdrop_path }}
          style={{
            width: '100%',
            height: 200,
            overflow: 'hidden',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              backgroundColor: colors.dark,
              margin: 10,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Star />
            <Text
              style={{
                color: colors.orange,
                fontSize: 12,
                letterSpacing: 0.12,
                fontWeight: 600,
              }}
            >
              9.5
            </Text>
          </View>
        </ImageBackground>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: 24,
            gap: 12,
          }}
        >
          <Image
            source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
            style={{ width: 95, height: 120, borderRadius: 16 }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              flexShrink: 1,
              width: '60%',
              top: '30%',
              color: colors.white,
            }}
          >
            {movie.title}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
        <CalendarBlank />
        <Text
          style={{
            color: colors.mediumGray,
            fontSize: 12,
            letterSpacing: 0.12,
            fontWeight: 500,
          }}
        >
          2021 |
        </Text>
        <Clock />
        <Text
          style={{
            color: colors.mediumGray,
            fontSize: 12,
            letterSpacing: 0.12,
            fontWeight: 500,
          }}
        >
          148 Minutes |
        </Text>
        <Ticket />
        <Text
          style={{
            color: colors.mediumGray,
            fontSize: 12,
            letterSpacing: 0.12,
            fontWeight: 500,
          }}
        >
          Action
        </Text>
      </View>

      <Text
        style={{
          color: colors.white,
          paddingHorizontal: 24,
          fontSize: 12,
          fontWeight: 400,
        }}
      >
        {movie.overview}
      </Text>
    </View>
  );
}
