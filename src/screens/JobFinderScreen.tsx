// ─────────────────────────────────────────────────────────────────────────────
// screens/JobFinderScreen.tsx
// Main screen: fetches jobs from the API, supports search filtering,
// and lets users save or apply for any listing.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Job, RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useJobFetcher } from '../hooks/useJobFetcher';
import { useJobSearch } from '../hooks/useJobSearch';

import ThemeToggle from '../components/ThemeToggle';
import SearchBar   from '../components/SearchBar';
import JobCard     from '../components/JobCard';
import EmptyState  from '../components/EmptyState';

import { styles } from '../styles/JobFinderScreen.styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// ─── Component ────────────────────────────────────────────────────────────────

const JobFinderScreen = () => {
  const { colors }                       = useTheme();
  const navigation                       = useNavigation<Nav>();
  const { jobs, isLoading, error, refetch } = useJobFetcher();
  const { query, setQuery, filteredJobs }   = useJobSearch(jobs);

  const handleApply = (job: Job) => {
    navigation.navigate('ApplicationForm', { job, fromSavedJobs: false });
  };

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <ScreenHeader colors={colors} />
        <View style={styles.centeredFill}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Fetching latest jobs…
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <ScreenHeader colors={colors} />
        <EmptyState
          icon="⚠️"
          title="Couldn't load jobs"
          subtitle={error}
          actionLabel="Try Again"
          onAction={refetch}
        />
      </SafeAreaView>
    );
  }

  // ── Main content ──────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader colors={colors} />

      <View style={styles.content}>
        <SearchBar value={query} onChangeText={setQuery} />

        <Text style={[styles.resultCount, { color: colors.textMuted }]}>
          {filteredJobs.length}{' '}
          {filteredJobs.length === 1 ? 'job' : 'jobs'} found
          {query.trim() ? ` for "${query.trim()}"` : ''}
        </Text>

        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard job={item} onApply={handleApply} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filteredJobs.length === 0
              ? styles.emptyListContent
              : styles.listContent
          }
          ListEmptyComponent={
            <EmptyState
              icon="🔍"
              title="No jobs found"
              subtitle={
                query.trim()
                  ? `No results for "${query.trim()}". Try a different search term.`
                  : 'No jobs are available at the moment.'
              }
              actionLabel={query.trim() ? 'Clear Search' : undefined}
              onAction={query.trim() ? () => setQuery('') : undefined}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

// ─── Screen header (extracted to avoid repetition inside conditionals) ────────

interface HeaderProps {
  colors: ReturnType<typeof useTheme>['colors'];
}

const ScreenHeader = ({ colors }: HeaderProps) => (
  <View
    style={[
      styles.headerBar,
      {
        backgroundColor:  colors.surface,
        borderBottomColor: colors.border,
      },
    ]}
  >
    <View>
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        Job Finder
      </Text>
      <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
        Find your dream career
      </Text>
    </View>
    <ThemeToggle />
  </View>
);

export default JobFinderScreen;