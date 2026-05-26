// src/components/documents/DocumentItem.tsx
// Single document card in the document vault

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../theme/colors';
import { TripDocument, DOCUMENT_CATEGORIES } from '../../types/documents';
import { confirmAlert } from '../../utils/alert';

interface DocumentItemProps {
  document: TripDocument;
  onDelete: (id: string) => void;
  onView: (document: TripDocument) => void;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDelete, onView }) => {
  const category = DOCUMENT_CATEGORIES[document.category];

  const handleDelete = () => {
    confirmAlert(
      'Delete Document',
      `Are you sure you want to delete "${document.title}"?`,
      () => onDelete(document.id),
      'Delete',
    );
  };

  const formattedDate = document.date
    ? new Date(document.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  // Expiration logic
  const expiryStatus: 'expired' | 'soon' | 'ok' | null = (() => {
    if (!document.expirationDate) return null;
    const expiry = new Date(document.expirationDate);
    const now = new Date();
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return 'expired';
    if (daysLeft <= 90) return 'soon';
    return 'ok';
  })();

  const formattedExpiry = document.expirationDate
    ? new Date(document.expirationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onView(document)} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{document.title}</Text>
        <Text style={styles.category}>{category.label}</Text>
        {formattedDate && (
          <Text style={styles.date}>{formattedDate}</Text>
        )}
        {document.notes && (
          <Text style={styles.notes} numberOfLines={1}>{document.notes}</Text>
        )}
        {formattedExpiry && (
          <View style={[styles.expiryRow, expiryStatus === 'expired' && styles.expiryRowExpired, expiryStatus === 'soon' && styles.expiryRowSoon]}>
            <Text style={[styles.expiryText, expiryStatus === 'expired' && styles.expiryTextExpired, expiryStatus === 'soon' && styles.expiryTextSoon]}>
              {expiryStatus === 'expired' ? '⚠️ Expired' : expiryStatus === 'soon' ? '⏰ Expires' : '✓ Expires'} {formattedExpiry}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.actions}>
        {document.qrCode && (
          <View style={styles.qrBadge}>
            <Text style={styles.qrBadgeText}>QR</Text>
          </View>
        )}
        {document.fileUri && (
          <View style={styles.fileBadge}>
            <Text style={styles.fileBadgeText}>
              {document.fileType === 'pdf' ? 'PDF' : 'IMG'}
            </Text>
          </View>
        )}
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  date: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
  },
  notes: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 2,
    fontStyle: 'italic',
  },
  expiryRow: {
    marginTop: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#D1FAE5',
    alignSelf: 'flex-start',
  },
  expiryRowExpired: { backgroundColor: '#FEE2E2' },
  expiryRowSoon: { backgroundColor: '#FEF3C7' },
  expiryText: { fontSize: 10, fontWeight: '600', color: '#065F46' },
  expiryTextExpired: { color: '#991B1B' },
  expiryTextSoon: { color: '#92400E' },
  actions: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  qrBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  qrBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  fileBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 8,
  },
  fileBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.background,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.error,
  },
});
