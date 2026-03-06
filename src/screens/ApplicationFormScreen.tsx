import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, ApplicationForm, ApplicationFormErrors } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useJobs } from '../context/JobsContext';
import { validateApplicationForm, hasErrors } from '../utils/validation';
import FormField from '../components/FormField';
import { styles } from '../styles/ApplicationFormScreen.styles';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'ApplicationForm'>;

// empty form for the application form screen
const EMPTY_FORM: ApplicationForm = {
  name: '',
  email: '',
  contactNumber: '',
  whyHireYou: '',
};

// components for the application form screen
const ApplicationFormScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { job, fromSavedJobs } = route.params;
  const { markJobApplied } = useJobs();

  const [form, setForm] = useState<ApplicationForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  // helper function to update the field of the application form
  const updateField = (field: keyof ApplicationForm) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // clears error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const isPristine = () =>
    !form.name.trim() &&
    !form.email.trim() &&
    !form.contactNumber.trim() &&
    !form.whyHireYou.trim();

  const handleBackPress = () => {
    if (isPristine()) {
      navigation.goBack();
      return;
    }
    setShowConfirmCancel(true);
  };

  // submit flow
  const handleSubmitPress = () => {
    const newErrors = validateApplicationForm(form);
    if (hasErrors(newErrors)) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setShowConfirmSubmit(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmSubmit(false);
    markJobApplied(job.id);
    setShowSuccess(true);
  };

  // after success
  const handleSuccessOk = () => {
    setShowSuccess(false);
    setForm(EMPTY_FORM);
    setErrors({});

    if (fromSavedJobs) {
      // navigates back to the job finder screen
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

  const whyHireWordCount = form.whyHireYou
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

  // renders the application form screen
  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* custom header of the application form screen */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          onPress={handleBackPress}
          style={styles.backBtn}
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backIcon, { color: colors.primary }]}>←</Text>
        </Pressable>
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
          {/* job summary card of the application form screen */}
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

          {/* section title of the application form screen */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            📋 Your Application
          </Text>

          {/* form fields of the application form screen */}
          {/* full name field of the application form screen */}
          <FormField
            label="Full Name"
            required
            value={form.name}
            onChangeText={updateField('name')}
            error={errors.name}
            placeholder="e.g. John Doe"
            autoCapitalize="words"
            returnKeyType="next"
          />

          {/* email address field of the application form screen */}
          <FormField
            label="Email Address"
            required
            value={form.email}
            onChangeText={updateField('email')}
            error={errors.email}
            placeholder="e.g. john.doe@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />

          {/* contact number field of the application form screen */}
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

          {/* why should we hire you field of the application form screen */}
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
          <Text style={[styles.wordCount, { color: colors.textMuted }]}>
            {whyHireWordCount} / 10 words
          </Text>

          {/* note of the application form screen */}
          <Text style={[styles.note, { color: colors.textMuted }]}>
            * All fields are required. Please ensure your information is accurate before submitting.
          </Text>
        </ScrollView>

        {/* sticky submit button bar */}
        <View style={[styles.submitBar, { borderTopColor: colors.border, backgroundColor: colors.surface }]}>
          <Pressable
            style={[styles.submitBtn, { backgroundColor: colors.primary }]}
            onPress={handleSubmitPress}
            accessibilityLabel="Submit application"
          >
            <Text style={[styles.submitBtnText, { color: colors.primaryText }]}>
              🚀 Submit Application
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {/* confirm submit modal */}
      <Modal
        visible={showConfirmSubmit}
        transparent
        animationType="fade"
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.successTitle, { color: colors.text }]}>
              Submit application?
            </Text>
            <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
              Please confirm you want to submit your application for{' '}
              <Text style={{ fontWeight: '700', color: colors.primary }}>
                {job.title}
              </Text>{' '}
              at{' '}
              <Text style={{ fontWeight: '700', color: colors.primary }}>
                {job.companyName}
              </Text>
              .
            </Text>
            <View style={{ width: '100%', gap: 8 }}>
              <Pressable
                style={[styles.okBtn, { backgroundColor: colors.primary }]}
                onPress={handleConfirmSubmit}
              >
                <Text style={[styles.okBtnText, { color: colors.primaryText }]}>
                  Submit
                </Text>
              </Pressable>
              <Pressable
                style={[styles.okBtn, { backgroundColor: colors.surface }]}
                onPress={() => setShowConfirmSubmit(false)}
              >
                <Text style={[styles.okBtnText, { color: colors.text }]}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* confirm cancel modal */}
      <Modal
        visible={showConfirmCancel}
        transparent
        animationType="fade"
      >
        <View style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.successTitle, { color: colors.text }]}>
              Discard application?
            </Text>
            <Text style={[styles.successMessage, { color: colors.textSecondary }]}>
              Your current changes will be lost. Are you sure you want to cancel?
            </Text>
            <View style={{ width: '100%', gap: 8 }}>
              <Pressable
                style={[styles.okBtn, { backgroundColor: colors.danger }]}
                onPress={() => {
                  setShowConfirmCancel(false);
                  setForm(EMPTY_FORM);
                  setErrors({});
                  navigation.goBack();
                }}
              >
                <Text style={[styles.okBtnText, { color: colors.primaryText }]}>
                  Discard
                </Text>
              </Pressable>
              <Pressable
                style={[styles.okBtn, { backgroundColor: colors.surface }]}
                onPress={() => setShowConfirmCancel(false)}
              >
                <Text style={[styles.okBtnText, { color: colors.text }]}>
                  Keep editing
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* success modal of the application form screen */}
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
            <Pressable
              style={[styles.okBtn, { backgroundColor: colors.primary }]}
              onPress={handleSuccessOk}
              accessibilityLabel="Close success dialog"
            >
              <Text style={[styles.okBtnText, { color: colors.primaryText }]}>
                {fromSavedJobs ? 'Back to Job Finder' : 'Okay'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ApplicationFormScreen;