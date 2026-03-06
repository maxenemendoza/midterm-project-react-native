import React from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Job, ThemeColors } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobsContext';
import { styles } from '../styles/JobCard.styles';
import { stripHtml } from '../utils/stripHtml';

// props
interface JobCardProps {
  job:          Job;
  onApply:      (job: Job) => void;
  showRemove?:  boolean;
  onRemove?:    (jobId: string) => void;
  onPress?:     (job: Job) => void;
}

// sub-component: tag pill
interface TagProps {
  icon:   string;
  label:  string;
  colors: ThemeColors;
}

const Tag = ({ icon, label, colors }: TagProps) => (
  <View
    style={[
      styles.tag,
      {
        backgroundColor: colors.inputBackground,
        borderColor:     colors.border,
      },
    ]}
  >
    <Feather
      name={icon as any}
      size={12}
      color={colors.textSecondary}
      style={styles.tagIcon}
    />
    <Text
      style={[styles.tagLabel, { color: colors.textSecondary }]}
      numberOfLines={1}
    >
      {label}
    </Text>
  </View>
);

// main component 
const JobCard = ({ job, onApply,  showRemove = false, onRemove, onPress,
}: JobCardProps) => {
  const { colors } = useTheme();
  const { saveJob, isJobSaved, isJobApplied, clearJobApplication } = useJobs();

  const saved = isJobSaved(job.id);
  const applied = isJobApplied(job.id);

  const handleSave = () => {
    if (!saved) saveJob(job);
  };

  return (
    <Pressable
      onPress={onPress ? () => onPress(job) : undefined}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor:     colors.border,
          shadowColor:     colors.text,
        },
      ]}
    >
      {/* header */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          {job.logoUrl ? (
            <Image
              source={{ uri: job.logoUrl }}
              style={styles.companyLogo}
              resizeMode="contain"
            />
          ) : (
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>
                {job.companyName.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.headerInfo}>
          <Text
            style={[styles.jobTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {job.title}
          </Text>
          <Text style={[styles.companyName, { color: colors.primary }]}>
            {job.companyName}
          </Text>
        </View>
      </View>

      {/* tags */}
      <View style={styles.tags}>
        <Tag icon="map-pin" label={job.location} colors={colors} />
        <Tag icon="briefcase" label={job.jobType}  colors={colors} />
        {job.remote && <Tag icon="home" label="Remote" colors={colors} />}
        {job.category && <Tag icon="tag" label={job.category} colors={colors} />}
      </View>

      {/* salary */}
      <View style={[styles.salaryBand, { backgroundColor: colors.secondary }]}>
        <Text style={[styles.salaryText, { color: colors.primary }]}>
          {job.salary}
        </Text>
      </View>

      {/* action buttons */}
      <View style={styles.actions}>
        {applied ? (
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: colors.secondary,
                borderColor:     colors.primary,
              },
            ]}
            onPress={() =>
              Alert.alert(
                'Cancel application?',
                `Do you want to cancel your application for “${job.title}”?`,
                [
                  { text: 'Keep', style: 'cancel' },
                  {
                    text: 'Cancel application',
                    style: 'destructive',
                    onPress: () => clearJobApplication(job.id),
                  },
                ]
              )
            }
            accessibilityLabel={`Cancel application for ${job.title}`}
          >
            <Text
              style={[
                styles.btnText,
                { color: colors.primary },
              ]}
            >
              Cancel application
            </Text>
          </Pressable>
        ) : showRemove ? (
          /* remove button — shown on the Saved Jobs screen */
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: colors.danger,
                borderColor:     colors.dangerText,
              },
            ]}
            onPress={() => onRemove?.(job.id)}
            accessibilityLabel={`Remove ${job.title} from saved jobs`}
          >
            <Text style={[styles.btnText, { color: colors.dangerText }]}>
              Remove
            </Text>
          </Pressable>
        ) : (
          /* save button — shown on the Job Finder screen */
          <Pressable
            style={[
              styles.btn,
              {
                backgroundColor: saved ? colors.success : colors.secondary,
                borderColor:     saved ? colors.success : colors.primary,
              },
            ]}
            onPress={handleSave}
            disabled={saved}
            accessibilityLabel={saved ? `${job.title} already saved` : `Save ${job.title}`}
          >
            <Text
              style={[
                styles.btnText,
                { color: saved ? '#FFFFFF' : colors.primary },
              ]}
            >
              {saved ? 'Saved' : 'Save Job'}
            </Text>
          </Pressable>
        )}

        {/* apply button */}
        <Pressable
          style={[
            styles.btn,
            {
              backgroundColor: applied ? colors.surface : colors.primary,
              borderColor:     applied ? colors.border : colors.primary,
            },
          ]}
          onPress={() => {
            if (!applied) onApply(job);
          }}
          disabled={applied}
          accessibilityLabel={
            applied ? `${job.title} already applied` : `Apply for ${job.title}`
          }
        >
          <Text
            style={[
              styles.btnText,
              { color: applied ? colors.textMuted : colors.primaryText },
            ]}
          >
            {applied ? 'Applied' : 'Apply'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default JobCard;