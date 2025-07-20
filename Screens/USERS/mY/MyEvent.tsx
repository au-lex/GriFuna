import { Colors } from '@/constants/Colors';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// Type definitions
interface Event {
  id: string;
  title: string;
  date: string;
  month: string;
  location: string;
  image: string;
  price?: string;
  isFree?: boolean;
}

interface EventSectionProps {
  title: string;
  events: Event[];
  showSeeAll?: boolean;
}

// Sample data
const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Michael and Anthonia Party',
    date: '12',
    month: 'Jul',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
    isFree: true,
  },
  {
    id: '2',
    title: 'Synergy Summit: Building Connections for Success',
    date: '24',
    month: 'Jul',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop',
    price: '$25.50',
  },
];

const nextWeekEvents: Event[] = [
  {
    id: '3',
    title: 'Elevate Forum: Powering Your Corporate Potential',
    date: '05',
    month: 'Oct',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&fit=crop',
    price: '$25.50',
  },
  {
    id: '4',
    title: 'Leadership Nexus: Shaping Tomorrow\'s Strategies',
    date: '21',
    month: 'Oct',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=300&h=200&fit=crop',
    price: '$25.50',
  },
];

const pastEvents: Event[] = [
  {
    id: '5',
    title: 'SuccessCon: Navigating the Path to Excellence',
    date: '15',
    month: 'Jun',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop',
    isFree: true,
  },
];

// Event Card Component
const EventCard: React.FC<{ event: Event; onPress?: () => void }> = ({ event, onPress }) => {
  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateNumber}>{event.date}</Text>
        <Text style={styles.dateMonth}>{event.month}</Text>
      </View>
      
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventLocation}>📍 {event.location}</Text>
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

// Event Section Component
const EventSection: React.FC<EventSectionProps> = ({ title, events, showSeeAll = true }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showSeeAll && (
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onPress={() => console.log(`Pressed event: ${event.title}`)}
        />
      ))}
    </View>
  );
};

// Main Component
const   MyEvents: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <EventSection title="Upcoming events" events={upcomingEvents} />
        <EventSection title="Next week events" events={nextWeekEvents} />
        <EventSection title="Past events" events={pastEvents} showSeeAll={false} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bSec,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
fontFamily: 'mb',

  },
  seeAllText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2438',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    minWidth: 40,
  },
  dateNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 28,
  },
  dateMonth: {
    fontSize: 12,
    color: '#a0a0a0',
    fontWeight: '500',
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  eventContent: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
fontFamily: 'mb',
    color: '#ffffff',
    marginBottom: 6,
    lineHeight: 20,
  },
  eventLocation: {
    fontSize: 14,
    color: '#a0a0a0',
    fontWeight: '400',
  },
  priceContainer: {
    marginLeft: 12,
  },
  freeTag: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  freeText: {
    color: '#ffffff',
    fontSize: 12,
fontFamily: 'mb',
  },
  priceTag: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: '#ffffff',
    fontSize: 12,
fontFamily: 'mb',
  },
});

export default   MyEvents;