import { View, FlatList, ScrollView, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { Header } from '@/src/components';
import { colors } from '@/src/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchItem from '../../search/components/search-item';
import { Movie } from '@/src/models/movie';

export default function WatchList({ goToDetail, movies }) {
  const insets = useSafeAreaInsets();

  const renderItem = useCallback(
    ({ item }: { item: Movie }) => (
      <SearchItem item={item} goToDetail={goToDetail} />
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
      <Header pageTitle="Watch List" />

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
  },
  list_item_separator: {
    height: 16,
  },
});
