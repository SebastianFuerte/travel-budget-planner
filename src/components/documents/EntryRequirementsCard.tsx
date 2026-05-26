// src/components/documents/EntryRequirementsCard.tsx
// Displays visa/entry requirements with semaphore visual + official sources

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import colors from '../../theme/colors';
import {
  EntryRequirement,
  HealthRequirement,
  ENTRY_STATUS_LABELS,
  ENTRY_STATUS_COLORS,
  EntryStatusColor,
  PASSPORT_TYPE_LABELS,
} from '../../types/documents';

interface EntryRequirementsCardProps {
  requirement: EntryRequirement;
}

const HEALTH_BADGE: Record<HealthRequirement['status'], { bg: string; text: string }> = {
  required: { bg: '#FEE2E2', text: '#991B1B' },
  recommended: { bg: '#FEF9C3', text: '#854D0E' },
  not_required: { bg: '#DCFCE7', text: '#166534' },
};

const SEMAPHORE: Record<EntryStatusColor | 'grey', { bg: string; text: string; border: string }> = {
  green:  { bg: '#DCFCE7', text: '#166534', border: '#86EFAC' },
  yellow: { bg: '#FEF9C3', text: '#854D0E', border: '#FDE047' },
  red:    { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' },
  grey:   { bg: '#F3F4F6', text: '#6B7280', border: '#D1D5DB' },
};

const isFallback = (req: EntryRequirement) =>
  req.notes?.includes('conservative placeholder') ?? false;

export const EntryRequirementsCard: React.FC<EntryRequirementsCardProps> = ({ requirement }) => {
  const statusColor = ENTRY_STATUS_COLORS[requirement.status];
  const sem = isFallback(requirement) ? SEMAPHORE.grey : SEMAPHORE[statusColor];

  const openUrl = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      {/* Semaphore Status Banner */}
      <View style={[styles.statusBanner, { backgroundColor: sem.bg, borderColor: sem.border }]}>
        <View style={[styles.statusDot, { backgroundColor: sem.text }]} />
        <Text style={[styles.statusText, { color: sem.text }]}>
          {ENTRY_STATUS_LABELS[requirement.status]}
        </Text>
      </View>

      {/* No-data warning */}
      {isFallback(requirement) && (
        <View style={styles.noDataBanner}>
          <Text style={styles.noDataText}>
            ℹ️ No pre-loaded data for this combination. Check official sources below.
          </Text>
        </View>
      )}

      {/* Route + Passport Info */}
      <View style={styles.routeInfo}>
        <Text style={styles.routeText}>
          {requirement.nationality} → {requirement.destinationCountry}
        </Text>
        <Text style={styles.badgeText}>
          {PASSPORT_TYPE_LABELS[requirement.passportType]}
        </Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>{requirement.summary}</Text>
      </View>

      {/* Info Rows */}
      {requirement.visaType && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Visa Type</Text>
          <Text style={styles.infoValue}>{requirement.visaType}</Text>
        </View>
      )}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Fee</Text>
        <Text style={[styles.infoValue, requirement.fee === 'Free' && { color: colors.success }]}>
          {requirement.fee}
        </Text>
      </View>
      {requirement.maxStayDays && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Max Stay</Text>
          <Text style={styles.infoValue}>{requirement.maxStayDays} days</Text>
        </View>
      )}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Passport Validity</Text>
        <Text style={styles.infoValue}>Min {requirement.passportValidityMonths} months</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Processing Time</Text>
        <Text style={styles.infoValue}>{requirement.processingTime}</Text>
      </View>

      {/* Details (bullet list) */}
      {requirement.details.length > 0 && (
        <View style={styles.detailsList}>
          <Text style={styles.detailsTitle}>Requirements</Text>
          {requirement.details.map((d, i) => (
            <View key={i} style={styles.detailItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.detailText}>{d}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Notes */}
      {requirement.notes && (
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>{requirement.notes}</Text>
        </View>
      )}

      {/* Health Requirements */}
      {requirement.healthRequirements && requirement.healthRequirements.length > 0 && (
        <View style={styles.healthSection}>
          <Text style={styles.healthTitle}>Health & Vaccine Requirements</Text>
          {requirement.healthRequirements.map((hr) => {
            const badgeStyle = HEALTH_BADGE[hr.status];
            return (
              <View key={hr.id} style={styles.healthItem}>
                <View style={styles.healthItemHeader}>
                  <Text style={styles.healthIcon}>
                    {hr.type === 'vaccine' ? '💉' : hr.type === 'test' ? '🧪' : hr.type === 'insurance' ? '🛡️' : '📋'}
                  </Text>
                  <Text style={styles.healthName}>{hr.name}</Text>
                  <View style={[styles.healthBadge, { backgroundColor: badgeStyle.bg }]}>
                    <Text style={[styles.healthBadgeText, { color: badgeStyle.text }]}>
                      {hr.status === 'required' ? 'Required' : hr.status === 'recommended' ? 'Recommended' : 'Not Required'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.healthDescription}>{hr.description}</Text>
                {hr.officialSource && (
                  <TouchableOpacity onPress={() => openUrl(hr.officialSource!.url)} style={styles.healthSourceLink}>
                    <Text style={styles.sourceLinkText}>→ {hr.officialSource.title}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* Official Sources */}
      <View style={styles.sourcesSection}>
        <Text style={styles.sourcesTitle}>Official Sources</Text>
        {requirement.officialSources.map((src, i) => (
          <TouchableOpacity key={i} onPress={() => openUrl(src.url)} style={styles.sourceLink}>
            <Text style={styles.sourceLinkText}>→ {src.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Last Updated */}
      <View style={styles.footer}>
        <Text style={styles.updatedText}>Last updated: {requirement.lastUpdatedISO}</Text>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          Informational only - Always verify with official sources before travel.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 16,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  statusDot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  statusText: { fontSize: 16, fontWeight: '700' },
  routeInfo: {
    padding: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeText: { fontSize: 14, fontWeight: '600', color: colors.text, flex: 1 },
  badgeText: {
    fontSize: 11,
    color: colors.textSecondary,
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  summaryBox: {
    marginHorizontal: 16,
    padding: 12,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    marginBottom: 8,
  },
  summaryText: { fontSize: 13, color: colors.text, lineHeight: 20 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  infoLabel: { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  infoValue: { fontSize: 13, color: colors.text, fontWeight: '600', textAlign: 'right', flex: 1, marginLeft: 16 },
  detailsList: { paddingHorizontal: 16, paddingTop: 10 },
  detailsTitle: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  detailItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 3 },
  bullet: { fontSize: 13, color: colors.primary, marginRight: 8, lineHeight: 20 },
  detailText: { fontSize: 13, color: colors.textSecondary, flex: 1, lineHeight: 20 },
  notesBox: { marginHorizontal: 16, marginTop: 10, padding: 10, backgroundColor: colors.backgroundSecondary, borderRadius: 8 },
  notesText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18, fontStyle: 'italic' },
  healthSection: { paddingHorizontal: 16, paddingTop: 12 },
  healthTitle: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 8 },
  healthItem: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  healthItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  healthIcon: { fontSize: 14 },
  healthName: { fontSize: 13, fontWeight: '600', color: colors.text, flex: 1 },
  healthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  healthBadgeText: { fontSize: 10, fontWeight: '700' },
  healthDescription: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  healthSourceLink: { marginTop: 4 },
  sourcesSection: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  sourcesTitle: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  sourceLink: { paddingVertical: 4 },
  sourceLinkText: { fontSize: 13, color: colors.primary, fontWeight: '500' },
  footer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6 },
  updatedText: { fontSize: 11, color: colors.textTertiary },
  disclaimer: { backgroundColor: colors.backgroundTertiary, paddingVertical: 8, paddingHorizontal: 16 },
  disclaimerText: { fontSize: 11, color: colors.textTertiary, textAlign: 'center', fontStyle: 'italic' },
  noDataBanner: { backgroundColor: '#EFF6FF', paddingVertical: 10, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#BFDBFE' },
  noDataText: { fontSize: 12, color: '#1D4ED8', lineHeight: 18 },
});
