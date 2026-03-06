import React from 'react';
import { Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles/ThemeToggle.styles';

const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <Pressable
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
    >
      <Feather
        name={isDark ? 'sun' : 'moon'}
        size={18}
        color={isDark ? colors.primaryText : colors.primary}
      />
    </Pressable>
  );
};

export default ThemeToggle;