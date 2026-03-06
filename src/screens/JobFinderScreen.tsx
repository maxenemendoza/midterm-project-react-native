import React, { useRef } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

// components for the job finder screen
const JobFinderScreen = () => {
  const { colors }                       = useTheme();
  const navigation                       = useNavigation<Nav>();
  const { jobs, isLoading, error, refetch } = useJobFetcher();
  const { query, setQuery, filteredJobs }   = useJobSearch(jobs);
  const listRef = useRef<FlatList<Job> | null>(null);
  useScrollToTop(listRef as any);

  // apply for the job
  const handleApply = (job: Job) => {
    // navigate to the application form screen
    navigation.navigate('ApplicationForm', { job, fromSavedJobs: false });
  };

  // loads the jobs from the job finder screen
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

  // errors loading the jobs from the job finder screen
  if (error) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
        <ScreenHeader colors={colors} />
        <EmptyState
          icon="alert-triangle"
          title="Couldn't load jobs"
          subtitle={error}
          actionLabel="Try Again"
          onAction={refetch}
        />
      </SafeAreaView>
    );
  }

  // content of the job finder screen
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

        {/* list of jobs found */}
        <FlatList
          ref={listRef}
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onApply={handleApply}
              onPress={(job) =>
                navigation.navigate('JobDetails', { job })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            filteredJobs.length === 0
              ? styles.emptyListContent
              : styles.listContent
          }

          // empty state (no jobs found)
          ListEmptyComponent={
            <EmptyState
              icon="search"
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

// screen header for the job finder screen
interface HeaderProps {
  colors: ReturnType<typeof useTheme>['colors'];
}

const ScreenHeader = ({ colors }: HeaderProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.headerBar,
        {
          backgroundColor:   colors.surface,
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
};

export default JobFinderScreen;