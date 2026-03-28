import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { colors } from '@/src/constants/colors';
import { icons } from '@/src/constants/icons';
import { Input } from '@/src/components';
import { Movie } from '@/src/models/movie';
import { IMAGE_BASE_URL } from '@/src/api/instance';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

interface HomeProps {
  popularMovies: Movie[];
}

export default function Home({ popularMovies }: HomeProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [currentStep, setCurrentStep] = useState<
    'now-playing' | 'upcome' | 'top-rated'
  >('now-playing');

  const renderItem = useCallback(
    ({ item, index }: { item: Movie; index: number }) => (
      <View style={styles.banner_popular}>
        <Image
          source={{ uri: IMAGE_BASE_URL + item?.poster_path }}
          style={styles.banner_popular__image}
        />
        <Text style={styles.banner_popular__outline_text}>{index + 1}</Text>
      </View>
    ),
    [],
  );

  const keyExtractor = (item: Movie) => `${item.id}`;

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.list_item_separator} />,
    [],
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: colors.dark, paddingTop: insets.top }}
    >
      <Text style={styles.page_title}>What do you want to watch?</Text>

      <Input placeholder="Search" icon={icons.searchRight} />

      <FlatList
        data={popularMovies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        ItemSeparatorComponent={ItemSeparatorComponent}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Pressable onPress={() => setCurrentStep('now-playing')}>
          <Text style={{ color: colors.white }}>Now playing</Text>
        </Pressable>

        <Pressable onPress={() => setCurrentStep('now-playing')}>
          <Text style={{ color: colors.white }}>Upcoming</Text>
        </Pressable>

        <Pressable onPress={() => setCurrentStep('now-playing')}>
          <Text style={{ color: colors.white }}>Top rated</Text>
        </Pressable>
      </View>

      <FlatList
        data={popularMovies.slice(0, 6)}
        scrollEnabled={false}
        numColumns={3}
        initialNumToRender={6}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Detail', { movie: item })}
          >
            <Image
              source={{ uri: IMAGE_BASE_URL + item?.poster_path }}
              style={styles.banner_movie_list__image}
            />
          </Pressable>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    gap: 24,
    paddingHorizontal: 24,
  },
  page_title: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.white,
  },
  banner_popular: {
    width: 145,
    height: 210,
  },
  banner_popular__image: {
    width: 145,
    height: 210,
    borderRadius: 16,
  },
  banner_popular__outline_text: {
    position: 'absolute',
    left: -15,
    bottom: -30,
    fontSize: 96,
    color: colors.dark,
    textShadowColor: 'blue',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
  },
  list_item_separator: {
    width: 16,
  },
  banner_movie_list__image: {
    width: 100,
    height: 145,
    borderRadius: 16,
    margin: 8,
  },
});
