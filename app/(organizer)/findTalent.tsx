import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';


import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';
import SafeLayout from '@/Layout/SafeAreaLayout';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');


// Type definitions
type TalentCategory = 'musician' | 'photographer' | 'speaker' | 'artist' | 'entertainer' | 'host';
type Availability = 'available' | 'busy' | 'booked';

interface Talent {
  id: string;
  name: string;
  avatar?: string;
  category: TalentCategory;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: Availability;
  isVerified: boolean;
  isFeatured: boolean;
  skills: string[];
  portfolio: string[];
  bio: string;
  completedEvents: number;
  responseTime: string;
  languages: string[];
}

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

interface Filters {
  category: string;
  priceRange: PriceRange | null;
  availability: string;
  verified: boolean;
}

// Sample talent data
const sampleTalents: Talent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    category: 'musician',
    title: 'Professional Jazz Vocalist',
    location: 'New York, NY',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 150,
    availability: 'available',
    isVerified: true,
    isFeatured: true,
    skills: ['Jazz', 'Blues', 'Soul', 'Wedding Music'],
    portfolio: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop'],
    bio: 'Professional jazz vocalist with 10+ years of experience performing at weddings, corporate events, and private parties.',
    completedEvents: 89,
    responseTime: '< 1 hour',
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    category: 'photographer',
    title: 'Event & Wedding Photographer',
    location: 'Los Angeles, CA',
    rating: 4.8,
    reviewCount: 203,
    hourlyRate: 200,
    availability: 'available',
    isVerified: true,
    isFeatured: true,
    skills: ['Wedding Photography', 'Corporate Events', 'Portraits', 'Drone Photography'],
    portfolio: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop'],
    bio: 'Award-winning photographer specializing in capturing the perfect moments at weddings and corporate events.',
    completedEvents: 156,
    responseTime: '< 2 hours',
    languages: ['English', 'Mandarin']
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    category: 'speaker',
    title: 'Keynote Speaker & Business Coach',
    location: 'Chicago, IL',
    rating: 4.9,
    reviewCount: 89,
    hourlyRate: 500,
    availability: 'busy',
    isVerified: true,
    isFeatured: false,
    skills: ['Leadership', 'Business Strategy', 'Team Building', 'Motivation'],
    portfolio: ['https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=300&h=200&fit=crop'],
    bio: 'Inspiring keynote speaker helping organizations unlock their potential through transformational leadership.',
    completedEvents: 67,
    responseTime: '< 4 hours',
    languages: ['English']
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    category: 'artist',
    title: 'Live Painter & Visual Artist',
    location: 'Miami, FL',
    rating: 4.7,
    reviewCount: 45,
    hourlyRate: 120,
    availability: 'available',
    isVerified: false,
    isFeatured: false,
    skills: ['Live Painting', 'Murals', 'Digital Art', 'Portraits'],
    portfolio: ['https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop'],
    bio: 'Creative visual artist who brings events to life through live painting and interactive art experiences.',
    completedEvents: 32,
    responseTime: '< 6 hours',
    languages: ['English', 'Spanish']
  },
  {
    id: '5',
    name: 'Lisa Park',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    category: 'entertainer',
    title: 'Professional MC & Event Host',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 134,
    hourlyRate: 180,
    availability: 'available',
    isVerified: true,
    isFeatured: true,
    skills: ['MC Services', 'Event Hosting', 'Stand-up Comedy', 'Crowd Engagement'],
    portfolio: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop'],
    bio: 'Energetic MC and event host who keeps your audience engaged and entertained throughout your event.',
    completedEvents: 98,
    responseTime: '< 1 hour',
    languages: ['English', 'Korean']
  },
  {
    id: '6',
    name: 'David Kim',
    category: 'host',
    title: 'Corporate Event Facilitator',
    location: 'Seattle, WA',
    rating: 4.6,
    reviewCount: 76,
    hourlyRate: 250,
    availability: 'booked',
    isVerified: true,
    isFeatured: false,
    skills: ['Workshop Facilitation', 'Team Building', 'Corporate Training', 'Panel Moderation'],
    portfolio: ['https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=300&h=200&fit=crop'],
    bio: 'Expert facilitator specializing in corporate workshops and team building experiences.',
    completedEvents: 54,
    responseTime: '< 3 hours',
    languages: ['English']
  }
];

const categoryIcons: Record<TalentCategory, any> = {
  musician: 'musical-notes',
  photographer: 'camera',
  speaker: 'mic',
  artist: 'palette',
  entertainer: 'people',
  host: 'person'
};

const availabilityColors: Record<Availability, string> = {
  available: Colors.acc,
  busy: Colors.acc,
  booked: Colors.red500
};

// Filter Modal Component
interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isVisible, onClose, filters, onFiltersChange }) => {
  const categories: TalentCategory[] = ['musician', 'photographer', 'speaker', 'artist', 'entertainer', 'host'];
  const priceRanges: PriceRange[] = [
    { label: 'Under $100', min: 0, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $300', min: 200, max: 300 },
    { label: '$300+', min: 300, max: 1000 }
  ];

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.gray400} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => onFiltersChange({
                      ...filters,
                      category: filters.category === category ? '' : category
                    })}
                    style={[
                      styles.categoryButton,
                      filters.category === category && styles.categoryButtonActive
                    ]}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      filters.category === category && styles.categoryButtonTextActive
                    ]}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Price Range</Text>
              {priceRanges.map(range => (
                <TouchableOpacity
                  key={range.label}
                  onPress={() => onFiltersChange({
                    ...filters,
                    priceRange: filters.priceRange?.label === range.label ? null : range
                  })}
                  style={[
                    styles.priceButton,
                    filters.priceRange?.label === range.label && styles.priceButtonActive
                  ]}
                >
                  <Text style={[
                    styles.priceButtonText,
                    filters.priceRange?.label === range.label && styles.priceButtonTextActive
                  ]}>
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Availability Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Availability</Text>
              <TouchableOpacity
                onPress={() => onFiltersChange({
                  ...filters,
                  availability: filters.availability === 'available' ? '' : 'available'
                })}
                style={[
                  styles.availabilityButton,
                  filters.availability === 'available' && styles.availabilityButtonActive
                ]}
              >
                <Text style={[
                  styles.availabilityButtonText,
                  filters.availability === 'available' && styles.availabilityButtonTextActive
                ]}>
                  Available Only
                </Text>
              </TouchableOpacity>
            </View>

            {/* Verified Filter */}
            <View style={styles.filterSection}>
              <TouchableOpacity
                onPress={() => onFiltersChange({
                  ...filters,
                  verified: !filters.verified
                })}
                style={[
                  styles.verifiedButton,
                  filters.verified && styles.verifiedButtonActive
                ]}
              >
                <Text style={[
                  styles.verifiedButtonText,
                  filters.verified && styles.verifiedButtonTextActive
                ]}>
                  Verified Talents Only
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              onPress={() => onFiltersChange({
                category: '',
                priceRange: null,
                availability: '',
                verified: false
              })}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={styles.applyButton}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Talent Card Component
interface TalentCardProps {
  talent: Talent;
  onHire: (talent: Talent) => void;
  onMessage: (talent: Talent) => void;
  onFavorite: (talentId: string) => void;
  isFavorited: boolean;
}

const TalentCard: React.FC<TalentCardProps> = ({ talent, onHire, onMessage, onFavorite, isFavorited }) => {
  const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiM2YjcyODAiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyMCIgcj0iNyIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEwIDQwQzEwIDMzLjM3MjYgMTUuMzcyNiAyOCAyMiAyOEgyOEMzNC42Mjc0IDI4IDQwIDMzLjM3MjYgNDAgNDBWNDJIMTBWNDBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';

  return (
    <View style={styles.talentCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: talent.avatar || defaultAvatar }}
              style={styles.avatar}
            />
            {talent.isFeatured && (
              <View style={styles.featuredBadge}>
                <Ionicons name="trophy" size={12} color={Colors.acc} />
              </View>
            )}
          </View>
          
          <View style={styles.talentInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.talentName}>{talent.name}</Text>
              {talent.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={12} color={Colors.acc} />
                </View>
              )}
            </View>
            
            <View style={styles.titleRow}>
              <Ionicons 
                name={categoryIcons[talent.category]} 
                size={16} 
                color={Colors.acc} 
              />
              <Text style={styles.talentTitle}>{talent.title}</Text>
            </View>
            
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={14} color={Colors.acc} />
                <Text style={styles.metaText}>{talent.location}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color={Colors.acc} />
                <Text style={styles.metaText}>Responds in {talent.responseTime}</Text>
              </View>
            </View>
          </View>
        </View>

   
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statsLeft}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={16} color={Colors.acc} />
            <Text style={styles.statValue}>{talent.rating}</Text>
            <Text style={styles.statSubtext}>({talent.reviewCount})</Text>
          </View>
          
          <View style={styles.statItem}>
            <FontAwesome name="dollar" size={16} color={Colors.acc} />
            <Text style={styles.statValue}>${talent.hourlyRate}/hr</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={16} color={Colors.acc} />
            <Text style={styles.statSubtext}>{talent.completedEvents} events</Text>
          </View>
        </View>

        <View style={[
          styles.availabilityBadge,
          { backgroundColor: `${availabilityColors[talent.availability]}20` }
        ]}>
          <Text style={[
            styles.availabilityText,
            { color: availabilityColors[talent.availability] }
          ]}>
            {talent.availability}
          </Text>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.skillsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {talent.skills.slice(0, 3).map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
          {talent.skills.length > 3 && (
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>+{talent.skills.length - 3} more</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Bio */}
      <Text style={styles.bio} numberOfLines={2}>{talent.bio}</Text>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          onPress={() => onHire(talent)}
          disabled={talent.availability === 'booked'}
          style={[
            styles.hireButton,
            talent.availability === 'booked' && styles.hireButtonDisabled
          ]}
        >
          <Text style={[
            styles.hireButtonText,
            talent.availability === 'booked' && styles.hireButtonTextDisabled
          ]}>
            {talent.availability === 'booked' ? 'Booked' : 'Hire Now'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => onMessage(talent)}
          style={styles.actionButton}
        >
          <Ionicons name="chatbubble-outline" size={18} color={Colors.acc} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={18} color={Colors.acc} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main Component
const FindTalent: React.FC = () => {
  const [talents, setTalents] = useState<Talent[]>(sampleTalents);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredTalents, setFilteredTalents] = useState<Talent[]>(talents);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    category: '',
    priceRange: null,
    availability: '',
    verified: false
  });
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filter and search talents
  useEffect(() => {
    let filtered = talents.filter(talent => {
      const matchesSearch = searchText === '' || 
        talent.name.toLowerCase().includes(searchText.toLowerCase()) ||
        talent.title.toLowerCase().includes(searchText.toLowerCase()) ||
        talent.skills.some(skill => skill.toLowerCase().includes(searchText.toLowerCase()));

      const matchesCategory = filters.category === '' || talent.category === filters.category;
      
      const matchesPrice = !filters.priceRange || 
        (talent.hourlyRate >= filters.priceRange.min && talent.hourlyRate <= filters.priceRange.max);
      
      const matchesAvailability = filters.availability === '' || talent.availability === filters.availability;
      
      const matchesVerified = !filters.verified || talent.isVerified;

      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability && matchesVerified;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'featured':
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return b.rating - a.rating;
        case 'price-low':
          return a.hourlyRate - b.hourlyRate;
        case 'price-high':
          return b.hourlyRate - a.hourlyRate;
        case 'rating':
          return b.rating - a.rating;
        case 'events':
          return b.completedEvents - a.completedEvents;
        default:
          return 0;
      }
    });

    setFilteredTalents(filtered);
  }, [searchText, talents, filters, sortBy]);

  const handleHire = (talent: Talent): void => {
    Alert.alert('Hire Talent', `Initiating hire process for ${talent.name}...`);
  };

  const handleMessage = (talent: Talent): void => {
    Alert.alert('Message', `Opening chat with ${talent.name}...`);
  };

  const handleFavorite = (talentId: string): void => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(talentId)) {
        newFavorites.delete(talentId);
      } else {
        newFavorites.add(talentId);
      }
      return newFavorites;
    });
  };

  const featuredTalents = filteredTalents.filter(t => t.isFeatured);
  const regularTalents = filteredTalents.filter(t => !t.isFeatured);

  return (
    <SafeLayout>


    
    <View style={styles.container}>

      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Hire Talent</Text>
            <Text style={styles.headerSubtitle}>Find the perfect talent for your event</Text>
          </View>
        </View>

        {/* Search and Filter Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={Colors.gray400} />
            <TextInput
              placeholder="Search talents, skills, or categories..."
              placeholderTextColor={Colors.gray400}
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
          </View>
          
          <TouchableOpacity
            onPress={() => setShowFilters(true)}
            style={styles.filterButton}
          >
            <MaterialIcons name="filter-list" size={18} color={Colors.acc} />
          </TouchableOpacity>
        </View>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by: Featured</Text>
          <Text style={styles.resultCount}>
            {filteredTalents.length} talents found
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Section */}
        {featuredTalents.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="trophy" size={20} color={Colors.acc} />
              <Text style={styles.sectionTitle}>Featured Talents</Text>
            </View>
            {featuredTalents.map(talent => (
              <TalentCard
                key={talent.id}
                talent={talent}
                onHire={handleHire}
                onMessage={handleMessage}
                onFavorite={handleFavorite}
                isFavorited={favorites.has(talent.id)}
              />
            ))}
          </View>
        )}

        {/* Regular Talents */}
        {regularTalents.length > 0 && (
          <View style={styles.section}>
            {featuredTalents.length > 0 && (
              <Text style={styles.sectionTitle}>All Talents</Text>
            )}
            {regularTalents.map(talent => (
              <TalentCard
                key={talent.id}
                talent={talent}
                onHire={handleHire}
                onMessage={handleMessage}
                onFavorite={handleFavorite}
                isFavorited={favorites.has(talent.id)}
              />
            ))}
          </View>
        )}

        {/* Empty State */}
        {filteredTalents.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={48} color={Colors.gray500} />
            <Text style={styles.emptyStateTitle}>No talents found</Text>
            <Text style={styles.emptyStateText}>Try adjusting your search or filters</Text>
          </View>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        isVisible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    // backgroundColor: Colors.card,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTop: {
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
fontFamily: "rs",
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortLabel: {
    color: "#fff",
    fontSize: 14,
  },
  resultCount: {
    color: "#fff",
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
fontFamily: "rs",
  },
  talentCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  featuredBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.acc,
    borderRadius: 12,
    padding: 4,
  },
  talentInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  talentName: {
    color: "#fff",
    fontSize: 18,
fontFamily: "rs",
  },
  verifiedBadge: {
    backgroundColor: Colors.acc,
    borderRadius: 10,
    padding: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  talentTitle: {
    color: "#fff",
    fontSize: 14,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: "#fff",
    fontSize: 12,
  },
  favoriteButton: {
    backgroundColor: Colors.acc,
    borderRadius: 20,
    padding: 8,
  },
  favoriteButtonActive: {
    backgroundColor: "red",
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    color: "#fff",
    fontSize: 14,
fontFamily: "rm",
  },
  statSubtext: {
    color: "#fff",
    fontSize: 12,
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 12,
fontFamily: "rm",
    textTransform: 'capitalize',
  },
  skillsContainer: {
    marginBottom: 16,
  },
  skillTag: {
    backgroundColor: Colors.bg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
  },
  skillText: {
    color: "#fff",
    fontSize: 12,
  },
  bio: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: "rl",
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  hireButton: {
    flex: 1,
    backgroundColor: Colors.acc,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  hireButtonDisabled: {
    backgroundColor: Colors.gray600,
  },
  hireButtonText: {
    color: "#fff",
    fontSize: 16,
fontFamily: "rm",
  },
  hireButtonTextDisabled: {
    color: Colors.gray400,
  },
  actionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.acc,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    color: Colors.white,
    fontSize: 18,
fontFamily: "rs",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: Colors.gray400,
    fontSize: 14,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
fontFamily: "rs",
  },
  filterSection: {
    marginBottom: 24,
  },
  filterTitle: {
    color: Colors.white,
    fontSize: 16,
fontFamily: "rm",
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray600,
    minWidth: '45%',
    alignItems: 'center',
  },
  categoryButtonActive: {
    borderColor: Colors.acc,
    backgroundColor: `${Colors.acc}20`,
  },
  categoryButtonText: {
    color: Colors.acc,
    fontSize: 14,
    textTransform: 'capitalize',
  },
  categoryButtonTextActive: {
    color: Colors.acc,
  },
  priceButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray600,
    marginBottom: 8,
  },
  priceButtonActive: {
    borderColor: Colors.acc,
    backgroundColor: `${Colors.acc}20`,
  },
  priceButtonText: {
    color: Colors.acc,
    fontSize: 14,
  },
  priceButtonTextActive: {
    color: Colors.acc,
  },
  availabilityButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray600,
  },
  availabilityButtonActive: {
    borderColor: Colors.acc,
    backgroundColor: `${Colors.acc}20`,
  },
  availabilityButtonText: {
    color: Colors.acc,
    fontSize: 14,
  },
  availabilityButtonTextActive: {
    color: Colors.acc,
  },
  verifiedButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray600,
  },
  verifiedButtonActive: {
    borderColor: Colors.acc,
    backgroundColor: `${Colors.acc}20`,
  },
  verifiedButtonText: {
    color: Colors.acc,
    fontSize: 14,
  },
  verifiedButtonTextActive: {
    color: Colors.acc,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray600,
    alignItems: 'center',
  },
  clearButtonText: {
    color: Colors.acc,
    fontSize: 16,
  },
  applyButton: {
    flex: 1,
    backgroundColor: Colors.acc,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 16,
fontFamily: "rm",
  },
});

export default FindTalent;