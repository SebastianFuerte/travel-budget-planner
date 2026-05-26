// src/components/ui/SearchableSelect.tsx
// Dropdown select with text search filter

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
  ViewStyle,
} from 'react-native';
import colors from '../../theme/colors';

interface SelectOption {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  label?: string;
  value: string;
  options: string[] | SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  error?: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  allowCustom?: boolean;
}

const normalizeOptions = (options: string[] | SelectOption[]): SelectOption[] =>
  options.map(opt => (typeof opt === 'string' ? { label: opt, value: opt } : opt));

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  searchPlaceholder = 'Search...',
  noResultsText = 'No results found',
  error,
  containerStyle,
  disabled = false,
  allowCustom = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return normalizedOptions;
    const lower = searchQuery.toLowerCase();
    return normalizedOptions.filter(opt => opt.label.toLowerCase().includes(lower));
  }, [normalizedOptions, searchQuery]);

  const displayValue = useMemo(() => {
    const match = normalizedOptions.find(opt => opt.value === value);
    return match ? match.label : value;
  }, [normalizedOptions, value]);

  const handleOpen = () => {
    if (disabled) return;
    setSearchQuery('');
    setIsOpen(true);
  };

  const handleSelect = (opt: SelectOption) => {
    onChange(opt.value);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.select, error && styles.selectError, disabled && styles.selectDisabled]}
        onPress={handleOpen}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text style={[styles.selectText, !value && styles.placeholder]}>
          {value ? displayValue : placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || 'Select'}</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={searchPlaceholder}
                placeholderTextColor={colors.textTertiary}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Text style={styles.clearButton}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Options List */}
            <ScrollView style={styles.optionsList} keyboardShouldPersistTaps="handled">
              {filteredOptions.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>{noResultsText}</Text>
                  {allowCustom && searchQuery.trim().length > 0 && (
                    <TouchableOpacity
                      style={styles.customOption}
                      onPress={() => handleSelect({ label: searchQuery.trim(), value: searchQuery.trim() })}
                    >
                      <Text style={styles.customOptionText}>
                        Use "{searchQuery.trim()}" as custom entry
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                filteredOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    style={[styles.option, opt.value === value && styles.optionSelected]}
                    onPress={() => handleSelect(opt)}
                  >
                    <Text style={[styles.optionText, opt.value === value && styles.optionTextSelected]}>
                      {opt.label}
                    </Text>
                    {opt.value === value && <Text style={styles.checkmark}>✓</Text>}
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  select: {
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectError: {
    borderColor: colors.error,
  },
  selectDisabled: {
    opacity: 0.5,
  },
  selectText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  placeholder: {
    color: colors.textTertiary,
  },
  arrow: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    ...Platform.select({
      web: { maxWidth: 400 },
      default: {},
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  modalClose: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 10,
    ...Platform.select({
      web: { outlineStyle: 'none' } as any,
      default: {},
    }),
  },
  clearButton: {
    fontSize: 16,
    color: colors.textSecondary,
    paddingLeft: 8,
  },
  optionsList: {
    maxHeight: 350,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.primaryLight + '20',
  },
  optionText: {
    fontSize: 15,
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: colors.primary,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  customOption: {
    marginTop: 12,
    backgroundColor: colors.primary + '15',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  customOptionText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
