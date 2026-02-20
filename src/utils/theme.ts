// ─────────────────────────────────────────────────────────────────────────────
// utils/theme.ts
// Defines the light and dark colour palettes used by ThemeContext.
// ─────────────────────────────────────────────────────────────────────────────

import { ThemeColors } from '../types';

export const lightColors: ThemeColors = {
  background:    '#F4F6FB',
  surface:       '#FFFFFF',
  card:          '#FFFFFF',
  text:          '#1A1A2E',
  textSecondary: '#4A4A6A',
  textMuted:     '#8A8AAA',
  primary:       '#5C6BC0',
  primaryText:   '#FFFFFF',
  secondary:     '#E8EAF6',
  border:        '#DDE0F0',
  error:         '#D32F2F',
  success:       '#388E3C',
  warning:       '#F57C00',
  inputBackground: '#F0F1FA',
  tabBar:        '#FFFFFF',
  tabBarBorder:  '#DDE0F0',
  placeholder:   '#AAAACC',
  overlay:       'rgba(0,0,0,0.45)',
  danger:        '#FFEBEE',
  dangerText:    '#B71C1C',
};

export const darkColors: ThemeColors = {
  background:    '#10101E',
  surface:       '#1A1A2E',
  card:          '#16213E',
  text:          '#EAEAF5',
  textSecondary: '#A0A0C0',
  textMuted:     '#60608A',
  primary:       '#7986CB',
  primaryText:   '#FFFFFF',
  secondary:     '#1E2040',
  border:        '#2A2A4A',
  error:         '#EF5350',
  success:       '#66BB6A',
  warning:       '#FFA726',
  inputBackground: '#1E2040',
  tabBar:        '#1A1A2E',
  tabBarBorder:  '#2A2A4A',
  placeholder:   '#50508A',
  overlay:       'rgba(0,0,0,0.65)',
  danger:        '#2C1515',
  dangerText:    '#EF9A9A',
};