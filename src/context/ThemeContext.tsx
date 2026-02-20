// ─────────────────────────────────────────────────────────────────────────────
// context/ThemeContext.tsx
// Provides dark / light mode state and a toggle action to the entire tree.
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { ThemeColors, ThemeMode } from '../types';
import { lightColors, darkColors } from '../utils/theme';

// ─── Context shape ────────────────────────────────────────────────────────────

interface ThemeContextValue {
  mode:        ThemeMode;
  colors:      ThemeColors;
  isDark:      boolean;
  toggleTheme: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value: ThemeContextValue = {
    mode,
    colors: mode === 'dark' ? darkColors : lightColors,
    isDark: mode === 'dark',
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the current theme context value.
 * Must be called inside a component wrapped by <ThemeProvider>.
 */
export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be called inside a <ThemeProvider>.');
  }
  return ctx;
};