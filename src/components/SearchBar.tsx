import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

type CustomSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder'>;

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search movies...',
  ...rest
}) => {
  return (
    <TextInput
      style={styles.search}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  search: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
