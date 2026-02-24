// src/components/documents/TripTimeline.tsx
// Timeline view showing key trip dates

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import colors from '../../theme/colors';
import { Button } from '../ui/Button';
import { TimelineEvent, TIMELINE_TYPE_LABELS } from '../../types/documents';
import { confirmAlert } from '../../utils/alert';
import { useDocumentStore } from '../../store/documentStore';

interface TripTimelineProps {
  tripId: string;
  events: TimelineEvent[];
  tripStartDate: Date;
  tripEndDate: Date;
}

export const TripTimeline: React.FC<TripTimelineProps> = ({
  tripId,
  events,
  tripStartDate,
  tripEndDate,
}) => {
  const { addTimelineEvent, removeTimelineEvent } = useDocumentStore();
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Combine trip dates with custom events
  const allEvents: Array<{ date: Date; title: string; icon: string; type: string; id?: string }> = [
    {
      date: tripStartDate,
      title: 'Trip Start',
      icon: '🟢',
      type: 'trip_start',
    },
    ...events.map(e => ({
      date: new Date(e.date),
      title: e.title,
      icon: TIMELINE_TYPE_LABELS[e.type]?.icon || '📌',
      type: e.type,
      id: e.id,
      details: e.details,
    })),
    {
      date: tripEndDate,
      title: 'Trip End',
      icon: '🔴',
      type: 'trip_end',
    },
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  const handleQuickAdd = (type: TimelineEvent['type']) => {
    const typeInfo = TIMELINE_TYPE_LABELS[type];
    const dateStr = type === 'flight_departure'
      ? tripStartDate.toISOString()
      : type === 'flight_return'
        ? tripEndDate.toISOString()
        : tripStartDate.toISOString();

    addTimelineEvent(tripId, {
      tripId,
      type,
      title: typeInfo.label,
      date: dateStr,
    });
    setShowQuickAdd(false);
  };

  const handleDeleteEvent = (eventId: string, title: string) => {
    confirmAlert(
      'Delete Event',
      `Remove "${title}" from timeline?`,
      () => removeTimelineEvent(tripId, eventId),
      'Delete'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Trip Timeline</Text>
        <Button
          title={showQuickAdd ? 'Cancel' : '+ Event'}
          onPress={() => setShowQuickAdd(!showQuickAdd)}
          variant={showQuickAdd ? 'outline' : 'primary'}
          size="small"
        />
      </View>

      {/* Quick Add Buttons */}
      {showQuickAdd && (
        <View style={styles.quickAdd}>
          <Text style={styles.quickAddTitle}>Add event:</Text>
          <View style={styles.quickAddGrid}>
            {(Object.entries(TIMELINE_TYPE_LABELS) as [TimelineEvent['type'], { label: string; icon: string }][]).map(
              ([key, value]) => (
                <TouchableOpacity
                  key={key}
                  style={styles.quickAddButton}
                  onPress={() => handleQuickAdd(key)}
                >
                  <Text style={styles.quickAddIcon}>{value.icon}</Text>
                  <Text style={styles.quickAddLabel}>{value.label}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      )}

      {/* Timeline */}
      <View style={styles.timeline}>
        {allEvents.map((event, index) => {
          const isFirst = index === 0;
          const isLast = index === allEvents.length - 1;
          const isPast = event.date < new Date();

          return (
            <View key={event.id || `${event.type}-${index}`} style={styles.timelineItem}>
              {/* Line */}
              <View style={styles.lineColumn}>
                {!isFirst && (
                  <View style={[styles.lineSegment, isPast && styles.lineSegmentPast]} />
                )}
                <View
                  style={[
                    styles.dot,
                    isPast && styles.dotPast,
                    (event.type === 'trip_start' || event.type === 'trip_end') && styles.dotHighlight,
                  ]}
                />
                {!isLast && (
                  <View style={[styles.lineSegment, isPast && styles.lineSegmentPast]} />
                )}
              </View>

              {/* Content */}
              <View style={styles.eventContent}>
                <View style={styles.eventHeader}>
                  <Text style={styles.eventIcon}>{event.icon}</Text>
                  <View style={styles.eventInfo}>
                    <Text style={[styles.eventTitle, isPast && styles.eventTitlePast]}>
                      {event.title}
                    </Text>
                    <Text style={styles.eventDate}>
                      {format(event.date, 'EEE, MMM dd, yyyy')}
                    </Text>
                  </View>
                  {event.id && (
                    <TouchableOpacity
                      style={styles.eventDelete}
                      onPress={() => handleDeleteEvent(event.id!, event.title)}
                    >
                      <Text style={styles.eventDeleteText}>X</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  quickAdd: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  quickAddTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  quickAddGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  quickAddIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  quickAddLabel: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  timeline: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 60,
  },
  lineColumn: {
    width: 24,
    alignItems: 'center',
  },
  lineSegment: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
  },
  lineSegmentPast: {
    backgroundColor: colors.primaryLight,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
    borderWidth: 2,
    borderColor: colors.background,
  },
  dotPast: {
    backgroundColor: colors.primary,
  },
  dotHighlight: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
  },
  eventContent: {
    flex: 1,
    paddingLeft: 12,
    paddingBottom: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  eventTitlePast: {
    color: colors.textSecondary,
  },
  eventDate: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 2,
  },
  eventDelete: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  eventDeleteText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.error,
  },
});
