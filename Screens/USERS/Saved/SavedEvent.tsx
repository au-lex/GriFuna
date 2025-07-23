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
  Alert,
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
  bookmarkedAt?: string; // When it was bookmarked
  eventStatus?: 'upcoming' | 'ongoing' | 'past';
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
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=10',
];

// Sample bookmarked events data
const bookmarkedEvents: Event[] = [
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
    bookmarkedAt: '2 days ago',
    eventStatus: 'upcoming',
  },
  {
    id: '2',
    title: 'Tech Innovation Conference 2024',
    date: '28',
    month: 'Jul',
    location: 'Silicon Valley, CA 94087',
    image: 'https://i.pinimg.com/736x/e5/ca/00/e5ca00308bacd2ec74b0b12bb60755d0.jpg',
    price: '$89.99',
    category: 'Technology',
    attendees: 450,
    description: 'Discover the latest trends in AI, blockchain, and emerging technologies with industry leaders.',
    attendeeAvatars: sampleAvatars.slice(2, 7),
    bookmarkedAt: '1 week ago',
    eventStatus: 'upcoming',
  },
  {
    id: '3',
    title: 'Sunset Jazz Festival',
    date: '15',
    month: 'Aug',
    location: 'Central Park, NY 10024',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center',
    price: '$45.00',
    category: 'Music',
    attendees: 320,
    description: 'An evening of smooth jazz under the stars with renowned artists and local food vendors.',
    attendeeAvatars: sampleAvatars.slice(1, 6),
    bookmarkedAt: '3 days ago',
    eventStatus: 'upcoming',
  },
  {
    id: '4',
    title: 'Entrepreneurs Networking Mixer',
    date: '05',
    month: 'Sep',
    location: 'Downtown LA, CA 90014',
    image: 'https://i.pinimg.com/736x/b2/c3/d4/b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7.jpg',
    isFree: true,
    category: 'Business',
    attendees: 180,
    description: 'Connect with fellow entrepreneurs, share ideas, and build meaningful business relationships.',
    attendeeAvatars: sampleAvatars.slice(3, 8),
    bookmarkedAt: '5 days ago',
    eventStatus: 'upcoming',
  },
  {
    id: '5',
    title: 'Art Gallery Opening: Modern Expressions',
    date: '22',
    month: 'Jun',
    location: 'Chelsea, NY 10011',
    image: 'https://i.pinimg.com/736x/c3/d4/e5/c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8.jpg',
    isFree: true,
    category: 'Art',
    attendees: 85,
    description: 'Explore contemporary art from emerging local artists in this exclusive gallery opening.',
    attendeeAvatars: sampleAvatars.slice(4, 8),
    bookmarkedAt: '2 weeks ago',
    eventStatus: 'past',
  },
  {
    id: '6',
    title: 'Fitness Bootcamp Challenge',
    date: '30',
    month: 'Jul',
    location: 'Santa Monica Beach, CA 90401',
    image: 'https://i.pinimg.com/736x/d4/e5/f6/d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9.jpg',
    price: '$25.00',
    category: 'Fitness',
    attendees: 65,
    description: 'High-intensity beach workout session followed by healthy smoothies and networking.',
    attendeeAvatars: sampleAvatars.slice(0, 5),
    bookmarkedAt: '1 day ago',
    eventStatus: 'upcoming',
  },
];

// Fixed Header Component
const FixedHeader: React.FC<{ 
  searchQuery: string; 
  onSearchChange: (text: string) => void;
  bookmarkedCount: number;
}> = ({ searchQuery, onSearchChange, bookmarkedCount }) => {
  const router = useRouter();

  return (
    <View style={styles.fixedHeader}>

      
      {/* Top Row - Back Arrow and Title */}
      <View style={styles.headerTopRow}>

        
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Bookmarked Events</Text>
          <Text style={styles.countText}>{bookmarkedCount} saved</Text>
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



// Bookmarked Event Card Component
const BookmarkedEventCard: React.FC<{ 
  event: Event; 
  onRemoveBookmark: (eventId: string) => void;
}> = ({ event, onRemoveBookmark }) => {
  const router = useRouter();

  const handleRemoveBookmark = () => {
    Alert.alert(
      'Remove Bookmark',
      `Remove "${event.title}" from your saved events?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => onRemoveBookmark(event.id),
        },
      ]
    );
  };
  
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
    
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleRemoveBookmark}
          >
            <Ionicons name="heart" size={20} color={Colors.acc} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventLocation}>📍 {event.location}</Text>
        
        {/* Bookmarked timestamp */}
        <Text style={styles.bookmarkedText}>Saved {event.bookmarkedAt}</Text>
        
 
        
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

// Empty State Component
const EmptyBookmarks: React.FC = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIconContainer}>
      <Ionicons name="bookmark-outline" size={64} color="#6b7280" />
    </View>
    <Text style={styles.emptyTitle}>No Saved Events</Text>
    <Text style={styles.emptyDescription}>
      Events you bookmark will appear here.{'\n'}
      Start exploring and save events you're interested in!
    </Text>
    <TouchableOpacity style={styles.exploreButton}>
      <Text style={styles.exploreButtonText}>Explore Events</Text>
    </TouchableOpacity>
  </View>
);

// Main Component
const BookmarkedEvents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>(bookmarkedEvents);

  // Filter events based on search query
  const filterEvents = (events: Event[]) => {
    if (!searchQuery.trim()) return events;
    return events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleRemoveBookmark = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const filteredEvents = filterEvents(events);

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <FixedHeader 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery}
        bookmarkedCount={events.length}
      />
      
      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {events.length === 0 ? (
          <EmptyBookmarks />
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <BookmarkedEventCard
              key={event.id}
              event={event}
              onRemoveBookmark={handleRemoveBookmark}
            />
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={48} color="#6b7280" />
            <Text style={styles.noResultsText}>No events found for "{searchQuery}"</Text>
            <Text style={styles.noResultsSubText}>Try adjusting your search terms</Text>
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
  titleContainer: {
    // alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'rb',
    color: '#ffffff',
    textAlign: 'center',
  },
  countText: {
    fontSize: 15,
    color: '#a0a0a0',
    fontFamily: 'rr',
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
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
  
  // Status Badge
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#ffffff',
    fontFamily: 'mb',
    textTransform: 'uppercase',
  },
  
  // Content Styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    // paddingBottom: 100,
  },
  
  // Event Card Styles
  eventCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: 'stretch',
    overflow: 'hidden',
    minHeight: 160,
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
  absoluteStatusContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
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
    minHeight: 160,
  },
  eventContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  eventHeader: {
    flexDirection: 'row',
position: 'relative',
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
    // padding: 4,
    position: 'absolute',
    top: -8,
    right: -3,
  },
  eventTitle: {
    fontSize: 15,
    fontFamily: 'rb',
    color: '#ffffff',
    marginBottom: 6,
    lineHeight: 20,
  },
  eventLocation: {
    fontSize: 13,
    color: '#a0a0a0',
    fontFamily: 'rr',
    marginBottom: 4,
  },
  bookmarkedText: {
    fontSize: 11,
    color: '#6b7280',
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
  
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  emptyIconContainer: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'rb',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#a0a0a0',
    fontFamily: 'rr',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: Colors.acc,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  exploreButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'mb',
  },
  
  // No Results Styles
  noResultsContainer: {
    padding: 60,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'mb',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#a0a0a0',
    fontFamily: 'rr',
    textAlign: 'center',
  },
});

export default BookmarkedEvents;