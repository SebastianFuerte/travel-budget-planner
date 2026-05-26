// src/components/documents/AmIReadyWidget.tsx
// "Am I Ready?" readiness checklist widget for the Documents screen

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import { TripDocument, EntryRequirement, EntryStatus } from '../../types/documents';

interface ReadinessCheck {
  id: string;
  label: string;
  done: boolean;
  optional?: boolean;
  hint?: string;
}

interface AmIReadyWidgetProps {
  documents: TripDocument[];
  requirement: EntryRequirement | null;
  nationalitySelected: boolean;
  tripStartDate: Date;
  onGoToDocuments?: () => void;
}

const VISA_NEEDED_STATUSES: EntryStatus[] = [
  'VISA_REQUIRED',
  'VISA_FREE_BUT_REQUIRED',
  'EVISA_OR_ETA',
  'VISA_ON_ARRIVAL',
];

export const AmIReadyWidget: React.FC<AmIReadyWidgetProps> = ({
  documents,
  requirement,
  nationalitySelected,
  tripStartDate,
  onGoToDocuments,
}) => {
  const checks = useMemo<ReadinessCheck[]>(() => {
    const hasPassport = documents.some(d => d.category === 'passport');
    const hasVisa = documents.some(d => d.category === 'visa');
    const hasFlight = documents.some(d => d.category === 'flight' || d.category === 'boarding_pass');
    const hasAccommodation = documents.some(d => d.category === 'accommodation');
    const hasInsurance = documents.some(d => d.category === 'insurance');

    // Passport expiry check
    const passportDocs = documents.filter(d => d.category === 'passport' && d.expirationDate);
    const passportExpired = passportDocs.some(d => {
      const expiry = new Date(d.expirationDate!);
      const requiredMonths = requirement?.passportValidityMonths ?? 6;
      const minDate = new Date(tripStartDate);
      minDate.setMonth(minDate.getMonth() + requiredMonths);
      return expiry < minDate;
    });

    const visaRequired =
      nationalitySelected &&
      requirement !== null &&
      VISA_NEEDED_STATUSES.includes(requirement.status);

    const requirementChecked = nationalitySelected && requirement !== null;

    return [
      {
        id: 'requirements',
        label: 'Entry requirements checked',
        done: requirementChecked,
        hint: requirementChecked ? undefined : 'Select your nationality to see visa requirements',
      },
      {
        id: 'passport',
        label: 'Passport document saved',
        done: hasPassport && !passportExpired,
        hint: passportExpired
          ? 'Passport expires before required validity period'
          : !hasPassport
          ? 'Save your passport in the Documents tab'
          : undefined,
      },
      {
        id: 'visa',
        label: visaRequired ? 'Visa / eVisa / ETA saved' : 'Visa (not required for this trip)',
        done: visaRequired ? hasVisa : true,
        hint:
          visaRequired && !hasVisa
            ? `${requirement?.visaType ?? 'Visa'} required — add it to Documents`
            : undefined,
      },
      {
        id: 'flight',
        label: 'Flight / Boarding pass saved',
        done: hasFlight,
        hint: !hasFlight ? 'Add your flight or boarding pass' : undefined,
      },
      {
        id: 'accommodation',
        label: 'Accommodation confirmation saved',
        done: hasAccommodation,
        optional: true,
        hint: !hasAccommodation ? 'Recommended for border checks' : undefined,
      },
      {
        id: 'insurance',
        label: 'Travel insurance saved',
        done: hasInsurance,
        optional: true,
        hint: !hasInsurance ? 'Recommended for emergencies' : undefined,
      },
    ];
  }, [documents, requirement, nationalitySelected, tripStartDate]);

  const requiredChecks = checks.filter(c => !c.optional);
  const doneRequired = requiredChecks.filter(c => c.done).length;
  const totalRequired = requiredChecks.length;
  const allRequired = doneRequired === totalRequired;

  const pct = Math.round((doneRequired / totalRequired) * 100);

  const statusColor = allRequired ? '#10B981' : pct >= 50 ? '#F59E0B' : colors.error;
  const statusLabel = allRequired ? 'Ready to go!' : pct >= 50 ? 'Almost ready' : 'Needs attention';
  const statusIcon = allRequired ? '✅' : pct >= 50 ? '⚠️' : '❌';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Am I Ready?</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '22', borderColor: statusColor }]}>
          <Text style={styles.statusIcon}>{statusIcon}</Text>
          <Text style={[styles.statusLabel, { color: statusColor }]}>{statusLabel}</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${pct}%` as any, backgroundColor: statusColor }]} />
      </View>
      <Text style={styles.progressText}>{doneRequired}/{totalRequired} required checks complete</Text>

      {/* Checklist */}
      <View style={styles.checklist}>
        {checks.map(check => (
          <View key={check.id} style={styles.checkRow}>
            <View style={[styles.checkIcon, check.done ? styles.checkIconDone : styles.checkIconTodo]}>
              <Text style={styles.checkIconText}>{check.done ? '✓' : check.optional ? '○' : '!'}</Text>
            </View>
            <View style={styles.checkContent}>
              <Text style={[styles.checkLabel, check.done && styles.checkLabelDone]}>
                {check.label}
                {check.optional && <Text style={styles.optionalTag}> (optional)</Text>}
              </Text>
              {!check.done && check.hint && (
                <Text style={styles.checkHint}>{check.hint}</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {!allRequired && onGoToDocuments && (
        <TouchableOpacity style={styles.actionButton} onPress={onGoToDocuments} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>Go to Documents →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusIcon: { fontSize: 12 },
  statusLabel: { fontSize: 12, fontWeight: '700' },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: colors.textTertiary,
    marginBottom: 14,
  },
  checklist: { gap: 10 },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkIconDone: { backgroundColor: '#10B981' },
  checkIconTodo: { backgroundColor: colors.backgroundTertiary, borderWidth: 1.5, borderColor: colors.border },
  checkIconText: { fontSize: 11, fontWeight: '800', color: '#fff' },
  checkContent: { flex: 1 },
  checkLabel: { fontSize: 13, fontWeight: '500', color: colors.text },
  checkLabelDone: { color: colors.textSecondary },
  optionalTag: { fontSize: 11, color: colors.textTertiary, fontStyle: 'italic' },
  checkHint: { fontSize: 11, color: colors.textTertiary, marginTop: 2 },
  actionButton: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionButtonText: { fontSize: 13, fontWeight: '700', color: '#fff' },
});
