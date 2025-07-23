import { Colors } from '@/constants/Colors';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';

// Type definitions
interface SearchResult {
  id: string;
  type: 'event' | 'venue' | 'organizer' | 'category';
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  location?: string;
  date?: string;
  attendeeCount?: number;
  rating?: number;
  price?: string;
  isVerified?: boolean;
}

interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
}

interface TrendingSearch {
  id: string;
  query: string;
  category: string;
  trend: 'up' | 'hot' | 'new';
}

// Sample search results data
const searchResultsData: SearchResult[] = [
  {
    id: '1',
    type: 'event',
    title: 'Tech Innovation Summit 2024',
    subtitle: 'Technology Conference',
    description: 'Join industry leaders for cutting-edge tech discussions and networking.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=80&h=80&fit=crop',
    location: 'Lagos, Nigeria',
    date: 'Dec 15, 2024',
    attendeeCount: 250,
    rating: 4.8,
    price: '₦15,000',
  },
  {
    id: '2',
    type: 'event',
    title: 'Yoga in the Park',
    subtitle: 'Wellness & Fitness',
    description: 'Morning yoga session in the beautiful Victoria Island park.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=80&h=80&fit=crop',
    location: 'Victoria Island, Lagos',
    date: 'Dec 12, 2024',
    attendeeCount: 45,
    rating: 4.9,
    price: 'Free',
  },
  {
    id: '3',
    type: 'venue',
    title: 'The Event Center Lagos',
    subtitle: 'Event Venue',
    description: 'Premium event venue with state-of-the-art facilities and catering.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f29c7c8d47?w=80&h=80&fit=crop',
    location: 'Ikeja, Lagos',
    rating: 4.7,
    isVerified: true,
  },
  {
    id: '4',
    type: 'organizer',
    title: 'Lagos Events Co.',
    subtitle: 'Event Organizer',
    description: 'Professional event planning and management services.',
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=80&h=80&fit=crop',
    location: 'Lagos, Nigeria',
    rating: 4.6,
    isVerified: true,
  },
  {
    id: '5',
    type: 'event',
    title: 'Food & Wine Tasting',
    subtitle: 'Food & Drinks',
    description: 'Explore exotic flavors and premium wines from local vendors.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=80&h=80&fit=crop',
    location: 'Lekki, Lagos',
    date: 'Dec 18, 2024',
    attendeeCount: 120,
    rating: 4.5,
    price: '₦8,500',
  },
  {
    id: '6',
    type: 'category',
    title: 'Business & Networking',
    subtitle: 'Event Category',
    description: '156 upcoming events in this category',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=80&h=80&fit=crop',
  },
];

// Sample recent searches
const recentSearchesData: RecentSearch[] = [
  { id: '1', query: 'tech conference', timestamp: '2 hours ago' },
  { id: '2', query: 'yoga classes', timestamp: '1 day ago' },
  { id: '3', query: 'food festival', timestamp: '2 days ago' },
  { id: '4', query: 'business networking', timestamp: '3 days ago' },
];

// Sample trending searches
const trendingSearchesData: TrendingSearch[] = [
  { id: '1', query: 'christmas events 2024', category: 'Seasonal', trend: 'hot' },
  { id: '2', query: 'new year party', category: 'Celebration', trend: 'up' },
  { id: '3', query: 'virtual workshops', category: 'Education', trend: 'new' },
  { id: '4', query: 'outdoor activities', category: 'Sports', trend: 'up' },
  { id: '5', query: 'art exhibitions', category: 'Culture', trend: 'new' },
];

// Get result type styling
const getResultTypeStyle = (type: SearchResult['type']) => {
  switch (type) {
    case 'event':
      return { icon: '🎉', color: Colors.acc, bgColor: `rgba(139, 92, 246, 0.1)` };
    case 'venue':
      return { icon: '🏢', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' };
    case 'organizer':
      return { icon: '👥', color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.1)' };
    case 'category':
      return { icon: '📂', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' };
    default:
      return { icon: '🔍', color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
  }
};

// Get trending icon
const getTrendingIcon = (trend: TrendingSearch['trend']) => {
  switch (trend) {
    case 'hot': return '🔥';
    case 'up': return '📈';
    case 'new': return '✨';
    default: return '📊';
  }
};

// Search Result Item Component
const SearchResultItem: React.FC<{ 
  result: SearchResult; 
  onPress: () => void;
}> = ({ result, onPress }) => {
  const router = useRouter();
  const resultStyle = getResultTypeStyle(result.type);

  const handlePress = () => {
    if (result.type === 'event') {
      router.push('/eventDetails/Index');
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={styles.resultItem} onPress={handlePress}>
      {/* Icon/Image container */}
      <View style={[styles.resultIconContainer, { backgroundColor: resultStyle.bgColor }]}>
        {result.image ? (
          <Image source={{ uri: result.image }} style={styles.resultImage} />
        ) : (
          <Text style={[styles.resultIcon, { color: resultStyle.color }]}>
            {resultStyle.icon}
          </Text>
        )}
      </View>
      
      {/* Content */}
      <View style={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>{result.title}</Text>
          {result.isVerified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✓</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.resultSubtitle}>{result.subtitle}</Text>
        <Text style={styles.resultDescription} numberOfLines={2}>
          {result.description}
        </Text>
        
        {/* Event specific info */}
        {result.type === 'event' && (
          <View style={styles.eventMeta}>
            {result.location && (
              <Text style={styles.metaText}>📍 {result.location}</Text>
            )}
            {result.date && (
              <Text style={styles.metaText}>📅 {result.date}</Text>
            )}
            {result.attendeeCount && (
              <Text style={styles.metaText}>👥 {result.attendeeCount} attending</Text>
            )}
          </View>
        )}
        
        {/* Rating and Price */}
        <View style={styles.resultFooter}>
          {result.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>⭐ {result.rating}</Text>
            </View>
          )}
          {result.price && (
            <View style={styles.priceContainer}>
              <Text style={[
                styles.priceText, 
                result.price === 'Free' && styles.freePrice
              ]}>
                {result.price}
              </Text>
            </View>
          )}
        </View>
      </View>
      
      {/* Arrow indicator */}
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

// Recent Search Item Component
const RecentSearchItem: React.FC<{ 
  search: RecentSearch; 
  onPress: () => void;
  onRemove: (id: string) => void;
}> = ({ search, onPress, onRemove }) => (
  <TouchableOpacity style={styles.recentSearchItem} onPress={onPress}>
    <View style={styles.recentSearchIcon}>
      <Text style={styles.searchIcon}>🕒</Text>
    </View>
    <View style={styles.recentSearchContent}>
      <Text style={styles.recentSearchQuery}>{search.query}</Text>
      <Text style={styles.recentSearchTime}>{search.timestamp}</Text>
    </View>
    <TouchableOpacity 
      style={styles.removeButton} 
      onPress={() => onRemove(search.id)}
    >
      <Text style={styles.removeIcon}>×</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

// Trending Search Item Component
const TrendingSearchItem: React.FC<{ 
  search: TrendingSearch; 
  onPress: () => void;
}> = ({ search, onPress }) => (
  <TouchableOpacity style={styles.trendingSearchItem} onPress={onPress}>
    <View style={styles.trendingIcon}>
      <Text style={styles.trendingEmoji}>{getTrendingIcon(search.trend)}</Text>
    </View>
    <View style={styles.trendingContent}>
      <Text style={styles.trendingQuery}>{search.query}</Text>
      <Text style={styles.trendingCategory}>{search.category}</Text>
    </View>
  </TouchableOpacity>
);

// Filter Tab Component (reused from notifications)
const FilterTab: React.FC<{
  title: string;
  isActive: boolean;
  onPress: () => void;
  count?: number;
}> = ({ title, isActive, onPress, count }) => (
  <TouchableOpacity 
    style={[styles.filterTab, isActive && styles.activeFilterTab]} 
    onPress={onPress}
  >
    <Text style={[styles.filterTabText, isActive && styles.activeFilterTabText]}>
      {title}
    </Text>
    {count !== undefined && count > 0 && (
      <View style={styles.countBadge}>
        <Text style={styles.countBadgeText}>{count}</Text>
      </View>
    )}
  </TouchableOpacity>
);

// Main Search Screen Component
const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>(recentSearchesData);
  const [trendingSearches] = useState<TrendingSearch[]>(trendingSearchesData);
  const [activeFilter, setActiveFilter] = useState<'all' | 'events' | 'venues' | 'organizers'>('all');
  const [isSearching, setIsSearching] = useState(false);

  // Simulate search
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = searchResultsData.filter(result =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  // Filter results based on active filter
  const filteredResults = searchResults.filter(result => {
    switch (activeFilter) {
      case 'events':
        return result.type === 'event';
      case 'venues':
        return result.type === 'venue';
      case 'organizers':
        return result.type === 'organizer';
      default:
        return true;
    }
  });

  // Handle search from recent/trending
  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);
    // Add to recent searches if not already there
    if (!recentSearches.find(s => s.query === query)) {
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        query,
        timestamp: 'Just now',
      };
      setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
    }
  };

  // Remove recent search
  const removeRecentSearch = (id: string) => {
    setRecentSearches(prev => prev.filter(search => search.id !== id));
  };

  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const showEmptyState = !searchQuery.trim();
  const showNoResults = searchQuery.trim() && filteredResults.length === 0 && !isSearching;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchInputIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search events, venues, organizers..."
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.trim() && (
              <TouchableOpacity 
                style={styles.clearSearchButton}
                onPress={() => setSearchQuery('')}
              >
                <Text style={styles.clearSearchIcon}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Filter Tabs - only show when searching */}
      {searchQuery.trim() && (
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterTabs}>
              <FilterTab
                title="All"
                isActive={activeFilter === 'all'}
                onPress={() => setActiveFilter('all')}
                count={searchResults.length}
              />
              <FilterTab
                title="Events"
                isActive={activeFilter === 'events'}
                onPress={() => setActiveFilter('events')}
                count={searchResults.filter(r => r.type === 'event').length}
              />
              <FilterTab
                title="Venues"
                isActive={activeFilter === 'venues'}
                onPress={() => setActiveFilter('venues')}
                count={searchResults.filter(r => r.type === 'venue').length}
              />
              <FilterTab
                title="Organizers"
                isActive={activeFilter === 'organizers'}
                onPress={() => setActiveFilter('organizers')}
                count={searchResults.filter(r => r.type === 'organizer').length}
              />
            </View>
          </ScrollView>
        </View>
      )}

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {showEmptyState ? (
          // Empty State - Recent and Trending Searches
          <View>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                  <TouchableOpacity onPress={clearRecentSearches}>
                    <Text style={styles.clearAllText}>Clear all</Text>
                  </TouchableOpacity>
                </View>
                {recentSearches.map((search) => (
                  <RecentSearchItem
                    key={search.id}
                    search={search}
                    onPress={() => handleSearchQuery(search.query)}
                    onRemove={removeRecentSearch}
                  />
                ))}
              </View>
            )}

            {/* Trending Searches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Trending Searches</Text>
              </View>
              {trendingSearches.map((search) => (
                <TrendingSearchItem
                  key={search.id}
                  search={search}
                  onPress={() => handleSearchQuery(search.query)}
                />
              ))}
            </View>
          </View>
        ) : isSearching ? (
          // Loading State
          <View style={styles.loadingState}>
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : showNoResults ? (
          // No Results State
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔍</Text>
            <Text style={styles.emptyStateTitle}>No results found</Text>
            <Text style={styles.emptyStateMessage}>
              Try adjusting your search terms or browse trending searches below.
            </Text>
          </View>
        ) : (
          // Search Results
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsCount}>
              {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
            </Text>
            {filteredResults.map((result) => (
              <SearchResultItem
                key={result.id}
                result={result}
                onPress={() => console.log(`Pressed result: ${result.title}`)}
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
    backgroundColor: Colors.bg,
  },
  
  // Header Styles
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2438',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'rb',
    color: '#ffffff',
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2438',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'rr',
  },
  clearSearchButton: {
    padding: 4,
  },
  clearSearchIcon: {
    fontSize: 20,
    color: '#6b7280',
  },
  
  // Filter Styles (reused from notifications)
  filterContainer: {
    paddingVertical: 16,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#2a2438',
  },
  activeFilterTab: {
    backgroundColor: Colors.acc,
  },
  filterTabText: {
    fontSize: 14,
    color: '#a0a0a0',
    fontFamily: 'rr',
  },
  activeFilterTabText: {
    color: '#ffffff',
    fontFamily: 'rs',
  },
  countBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  countBadgeText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'rs',
  },
  
  // Content Styles
  content: {
    flex: 1,
  },
  
  // Section Styles
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'rs',
    color: '#ffffff',
  },
  clearAllText: {
    fontSize: 14,
    color: '#ef4444',
    fontFamily: 'rr',
  },
  
  // Recent Search Styles
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2438',
  },
  recentSearchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  searchIcon: {
    fontSize: 18,
  },
  recentSearchContent: {
    flex: 1,
  },
  recentSearchQuery: {
    fontSize: 16,
    fontFamily: 'rs',
    color: '#ffffff',
    marginBottom: 2,
  },
  recentSearchTime: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'rr',
  },
  removeButton: {
    padding: 8,
  },
  removeIcon: {
    fontSize: 20,
    color: '#6b7280',
  },
  
  // Trending Search Styles
  trendingSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2438',
  },
  trendingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  trendingEmoji: {
    fontSize: 18,
  },
  trendingContent: {
    flex: 1,
  },
  trendingQuery: {
    fontSize: 16,
    fontFamily: 'rs',
    color: '#ffffff',
    marginBottom: 2,
  },
  trendingCategory: {
    fontSize: 12,
    color: '#10b981',
    fontFamily: 'rr',
  },
  
  // Search Results Styles
  resultsContainer: {
    paddingTop: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#a0a0a0',
    fontFamily: 'rr',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2438',
  },
  resultIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  resultIcon: {
    fontSize: 24,
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 16,
    fontFamily: 'rs',
    color: '#ffffff',
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: '#10b981',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  verifiedIcon: {
    fontSize: 12,
    color: '#ffffff',
  },
  resultSubtitle: {
    fontSize: 14,
    color: Colors.acc,
    fontFamily: 'rr',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: '#a0a0a0',
    fontFamily: 'rr',
    lineHeight: 20,
    marginBottom: 8,
  },
  eventMeta: {
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'rr',
    marginBottom: 2,
  },
  resultFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    marginRight: 12,
  },
  ratingText: {
    fontSize: 12,
    color: '#f59e0b',
    fontFamily: 'rs',
  },
  priceContainer: {},
  priceText: {
    fontSize: 14,
    color: '#10b981',
    fontFamily: 'rs',
  },
  freePrice: {
    color: '#ec4899',
  },
  arrowContainer: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  arrow: {
    fontSize: 20,
    color: '#6b7280',
  },
  
  // State Styles
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    fontSize: 16,
    color: '#a0a0a0',
    fontFamily: 'rr',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'rs',
    color: '#ffffff',
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 16,
    color: '#8b8b8b',
    fontFamily: 'rr',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default SearchScreen;