import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
  attendeeAvatars?: string[];
}

interface EventSectionProps {
  title: string;
  events: Event[];
  showSeeAll?: boolean;
}

// Sample user avatars
const sampleAvatars = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=8',
];

// Sample data with enhanced properties and real avatars
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
    attendeeAvatars: sampleAvatars.slice(0, 4),
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
    attendeeAvatars: sampleAvatars.slice(2, 6),
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
    attendeeAvatars: sampleAvatars.slice(1, 5),
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
    attendeeAvatars: sampleAvatars.slice(3, 7),
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
    attendeeAvatars: sampleAvatars.slice(0, 8),
  },
];

// Fixed Header Component
const FixedHeader: React.FC<{ searchQuery: string; onSearchChange: (text: string) => void }> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  const router = useRouter();

  return (
    <View style={styles.fixedHeader}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      
      {/* Top Row - Back Arrow and Title */}
      <View style={styles.headerTopRow}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>My Events</Text>
        
        <View style={styles.placeholder} />
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#a0a0a0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#a0a0a0"
            value={searchQuery}
            onChangeText={onSearchChange}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => onSearchChange('')}>
              <Ionicons name="close-circle" size={20} color="#a0a0a0" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

// Avatar Stack Component
const AvatarStack: React.FC<{ avatars: string[]; maxVisible?: number }> = ({ 
  avatars, 
  maxVisible = 3 
}) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = avatars.length - maxVisible;

  return (
    <View style={styles.avatarStack}>
      {visibleAvatars.map((avatar, index) => (
        <Image
          key={index}
          source={{ uri: avatar }}
          style={[
            styles.avatar,
            { marginLeft: index > 0 ? -8 : 0, zIndex: maxVisible - index }
          ]}
        />
      ))}
      {remainingCount > 0 && (
        <View style={[styles.avatar, styles.remainingAvatar, { marginLeft: -8 }]}>
          <Text style={styles.remainingText}>+{remainingCount}</Text>
        </View>
      )}
    </View>
  );
};

// Enhanced Event Card Component
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
            <Ionicons name="heart-outline" size={20} color="#ffffff" />
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
          {/* Avatar Stack and Attendees */}
          <View style={styles.attendeesContainer}>
            {event.attendeeAvatars && event.attendeeAvatars.length > 0 && (
              <AvatarStack avatars={event.attendeeAvatars} />
            )}
           
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
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on search query
  const filterEvents = (events: Event[]) => {
    if (!searchQuery.trim()) return events;
    return events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredUpcomingEvents = filterEvents(upcomingEvents);
  const filteredNextWeekEvents = filterEvents(nextWeekEvents);
  const filteredPastEvents = filterEvents(pastEvents);

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <FixedHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredUpcomingEvents.length > 0 && (
          <EventSection title="Upcoming events" events={filteredUpcomingEvents} />
        )}
        {filteredNextWeekEvents.length > 0 && (
          <EventSection title="Next week events" events={filteredNextWeekEvents} />
        )}
        {filteredPastEvents.length > 0 && (
          <EventSection title="Past events" events={filteredPastEvents} showSeeAll={false} />
        )}
        
        {/* No Results */}
        {searchQuery.trim() && 
         filteredUpcomingEvents.length === 0 && 
         filteredNextWeekEvents.length === 0 && 
         filteredPastEvents.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No events found for "{searchQuery}"</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  
  // Fixed Header Styles
  fixedHeader: {
    backgroundColor: Colors.bg,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'rb',
    color: '#ffffff',
    textAlign: 'center',
  },
  placeholder: {
    width: 32, // Same width as back button for centering
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'rr',
  },
  
  // Avatar Styles
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.bg,
  },
  remainingAvatar: {
    backgroundColor: Colors.acc,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingText: {
    fontSize: 10,
    color: '#ffffff',
    fontFamily: 'mb',
  },
  
  // Content Styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    // paddingBottom: 100,
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
  
  // Enhanced Event Card Styles
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
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  attendeesText: {
    fontSize: 12,
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
  
  // No Results Styles
  noResultsContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#a0a0a0',
    fontFamily: 'rr',
    textAlign: 'center',
  },
});

export default MyEvents;