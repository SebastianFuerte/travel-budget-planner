// src/components/layout/DemoModeButton.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import colors from '../../theme/colors';
import { useTripStore } from '../../store';
import { Trip, TravelStyle, ConfirmedPrice } from '../../types';
import { TEMPLATES } from '../../services/templates';
import { logDemoModeOpened } from '../../services/analytics';
import { infoAlert } from '../../utils/alert';
import { saveTripDocuments } from '../../services/documentStorage';
import { TripDocumentsData } from '../../types/documents';
import { useTranslation } from '../../i18n';

export const DemoModeButton: React.FC = () => {
  const addTrip = useTripStore(state => state.addTrip);
  const { t } = useTranslation();

  const openDemoTrip = async () => {
    try {
      const template = TEMPLATES.find(t => t.id === 'japan-tokyo');
      if (!template) return;

      const travelStyle: TravelStyle = 'Mid';
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 30);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 10);

      const tripId = 'demo-' + Date.now().toString();

      // Example confirmed prices (user "found" real prices)
      const demoConfirmedPrices: ConfirmedPrice[] = [
        {
          id: 'cp-accom-1',
          category: 'accommodation',
          amount: 55, // per day per person
          source: 'Booking.com',
          confirmedAt: new Date().toISOString(),
          notes: 'Hotel Shinjuku Granbell - $110/night for double room',
        },
        {
          id: 'cp-insur-1',
          category: 'insurance',
          amount: 7,
          source: 'World Nomads',
          confirmedAt: new Date().toISOString(),
        },
      ];

      const demoTrip: Trip = {
        id: tripId,
        destination: 'Japan Explorer',
        city: 'Tokyo & Osaka',
        country: 'Japan',
        startDate,
        endDate,
        numberOfPeople: 2,
        currency: 'USD',
        travelStyle,
        budget: template.budgets[travelStyle],
        confirmedPrices: demoConfirmedPrices,
        flightBudget: {
          estimated: 1200,
          confirmed: {
            amount: 980,
            source: 'Google Flights',
            confirmedAt: new Date().toISOString(),
            notes: 'Avianca BOG-NRT round trip, 2 passengers',
          },
        },
        tags: ['🎭 Culture', '🏙️ City Break', '🍷 Gastronomy'],
        notes: 'Demo trip - Colombia passport holder traveling to Japan.\nEntry requirements: Visa required (no fee).\nExplore budget breakdown with provider links!',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addTrip(demoTrip);

      // Create demo documents and timeline events
      const flightDate = new Date(startDate);
      flightDate.setDate(flightDate.getDate() - 1);

      const returnFlightDate = new Date(endDate);

      const checkinDate = new Date(startDate);
      const checkoutDate = new Date(startDate);
      checkoutDate.setDate(checkoutDate.getDate() + 5);

      const now = new Date().toISOString();

      const demoDocsData: TripDocumentsData = {
        tripId,
        nationality: 'Colombia',
        passportType: 'ordinary',
        tripPurpose: 'tourism',
        documents: [
          {
            id: 'demo-doc-passport',
            tripId,
            category: 'passport',
            title: 'Passport - Main Traveler',
            notes: 'Expires Dec 2028. Valid for Japan entry (6+ months).',
            expirationDate: '2028-12-15',
            createdAt: now,
            updatedAt: now,
          },
          {
            id: 'demo-doc-visa',
            tripId,
            category: 'visa',
            title: 'Japan Tourist Visa (Short-term Stay)',
            notes: 'Approved at Japanese Embassy in Bogota. No fee. Valid for 90 days.',
            expirationDate: new Date(endDate.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            createdAt: now,
            updatedAt: now,
          },
          {
            id: 'demo-doc-flight-out',
            tripId,
            category: 'flight',
            title: 'Flight BOG → NRT (Avianca)',
            notes: 'Confirmation: ABC123. Departs 8:30 AM.',
            date: flightDate.toISOString(),
            createdAt: now,
            updatedAt: now,
          },
          {
            id: 'demo-doc-flight-return',
            tripId,
            category: 'flight',
            title: 'Flight KIX → BOG (Avianca)',
            notes: 'Confirmation: XYZ789. Departs 2:00 PM.',
            date: returnFlightDate.toISOString(),
            createdAt: now,
            updatedAt: now,
          },
          {
            id: 'demo-doc-boarding-out',
            tripId,
            category: 'boarding_pass',
            title: 'Boarding Pass - BOG → NRT',
            notes: 'Upload your boarding pass PDF or screenshot here for quick access at the airport.',
            date: flightDate.toISOString(),
            createdAt: now,
            updatedAt: now,
          },
          {
            id: 'demo-doc-hotel1',
            tripId,
            category: 'accommodation',
            title: 'Hotel Shinjuku Granbell (Tokyo)',
            notes: 'Booking ref: HT-456. 5 nights. Confirmed via Booking.com at $110/night.',
            date: checkinDate.toISOString(),
            createdAt: now,
            updatedAt: now,
          },
          {
            id: 'demo-doc-hotel2',
            tripId,
            category: 'accommodation',
            title: 'Osaka Namba Hotel',
            notes: 'Booking ref: OS-321. 5 nights.',
            date: checkoutDate.toISOString(),
            createdAt: now,
            updatedAt: now,
          },
          {
            id: 'demo-doc-insurance',
            tripId,
            category: 'insurance',
            title: 'World Nomads Travel Insurance',
            notes: 'Policy #INS-2024-78901. Covers medical + trip cancellation. $7/day/person.',
            expirationDate: endDate.toISOString().split('T')[0],
            createdAt: now,
            updatedAt: now,
          },
        ],
        timelineEvents: [
          {
            id: 'demo-evt-flight-dep',
            tripId,
            type: 'flight_departure',
            title: 'Flight BOG → NRT',
            date: flightDate.toISOString(),
            details: 'Avianca - Departs 8:30 AM',
          },
          {
            id: 'demo-evt-checkin1',
            tripId,
            type: 'checkin',
            title: 'Check-in: Hotel Shinjuku Granbell',
            date: checkinDate.toISOString(),
            details: 'Tokyo - 5 nights',
          },
          {
            id: 'demo-evt-checkout1',
            tripId,
            type: 'checkout',
            title: 'Check-out: Hotel Shinjuku Granbell',
            date: checkoutDate.toISOString(),
            details: 'Transfer to Osaka by Shinkansen',
          },
          {
            id: 'demo-evt-checkin2',
            tripId,
            type: 'checkin',
            title: 'Check-in: Osaka Namba Hotel',
            date: checkoutDate.toISOString(),
            details: 'Osaka - 5 nights',
          },
          {
            id: 'demo-evt-flight-ret',
            tripId,
            type: 'flight_return',
            title: 'Flight KIX → BOG',
            date: returnFlightDate.toISOString(),
            details: 'Avianca - Departs 2:00 PM',
          },
        ],
      };

      await saveTripDocuments(demoDocsData);

      logDemoModeOpened();

      router.push(`/trip/${demoTrip.id}`);
    } catch (error) {
      infoAlert('Error', 'Failed to create demo trip');
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={openDemoTrip}>
      <Text style={styles.icon}>🎭</Text>
      <Text style={styles.text}>{t.home.openDemoTrip}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  text: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
