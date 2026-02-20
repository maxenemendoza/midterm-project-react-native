// ─────────────────────────────────────────────────────────────────────────────
// styles/ApplicationFormScreen.styles.ts
// ─────────────────────────────────────────────────────────────────────────────

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },

  // ── Custom header ────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 8,
  },
  backBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  backIcon: {
    fontSize: 26,
    fontWeight: '700',
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  headerSub: {
    fontSize: 12,
    marginTop: 2,
  },

  // ── Scroll container ─────────────────────────────────────────────────────
  scrollContent: {
    padding: 16,
    paddingBottom: 44,
  },

  // ── Job summary card ─────────────────────────────────────────────────────
  jobCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 22,
    gap: 12,
  },
  jobCardAvatar: {
    width: 46,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  jobCardAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  jobCardInfo: {
    flex: 1,
  },
  jobCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  jobCardCompany: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  jobCardMeta: {
    fontSize: 12,
  },

  // ── Section heading ──────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 18,
  },

  // ── Multi-line input override ────────────────────────────────────────────
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },

  // ── Helper note ──────────────────────────────────────────────────────────
  note: {
    fontSize: 12,
    marginTop: -6,
    marginBottom: 22,
    lineHeight: 17,
  },

  // ── Submit button ────────────────────────────────────────────────────────
  submitBtn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // ── Success modal ────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 20,
    borderWidth: 1,
    padding: 30,
    alignItems: 'center',
  },
  successEmoji: {
    fontSize: 54,
    marginBottom: 14,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 26,
  },
  successHighlight: {
    fontWeight: '700',
  },
  okBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  okBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
});