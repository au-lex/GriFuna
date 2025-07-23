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
import { useRouter } from 'expo-router';

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
  category: string;
  attendees?: number;
  description?: string;
}

interface EventSectionProps {
  title: string;
  events: Event[];
  showSeeAll?: boolean;
}



// Sample data with enhanced properties
const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Michael and Anthonia Party',
    date: '12',
    month: 'Jul',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://i.pinimg.com/1200x/52/e9/3a/52e93af2dec0bcf6db8ee3213c8dcf3b.jpg',
    isFree: true,
    category: 'Social',
    attendees: 150,
    description: 'Join us for an unforgettable celebration with music, dancing, and great company in beautiful Hawaii.',
  },
  {
    id: '2',
    title: 'Synergy Summit: Building Connections for Success',
    date: '24',
    month: 'Jul',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://i.pinimg.com/736x/8e/c1/f9/8ec1f9438afa68e8f2efd696219588f8.jpg',
    price: '$25.50',
    category: 'Business',
    attendees: 300,
    description: 'Network with industry leaders and discover new opportunities for professional growth and collaboration.',
  },
];

const nextWeekEvents: Event[] = [
  {
    id: '3',
    title: 'Elevate Forum: Powering Your Corporate Potential',
    date: '05',
    month: 'Oct',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://i.pinimg.com/736x/4f/13/31/4f1331a06474465b3171f2ca4184edfc.jpg',
    price: '$25.50',
    category: 'Professional',
    attendees: 250,
    description: 'Unlock your corporate potential with expert insights and strategic planning sessions.',
  },
  {
    id: '4',
    title: 'Leadership Nexus: Shaping Tomorrow\'s Strategies',
    date: '21',
    month: 'Oct',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://i.pinimg.com/736x/95/e5/12/95e5123c42487e16ff78847fcee936dd.jpg',
    price: '$25.50',
    category: 'Leadership',
    attendees: 180,
    description: 'Learn from top executives about future-focused leadership strategies and organizational transformation.',
  },
];

const pastEvents: Event[] = [
  {
    id: '5',
    title: 'SuccessCon: Navigating the Path to Excellence',
    date: '15',
    month: 'Jun',
    location: 'Shiloh, Hawaii 81063',
    image: 'https://i.pinimg.com/736x/95/e5/12/95e5123c42487e16ff78847fcee936dd.jpg',
    isFree: true,
    category: 'Conference',
    attendees: 500,
    description: 'A comprehensive conference focused on personal and professional excellence strategies.',
  },
];

// Enhanced Event Card Component (matching upcoming events style)
const EventCard: React.FC<{ event: Event; onPress?: () => void }> = ({ event, onPress }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity 
      style={styles.eventCard} 
      onPress={() => router.push('/eventDetails/Index')}
    >
      {/* Absolute Date Container */}
      <View style={styles.absoluteDateContainer}>
        <Text style={styles.dateNumber}>{event.date}</Text>
        <Text style={styles.dateMonth}>{event.month}</Text>
      </View>
      
      {/* Large Image */}
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      
      {/* Event Content */}
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveIcon}>🤍</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventLocation}>📍 {event.location}</Text>
        
        {/* Description */}
        {event.description && (
          <Text style={styles.eventDescription} numberOfLines={2}>
            {event.description}
          </Text>
        )}
        
        <View style={styles.eventFooter}>
          <Text style={styles.attendeesText}>👥 {event.attendees}</Text>
          
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Section Header Component
const SectionHeader: React.FC<{ title: string; showSeeAll?: boolean; onSeeAll?: () => void }> = ({ 
  title, 
  showSeeAll = true, 
  onSeeAll 
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {showSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Event Section Component
const EventSection: React.FC<EventSectionProps> = ({ title, events, showSeeAll = true }) => {
  return (
    <View style={styles.section}>
      <SectionHeader 
        title={title} 
        showSeeAll={showSeeAll}
        onSeeAll={() => console.log(`See all ${title}`)}
      />
      
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
const MyEvents: React.FC = () => {
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
    backgroundColor: Colors.bg,
  },
  scrollView: {
    flex: 1,
  },
  
  // Section Styles
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'rb',
    color: '#ffffff',
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.acc,
    fontFamily: 'ol',
  },
  
  // Enhanced Event Card Styles (matching upcoming events)
  eventCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: 'stretch',
    overflow: 'hidden',
    minHeight: 140,
    position: 'relative',
  },
  absoluteDateContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    zIndex: 10,
  },
  dateNumber: {
    fontSize: 20,
    fontFamily: 'rs',
    color: '#ffffff',
    lineHeight: 24,
  },
  dateMonth: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  eventImage: {
    width: 150,
    height: '100%',
    minHeight: 140,
  },
  eventContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    borderRadius: 12,
  },
  categoryText: {
    color: Colors.acc,
    fontSize: 12,
    fontFamily: 'rr',
  },
  saveButton: {
    padding: 4,
  },
  saveIcon: {
    fontSize: 20,
  },
  eventTitle: {
    fontSize: 15,
    fontFamily: 'mb',
    color: '#ffffff',
    marginBottom: 6,
    lineHeight: 20,
  },
  eventLocation: {
    fontSize: 13,
    color: '#a0a0a0',
    fontFamily: 'rr',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 12,
    color: '#b0b0b0',
    fontFamily: 'rr',
    lineHeight: 16,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: 14,
    color: '#a0a0a0',
    fontFamily: 'ol',
  },
  priceContainer: {
    // No additional margin needed
  },
  freeTag: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  freeText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'mb',
  },
  priceTag: {
    backgroundColor: Colors.acc,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  priceText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'mb',
  },
});

export default MyEvents;