import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import React, { useCallback } from 'react';
import { Header } from '@/src/components';
import { colors } from '@/src/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchItem from '../../search/components/search-item';
import { Movie } from '@/src/models/movie';
import { images } from '@/src/constants/images';

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

  const ListEmptyComponent = () => (
    <View style={styles.empty_list__container}>
      <Image source={images.noMovieSaved} width={76} height={76} />

      <View style={{ height: 8 }} />

      <Text style={styles.empty_list__title}>There is no movie yet!</Text>
      <Text style={styles.empty_list__description}>
        Find your movie by Type title,{'\n'}categories, years, etc{' '}
      </Text>
    </View>
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
        ListEmptyComponent={ListEmptyComponent}
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
  empty_list__container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  empty_list__title: { color: colors.white, fontWeight: 600, fontSize: 16 },
  empty_list__description: {
    textAlign: 'center',
    color: colors.gray,
    fontSize: 12,
  },
});
