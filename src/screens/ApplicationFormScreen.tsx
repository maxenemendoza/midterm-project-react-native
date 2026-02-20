import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ApplicationForm, ApplicationFormErrors } from '../types';
import { useTheme } from '../context/ThemeContext';
import { validateApplicationForm, hasErrors } from '../utils/validation';
import FormField from '../components/FormField';
import { styles } from '../styles/ApplicationFormScreen.styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'ApplicationForm'>;

// ─── Empty Form ───────────────────────────────────────────────────────────────

const EMPTY_FORM: ApplicationForm = {
  name: '',
  email: '',
  contactNumber: '',
  whyHireYou: '',
};

// ─── Component ────────────────────────────────────────────────────────────────

const ApplicationFormScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { job, fromSavedJobs } = route.params;

  const [form, setForm] = useState<ApplicationForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const updateField = (field: keyof ApplicationForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = () => {
    const newErrors = validateApplicationForm(form);
    if (hasErrors(newErrors)) {
      setErrors(newErrors);
      return;
    }
    // Clear errors and show success
    setErrors({});
    setShowSuccess(true);
  };

  // ─── After Success ───────────────────────────────────────────────────────────

  const handleSuccessOk = () => {
    setShowSuccess(false);
    setForm(EMPTY_FORM);
    setErrors({});

    if (fromSavedJobs) {
      // Navigate back to Job Finder tab
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Tabs', params: { screen: 'JobFinder' } }],
        })
      );
    } else {
      navigation.goBack();
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Custom Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
            Apply for Position
          </Text>
          <Text style={[styles.headerSub, { color: colors.textMuted }]} numberOfLines={1}>
            {job.title} · {job.companyName}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Job Summary Card */}
          <View style={[styles.jobCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={[styles.jobCardBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.jobCardBadgeText}>
                {job.companyName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.jobCardInfo}>
              <Text style={[styles.jobCardTitle, { color: colors.text }]}>
                {job.title}
              </Text>
              <Text style={[styles.jobCardCompany, { color: colors.primary }]}>
                {job.companyName}
              </Text>
              <Text style={[styles.jobCardMeta, { color: colors.textMuted }]}>
                {job.location} · {job.salary}
              </Text>
            </View>
          </View>

          {/* Section Title */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            📋 Your Application
          </Text>

          {/* Form Fields */}
          <FormField
            label="Full Name"
            required
            value={form.name}
            onChangeText={updateField('name')}
            error={errors.name}
            placeholder="e.g. Juan dela Cruz"
            autoCapitalize="words"
            returnKeyType="next"
          />

          <FormField
            label="Email Address"
            required
            value={form.email}
            onChangeText={updateField('email')}
            error={errors.email}
            placeholder="e.g. juan@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />

          <FormField
            label="Contact Number"
            required
            value={form.contactNumber}
            onChangeText={updateField('contactNumber')}
            error={errors.contactNumber}
            placeholder="e.g. +63 912 345 6789"
            keyboardType="phone-pad"
            returnKeyType="next"
          />

          <FormField
            label="Why should we hire you?"
            required
            value={form.whyHireYou}
            onChangeText={updateField('whyHireYou')}
            error={errors.whyHireYou}
            placeholder="Tell us about your qualifications, achievements, and what makes you the ideal candidate… (minimum 10 words)"
            multiline
            numberOfLines={6}
            style={styles.textArea}
            textAlignVertical="top"
            returnKeyType="done"
          />

          {/* Note */}
          <Text style={[styles.note, { color: colors.textMuted }]}>
            * All fields are required. Please ensure your information is accurate before submitting.
          </Text>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
            accessibilityLabel="Submit application"
          >
            <Text style={[styles.submitBtnText, { color: colors.primaryText }]}>
              🚀 Submit Application
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        statusBarTranslucent
        accessibilityViewIsModal
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={styles.successIcon}>🎉</Text>
            <Text style={[styles.successTitle, { color: colors.text }]}>
              Application Submitted!
            </Text>
            <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
              Your application for{' '}
              <Text style={{ fontWeight: '700', color: colors.primary }}>
                {job.title}
              </Text>{' '}
              at{' '}
              <Text style={{ fontWeight: '700', color: colors.primary }}>
                {job.companyName}
              </Text>{' '}
              has been submitted successfully. Good luck!
            </Text>
            <TouchableOpacity
              style={[styles.okBtn, { backgroundColor: colors.primary }]}
              onPress={handleSuccessOk}
              accessibilityLabel="Close success dialog"
            >
              <Text style={[styles.okBtnText, { color: colors.primaryText }]}>
                {fromSavedJobs ? 'Back to Job Finder' : 'Okay'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ApplicationFormScreen;