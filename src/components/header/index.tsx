import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { colors } from '@/src/constants/colors';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import TopBarRight from '@/assets/icons/top-bar-right.svg';
import Bookmark from '@/assets/icons/bookmark.svg';

import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  pageTitle: string;
  hasBookmark?: boolean;
  onPressBookmark?: () => void;
  containerStyle?: StyleProp<ViewStyle> | undefined;
  isBookmarked: boolean;
}

export default function Header({
  pageTitle,
  hasBookmark,
  onPressBookmark,
  containerStyle,
  isBookmarked,
}: HeaderProps) {
  const navigation = useNavigation();
  return (
    <View style={[containerStyle, styles.container]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeft style={styles.goback_icon} />
      </TouchableOpacity>

      <Text style={styles.pageTitle}>{pageTitle}</Text>

      <View>
        {hasBookmark && (
          <TouchableOpacity onPress={onPressBookmark}>
            {isBookmarked ? <TopBarRight /> : <Bookmark />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 36,
  },
  goback_icon: { width: 20, height: 20 },
  pageTitle: { fontSize: 16, fontWeight: 600, color: colors.white },
});
