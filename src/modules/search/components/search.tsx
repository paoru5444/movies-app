import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useCallback } from 'react';
import { Movie } from '@/src/models/movie';
import { IMAGE_BASE_URL } from '@/src/api/instance';
import { colors } from '@/src/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, Input } from '@/src/components';
import { icons } from '@/src/constants/icons';

interface SearchProps {
  movies: Movie[];
  goToDetail: (item: Movie) => void;
  search: string;
  onChangeSearch: (search: string) => void;
}

export default function Search({
  movies,
  goToDetail,
  search,
  onChangeSearch,
}: SearchProps) {
  const insets = useSafeAreaInsets();

  const renderItem = useCallback(({ item }: { item: Movie }) => {
    return (
      <Pressable style={styles.banner_popular} onPress={() => goToDetail(item)}>
        <Image
          source={{ uri: IMAGE_BASE_URL + item?.poster_path }}
          style={styles.banner_popular__image}
        />

        <View style={{ justifyContent: 'space-around' }}>
          <Text style={{ fontSize: 16, color: colors.white }}>
            {item.original_title}
          </Text>

          <View style={{ gap: 4 }}>
            <Text style={{ fontSize: 12, color: colors.white }}>9,5</Text>
            <Text style={{ fontSize: 12, color: colors.white }}>Action</Text>
            <Text style={{ fontSize: 12, color: colors.white }}>2019</Text>
            <Text style={{ fontSize: 12, color: colors.white }}>
              139 minutes
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }, []);

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
  page_title: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.white,
  },
  banner_popular: {
    // width: 95,
    height: 120,
    flexDirection: 'row',
    gap: 16,
  },
  banner_popular__image: {
    width: 95,
    height: 120,
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
    height: 16,
  },
  banner_movie_list__image: {
    width: 100,
    height: 145,
    borderRadius: 16,
    margin: 8,
  },
});
