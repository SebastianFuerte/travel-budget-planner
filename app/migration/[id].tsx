// app/migration/[id].tsx
// Migration Mode - Single optimized screen for airport/migration use
// Shows passport, visa, flight, and accommodation at a glance
// Tap any card to view the attached photo/PDF

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { safeGoBack } from '../../src/utils/navigation';
import { format } from 'date-fns';
import * as Sharing from 'expo-sharing';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { useTripStore } from '../../src/store';
import { useDocumentStore } from '../../src/store/documentStore';
import colors from '../../src/theme/colors';
import { TripDocument } from '../../src/types/documents';
import { infoAlert } from '../../src/utils/alert';
import { differenceInDays } from 'date-fns';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

export default function MigrationModeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const getTripById = useTripStore(state => state.getTripById);
  const { currentTripDocs, loadDocuments } = useDocumentStore();
  const trip = getTripById(id);

  const [previewDoc, setPreviewDoc] = useState<TripDocument | null>(null);

  useEffect(() => {
    if (id) loadDocuments(id);
  }, [id]);

  if (!trip) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <Text style={styles.errorText}>Trip not found</Text>
          <TouchableOpacity onPress={() => safeGoBack()}>
            <Text style={styles.backLink}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  const docs = currentTripDocs?.documents || [];

  const passportDoc = docs.find(d => d.category === 'passport');
  const visaDoc = docs.find(d => d.category === 'visa');
  const boardingDocs = docs.filter(d => d.category === 'boarding_pass');
  const flightDocs = docs.filter(d => d.category === 'flight');
  const accommodationDocs = docs.filter(d => d.category === 'accommodation');
  const insuranceDoc = docs.find(d => d.category === 'insurance');

  const handleOpenDoc = async (doc: TripDocument) => {
    if (!doc.fileUri) {
      infoAlert('No file', 'This document has no file attached.');
      return;
    }
    if (doc.fileType === 'image') {
      setPreviewDoc(doc);
    } else if (doc.fileType === 'pdf') {
      try {
        const canShare = await Sharing.isAvailableAsync();
        if (canShare) {
          await Sharing.shareAsync(doc.fileUri, { mimeType: 'application/pdf', dialogTitle: doc.title });
        } else {
          infoAlert('Cannot open', 'PDF viewer not available on this device.');
        }
      } catch {
        infoAlert('Error', 'Could not open the PDF.');
      }
    }
  };

  // ── Card for a single document ──────────────────────────────────────────
  const DocCard = ({ doc, icon, label }: { doc: TripDocument; icon: string; label: string }) => {
    const hasFile = !!doc.fileUri;

    let expiryBadge: { text: string; color: string; bg: string } | null = null;
    if (doc.expirationDate) {
      const daysLeft = differenceInDays(new Date(doc.expirationDate), new Date());
      if (daysLeft < 0) {
        expiryBadge = { text: '⚠️ EXPIRED', color: '#991B1B', bg: '#FEE2E2' };
      } else if (daysLeft <= 90) {
        expiryBadge = { text: `⏳ ${daysLeft}d left`, color: '#92400E', bg: '#FEF3C7' };
      } else {
        expiryBadge = { text: `✓ Valid`, color: '#065F46', bg: '#D1FAE5' };
      }
    }

    return (
      <TouchableOpacity
        style={styles.docCard}
        onPress={() => handleOpenDoc(doc)}
        activeOpacity={hasFile ? 0.7 : 1}
      >
        <View style={styles.docCardLeft}>
          <Text style={styles.docCardIcon}>{icon}</Text>
          <View style={styles.docCardInfo}>
            <Text style={styles.docCardLabel}>{label}</Text>
            <Text style={styles.docCardTitle} numberOfLines={1}>{doc.title}</Text>
            {expiryBadge && (
              <View style={[styles.expiryBadge, { backgroundColor: expiryBadge.bg }]}>
                <Text style={[styles.expiryBadgeText, { color: expiryBadge.color }]}>{expiryBadge.text}</Text>
              </View>
            )}
            {doc.notes ? (
              <Text style={styles.docCardNotes} numberOfLines={2}>{doc.notes}</Text>
            ) : null}
            {doc.date ? (
              <Text style={styles.docCardDate}>{format(new Date(doc.date), 'MMM dd, yyyy')}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.docCardRight}>
          {hasFile ? (
            <>
              {doc.fileType === 'image' ? (
                <Image source={{ uri: doc.fileUri }} style={styles.docCardThumb} />
              ) : (
                <View style={styles.pdfThumb}>
                  <Text style={styles.pdfThumbText}>PDF</Text>
                </View>
              )}
              <Text style={styles.tapHint}>tap to view</Text>
            </>
          ) : (
            <View style={styles.noFileBadge}>
              <Text style={styles.noFileBadgeText}>no file</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // ── Section with multiple docs ──────────────────────────────────────────
  const DocSection = ({
    title, icon, docList,
  }: { title: string; icon: string; docList: TripDocument[] }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={[
          styles.sectionDot,
          { backgroundColor: docList.length > 0 ? colors.success : colors.warning },
        ]} />
      </View>
      {docList.length > 0 ? (
        docList.map(doc => (
          <DocCard key={doc.id} doc={doc} icon={icon} label={title} />
        ))
      ) : (
        <View style={styles.emptyRow}>
          <Text style={styles.emptyText}>Not uploaded yet</Text>
        </View>
      )}
    </View>
  );

  // ── Single required doc (passport, visa, insurance) ─────────────────────
  const RequiredDocSection = ({
    title, icon, doc, required = false,
  }: { title: string; icon: string; doc: TripDocument | undefined; required?: boolean }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={[
          styles.sectionDot,
          { backgroundColor: doc ? colors.success : required ? colors.error : colors.warning },
        ]} />
      </View>
      {doc ? (
        <DocCard doc={doc} icon={icon} label={title} />
      ) : (
        <View style={styles.emptyRow}>
          <Text style={styles.emptyText}>Not uploaded yet</Text>
        </View>
      )}
    </View>
  );

  return (
    <>
      <ScreenContainer>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => safeGoBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modeHeader}>
          <Text style={styles.modeBadge}>✈️ MIGRATION MODE</Text>
          <Text style={styles.modeTitle}>{trip.destination}</Text>
          <Text style={styles.modeSubtitle}>{trip.city}, {trip.country}</Text>
          <Text style={styles.modeDates}>
            {format(trip.startDate, 'MMM dd')} – {format(trip.endDate, 'MMM dd, yyyy')}
          </Text>
        </View>

        <RequiredDocSection title="Passport"        icon="🛂" doc={passportDoc}   required />
        <RequiredDocSection title="Visa / Permit"   icon="📋" doc={visaDoc} />
        <DocSection         title="Boarding Pass"   icon="🎫" docList={boardingDocs} />
        <DocSection         title="Flights"         icon="✈️"  docList={flightDocs} />
        <DocSection         title="Accommodation"   icon="🏨" docList={accommodationDocs} />
        <RequiredDocSection title="Travel Insurance" icon="🛡️" doc={insuranceDoc} />

        <View style={styles.offlineNotice}>
          <Text style={styles.offlineIcon}>📱</Text>
          <Text style={styles.offlineText}>
            Works offline. All files stored locally on your device.
          </Text>
        </View>
      </ScreenContainer>

      {/* ── Full-screen image viewer modal ─────────────────────────────── */}
      <Modal
        visible={!!previewDoc}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewDoc(null)}
      >
        <View style={styles.modalOverlay}>
          {/* Close button */}
          <TouchableOpacity style={styles.modalClose} onPress={() => setPreviewDoc(null)}>
            <Text style={styles.modalCloseText}>✕</Text>
          </TouchableOpacity>

          {/* Document title */}
          {previewDoc && (
            <Text style={styles.modalTitle} numberOfLines={1}>{previewDoc.title}</Text>
          )}

          {/* Image */}
          {previewDoc?.fileUri ? (
            <Image
              source={{ uri: previewDoc.fileUri }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          ) : null}

          {/* Notes under image */}
          {previewDoc?.notes ? (
            <View style={styles.modalNotes}>
              <Text style={styles.modalNotesText}>{previewDoc.notes}</Text>
            </View>
          ) : null}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: colors.textSecondary, marginBottom: 16 },
  backLink: { fontSize: 16, color: colors.primary, fontWeight: '600' },

  header: { marginBottom: 8 },
  backButton: { paddingVertical: 8 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },

  modeHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 16,
    backgroundColor: colors.text,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  modeBadge: { fontSize: 11, fontWeight: '800', color: colors.warning, letterSpacing: 2, marginBottom: 8 },
  modeTitle: { fontSize: 22, fontWeight: '800', color: colors.background, marginBottom: 4 },
  modeSubtitle: { fontSize: 13, color: '#9CA3AF', marginBottom: 2 },
  modeDates: { fontSize: 12, color: '#9CA3AF' },

  // ── Section ────────────────────────────────────────────────────────────
  section: {
    marginBottom: 12,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionIcon: { fontSize: 18, marginRight: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: colors.text, flex: 1 },
  sectionDot: { width: 10, height: 10, borderRadius: 5 },

  emptyRow: { paddingVertical: 12, paddingHorizontal: 14 },
  emptyText: { fontSize: 13, color: colors.textTertiary, fontStyle: 'italic' },

  // ── Doc card ───────────────────────────────────────────────────────────
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundTertiary,
  },
  docCardLeft: { flex: 1, flexDirection: 'row', alignItems: 'flex-start', marginRight: 10 },
  docCardIcon: { fontSize: 20, marginRight: 10, marginTop: 2 },
  docCardInfo: { flex: 1 },
  docCardLabel: { fontSize: 10, fontWeight: '600', color: colors.textTertiary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 1 },
  docCardTitle: { fontSize: 14, fontWeight: '600', color: colors.text },
  docCardNotes: { fontSize: 12, color: colors.textSecondary, marginTop: 2, lineHeight: 16 },
  docCardDate: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  expiryBadge: {
    alignSelf: 'flex-start', borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2, marginTop: 4,
  },
  expiryBadgeText: { fontSize: 10, fontWeight: '700' },

  docCardRight: { alignItems: 'center', gap: 4 },
  docCardThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.backgroundTertiary,
  },
  pdfThumb: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfThumbText: { fontSize: 12, fontWeight: '800', color: '#991B1B' },
  tapHint: { fontSize: 9, color: colors.primary, fontWeight: '500' },
  noFileBadge: {
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  noFileBadgeText: { fontSize: 10, color: colors.textTertiary },

  // ── Offline notice ─────────────────────────────────────────────────────
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    marginBottom: 32,
  },
  offlineIcon: { fontSize: 18, marginRight: 10 },
  offlineText: { fontSize: 12, color: colors.textSecondary, flex: 1, lineHeight: 18 },

  // ── Modal ──────────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  modalClose: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 24,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalCloseText: { fontSize: 16, color: '#FFFFFF', fontWeight: '700' },
  modalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalImage: {
    width: SCREEN_W - 32,
    height: SCREEN_H * 0.65,
    borderRadius: 12,
  },
  modalNotes: {
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 12,
    width: '100%',
  },
  modalNotesText: { fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 18 },
});
