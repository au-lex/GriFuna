import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Eye,
  Edit3,
  Trash2,
  Share2,
  Copy,
  MoreVertical,
  Search,
  Filter,
  Plus,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Settings,
  BarChart3,
  Download,
  X,
  ChevronDown,
  Tag,
  Star,
  MessageSquare,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import SafeLayout from '@/Layout/SafeAreaLayout';

const { width } = Dimensions.get('window');

// Type definitions
interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  currency: string;
  category: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  ticketsSold: number;
  totalTickets: number;
  revenue: number;
  views: number;
  likes: number;
  comments: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

type FilterStatus = 'all' | 'draft' | 'published' | 'cancelled' | 'completed';
type SortOption = 'date' | 'title' | 'revenue' | 'tickets' | 'views';

// Sample events data
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2025',
    description: 'Annual summit featuring the latest in technology and innovation',
    image: 'https://i.pinimg.com/1200x/52/e9/3a/52e93af2dec0bcf6db8ee3213c8dcf3b.jpg',
    date: '2025-08-15',
    time: '09:00',
    location: 'San Francisco Convention Center',
    price: 299,
    currency: 'USD',
    category: 'Technology',
    status: 'published',
    ticketsSold: 850,
    totalTickets: 1000,
    revenue: 254150,
    views: 12500,
    likes: 234,
    comments: 67,
    rating: 4.8,
    createdAt: '2025-01-15',
    updatedAt: '2025-07-20',
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    description: 'Learn advanced digital marketing strategies from industry experts',
    image: 'https://i.pinimg.com/736x/8e/c1/f9/8ec1f9438afa68e8f2efd696219588f8.jpg',
    date: '2025-07-30',
    time: '14:00',
    location: 'Online Event',
    price: 149,
    currency: 'USD',
    category: 'Education',
    status: 'published',
    ticketsSold: 342,
    totalTickets: 500,
    revenue: 50958,
    views: 8900,
    likes: 156,
    comments: 43,
    rating: 4.6,
    createdAt: '2025-01-10',
    updatedAt: '2025-07-15',
  },
  {
    id: '3',
    title: 'Summer Music Festival',
    description: 'Three-day music festival featuring top artists',
    image: 'https://i.pinimg.com/736x/4f/13/31/4f1331a06474465b3171f2ca4184edfc.jpg',
    date: '2025-09-20',
    time: '16:00',
    location: 'Central Park, New York',
    price: 179,
    currency: 'USD',
    category: 'Music',
    status: 'draft',
    ticketsSold: 0,
    totalTickets: 2000,
    revenue: 0,
    views: 450,
    likes: 23,
    comments: 8,
    rating: 0,
    createdAt: '2025-07-01',
    updatedAt: '2025-07-22',
  },
  {
    id: '4',
    title: 'Food & Wine Expo',
    description: 'Culinary experience with world-class chefs and wine tastings',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    date: '2025-06-15',
    time: '18:00',
    location: 'Grand Hotel Ballroom',
    price: 89,
    currency: 'USD',
    category: 'Food & Drink',
    status: 'completed',
    ticketsSold: 300,
    totalTickets: 300,
    revenue: 26700,
    views: 5600,
    likes: 89,
    comments: 24,
    rating: 4.9,
    createdAt: '2025-03-01',
    updatedAt: '2025-06-16',
  },
  {
    id: '5',
    title: 'Startup Pitch Competition',
    description: 'Young entrepreneurs showcase their innovative business ideas',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    date: '2025-08-05',
    time: '10:00',
    location: 'Innovation Hub',
    price: 0,
    currency: 'USD',
    category: 'Business',
    status: 'cancelled',
    ticketsSold: 125,
    totalTickets: 400,
    revenue: 0,
    views: 3200,
    likes: 45,
    comments: 12,
    rating: 0,
    createdAt: '2025-05-15',
    updatedAt: '2025-07-20',
  },
];

// Event Actions Modal Component
interface EventActionsModalProps {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
  onDuplicate: (event: Event) => void;
  onShare: (event: Event) => void;
  onViewAnalytics: (event: Event) => void;
}

const EventActionsModal: React.FC<EventActionsModalProps> = ({
  visible,
  event,
  onClose,
  onEdit,
  onDelete,
  onDuplicate,
  onShare,
  onViewAnalytics,
}) => {
  if (!event) return null;

  const actions = [
    {
      icon: <Eye size={20} color="#3b82f6" />,
      title: 'View Event',
      subtitle: 'View event details',
      onPress: () => {
        onClose();
        Alert.alert('View Event', `Viewing ${event.title}`);
      },
    },
    {
      icon: <Edit3 size={20} color="#10b981" />,
      title: 'Edit Event',
      subtitle: 'Modify event details',
      onPress: () => {
        onClose();
        onEdit(event);
      },
    },
    {
      icon: <BarChart3 size={20} color="#8b5cf6" />,
      title: 'View Analytics',
      subtitle: 'See performance metrics',
      onPress: () => {
        onClose();
        onViewAnalytics(event);
      },
    },
    {
      icon: <Copy size={20} color="#f59e0b" />,
      title: 'Duplicate Event',
      subtitle: 'Create a copy of this event',
      onPress: () => {
        onClose();
        onDuplicate(event);
      },
    },
    {
      icon: <Share2 size={20} color="#06b6d4" />,
      title: 'Share Event',
      subtitle: 'Share with others',
      onPress: () => {
        onClose();
        onShare(event);
      },
    },
    {
      icon: <Trash2 size={20} color="#ef4444" />,
      title: 'Delete Event',
      subtitle: 'Permanently remove event',
      onPress: () => {
        onClose();
        onDelete(event);
      },
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.actionsModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{event.title}</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionItem}
                onPress={action.onPress}
              >
                <View style={styles.actionIcon}>{action.icon}</View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Filter Modal Component
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  selectedStatus,
  onStatusChange,
  selectedSort,
  onSortChange,
}) => {
  const statusOptions: { value: FilterStatus; label: string; color: string }[] = [
    { value: 'all', label: 'All Events', color: '#6b7280' },
    { value: 'draft', label: 'Draft', color: '#f59e0b' },
    { value: 'published', label: 'Published', color: '#10b981' },
    { value: 'completed', label: 'Completed', color: '#3b82f6' },
    { value: 'cancelled', label: 'Cancelled', color: '#ef4444' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'date', label: 'Event Date' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'revenue', label: 'Revenue (High to Low)' },
    { value: 'tickets', label: 'Tickets Sold' },
    { value: 'views', label: 'Views' },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.filterModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter & Sort</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Event Status</Text>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    selectedStatus === option.value && styles.filterOptionSelected,
                  ]}
                  onPress={() => onStatusChange(option.value)}
                >
                  <View style={[styles.statusDot, { backgroundColor: option.color }]} />
                  <Text style={styles.filterOptionText}>{option.label}</Text>
                  {selectedStatus === option.value && (
                    <CheckCircle size={20} color={Colors.acc} />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Sort By</Text>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterOption,
                    selectedSort === option.value && styles.filterOptionSelected,
                  ]}
                  onPress={() => onSortChange(option.value)}
                >
                  <Text style={styles.filterOptionText}>{option.label}</Text>
                  {selectedSort === option.value && (
                    <CheckCircle size={20} color={Colors.acc} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Event Card Component
interface EventCardProps {
  event: Event;
  onPress: () => void;
  onMorePress: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onPress, onMorePress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return '#10b981';
      case 'draft': return '#f59e0b';
      case 'completed': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle size={16} color="#10b981" />;
      case 'draft': return <Clock size={16} color="#f59e0b" />;
      case 'completed': return <CheckCircle size={16} color="#3b82f6" />;
      case 'cancelled': return <XCircle size={16} color="#ef4444" />;
      default: return <AlertCircle size={16} color="#6b7280" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: event.currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const ticketProgress = event.totalTickets > 0 ? (event.ticketsSold / event.totalTickets) * 100 : 0;

  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress}>
      <Image source={{ uri: event.image }} style={styles.eventImage} />
      
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <View style={styles.eventStatus}>
            {getStatusIcon(event.status)}
            <Text style={[styles.statusText, { color: getStatusColor(event.status) }]}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Text>
          </View>
          
          <TouchableOpacity onPress={onMorePress} style={styles.moreButton}>
            <MoreVertical size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
        
        <View style={styles.eventMeta}>
          <View style={styles.metaItem}>
            <Calendar size={14} color="#9ca3af" />
            <Text style={styles.metaText}>{formatDate(event.date)}</Text>
          </View>
          <View style={styles.metaItem}>
            <MapPin size={14} color="#9ca3af" />
            <Text style={styles.metaText} numberOfLines={1}>{event.location}</Text>
          </View>
        </View>

        <View style={styles.eventStats}>
          <View style={styles.statItem}>
            <Users size={14} color={Colors.acc} />
            <Text style={styles.statText}>
              {event.ticketsSold}/{event.totalTickets}
            </Text>
          </View>
          <View style={styles.statItem}>
            <DollarSign size={14} color={Colors.acc} />
            <Text style={styles.statText}>{formatCurrency(event.revenue)}</Text>
          </View>
          <View style={styles.statItem}>
            <Eye size={14} color={Colors.acc} />
            <Text style={styles.statText}>{event.views.toLocaleString()}</Text>
          </View>
        </View>

        {event.totalTickets > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${ticketProgress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{Math.round(ticketProgress)}% sold</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Main My Events Component
const MyEventsPageOrg: React.FC = () => {
  const [events] = useState<Event[]>(sampleEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [actionsModalVisible, setActionsModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const router = useRouter();

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events;

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(event => event.status === filterStatus);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'revenue':
          return b.revenue - a.revenue;
        case 'tickets':
          return b.ticketsSold - a.ticketsSold;
        case 'views':
          return b.views - a.views;
        case 'date':
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

    return filtered;
  }, [events, searchQuery, filterStatus, sortOption]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const totalEvents =200;
    const publishedEvents = events.filter(e => e.status === 'published').length;
    const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0);
    const totalTicketsSold = events.reduce((sum, event) => sum + event.ticketsSold, 0);
    
    return { totalEvents, publishedEvents, totalRevenue, totalTicketsSold };
  }, [events]);

  const handleEventPress = (event: Event) => {
    Alert.alert('Event Details', `Opening details for ${event.title}`);
  };

  const handleMorePress = (event: Event) => {
    setSelectedEvent(event);
    setActionsModalVisible(true);
  };

  const handleCreateEvent = () => {
    router.push('/(organizer)/addEvent');
  };

  const handleEditEvent = (event: Event) => {
    Alert.alert('Edit Event', `Editing ${event.title}`);
  };

  const handleDeleteEvent = (event: Event) => {
    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete "${event.title}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Deleted', `${event.title} has been deleted.`)
        },
      ]
    );
  };

  const handleDuplicateEvent = (event: Event) => {
    Alert.alert('Duplicate Event', `Creating a copy of ${event.title}`);
  };

  const handleShareEvent = (event: Event) => {
    Alert.alert('Share Event', `Sharing ${event.title}`);
  };

  const handleViewAnalytics = (event: Event) => {
    Alert.alert('Analytics', `Viewing analytics for ${event.title}`);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SafeLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Events</Text>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalEvents}</Text>
            <Text style={styles.statLabel}>Total Events</Text>
          </View>
      
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(stats.totalRevenue)}</Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.totalTicketsSold}</Text>
            <Text style={styles.statLabel}>Tickets Sold</Text>
          </View>
        </View>

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Filter size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Events List */}
        <ScrollView
          style={styles.eventsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {filteredAndSortedEvents.length > 0 ? (
            filteredAndSortedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => handleEventPress(event)}
                onMorePress={() => handleMorePress(event)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Calendar size={64} color="#6b7280" />
              <Text style={styles.emptyStateTitle}>No events found</Text>
              <Text style={styles.emptyStateText}>
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Create your first event to get started'
                }
              </Text>
              {!searchQuery && filterStatus === 'all' && (
                <TouchableOpacity style={styles.createEventButton} onPress={handleCreateEvent}>
                  <Plus size={20} color="white" />
                  <Text style={styles.createEventButtonText}>Create Event</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </ScrollView>

        {/* Event Actions Modal */}
        <EventActionsModal
          visible={actionsModalVisible}
          event={selectedEvent}
          onClose={() => setActionsModalVisible(false)}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onDuplicate={handleDuplicateEvent}
          onShare={handleShareEvent}
          onViewAnalytics={handleViewAnalytics}
        />

        {/* Filter Modal */}
        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          selectedStatus={filterStatus}
          onStatusChange={setFilterStatus}
          selectedSort={sortOption}
          onSortChange={setSortOption}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'rs',
  },
  createButton: {
    backgroundColor: Colors.acc,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'rs',
    marginBottom: 4,
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'rr',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 7,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontFamily: 'rr',
  },
  filterButton: {
    backgroundColor: Colors.acc,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  eventCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'rs',
    textTransform: 'uppercase',
  },
  moreButton: {
    padding: 4,
  },
  eventTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'rs',
    marginBottom: 12,
  },
  eventMeta: {
    gap: 8,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: '#d1d5db',
    fontSize: 14,
    fontFamily: 'rr',
    flex: 1,
  },
  eventStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: '#d1d5db',
    fontSize: 14,
    fontFamily: 'rr',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.acc,
  },
  progressText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'rr',
    textAlign: 'right',
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'rs',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#9ca3af',
    fontSize: 16,
    fontFamily: 'rr',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  createEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.acc,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  createEventButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // justifyContent: 'flex-end',
    zIndex: 1000,
  },
  actionsModal: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // maxHeight: '80%',
  },
  filterModal: {
    backgroundColor: "red",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'rs',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  actionIcon: {
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rr',
    marginBottom: 2,
  },
  actionSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'rr',
  },
  filterSection: {
    marginBottom: 32,
  },
  filterSectionTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'rs',
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#374151',
  },
  filterOptionText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rr',
    flex: 1,
    marginLeft: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default MyEventsPageOrg