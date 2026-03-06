import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles/EmptyState.styles';

// props 
interface EmptyStateProps {
  icon?:         string;
  title:         string;
  subtitle?:     string;
  actionLabel?:  string;
  onAction?:     () => void;
}

// component
const EmptyState = ({ icon, title, subtitle, actionLabel, onAction, }: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {icon && (
        <Feather
          name={icon as any}
          size={40}
          color={colors.textMuted}
          style={styles.icon}
        />
      )}

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      )}

      {actionLabel && onAction && (
        <Pressable
          style={[styles.actionBtn, { backgroundColor: colors.primary }]}
          onPress={onAction}
        >
          <Text style={[styles.actionBtnText, { color: colors.primaryText }]}>
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default EmptyState;