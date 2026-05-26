// src/components/documents/DocumentVault.tsx
// Document vault with file upload: camera, photo library, PDF picker

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, TextInput, ScrollView } from 'react-native';
import * as Sharing from 'expo-sharing';
import { infoAlert } from '../../utils/alert';
import colors from '../../theme/colors';
import { Button } from '../ui/Button';
import { DocumentItem } from './DocumentItem';
import { QRCodeModal } from './QRCodeModal';
import {
  TripDocument,
  DocumentCategory,
  DOCUMENT_CATEGORIES,
} from '../../types/documents';
import { useDocumentStore } from '../../store/documentStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { takePhoto, pickImage, pickDocument, deleteStoredFile, PickedFile } from '../../services/filePicker';

interface DocumentVaultProps {
  tripId: string;
  documents: TripDocument[];
}

type UploadMethod = 'camera' | 'photo_library' | 'file';

const FREE_DOC_LIMIT = 3;

export const DocumentVault: React.FC<DocumentVaultProps> = ({ tripId, documents }) => {
  const { addDocument, removeDocument } = useDocumentStore();
  const { canAddDocument, isPro } = useSubscriptionStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const atLimit = !canAddDocument(documents.length);
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUri, setPreviewUri] = useState<string | null>(null);
  const [qrInput, setQrInput] = useState('');
  const [expiryInput, setExpiryInput] = useState(''); // YYYY-MM-DD
  const [qrModal, setQrModal] = useState<{ title: string; value: string } | null>(null);

  const handleSelectCategory = (category: DocumentCategory) => {
    setSelectedCategory(category);
  };

  const handleUpload = async (method: UploadMethod) => {
    if (!selectedCategory || isUploading) return;

    setIsUploading(true);
    try {
      let file: PickedFile | null = null;

      switch (method) {
        case 'camera':
          file = await takePhoto();
          break;
        case 'photo_library':
          file = await pickImage();
          break;
        case 'file':
          file = await pickDocument();
          break;
      }

      if (!file) {
        setIsUploading(false);
        return; // User cancelled
      }

      const categoryInfo = DOCUMENT_CATEGORIES[selectedCategory];
      const title = `${categoryInfo.label} - ${new Date().toLocaleDateString()}`;

      await addDocument(tripId, {
        tripId,
        category: selectedCategory,
        title,
        fileUri: file.uri,
        fileType: file.fileType,
        notes: file.fileName,
        qrCode: qrInput.trim() || undefined,
        expirationDate: expiryInput.trim() || undefined,
      });

      setSelectedCategory(null);
      setShowAddForm(false);
      setQrInput('');
      setExpiryInput('');
      infoAlert('Document Added', `${categoryInfo.label} saved successfully.`);
    } catch (error: any) {
      const msg = error?.message || 'Failed to pick file';
      if (msg.startsWith('PERMISSION_DENIED:')) {
        infoAlert('Permission Required', msg.replace('PERMISSION_DENIED: ', ''));
      } else if (msg.startsWith('FILE_TOO_LARGE:')) {
        infoAlert('File Too Large', msg.replace('FILE_TOO_LARGE: ', ''));
      } else {
        infoAlert('Error', msg);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddMetadataOnly = () => {
    if (!selectedCategory) return;
    const categoryInfo = DOCUMENT_CATEGORIES[selectedCategory];
    const title = `${categoryInfo.label} - ${new Date().toLocaleDateString()}`;
    addDocument(tripId, {
      tripId,
      category: selectedCategory,
      title,
      notes: 'Metadata only — no file attached',
      qrCode: qrInput.trim() || undefined,
      expirationDate: expiryInput.trim() || undefined,
    });
    setSelectedCategory(null);
    setShowAddForm(false);
    setQrInput('');
    setExpiryInput('');
  };

  const handleDeleteDocument = async (documentId: string) => {
    const doc = documents.find(d => d.id === documentId);
    if (doc?.fileUri) {
      await deleteStoredFile(doc.fileUri);
    }
    removeDocument(tripId, documentId);
  };

  const handleViewDocument = async (document: TripDocument) => {
    // Image preview
    if (document.fileUri && document.fileType === 'image') {
      setPreviewUri(document.fileUri);
      return;
    }

    // PDF: open with share sheet
    if (document.fileUri && document.fileType === 'pdf') {
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(document.fileUri, {
          mimeType: 'application/pdf',
          dialogTitle: document.title,
        });
      } else {
        infoAlert('Cannot Open', 'PDF sharing is not available on this device.');
      }
      return;
    }

    // Boarding pass with QR
    if (document.qrCode) {
      setQrModal({ title: document.title, value: document.qrCode });
      return;
    }

    // Fallback: metadata alert
    const categoryInfo = DOCUMENT_CATEGORIES[document.category];
    const parts = [
      document.notes ? `Notes: ${document.notes}` : null,
      !document.fileUri ? 'No file attached' : null,
    ].filter(Boolean);
    infoAlert(document.title, parts.join('\n') || categoryInfo.label);
  };

  // Group documents by category
  const grouped: Record<string, TripDocument[]> = {};
  documents.forEach(doc => {
    if (!grouped[doc.category]) grouped[doc.category] = [];
    grouped[doc.category].push(doc);
  });

  const isMobile = Platform.OS !== 'web';

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Document Vault</Text>
        <Button
          title={showAddForm ? 'Cancel' : '+ Add'}
          onPress={() => {
            if (!showAddForm && atLimit) {
              infoAlert('Pro Feature', `Free plan allows up to ${FREE_DOC_LIMIT} documents per trip. Upgrade to Pro for unlimited documents.`);
              return;
            }
            setShowAddForm(!showAddForm);
            setSelectedCategory(null);
          }}
          variant={showAddForm ? 'outline' : 'primary'}
          size="small"
        />
      </View>

      <Text style={styles.subtitle}>
        All documents stored locally on your device only.
        {!isPro() && ` (${documents.length}/${FREE_DOC_LIMIT} free)`}
      </Text>

      {atLimit && (
        <View style={styles.limitBanner}>
          <Text style={styles.limitText}>🔒 Free plan limit reached ({FREE_DOC_LIMIT} docs). Upgrade to Pro for unlimited.</Text>
        </View>
      )}

      {/* Step 1: Category selection */}
      {showAddForm && !selectedCategory && (
        <View style={styles.addForm}>
          <Text style={styles.addTitle}>Select document type:</Text>
          <View style={styles.categoryGrid}>
            {(Object.entries(DOCUMENT_CATEGORIES) as [DocumentCategory, { label: string; icon: string }][]).map(
              ([key, value]) => (
                <TouchableOpacity
                  key={key}
                  style={styles.categoryChip}
                  onPress={() => handleSelectCategory(key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.categoryChipIcon}>{value.icon}</Text>
                  <Text style={styles.categoryChipLabel}>{value.label}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      )}

      {/* Step 2: Upload method */}
      {showAddForm && selectedCategory && (
        <View style={styles.addForm}>
          <Text style={styles.addTitle}>
            {DOCUMENT_CATEGORIES[selectedCategory].icon} {DOCUMENT_CATEGORIES[selectedCategory].label}
          </Text>
          <Text style={styles.uploadHint}>Choose how to add your document:</Text>

          <View style={styles.uploadMethods}>
            {isMobile && (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleUpload('camera')}
                disabled={isUploading}
                activeOpacity={0.7}
              >
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadLabel}>Take Photo</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => handleUpload('photo_library')}
              disabled={isUploading}
              activeOpacity={0.7}
            >
              <Text style={styles.uploadIcon}>🖼️</Text>
              <Text style={styles.uploadLabel}>Photo Library</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => handleUpload('file')}
              disabled={isUploading}
              activeOpacity={0.7}
            >
              <Text style={styles.uploadIcon}>📄</Text>
              <Text style={styles.uploadLabel}>PDF / File</Text>
            </TouchableOpacity>
          </View>

          {/* QR code input for boarding passes */}
          {selectedCategory === 'boarding_pass' && (
            <View style={styles.qrInputContainer}>
              <Text style={styles.qrInputLabel}>📱 QR Code text (optional)</Text>
              <TextInput
                style={styles.qrInput}
                value={qrInput}
                onChangeText={setQrInput}
                placeholder="Paste booking code or URL..."
                placeholderTextColor={colors.textTertiary}
                multiline={false}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.qrInputHint}>
                The QR will be shown when you tap the document.
              </Text>
            </View>
          )}

          {/* Expiration date — shown for passport, visa, insurance */}
          {(selectedCategory === 'passport' || selectedCategory === 'visa' || selectedCategory === 'insurance') && (
            <View style={styles.expiryContainer}>
              <Text style={styles.expiryLabel}>📅 Expiration Date (optional)</Text>
              <TextInput
                style={styles.expiryInput}
                value={expiryInput}
                onChangeText={setExpiryInput}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.textTertiary}
                keyboardType="numbers-and-punctuation"
                maxLength={10}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.expiryHint}>
                Shown as a badge on the document — alerts when expiring soon.
              </Text>
            </View>
          )}

          <TouchableOpacity onPress={handleAddMetadataOnly} style={styles.metadataLink}>
            <Text style={styles.metadataLinkText}>Add without file (metadata only)</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { setSelectedCategory(null); setQrInput(''); }} style={styles.backLink}>
            <Text style={styles.backLinkText}>← Back to categories</Text>
          </TouchableOpacity>

          {isUploading && (
            <Text style={styles.uploadingText}>Processing file...</Text>
          )}
        </View>
      )}

      {/* Document List */}
      {documents.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📁</Text>
          <Text style={styles.emptyText}>No documents yet</Text>
          <Text style={styles.emptySubtext}>
            Add your passport, visa, flight tickets, and more.{'\n'}
            {isMobile ? 'Take a photo or pick a file.' : 'Pick a file from your computer.'}
          </Text>
        </View>
      ) : (
        <View style={styles.documentList}>
          {documents.map(doc => (
            <DocumentItem
              key={doc.id}
              document={doc}
              onDelete={handleDeleteDocument}
              onView={handleViewDocument}
            />
          ))}
        </View>
      )}

      {/* QR Code Modal */}
      {qrModal && (
        <QRCodeModal
          visible={!!qrModal}
          title={qrModal.title}
          qrValue={qrModal.value}
          onClose={() => setQrModal(null)}
        />
      )}

      {/* Image Preview Modal (simple) */}
      {previewUri && (
        <TouchableOpacity
          style={styles.previewOverlay}
          activeOpacity={1}
          onPress={() => setPreviewUri(null)}
        >
          <View style={styles.previewCard}>
            <Image
              source={{ uri: previewUri }}
              style={styles.previewImage}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={() => setPreviewUri(null)} style={styles.previewClose}>
              <Text style={styles.previewCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 4,
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  subtitle: {
    fontSize: 12, color: colors.textTertiary, marginBottom: 16, fontStyle: 'italic',
  },
  addForm: {
    backgroundColor: colors.backgroundSecondary, borderRadius: 12,
    padding: 16, marginBottom: 16,
  },
  addTitle: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 8 },
  uploadHint: { fontSize: 12, color: colors.textSecondary, marginBottom: 12 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.background, borderRadius: 10, borderWidth: 1,
    borderColor: colors.border, paddingHorizontal: 12, paddingVertical: 10,
  },
  categoryChipIcon: { fontSize: 16 },
  categoryChipLabel: { fontSize: 13, fontWeight: '500', color: colors.text },
  uploadMethods: {
    flexDirection: 'row', gap: 10, marginBottom: 12,
  },
  uploadButton: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.background, borderRadius: 12, borderWidth: 1,
    borderColor: colors.primary, paddingVertical: 16, gap: 6,
  },
  uploadIcon: { fontSize: 28 },
  uploadLabel: { fontSize: 11, fontWeight: '600', color: colors.primary },
  qrInputContainer: {
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  qrInputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  qrInput: {
    fontSize: 13,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.backgroundSecondary,
  },
  qrInputHint: {
    fontSize: 11,
    color: colors.textTertiary,
    marginTop: 6,
  },
  expiryContainer: {
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 12,
  },
  expiryLabel: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 8 },
  expiryInput: {
    fontSize: 13,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.backgroundSecondary,
  },
  expiryHint: { fontSize: 11, color: colors.textTertiary, marginTop: 6 },
  metadataLink: { marginTop: 4 },
  metadataLinkText: { fontSize: 12, color: colors.textTertiary, textAlign: 'center' },
  backLink: { marginTop: 8 },
  backLinkText: { fontSize: 12, color: colors.primary, fontWeight: '500' },
  uploadingText: {
    fontSize: 12, color: colors.primary, fontStyle: 'italic', marginTop: 8,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center', paddingVertical: 32,
    backgroundColor: colors.backgroundSecondary, borderRadius: 12,
  },
  emptyIcon: { fontSize: 40, marginBottom: 8 },
  emptyText: { fontSize: 16, fontWeight: '600', color: colors.textSecondary, marginBottom: 4 },
  emptySubtext: {
    fontSize: 13, color: colors.textTertiary, textAlign: 'center', paddingHorizontal: 32,
    lineHeight: 19,
  },
  limitBanner: {
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  limitText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
  },
  documentList: { gap: 0 },
  // Image preview
  previewOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center',
    alignItems: 'center', zIndex: 100,
  },
  previewCard: {
    width: '90%', maxWidth: 400, backgroundColor: colors.background,
    borderRadius: 16, overflow: 'hidden', alignItems: 'center', padding: 8,
  },
  previewImage: { width: '100%', height: 400, borderRadius: 8 },
  previewClose: {
    marginTop: 12, marginBottom: 8, paddingVertical: 8, paddingHorizontal: 24,
  },
  previewCloseText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
});
