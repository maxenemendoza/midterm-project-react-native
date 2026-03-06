import React from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles/SearchBar.styles';

// props 
interface SearchBarProps {
  value:          string;
  onChangeText:   (text: string) => void;
  placeholder?:   string;
}

// component 
const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search jobs, companies, locations…',
}: SearchBarProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <Feather name="search" size={16} color={colors.textMuted} style={styles.searchIcon} />

        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel="Job search input"
          accessibilityHint="Type to filter jobs by title, company or location"
        />

        {value.length > 0 && (
          <Pressable
            onPress={() => onChangeText('')}
            accessibilityLabel="Clear search"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="x-circle" size={16} color={colors.textMuted} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SearchBar;