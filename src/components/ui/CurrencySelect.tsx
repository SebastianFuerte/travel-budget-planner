// src/components/ui/CurrencySelect.tsx
// Searchable dropdown for currency selection
// Shows: code + symbol + name (e.g. "COP $ — Colombian Peso")
// Search by code, name, symbol, or country name

import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal, TextInput,
  FlatList, Platform, ViewStyle,
} from 'react-native';
import colors from '../../theme/colors';
import {
  CurrencyInfo,
  getOrderedCurrencies,
  getSuggestedCurrency,
  searchCurrencies,
} from '../../services/currencies';

interface CurrencySelectProps {
  label?: string;
  value: string;
  onChange: (code: string) => void;
  selectedCountry?: string;
  placeholder?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  value,
  onChange,
  selectedCountry,
  placeholder = 'Select currency',
  error,
  containerStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const suggested = useMemo(() => {
    let locale: string | undefined;
    try {
      if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
        locale = navigator.language;
      }
    } catch {}
    return getSuggestedCurrency({ userLocale: locale, selectedCountry });
  }, [selectedCountry]);

  const orderedCurrencies = useMemo(() => getOrderedCurrencies(suggested), [suggested]);

  const filteredCurrencies = useMemo(
    () => searchCurrencies(orderedCurrencies, search),
    [orderedCurrencies, search]
  );

  const selectedCurrency = orderedCurrencies.find(c => c.code === value);
  const displayText = selectedCurrency
    ? `${selectedCurrency.code} ${selectedCurrency.symbol} — ${selectedCurrency.name}`
    : placeholder;

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearch('');
  };

  const renderItem = ({ item, index }: { item: CurrencyInfo; index: number }) => {
    const isSelected = item.code === value;
    const isSuggested = index === 0 && item.code === suggested && !search;

    return (
      <TouchableOpacity
        style={[styles.option, isSelected && styles.optionSelected]}
        onPress={() => handleSelect(item.code)}
      >
        <View style={styles.optionContent}>
          <Text style={[styles.optionCode, isSelected && styles.optionCodeSelected]}>
            {item.code}
          </Text>
          <Text style={styles.optionSymbol}>{item.symbol}</Text>
          <Text style={[styles.optionName, isSelected && styles.optionNameSelected]} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <View style={styles.optionRight}>
          {isSuggested && (
            <View style={styles.suggestedBadge}>
              <Text style={styles.suggestedText}>Suggested</Text>
            </View>
          )}
          {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.select, error && styles.selectError]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.selectText, !selectedCurrency && styles.placeholder]} numberOfLines={1}>
          {displayText}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => { setIsOpen(false); setSearch(''); }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => { setIsOpen(false); setSearch(''); }}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Currency</Text>
              <TouchableOpacity onPress={() => { setIsOpen(false); setSearch(''); }}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Search by code, name, or country..."
                placeholderTextColor={colors.textTertiary}
                autoFocus={Platform.OS !== 'web'}
              />
            </View>

            <FlatList
              data={filteredCurrencies}
              keyExtractor={item => item.code}
              renderItem={renderItem}
              style={styles.list}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View style={styles.emptyList}>
                  <Text style={styles.emptyText}>No currencies found for "{search}"</Text>
                </View>
              }
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 },
  select: {
    backgroundColor: colors.backgroundSecondary, borderWidth: 1, borderColor: colors.border,
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  selectError: { borderColor: colors.error },
  selectText: { fontSize: 14, color: colors.text, flex: 1 },
  placeholder: { color: colors.textTertiary },
  arrow: { fontSize: 12, color: colors.textSecondary, marginLeft: 8 },
  error: { fontSize: 12, color: colors.error, marginTop: 4 },
  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  modalContent: {
    backgroundColor: colors.background, borderRadius: 16,
    width: '100%', maxWidth: 440, maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', color: colors.text },
  modalClose: { fontSize: 24, color: colors.textSecondary },
  searchContainer: { padding: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  searchInput: {
    backgroundColor: colors.backgroundSecondary, borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: colors.text,
    borderWidth: 1, borderColor: colors.border,
    ...Platform.select({ web: { outlineStyle: 'none' } as any, default: {} }),
  },
  list: { maxHeight: 400 },
  option: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  optionSelected: { backgroundColor: colors.primary + '10' },
  optionContent: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 8 },
  optionCode: { fontSize: 14, fontWeight: '700', color: colors.text, width: 40 },
  optionCodeSelected: { color: colors.primary },
  optionSymbol: { fontSize: 14, color: colors.textSecondary, width: 30 },
  optionName: { fontSize: 13, color: colors.textSecondary, flex: 1 },
  optionNameSelected: { color: colors.primary },
  optionRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  suggestedBadge: {
    backgroundColor: '#DCFCE7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
  },
  suggestedText: { fontSize: 9, fontWeight: '700', color: '#166534' },
  checkmark: { fontSize: 18, color: colors.primary },
  emptyList: { padding: 24, alignItems: 'center' },
  emptyText: { fontSize: 14, color: colors.textTertiary },
});
