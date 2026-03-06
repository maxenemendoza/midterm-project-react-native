import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Job, RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobsContext';

import ThemeToggle from '../components/ThemeToggle';
import JobCard     from '../components/JobCard';
import EmptyState  from '../components/EmptyState';

import { styles } from '../styles/SavedJobsScreen.styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;

// components for the saved jobs screen
const SavedJobsScreen = () => {
  const { colors }          = useTheme(); 
  const { savedJobs, removeJob } = useJobs(); 
  const navigation          = useNavigation<Nav>(); 
  const insets              = useSafeAreaInsets(); 

  // apply for the saved job
  const handleApply = (job: Job) => {
    // navigate to the application form screen
    navigation.navigate('ApplicationForm', { job, fromSavedJobs: true });
  };

  // remove the saved job from the saved jobs screen
  const handleRemove = (jobId: string) => {
    const job = savedJobs.find((j) => j.id === jobId);
    Alert.alert(
      'Remove saved job?',
      `Do you want to remove “${job?.title ?? 'this job'}” from your saved jobs?`,
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeJob(jobId),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* header of the saved jobs screen */}
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

      {/* content of the saved jobs screen */}
      <View style={styles.content}>
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onApply={handleApply} // calls the function to apply for the saved job
              showRemove
              onRemove={handleRemove} // calls the function to remove the saved job 
              onPress={(job) =>
                navigation.navigate('JobDetails', { job })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            // if no saved jobs, show the empty state
            savedJobs.length === 0
              ? styles.emptyListContent
              : styles.listContent
          }

          // empty state (no saved jobs)
          ListEmptyComponent={
            <EmptyState
              icon="bookmark"
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