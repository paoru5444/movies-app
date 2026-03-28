import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useCallback } from 'react';
import { colors } from '@/src/constants/colors';
import { icons } from '@/src/constants/icons';
import { Input } from '@/src/components';
import { Movie, Tabs } from '@/src/models/movie';
import { IMAGE_BASE_URL } from '@/src/api/instance';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HomeProps {
  popularMovies: Movie[];
  tabMovies: Movie[];
  onChangeTab: (tab: Tabs) => void;
  currentStep: Tabs;
  goToDetail: (item: Movie) => void;
}

export default function Home({
  popularMovies,
  tabMovies,
  onChangeTab,
  currentStep,
  goToDetail,
}: HomeProps) {
  const insets = useSafeAreaInsets();
  const isNowPlaying = currentStep === 'now-playing';
  const isTopRated = currentStep === 'top-rated';
  const isUpcoming = currentStep === 'upcoming';

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
        <Pressable
          onPress={() => onChangeTab('now-playing')}
          hitSlop={16}
          style={
            isNowPlaying
              ? styles.selected_tab_style__container
              : styles.tab_style__container
          }
        >
          <Text
            style={
              isNowPlaying
                ? styles.selected_tab_style__text
                : styles.tab_style__text
            }
          >
            Now playing
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onChangeTab('upcoming')}
          hitSlop={16}
          style={
            isUpcoming
              ? styles.selected_tab_style__container
              : styles.tab_style__container
          }
        >
          <Text
            style={
              isUpcoming
                ? styles.selected_tab_style__text
                : styles.tab_style__text
            }
          >
            Upcoming
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onChangeTab('top-rated')}
          hitSlop={16}
          style={
            isTopRated
              ? styles.selected_tab_style__container
              : styles.tab_style__container
          }
        >
          <Text
            style={
              isTopRated
                ? styles.selected_tab_style__text
                : styles.tab_style__text
            }
          >
            Top rated
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={tabMovies.slice(0, 6)}
        scrollEnabled={false}
        numColumns={3}
        initialNumToRender={6}
        renderItem={({ item }) => (
          <Pressable onPress={() => goToDetail(item)}>
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
  tab_style__text: {
    color: colors.white,
  },
  tab_style__container: {
    height: 30,
  },
  selected_tab_style__text: {
    color: colors.white,
    fontWeight: 600,
  },
  selected_tab_style__container: {
    borderBottomWidth: 4,
    height: 30,
    borderColor: colors.darkGray,
  },
});
