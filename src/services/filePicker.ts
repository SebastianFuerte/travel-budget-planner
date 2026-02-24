// src/services/filePicker.ts
// File picker service: camera, photo library, PDF/document picker
// Works with Expo Go on iOS — no native modules required beyond expo-image-picker / expo-document-picker

import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { DocumentFileType } from '../types/documents';

export interface PickedFile {
  uri: string;
  fileType: DocumentFileType;
  fileName: string;
  fileSize?: number;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

/** Request camera permission, returns true if granted */
export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'web') return true;
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === 'granted';
};

/** Request photo library permission, returns true if granted */
export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'web') return true;
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

/** Take a photo with the camera */
export const takePhoto = async (): Promise<PickedFile | null> => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    throw new Error('PERMISSION_DENIED: Camera access is required to take photos. Go to Settings > Travel Budget Planner > Camera to enable it.');
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
    allowsEditing: false,
  });

  if (result.canceled || !result.assets || result.assets.length === 0) {
    return null; // User cancelled
  }

  const asset = result.assets[0];
  const fileName = asset.fileName || `photo_${Date.now()}.jpg`;

  // Copy to app's document directory for persistence
  const localUri = await copyToLocalStorage(asset.uri, fileName);

  return {
    uri: localUri,
    fileType: 'image',
    fileName,
    fileSize: asset.fileSize,
  };
};

/** Pick an image from the photo library */
export const pickImage = async (): Promise<PickedFile | null> => {
  const hasPermission = await requestMediaLibraryPermission();
  if (!hasPermission) {
    throw new Error('PERMISSION_DENIED: Photo Library access is required. Go to Settings > Travel Budget Planner > Photos to enable it.');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8,
    allowsEditing: false,
  });

  if (result.canceled || !result.assets || result.assets.length === 0) {
    return null;
  }

  const asset = result.assets[0];
  const fileName = asset.fileName || `image_${Date.now()}.jpg`;

  const localUri = await copyToLocalStorage(asset.uri, fileName);

  return {
    uri: localUri,
    fileType: 'image',
    fileName,
    fileSize: asset.fileSize,
  };
};

/** Pick a PDF or document from Files / iCloud Drive */
export const pickDocument = async (): Promise<PickedFile | null> => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/pdf', 'image/*'],
    copyToCacheDirectory: true,
  });

  if (result.canceled || !result.assets || result.assets.length === 0) {
    return null;
  }

  const asset = result.assets[0];

  // Check file size
  if (asset.size && asset.size > MAX_FILE_SIZE) {
    throw new Error(`FILE_TOO_LARGE: File is ${Math.round(asset.size / 1024 / 1024)}MB. Maximum size is 20MB.`);
  }

  const isPdf = asset.mimeType?.includes('pdf') || asset.name?.endsWith('.pdf');
  const fileType: DocumentFileType = isPdf ? 'pdf' : 'image';
  const fileName = asset.name || `document_${Date.now()}.${isPdf ? 'pdf' : 'jpg'}`;

  const localUri = await copyToLocalStorage(asset.uri, fileName);

  return {
    uri: localUri,
    fileType,
    fileName,
    fileSize: asset.size,
  };
};

/** Copy file to app's persistent document directory */
const copyToLocalStorage = async (sourceUri: string, fileName: string): Promise<string> => {
  if (Platform.OS === 'web') {
    // On web, keep the original URI (blob URL or data URI)
    return sourceUri;
  }

  const docsDir = FileSystem.documentDirectory;
  if (!docsDir) return sourceUri;

  const destDir = docsDir + 'travel_docs/';
  const dirInfo = await FileSystem.getInfoAsync(destDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(destDir, { intermediates: true });
  }

  // Add timestamp to avoid collisions
  const safeName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const destUri = destDir + safeName;

  await FileSystem.copyAsync({ from: sourceUri, to: destUri });
  return destUri;
};

/** Delete a stored file */
export const deleteStoredFile = async (fileUri: string): Promise<void> => {
  if (Platform.OS === 'web') return;
  try {
    const info = await FileSystem.getInfoAsync(fileUri);
    if (info.exists) {
      await FileSystem.deleteAsync(fileUri);
    }
  } catch {
    // File may already be deleted
  }
};

/** Check if a file still exists */
export const fileExists = async (fileUri: string): Promise<boolean> => {
  if (Platform.OS === 'web') return true;
  try {
    const info = await FileSystem.getInfoAsync(fileUri);
    return info.exists;
  } catch {
    return false;
  }
};
