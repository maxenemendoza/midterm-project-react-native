import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Job } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobsContext';
import { stripHtml } from '../utils/stripHtml';
import { styles as formStyles } from '../styles/ApplicationFormScreen.styles';
import { styles as cardStyles } from '../styles/JobCard.styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'JobDetails'>;

const JobDetailsScreen = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { colors } = useTheme();
  const { job } = route.params;
  const { isJobApplied } = useJobs();
  const applied = isJobApplied(job.id);

  const descriptionBullets = stripHtml(job.description)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const handleApply = (selectedJob: Job) => {
    navigation.navigate('ApplicationForm', { job: selectedJob, fromSavedJobs: false });
  };

  return (
    <SafeAreaView style={[formStyles.screen, { backgroundColor: colors.background }]}>
      <View
        style={[
          formStyles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Text
          style={[formStyles.backIcon, { color: colors.primary }]}
          onPress={() => navigation.goBack()}
        >
          ←
        </Text>
        <View style={formStyles.headerCenter}>
          <Text style={[formStyles.headerTitle, { color: colors.text }]} numberOfLines={1}>
            Job Details
          </Text>
          <Text style={[formStyles.headerSub, { color: colors.textMuted }]} numberOfLines={1}>
            {job.title}
          </Text>
        </View>
      </View>

      <ScrollView
        style={formStyles.flex}
        contentContainerStyle={formStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* summary card */}
        <View
          style={[
            cardStyles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              shadowColor: colors.text,
              marginBottom: 24,
            },
          ]}
        >
          <View style={cardStyles.header}>
            <View style={cardStyles.avatarWrapper}>
              {job.logoUrl ? (
                <Image
                  source={{ uri: job.logoUrl }}
                  style={cardStyles.companyLogo}
                  resizeMode="contain"
                />
              ) : (
                <View style={[cardStyles.avatar, { backgroundColor: colors.primary }]}>
                  <Text style={cardStyles.avatarText}>
                    {job.companyName.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <View style={cardStyles.headerInfo}>
              <Text style={[cardStyles.jobTitle, { color: colors.text }]}>
                {job.title}
              </Text>
              <Text style={[cardStyles.companyName, { color: colors.primary }]}>
                {job.companyName}
              </Text>
              <Text style={[formStyles.jobCardMeta, { color: colors.textMuted }]}>
                {job.location} · {job.jobType}
              </Text>
            </View>
          </View>

          <View style={[cardStyles.salaryBand, { backgroundColor: colors.secondary }]}>
            <Text style={[cardStyles.salaryText, { color: colors.primary }]}>
              {job.salary}
            </Text>
          </View>

          <View style={{ marginTop: 16 }}>
            <Text style={[formStyles.sectionTitle, { color: colors.text }]}>
              About the role
            </Text>

            {/* Description */}
            <Text
              style={{
                fontWeight: '700',
                color: colors.text,
                marginTop: 16,
                marginBottom: 6,
              }}
            >
              Description
            </Text>
            {descriptionBullets.map((line, index) => (
              <Text
                key={`desc-${index}`}
                style={{
                  color: colors.textSecondary,
                  lineHeight: 22,
                  marginBottom: 4,
                  paddingLeft: 4,
                }}
              >
                • {line}
              </Text>
            ))}

            {/* Requirements */}
            {job.requirements.length > 0 && (
              <>
                <Text
                  style={{
                    fontWeight: '700',
                    color: colors.text,
                    marginTop: 20,
                    marginBottom: 6,
                  }}
                >
                  Requirements
                </Text>
                {job.requirements.map((req, index) => (
                  <Text
                    key={`req-${index}`}
                    style={{
                      color: colors.textSecondary,
                      lineHeight: 22,
                      marginBottom: 4,
                      paddingLeft: 4,
                    }}
                  >
                    • {req}
                  </Text>
                ))}
              </>
            )}

            {/* Benefits */}
            {job.benefits.length > 0 && (
              <>
                <Text
                  style={{
                    fontWeight: '700',
                    color: colors.text,
                    marginTop: 20,
                    marginBottom: 6,
                  }}
                >
                  Benefits
                </Text>
                {job.benefits.map((b, index) => (
                  <Text
                    key={`ben-${index}`}
                    style={{
                      color: colors.textSecondary,
                      lineHeight: 22,
                      marginBottom: 4,
                      paddingLeft: 4,
                    }}
                  >
                    • {b}
                  </Text>
                ))}
              </>
            )}
          </View>
        </View>

        <Pressable
          style={[
            formStyles.submitBtn,
            { backgroundColor: applied ? colors.surface : colors.primary },
          ]}
          disabled={applied}
          onPress={() => {
            if (!applied) handleApply(job);
          }}
        >
          <Text
            style={[
              formStyles.submitBtnText,
              { color: applied ? colors.textMuted : colors.primaryText },
            ]}
          >
            {applied ? 'Applied' : 'Apply now'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;

