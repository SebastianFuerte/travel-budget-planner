// src/components/ui/DateRangePicker.tsx
// Calendar-based date range picker (no text input)

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';

interface DateRangePickerProps {
  label?: string;
  startDate: Date | null;
  endDate: Date | null;
  onRangeChange: (start: Date, end: Date) => void;
  error?: string;
  minDate?: Date;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isInRange = (day: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  return day.getTime() >= start.getTime() && day.getTime() <= end.getTime();
};

const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const formatDisplay = (date: Date | null): string => {
  if (!date) return '--';
  return `${MONTH_NAMES[date.getMonth()].substring(0, 3)} ${date.getDate()}, ${date.getFullYear()}`;
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  startDate,
  endDate,
  onRangeChange,
  error,
  minDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => (startDate || new Date()).getFullYear());
  const [viewMonth, setViewMonth] = useState(() => (startDate || new Date()).getMonth());
  const [tempStart, setTempStart] = useState<Date | null>(startDate);
  const [tempEnd, setTempEnd] = useState<Date | null>(endDate);
  const [selectingEnd, setSelectingEnd] = useState(false);

  const daysInMonth = useMemo(() => {
    return new Date(viewYear, viewMonth + 1, 0).getDate();
  }, [viewYear, viewMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(viewYear, viewMonth, 1).getDay();
  }, [viewYear, viewMonth]);

  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    // Leading empty cells
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(viewYear, viewMonth, d));
    }
    return days;
  }, [viewYear, viewMonth, daysInMonth, firstDayOfWeek]);

  const handleOpen = () => {
    setTempStart(startDate);
    setTempEnd(endDate);
    setSelectingEnd(false);
    const ref = startDate || new Date();
    setViewYear(ref.getFullYear());
    setViewMonth(ref.getMonth());
    setIsOpen(true);
  };

  const handleDayPress = (day: Date) => {
    if (minDate && day.getTime() < minDate.getTime()) return;

    if (!selectingEnd) {
      // Selecting start date
      setTempStart(day);
      setTempEnd(null);
      setSelectingEnd(true);
    } else {
      // Selecting end date
      if (tempStart && day.getTime() < tempStart.getTime()) {
        // If picked before start, make it the new start
        setTempStart(day);
        setTempEnd(null);
      } else {
        setTempEnd(day);
        setSelectingEnd(false);
      }
    }
  };

  const handleConfirm = () => {
    if (tempStart && tempEnd) {
      onRangeChange(tempStart, tempEnd);
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const isDisabled = (day: Date): boolean => {
    if (minDate && day.getTime() < minDate.getTime()) return true;
    return false;
  };

  const getDayStyle = (day: Date) => {
    const isStart = tempStart && isSameDay(day, tempStart);
    const isEnd = tempEnd && isSameDay(day, tempEnd);
    const inRange = isInRange(day, tempStart, tempEnd);
    const disabled = isDisabled(day);
    const today = isSameDay(day, new Date());

    return {
      isStart,
      isEnd,
      inRange,
      disabled,
      today,
    };
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity style={[styles.select, error && styles.selectError]} onPress={handleOpen}>
        <View style={styles.dateDisplay}>
          <View style={styles.dateColumn}>
            <Text style={styles.dateLabel}>Start</Text>
            <Text style={[styles.dateValue, !startDate && styles.placeholder]}>
              {formatDisplay(startDate)}
            </Text>
          </View>
          <Text style={styles.dateArrow}>→</Text>
          <View style={styles.dateColumn}>
            <Text style={styles.dateLabel}>End</Text>
            <Text style={[styles.dateValue, !endDate && styles.placeholder]}>
              {formatDisplay(endDate)}
            </Text>
          </View>
        </View>
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
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Dates</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Selection hint */}
            <View style={styles.hintBar}>
              <Text style={styles.hintText}>
                {!selectingEnd
                  ? 'Tap to select start date'
                  : 'Now tap to select end date'}
              </Text>
            </View>

            {/* Month Navigation */}
            <View style={styles.monthNav}>
              <TouchableOpacity onPress={handlePrevMonth} style={styles.navButton}>
                <Text style={styles.navText}>◀</Text>
              </TouchableOpacity>
              <Text style={styles.monthTitle}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </Text>
              <TouchableOpacity onPress={handleNextMonth} style={styles.navButton}>
                <Text style={styles.navText}>▶</Text>
              </TouchableOpacity>
            </View>

            {/* Day names header */}
            <View style={styles.dayNamesRow}>
              {DAY_NAMES.map(d => (
                <Text key={d} style={styles.dayName}>{d}</Text>
              ))}
            </View>

            {/* Calendar grid */}
            <View style={styles.calendarGrid}>
              {calendarDays.map((day, i) => {
                if (!day) {
                  return <View key={`empty-${i}`} style={styles.dayCell} />;
                }
                const ds = getDayStyle(day);
                return (
                  <TouchableOpacity
                    key={formatDate(day)}
                    style={[
                      styles.dayCell,
                      ds.inRange && !ds.isStart && !ds.isEnd && styles.dayCellInRange,
                      ds.isStart && styles.dayCellStart,
                      ds.isEnd && styles.dayCellEnd,
                    ]}
                    onPress={() => handleDayPress(day)}
                    disabled={ds.disabled}
                  >
                    <View style={[
                      styles.dayInner,
                      (ds.isStart || ds.isEnd) && styles.dayInnerSelected,
                      ds.today && !ds.isStart && !ds.isEnd && styles.dayInnerToday,
                    ]}>
                      <Text style={[
                        styles.dayText,
                        ds.disabled && styles.dayTextDisabled,
                        (ds.isStart || ds.isEnd) && styles.dayTextSelected,
                        ds.inRange && !ds.isStart && !ds.isEnd && styles.dayTextInRange,
                        ds.today && !ds.isStart && !ds.isEnd && styles.dayTextToday,
                      ]}>
                        {day.getDate()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Selected range summary */}
            <View style={styles.rangeSummary}>
              <View style={styles.rangeItem}>
                <Text style={styles.rangeLabel}>Start:</Text>
                <Text style={styles.rangeValue}>{formatDisplay(tempStart)}</Text>
              </View>
              <View style={styles.rangeItem}>
                <Text style={styles.rangeLabel}>End:</Text>
                <Text style={styles.rangeValue}>{formatDisplay(tempEnd)}</Text>
              </View>
              {tempStart && tempEnd && (
                <Text style={styles.rangeDuration}>
                  {Math.round((tempEnd.getTime() - tempStart.getTime()) / (1000 * 60 * 60 * 24))} nights
                </Text>
              )}
            </View>

            {/* Confirm button */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.confirmButton, (!tempStart || !tempEnd) && styles.confirmButtonDisabled]}
                onPress={handleConfirm}
                disabled={!tempStart || !tempEnd}
              >
                <Text style={styles.confirmText}>Confirm Dates</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const CELL_SIZE = 40;

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
    padding: 12,
  },
  selectError: {
    borderColor: colors.error,
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  dateColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    color: colors.textTertiary,
    fontWeight: '500',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '600',
  },
  dateArrow: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  placeholder: {
    color: colors.textTertiary,
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
    padding: 16,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    width: '100%',
    maxWidth: 380,
    ...Platform.select({
      web: { maxWidth: 380 },
      default: {},
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  modalClose: {
    fontSize: 24,
    color: colors.textSecondary,
  },
  hintBar: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  hintText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navButton: {
    padding: 8,
  },
  navText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  dayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  dayName: {
    width: CELL_SIZE,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.textTertiary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellInRange: {
    backgroundColor: colors.primaryLight + '20',
  },
  dayCellStart: {
    backgroundColor: colors.primaryLight + '20',
    borderTopLeftRadius: CELL_SIZE / 2,
    borderBottomLeftRadius: CELL_SIZE / 2,
  },
  dayCellEnd: {
    backgroundColor: colors.primaryLight + '20',
    borderTopRightRadius: CELL_SIZE / 2,
    borderBottomRightRadius: CELL_SIZE / 2,
  },
  dayInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayInnerSelected: {
    backgroundColor: colors.primary,
  },
  dayInnerToday: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dayText: {
    fontSize: 14,
    color: colors.text,
  },
  dayTextDisabled: {
    color: colors.textTertiary,
    opacity: 0.4,
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dayTextInRange: {
    color: colors.primary,
    fontWeight: '500',
  },
  dayTextToday: {
    color: colors.primary,
    fontWeight: '600',
  },
  rangeSummary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 8,
  },
  rangeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rangeLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  rangeValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  rangeDuration: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  modalActions: {
    padding: 16,
    paddingTop: 8,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.4,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
