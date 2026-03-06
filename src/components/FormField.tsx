import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// props
interface FormFieldProps extends TextInputProps {
  label:     string;
  error?:    string;
  required?: boolean;
}

// component 
const FormField = ({ label, error, required = false, style, ...rest }: FormFieldProps) => {
  const { colors } = useTheme();
  const hasError   = Boolean(error);

  return (
    // IMPORTANT: No position:'absolute' anywhere — every child is in normal
    // document flow so the error row always appears BELOW the input and never
    // overlaps / blocks touches on it.
    <View style={styles.container}>

      {/* label */}
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: colors.text }]}>
          {label}
        </Text>
        {required && (
          <Text style={[styles.required, { color: colors.error }]}>*</Text>
        )}
      </View>

      {/* input */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderColor:     hasError ? colors.error : colors.border,
            color:           colors.text,
          },
          style,   // caller can pass e.g. styles.textArea for multiline height
        ]}
        placeholderTextColor={colors.placeholder}
        accessibilityLabel={label}
        accessibilityHint={required ? 'Required field' : undefined}
        // never set editable={false} here — the field must stay interactive
        // even when there is an error so the user can correct their input.
        {...rest}
      />

      {/* ── error row — rendered in normal flow, BELOW the input ───────── */}
      {hasError && (
        <View style={styles.errorRow} accessibilityRole="alert">
          <Text style={[styles.errorIcon, { color: colors.error }]}>⚠</Text>
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

// styles 
// kept here (co-located) so it is trivially obvious there is no
// position:'absolute' that could cause the error to float over the input.

const styles = StyleSheet.create({
  // outer wrapper — natural flow, no absolute children
  container: {
    marginBottom: 16,
  },

  // label row
  labelRow: {
    flexDirection: 'row',
    alignItems:    'center',
    marginBottom:  6,
    gap:           3,
  },
  label: {
    fontSize:   14,
    fontWeight: '600',
  },
  required: {
    fontSize:   14,
    fontWeight: '700',
    lineHeight: 18,
  },

  // text input
  input: {
    borderWidth:   1.5,
    borderRadius:  10,
    paddingHorizontal: 14,
    paddingVertical:   12,
    fontSize:      15,
    // do NOT set a fixed height here — multiline inputs need room to grow.
    // the caller passes `style={styles.textArea}` (with minHeight) if needed.
  },

  // error row — sits in normal flow immediately below the input
  errorRow: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    marginTop:     6,
    gap:           5,
    // ← NO position:'absolute', NO negative marginTop
  },
  errorIcon: {
    fontSize:   13,
    lineHeight: 18,
  },
  errorText: {
    flex:       1,
    fontSize:   12,
    lineHeight: 17,
    flexWrap:   'wrap',
  },
});

export default FormField;