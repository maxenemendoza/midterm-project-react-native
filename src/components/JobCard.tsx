// ─────────────────────────────────────────────────────────────────────────────
// components/JobCard.tsx
// Displays a single job listing with save / remove and apply actions.
//
// Props:
//   job        – the Job to render
//   onApply    – called when the Apply button is pressed
//   showRemove – when true, shows a Remove button instead of the Save button
//   onRemove   – called with the job id when Remove is pressed
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Job, ThemeColors } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobsContext';
import { styles } from '../styles/JobCard.styles';
import { stripHtml } from '../utils/stripHtml';

// ─── Props ────────────────────────────────────────────────────────────────────

interface JobCardProps {
  job:          Job;
  onApply:      (job: Job) => void;
  showRemove?:  boolean;
  onRemove?:    (jobId: string) => void;
}

// ─── Sub-component: Tag pill ──────────────────────────────────────────────────

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
    <Text style={styles.tagIcon}>{icon}</Text>
    <Text
      style={[styles.tagLabel, { color: colors.textSecondary }]}
      numberOfLines={1}
    >
      {label}
    </Text>
  </View>
);

// ─── Main component ───────────────────────────────────────────────────────────

const JobCard = ({
  job,
  onApply,
  showRemove = false,
  onRemove,
}: JobCardProps) => {
  const { colors } = useTheme();
  const { saveJob, isJobSaved } = useJobs();

  const saved = isJobSaved(job.id);

  const handleSave = () => {
    if (!saved) saveJob(job);
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor:     colors.border,
          shadowColor:     colors.text,
        },
      ]}
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>
              {job.companyName.charAt(0).toUpperCase()}
            </Text>
          </View>
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

      {/* ── Tags ─────────────────────────────────────────────────────────── */}
      <View style={styles.tags}>
        <Tag icon="📍" label={job.location} colors={colors} />
        <Tag icon="💼" label={job.jobType}  colors={colors} />
        {job.remote && <Tag icon="🏠" label="Remote" colors={colors} />}
        {job.category && <Tag icon="🏷" label={job.category} colors={colors} />}
      </View>

      {/* ── Salary ───────────────────────────────────────────────────────── */}
      <View style={[styles.salaryBand, { backgroundColor: colors.secondary }]}>
        <Text style={styles.salaryIcon}>💰</Text>
        <Text style={[styles.salaryText, { color: colors.primary }]}>
          {job.salary}
        </Text>
      </View>

      {/* ── Description preview ──────────────────────────────────────────── */}
      <Text
        style={[styles.description, { color: colors.textSecondary }]}
        numberOfLines={2}
      >
        {stripHtml(job.description)}
      </Text>

      {/* ── Action buttons ───────────────────────────────────────────────── */}
      <View style={styles.actions}>
        {showRemove ? (
          /* Remove button — shown on the Saved Jobs screen */
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: colors.danger,
                borderColor:     colors.dangerText,
              },
            ]}
            onPress={() => onRemove?.(job.id)}
            accessibilityLabel={`Remove ${job.title} from saved jobs`}
            activeOpacity={0.8}
          >
            <Text style={[styles.btnText, { color: colors.dangerText }]}>
              🗑  Remove
            </Text>
          </TouchableOpacity>
        ) : (
          /* Save button — shown on the Job Finder screen */
          <TouchableOpacity
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
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.btnText,
                { color: saved ? '#FFFFFF' : colors.primary },
              ]}
            >
              {saved ? '✓  Saved' : '🔖  Save Job'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Apply button — always visible */}
        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: colors.primary,
              borderColor:     colors.primary,
            },
          ]}
          onPress={() => onApply(job)}
          accessibilityLabel={`Apply for ${job.title}`}
          activeOpacity={0.8}
        >
          <Text style={[styles.btnText, { color: colors.primaryText }]}>
            📝  Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobCard;