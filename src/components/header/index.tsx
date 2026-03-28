import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { colors } from '../../constants/colors';
import { FilterImage } from 'react-native-svg/filter-image';
import ArrowLeft from '../../../assets/icons/arrow-left.svg';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  pageTitle: string;
  hasBookmark?: boolean;
  containerStyle?: StyleProp<ViewStyle> | undefined;
}

export default function Header({
  pageTitle,
  hasBookmark,
  containerStyle,
}: HeaderProps) {
  const navigation = useNavigation();
  return (
    <View
      style={[
        containerStyle,
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 36,
        },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeft style={{ width: 20, height: 20 }} />
      </TouchableOpacity>

      <Text style={{ fontSize: 16, fontWeight: 600, color: colors.white }}>
        {pageTitle}
      </Text>

      <View>
        {hasBookmark && (
          <TouchableOpacity>
            <FilterImage />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
