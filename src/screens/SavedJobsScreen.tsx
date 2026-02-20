// ─────────────────────────────────────────────────────────────────────────────
// screens/SavedJobsScreen.tsx
// Displays the list of jobs the user has saved.
// Each card has a Remove button (unsave) and an Apply button.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Job, RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobsContext';

import ThemeToggle from '../components/ThemeToggle';
import JobCard     from '../components/JobCard';
import EmptyState  from '../components/EmptyState';

import { styles } from '../styles/SavedJobsScreen.styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// ─── Component ────────────────────────────────────────────────────────────────

const SavedJobsScreen = () => {
  const { colors }          = useTheme();
  const { savedJobs, removeJob } = useJobs();
  const navigation          = useNavigation<Nav>();

  const handleApply = (job: Job) => {
    navigation.navigate('ApplicationForm', { job, fromSavedJobs: true });
  };

  const handleRemove = (jobId: string) => {
    removeJob(jobId);
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
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
            Saved Jobs
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
            {savedJobs.length}{' '}
            {savedJobs.length === 1 ? 'job' : 'jobs'} saved
          </Text>
        </View>
        <ThemeToggle />
      </View>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <View style={styles.content}>
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onApply={handleApply}
              showRemove
              onRemove={handleRemove}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            savedJobs.length === 0
              ? styles.emptyListContent
              : styles.listContent
          }
          ListEmptyComponent={
            <EmptyState
              icon="🔖"
              title="No saved jobs yet"
              subtitle="Browse the Job Finder tab and tap 'Save Job' on any listing to keep it here."
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default SavedJobsScreen;