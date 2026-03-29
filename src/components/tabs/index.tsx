import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '@/src/constants/colors';
import { MovieListsTypes } from '@/src/models/movie';

interface TabsProps {
  onChangeTab: (tab: MovieListsTypes) => void;
  currentTab: MovieListsTypes;
  tabItems: any;
  children: React.ReactNode;
}

export default function Tabs({
  onChangeTab,
  currentTab,
  tabItems,
  children,
}: TabsProps) {
  return (
    <View>
      <View style={styles.tab_items__container}>
        {Object.entries(tabItems)?.map(([key, value]) => (
          <Pressable
            onPress={() => onChangeTab(key as MovieListsTypes)}
            hitSlop={16}
            style={
              currentTab === key
                ? styles.selected_tab_style__container
                : styles.tab_style__container
            }
            key={value}
          >
            <Text
              style={
                currentTab === key
                  ? styles.selected_tab_style__text
                  : styles.tab_style__text
              }
            >
              {value}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ height: 16 }} />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tab_items__container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
