import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import React, { useCallback } from 'react';
import { Movie } from '@/src/models/movie';
import { colors } from '@/src/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, Input } from '@/src/components';
import { icons } from '@/src/constants/icons';
import SearchItem from './search-item';

interface SearchProps {
  movies: Movie[];
  goToDetail: (item: Movie) => void;
  search: string;
  onChangeSearch: (search: string) => void;
  getMovieDetail: (id: number) => void;
}

export default function Search({
  movies,
  goToDetail,
  search,
  onChangeSearch,
  getMovieDetail,
}: SearchProps) {
  const insets = useSafeAreaInsets();

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <SearchItem
        item={item}
        goToDetail={goToDetail}
        getMovieDetail={getMovieDetail}
      />
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
      <Header pageTitle="Search" />

      <Input
        placeholder="Search your movie typing here"
        icon={icons.searchRight}
        value={search}
        onChangeText={onChangeSearch}
      />

      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />

      <View style={{ height: 16 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    gap: 24,
    paddingHorizontal: 24,
    flex: 1,
  },
  list_item_separator: {
    height: 16,
  },
});
