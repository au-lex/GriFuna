import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Type definitions
interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  gradient: string[];
}

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
  isPopular?: boolean;
}

// Sample slider data
const sliderData: SliderItem[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    subtitle: 'Join us for an unforgettable weekend',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=250&fit=crop',
    gradient: ['#8b5cf6', '#ec4899'],
  },
  {
    id: '2',
    title: 'Tech Innovation Summit',
    subtitle: 'Discover the future of technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
    gradient: ['#06b6d4', '#3b82f6'],
  },
  {
    id: '3',
    title: 'Creative Workshop Series',
    subtitle: 'Unleash your creative potential',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=250&fit=crop',
    gradient: ['#f59e0b', '#ef4444'],
  },
];

// Sample featured events
const featuredEvents: Event[] = [
  {
    id: 'f1',
    title: 'Global Leadership Conference 2024',
    date: '25',
    month: 'Jul',
    location: 'Convention Center, Hawaii',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop',
    price: '$125.00',
    category: 'Business',
    attendees: 500,
    isPopular: true,
  },
  {
    id: 'f2',
    title: 'Art & Culture Festival',
    date: '02',
    month: 'Aug',
    location: 'Cultural District, Hawaii',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
    isFree: true,
    category: 'Culture',
    attendees: 1200,
    isPopular: true,
  },
];

// Sample normal events
const normalEvents: Event[] = [
  {
    id: 'n1',
    title: 'Startup Networking Night',
    date: '18',
    month: 'Jul',
    location: 'Innovation Hub, Hawaii',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&fit=crop',
    price: '$35.00',
    category: 'Networking',
    attendees: 80,
  },
  {
    id: 'n2',
    title: 'Photography Workshop',
    date: '22',
    month: 'Jul',
    location: 'Studio Space, Hawaii',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e732b2b6?w=300&h=200&fit=crop',
    price: '$65.00',
    category: 'Workshop',
    attendees: 25,
  },
  {
    id: 'n3',
    title: 'Food & Wine Tasting',
    date: '28',
    month: 'Jul',
    location: 'Gourmet Plaza, Hawaii',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop',
    price: '$85.00',
    category: 'Food',
    attendees: 60,
  },
  {
    id: 'n4',
    title: 'Yoga in the Park',
    date: '30',
    month: 'Jul',
    location: 'Central Park, Hawaii',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
    isFree: true,
    category: 'Wellness',
    attendees: 45,
  },
];

// Slider Component
const ImageSlider: React.FC<{ data: SliderItem[] }> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, data.length]);

  const renderSliderItem = ({ item }: { item: SliderItem }) => (
    <TouchableOpacity style={styles.sliderItem}>
      <Image source={{ uri: item.image }} style={styles.sliderImage} />
      <View style={styles.sliderOverlay} />
      <View style={styles.sliderContent}>
        <Text style={styles.sliderTitle}>{item.title}</Text>
        <Text style={styles.sliderSubtitle}>{item.subtitle}</Text>
        <TouchableOpacity style={styles.sliderButton}>
          <Text style={styles.sliderButtonText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sliderContainer}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderSliderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
      />
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { opacity: index === currentIndex ? 1 : 0.3 }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Featured Event Card Component
const FeaturedEventCard: React.FC<{ event: Event; onPress?: () => void }> = ({ event, onPress }) => {
  return (
    <TouchableOpacity style={styles.featuredCard} onPress={onPress}>
      <Image source={{ uri: event.image }} style={styles.featuredImage} />
      
      {event.isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>🔥 POPULAR</Text>
        </View>
      )}
      
      <View style={styles.featuredDateContainer}>
        <Text style={styles.featuredDateNumber}>{event.date}</Text>
        <Text style={styles.featuredDateMonth}>{event.month}</Text>
      </View>
      
      <View style={styles.featuredContent}>
        <View style={styles.featuredHeader}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{event.category}</Text>
          </View>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveIcon}>🤍</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.featuredTitle}>{event.title}</Text>
        
        <Text style={styles.featuredLocation}>📍 {event.location}</Text>
        
        <View style={styles.featuredFooter}>
          <Text style={styles.attendeesText}>👥 {event.attendees} attending</Text>
          
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

// Regular Event Card Component
const EventCard: React.FC<{ event: Event; onPress?: () => void }> = ({ event, onPress }) => {
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
        </View>
        
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventLocation}>📍 {event.location}</Text>
        
        <View style={styles.eventFooter}>
          <Text style={styles.attendeesText}>👥 {event.attendees}</Text>
        </View>
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

// Main Home Component
const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good evening! 👋</Text>
          <Text style={styles.headerTitle}>Discover Events</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <ImageSlider data={sliderData} />
        
        {/* Featured Events Section */}
        <View style={styles.section}>
          <SectionHeader 
            title="Featured Events" 
            onSeeAll={() => console.log('See all featured events')}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.featuredEventsContainer}>
              {featuredEvents.map((event) => (
                <FeaturedEventCard
                  key={event.id}
                  event={event}
                  onPress={() => console.log(`Pressed featured event: ${event.title}`)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        
        {/* Normal Events Section */}
        <View style={styles.section}>
          <SectionHeader 
            title="Upcoming Events" 
            onSeeAll={() => console.log('See all upcoming events')}
          />
          {normalEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => console.log(`Pressed event: ${event.title}`)}
            />
          ))}
        </View>
        
        <View style={styles.bottomSpacing} />
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  notificationButton: {
    width: 44,
    height: 44,
    backgroundColor: '#2a2438',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  
  // Slider Styles
  sliderContainer: {
    height: 200,
    marginBottom: 30,
  },
  sliderItem: {
    width: screenWidth,
    height: 200,
    paddingHorizontal: 20,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  sliderOverlay: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
  },
  sliderContent: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
  },
  sliderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  sliderSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 16,
  },
  sliderButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  sliderButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    marginHorizontal: 4,
  },
  
  // Section Styles
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  seeAllText: {
    fontSize: 14,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  
  // Featured Event Styles
  featuredEventsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#2a2438',
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 160,
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  popularText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  featuredDateContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  featuredDateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 20,
  },
  featuredDateMonth: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '500',
  },
  featuredContent: {
    padding: 16,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  saveButton: {
    padding: 4,
  },
  saveIcon: {
    fontSize: 20,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 22,
  },
  featuredLocation: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 16,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  
  // Regular Event Styles
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2438',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 40,
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
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    lineHeight: 20,
  },
  eventLocation: {
    fontSize: 13,
    color: '#a0a0a0',
    marginBottom: 4,
  },
  eventFooter: {
    marginTop: 4,
  },
  priceContainer: {
    marginLeft: 12,
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
    fontWeight: '600',
  },
  priceTag: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default HomeScreen;