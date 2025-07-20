import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

// Type definitions
interface SavedEvent {
  id: string;
  title: string;
  date: string;
  month: string;
  location: string;
  image: string;
  price?: string;
  isFree?: boolean;
  category: string;
  time: string;
  savedDate: string;
}

// Sample saved events data
const initialSavedEvents: SavedEvent[] = [
  {
    id: '1',
    title: 'Michael and Anthonia Party',
    date: '12',
    month: 'Jul',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
    isFree: true,
    category: 'Social',
    time: '7:00 PM',
    savedDate: '2 days ago',
  },
  {
    id: '2',
    title: 'Synergy Summit: Building Connections for Success',
    date: '24',
    month: 'Jul',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop',
    price: '$25.50',
    category: 'Business',
    time: '9:00 AM',
    savedDate: '1 week ago',
  },
  {
    id: '3',
    title: 'Elevate Forum: Powering Your Corporate Potential',
    date: '05',
    month: 'Oct',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&fit=crop',
    price: '$25.50',
    category: 'Professional',
    time: '10:00 AM',
    savedDate: '3 days ago',
  },
  {
    id: '4',
    title: 'Creative Workshop: Digital Art Mastery',
    date: '15',
    month: 'Aug',
    location: 'Creative Hub, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&h=200&fit=crop',
    price: '$45.00',
    category: 'Workshop',
    time: '2:00 PM',
    savedDate: '5 days ago',
  },
  {
    id: '5',
    title: 'Tech Innovation Conference 2024',
    date: '28',
    month: 'Aug',
    location: 'Tech Center, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop',
    isFree: true,
    category: 'Technology',
    time: '9:30 AM',
    savedDate: '1 day ago',
  },
];

// Saved Event Card Component
const SavedEventCard: React.FC<{ 
  event: SavedEvent; 
  onPress?: () => void;
  onRemove: (id: string) => void;
}> = ({ event, onPress, onRemove }) => {
  const handleRemove = () => {
    Alert.alert(
      'Remove Event',
      'Are you sure you want to remove this event from your saved list?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => onRemove(event.id)
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateNumber}>{event.date}</Text>
        <Text style={styles.dateMonth}>{event.month}</Text>
      </View>
      
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
          <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
            <Text style={styles.removeIcon}>❤️</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.eventTitle}>{event.title}</Text>
        
        <View style={styles.eventDetails}>
          <Text style={styles.eventLocation}>📍 {event.location}</Text>
          <Text style={styles.eventTime}>🕐 {event.time}</Text>
        </View>
        
        <Text style={styles.savedDate}>Saved {event.savedDate}</Text>
      </View>
      
      <View style={styles.priceContainer}>
        {event.isFree ? (
          <View style={styles.freeTag}>
            <Text style={styles.freeText}>FREE</Text>
          </View>
        ) : (
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{event.price}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Empty State Component
const EmptyState: React.FC = () => (
  <View style={styles.emptyState}>
    <Text style={styles.emptyIcon}>💾</Text>
    <Text style={styles.emptyTitle}>No Saved Events</Text>
    <Text style={styles.emptyDescription}>
      Events you save will appear here. Start exploring and save events you're interested in!
    </Text>
  </View>
);

// Stats Card Component
const StatsCard: React.FC<{ count: number }> = ({ count }) => (
  <View style={styles.statsCard}>
    <View style={styles.statsContent}>
      <Text style={styles.statsNumber}>{count}</Text>
      <Text style={styles.statsLabel}>Saved Events</Text>
    </View>
    <View style={styles.statsIcon}>
      <Text style={styles.statsEmoji}>💾</Text>
    </View>
  </View>
);

// Main Saved Events Component
const SavedEventsScreen: React.FC = () => {
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>(initialSavedEvents);

  const handleRemoveEvent = (eventId: string) => {
    setSavedEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Saved Events',
      'Are you sure you want to remove all saved events? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => setSavedEvents([])
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Events</Text>
        {savedEvents.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {savedEvents.length > 0 && (
          <StatsCard count={savedEvents.length} />
        )}
        
        {savedEvents.length === 0 ? (
          <EmptyState />
        ) : (
          <View style={styles.eventsContainer}>
            {savedEvents.map((event) => (
              <SavedEventCard
                key={event.id}
                event={event}
                onPress={() => console.log(`Pressed saved event: ${event.title}`)}
                onRemove={handleRemoveEvent}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1625',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  clearAllText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsCard: {
    backgroundColor: '#2a2438',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsContent: {
    flex: 1,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8b5cf6',
    lineHeight: 36,
  },
  statsLabel: {
    fontSize: 16,
    color: '#a0a0a0',
    marginTop: 4,
  },
  statsIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#8b5cf6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsEmoji: {
    fontSize: 24,
  },
  eventsContainer: {
    paddingBottom: 20,
  },
  eventCard: {
    backgroundColor: '#2a2438',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  dateContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 24,
  },
  dateMonth: {
    fontSize: 12,
    color: '#a0a0a0',
    fontWeight: '500',
  },
  eventImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 16,
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  removeButton: {
    padding: 4,
  },
  removeIcon: {
    fontSize: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
    lineHeight: 22,
  },
  eventDetails: {
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  savedDate: {
    fontSize: 12,
    color: '#8b5cf6',
    fontStyle: 'italic',
  },
  priceContainer: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  freeTag: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  freeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  priceTag: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 40,
  },
});

export default SavedEventsScreen;