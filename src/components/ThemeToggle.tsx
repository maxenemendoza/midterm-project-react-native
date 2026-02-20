// ─────────────────────────────────────────────────────────────────────────────
// components/ThemeToggle.tsx
// A pill-shaped button in the header that switches between dark and light mode.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles/ThemeToggle.styles';

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.primary : colors.secondary,
          borderColor: colors.border,
        },
      ]}
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      accessibilityRole="button"
      activeOpacity={0.75}
    >
      <View style={styles.row}>
        <Text style={styles.icon}>{isDark ? '☀️' : '🌙'}</Text>
        <Text
          style={[
            styles.label,
            { color: isDark ? colors.primaryText : colors.primary },
          ]}
        >
          {isDark ? 'Light' : 'Dark'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ThemeToggle;