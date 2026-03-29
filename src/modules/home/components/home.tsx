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
import { Input, Tabs } from '@/src/components';
import { Movie, MovieListsTypes } from '@/src/models/movie';
import { IMAGE_BASE_URL } from '@/src/api/instance';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StrokeText } from '@charmy.tech/react-native-stroke-text';

interface HomeProps {
  popularMovies: Movie[];
  tabMovies: Movie[];
  onChangeTab: (tab: MovieListsTypes) => void;
  currentStep: MovieListsTypes;
  goToDetail: (item: Movie) => void;
  goToSearch: () => void;
}

export default function Home({
  popularMovies,
  tabMovies,
  onChangeTab,
  currentStep,
  goToDetail,
  goToSearch,
}: HomeProps) {
  const insets = useSafeAreaInsets();
  const tabItems = {
    'now-playing': 'Now playing',
    upcoming: 'Upcoming',
    'top-rated': 'Top rated',
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Movie; index: number }) => (
      <Pressable style={styles.banner_popular} onPress={() => goToDetail(item)}>
        <Image
          source={{ uri: IMAGE_BASE_URL + item?.poster_path }}
          style={styles.banner_popular__image}
        />
        <View style={styles.banner_popular__outline_text}>
          <StrokeText
            text={`${index + 1}`}
            fontSize={96}
            color={colors.dark}
            strokeColor={colors.primary}
            strokeWidth={2}
          />
        </View>
      </Pressable>
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
      style={{ backgroundColor: colors.dark, paddingTop: insets.top + 8 }}
    >
      <View style={{ gap: 24, paddingHorizontal: 24 }}>
        <Text style={styles.page_title}>What do you want to watch?</Text>

        <Input
          placeholder="Search"
          icon={icons.searchRight}
          editable={false}
          onPress={goToSearch}
        />
      </View>

      <FlatList
        data={popularMovies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        showsHorizontalScrollIndicator={false}
      />

      <View style={{ height: 8 }} />

      <Tabs
        currentTab={currentStep}
        onChangeTab={onChangeTab}
        tabItems={tabItems}
      >
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
          contentContainerStyle={{ paddingHorizontal: 24 }}
        />
      </Tabs>

      <View style={{ height: 8 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    gap: 24,
  },
  page_title: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.white,
  },
  banner_popular: {
    width: 145,
    height: 210,
    margin: 8,
  },
  banner_popular__image: {
    width: 145,
    height: 210,
    borderRadius: 16,
  },
  banner_popular__outline_text: {
    position: 'absolute',
    left: 10,
    bottom: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
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
