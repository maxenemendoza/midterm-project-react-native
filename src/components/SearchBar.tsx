// ─────────────────────────────────────────────────────────────────────────────
// components/SearchBar.tsx
// Controlled search input with a clear button and themed colours.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles/SearchBar.styles';

// ─── Props ────────────────────────────────────────────────────────────────────

interface SearchBarProps {
  value:          string;
  onChangeText:   (text: string) => void;
  placeholder?:   string;
}

// ─── Component ────────────────────────────────────────────────────────────────

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
        <Text style={styles.searchIcon}>🔍</Text>

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
          <TouchableOpacity
            onPress={() => onChangeText('')}
            accessibilityLabel="Clear search"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={[styles.clearBtn, { color: colors.textMuted }]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;