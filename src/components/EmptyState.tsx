// ─────────────────────────────────────────────────────────────────────────────
// components/EmptyState.tsx
// Centred placeholder shown when a list is empty or an error has occurred.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles/EmptyState.styles';

// ─── Props ────────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon:          string;
  title:         string;
  subtitle?:     string;
  actionLabel?:  string;
  onAction?:     () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const EmptyState = ({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      )}

      {actionLabel && onAction && (
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: colors.primary }]}
          onPress={onAction}
          activeOpacity={0.8}
        >
          <Text style={[styles.actionBtnText, { color: colors.primaryText }]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyState;