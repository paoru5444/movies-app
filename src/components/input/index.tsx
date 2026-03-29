import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
import { colors } from '@/src/constants/colors';

interface InputProps extends TextInputProps {
  icon: any;
}

export default function Input({ icon: Icon, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray}
        {...rest}
      />

      {Icon && (
        <TouchableOpacity>
          <Icon />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Platform.OS === 'ios' ? 42 : null,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.darkGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    flex: 1,
    color: colors.gray,
  },
});
