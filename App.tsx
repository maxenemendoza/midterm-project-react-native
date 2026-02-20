// ─────────────────────────────────────────────────────────────────────────────
// App.tsx
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { JobsProvider }            from './src/context/JobsContext';
import AppNavigator                from './src/navigation/AppNavigator';

// ─── Inner app ────────────────────────────────────────────────────────────────

const InnerApp = () => {
  const { isDark, colors } = useTheme();

  return (
    <>
      {/*
        On Android, StatusBar must receive an explicit backgroundColor —
        otherwise the bar stays the system default and SafeAreaView won't
        account for it.  translucent={false} keeps the bar opaque so content
        never scrolls underneath it.
      */}
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.surface}   // matches your header / surface colour
        translucent={false}                // Android: bar takes up real space
      />

      <JobsProvider>
        <AppNavigator />
      </JobsProvider>
    </>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    // SafeAreaProvider is required by react-native-safe-area-context.
    // Wrap the whole tree here so every screen's SafeAreaView works correctly.
    <SafeAreaProvider>
      <ThemeProvider>
        <InnerApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}