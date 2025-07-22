import { Colors } from '@/constants/Colors';
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
import { useRouter } from 'expo-router';

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
  description?: string;
}

interface Ad {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  backgroundColor?: string;
}

// Sample slider data
const sliderData: SliderItem[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    subtitle: 'Join us for an unforgettable weekend',
    image: 'https://i.pinimg.com/736x/73/c7/79/73c77971339ff256490cedac065cb75d.jpg',
    gradient: [Colors.acc, '#ec4899'],
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
    image: 'https://i.pinimg.com/736x/95/e5/12/95e5123c42487e16ff78847fcee936dd.jpg',
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
    image: 'https://i.pinimg.com/736x/4f/13/31/4f1331a06474465b3171f2ca4184edfc.jpg',
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
    image: 'https://i.pinimg.com/1200x/52/e9/3a/52e93af2dec0bcf6db8ee3213c8dcf3b.jpg',
    price: '$35.00',
    category: 'Networking',
    attendees: 80,
    description: 'Connect with fellow entrepreneurs and innovators in this exciting networking event. Share ideas, build partnerships, and grow your startup network.',
  },
  {
    id: 'n2',
    title: 'Photography Workshop',
    date: '22',
    month: 'Jul',
    location: 'Studio Space, Hawaii',
    image: 'https://i.pinimg.com/736x/8e/c1/f9/8ec1f9438afa68e8f2efd696219588f8.jpg',
    price: '$65.00',
    category: 'Workshop',
    attendees: 25,
    description: 'Master the art of photography with hands-on training from professional photographers. Learn composition, lighting, and editing techniques.',
  },
  {
    id: 'n3',
    title: 'Food & Wine Tasting',
    date: '28',
    month: 'Jul',
    location: 'Gourmet Plaza, Hawaii',
    image: 'https://i.pinimg.com/736x/95/e5/12/95e5123c42487e16ff78847fcee936dd.jpg',
    price: '$85.00',
    category: 'Food',
    attendees: 60,
    description: 'Indulge in an exquisite culinary journey featuring local wines and gourmet dishes prepared by renowned chefs from around the island.',
  },
  {
    id: 'n4',
    title: 'Yoga in the Park',
    date: '30',
    month: 'Jul',
    location: 'Central Park, Hawaii',
    image: 'https://i.pinimg.com/736x/4f/13/31/4f1331a06474465b3171f2ca4184edfc.jpg',
    isFree: true,
    category: 'Wellness',
    attendees: 45,
    description: 'Start your day with peaceful yoga sessions surrounded by nature. All skill levels welcome. Bring your own mat and water bottle.',
  },
];

// Sample ads data
const adsData: Ad[] = [
  {
    id: 'ad1',
    title: 'Create Your Own Event',
    subtitle: 'Host amazing events and reach thousands of people',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=150&fit=crop',
    cta: 'Get Started',
    backgroundColor: '#6366f1',
  },
  {
    id: 'ad2',
    title: 'Premium Membership',
    subtitle: 'Unlock exclusive events and early bird discounts',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=150&fit=crop',
    cta: 'Upgrade Now',
    backgroundColor: '#ec4899',
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
  const router = useRouter(); 
  return (
    <TouchableOpacity style={styles.featuredCard} onPress={ () => router.push('/eventDetails/Index')}>
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

// Enhanced Event Card Component with Date and Larger Image
const EventCard: React.FC<{ event: Event; onPress?: () => void }> = ({ event, onPress }) => {
  const router = useRouter(); 
  return (
    <TouchableOpacity style={styles.eventCard} onPress={() => router.push('/eventDetails/Index')}>
      {/* Absolute Date Container */}
      <View style={styles.absoluteDateContainer}>
        <Text style={styles.dateNumber}>{event.date}</Text>
        <Text style={styles.dateMonth}>{event.month}</Text>
      </View>
      
      {/* Large Image - Takes about 50% of the card */}
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

// Ad Card Component
const AdCard: React.FC<{ ad: Ad; onPress?: () => void }> = ({ ad, onPress }) => {
  return (
    <TouchableOpacity style={[styles.adCard, { backgroundColor: ad.backgroundColor || '#6366f1' }]} onPress={onPress}>
      <View style={styles.adContent}>
        <Text style={styles.adTitle}>{ad.title}</Text>
        <Text style={styles.adSubtitle}>{ad.subtitle}</Text>
        <TouchableOpacity style={styles.adButton}>
          <Text style={styles.adButtonText}>{ad.cta}</Text>
        </TouchableOpacity>
      </View>
      <Image source={{ uri: ad.image }} style={styles.adImage} />
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
        
        {/* Ad Section */}
        <View style={styles.section}>
          <SectionHeader 
            title="Discover More" 
            showSeeAll={false}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.adContainer}>
              {adsData.map((ad) => (
                <AdCard
                  key={ad.id}
                  ad={ad}
                  onPress={() => console.log(`Pressed ad: ${ad.title}`)}
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
           
            />
          ))}
        </View>

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
  
  // Slider Styles
  sliderContainer: {
    height: 200,
    marginBottom: 30,
    marginTop: 5,
  },
  sliderItem: {
    width: screenWidth,
    height: 200,
    paddingHorizontal: 12,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  sliderOverlay: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 5,
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
fontFamily: "ob",
    color: '#ffffff',
  },
  sliderSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 16,
fontFamily: "os",
  },
  sliderButton: {
    backgroundColor: Colors.acc,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  sliderButtonText: {
    color: '#ffffff',
    fontSize: 14,
fontFamily: "ob",
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
    fontSize: 15,
fontFamily: "ob",
    color: '#ffffff',
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.acc,
    fontFamily: 'ol',
  },
  
  // Featured Event Styles
  featuredEventsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#2a2438',
    borderRadius: 10,
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
fontFamily: "ob",
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
fontFamily: "ob",
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
    borderRadius: 12,
  },
  categoryText: {
    color: Colors.acc,
    fontSize: 12,
fontFamily: "os",
  },
  saveButton: {
    padding: 4,
  },
  saveIcon: {
    fontSize: 20,
  },
  featuredTitle: {
    fontSize: 13,
fontFamily: "ob",
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 22,
  },
  featuredLocation: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 13,
fontFamily: "os",
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendeesText: {
    fontSize: 14,
    color: '#a0a0a0',
    fontFamily: 'ol',
  },
  
  // Enhanced Event Styles with Date and Large Image
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2438',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: 'stretch',
    overflow: 'hidden',
    minHeight: 140,
    position: 'relative',
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 16,
    minWidth: 60,
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
fontFamily: "ob",
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
  eventTitle: {
    fontSize: 15,
fontFamily: "ob",
    color: '#ffffff',
    marginBottom: 6,
    lineHeight: 20,
  },
  eventLocation: {
    fontSize: 13,
    color: '#a0a0a0',
    marginBottom: 8,
fontFamily: "os",
  },
  eventDescription: {
    fontSize: 12,
    color: '#b0b0b0',
fontFamily: "os",
    lineHeight: 16,
    marginBottom: 12,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    // marginLeft: 12,
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
fontFamily: "ob",
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
fontFamily: "ob",
  },
  
  // Ad Styles
  adContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  adCard: {
    width: 280,
    height: 140,
    borderRadius: 12,
    marginRight: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  adContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  adTitle: {
    fontSize: 12,
fontFamily: "ob",
    color: '#ffffff',
    // marginBottom: 4,
  },
  adSubtitle: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
fontFamily: "os",
    lineHeight: 16,
  },
  adButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  adButtonText: {
    color: '#ffffff',
    fontSize: 12,
fontFamily: "ob",
  },
  adImage: {
    width: 100,
    height: '100%',
  },
});

export default HomeScreen;