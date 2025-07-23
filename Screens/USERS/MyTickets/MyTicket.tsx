import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,

  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type TabType = 'Upcoming' | 'Completed' | 'Cancelled';

interface TicketData {
  id: string;
  date: string;
  title: string;
  location: string;
  image: string;
  avatars: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
}

const mockTickets: TicketData[] = [
  {
    id: '1',
    date: '31 December, 2023',
    title: 'Photo Contest',
    location: 'Lafayette, California',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&crop=center',
    avatars: ['👤', '👤', '👤'],
    status: 'completed',
  },
  {
    id: '2',
    date: '31 December, 2023',
    title: 'Design Event',
    location: 'Lafayette, California',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center',
    avatars: ['👤', '👤', '👤'],
    status: 'completed',
  },
  {
    id: '3',
    date: '15 January, 2024',
    title: 'Music Festival',
    location: 'San Francisco, California',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
    avatars: ['🎵', '🎸', '🎤', '🥁'],
    status: 'upcoming',
  },
  {
    id: '4',
    date: '22 January, 2024',
    title: 'Tech Conference',
    location: 'Palo Alto, California',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center',
    avatars: ['💻', '🔧', '⚡'],
    status: 'upcoming',
  },
  {
    id: '5',
    date: '28 January, 2024',
    title: 'Art Gallery Opening',
    location: 'Los Angeles, California',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
    avatars: ['🎨', '🖼️', '👩‍🎨'],
    status: 'upcoming',
  },
  {
    id: '6',
    date: '18 December, 2023',
    title: 'Food Festival',
    location: 'Oakland, California',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&crop=center',
    avatars: ['🍕', '🍔', '🌮'],
    status: 'cancelled',
  },
  {
    id: '7',
    date: '25 December, 2023',
    title: 'Christmas Market',
    location: 'Berkeley, California',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop&crop=center',
    avatars: ['🎄', '🎅', '❄️'],
    status: 'cancelled',
  },
  {
    id: '8',
    date: '20 December, 2023',
    title: 'Winter Workshop',
    location: 'San Jose, California',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop&crop=center',
    avatars: ['🛠️', '📚', '💡'],
    status: 'completed',
  },
  {
    id: '9',
    date: '05 February, 2024',
    title: 'Startup Pitch Night',
    location: 'Mountain View, California',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
    avatars: ['💼', '📈', '🚀'],
    status: 'upcoming',
  },
  {
    id: '10',
    date: '12 February, 2024',
    title: 'Valentine\'s Dance',
    location: 'Santa Clara, California',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop&crop=center',
    avatars: ['💖', '💃', '🕺'],
    status: 'upcoming',
  },
  {
    id: '11',
    date: '10 January, 2024',
    title: 'Book Club Meeting',
    location: 'Fremont, California',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
    avatars: ['📖', '☕', '👥'],
    status: 'cancelled',
  },
  {
    id: '12',
    date: '15 December, 2023',
    title: 'Coding Bootcamp',
    location: 'Sunnyvale, California',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop&crop=center',
    avatars: ['💻', '🖥️', '⌨️'],
    status: 'completed',
  },
];

const TicketScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Upcoming');

  const filteredTickets = mockTickets.filter(ticket => {
    switch (activeTab) {
      case 'Upcoming':
        return ticket.status === 'upcoming';
      case 'Completed':
        return ticket.status === 'completed';
      case 'Cancelled':
        return ticket.status === 'cancelled';
      default:
        return false;
    }
  });

  const renderHeader = () => (
    <View style={styles.header}>

      <Text style={styles.headerTitle}>My Ticket</Text>
      <View style={styles.headerRight}>

   
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {(['Upcoming', 'Completed', 'Cancelled'] as TabType[]).map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
          {activeTab === tab && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTicketCard = (ticket: TicketData) => (
    <View key={ticket.id} style={styles.ticketCard}>
      <View style={styles.ticketHeader}>
        <View style={styles.ticketIcon}>
          <Ionicons name="heart" size={16} color="#4A90E2" />
        </View>
        <Text style={styles.ticketDate}>{ticket.date}</Text>
      </View>
      
      <View style={styles.ticketContent}>
        <Image
          source={{ uri: ticket.image }}
          style={styles.ticketImage}
        />
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketTitle}>{ticket.title}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#8E8E93" />
            <Text style={styles.locationText}>{ticket.location}</Text>
          </View>
          

          <View style={styles.ticketActions}>
          {ticket.status === 'cancelled' && (
            <View style={styles.cancelledBadge}>
              <Text style={styles.cancelledText}>Cancelled</Text>
            </View>
          )}
          {ticket.status === 'completed' && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          )}
          {ticket.status === 'upcoming' && (
            <View style={styles.upcomingBadge}>
              <Text style={styles.upcomingText}>Upcoming</Text>
            </View>
          )}
        </View>

          
          <View style={styles.avatarContainer}>
            {ticket.avatars.map((avatar, index) => (
              <View
                key={index}
                style={[
                  styles.avatar,
                  { marginLeft: index > 0 ? -8 : 0 }
                ]}
              >
                <Text style={styles.avatarText}>{avatar}</Text>
              </View>
            ))}
          </View>
   
        </View>
 
      </View>
      
      <View style={styles.ticketButtons}>
        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.reviewButtonText}>
            {ticket.status === 'upcoming' ? 'Set Reminder' : 'Leave a Review'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.eTicketButton}>
          <Text style={styles.eTicketButtonText}>View E-Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      {renderHeader()}
      {renderTabs()}
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredTickets.length > 0 ? (
          filteredTickets.map(renderTicketCard)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No {activeTab.toLowerCase()} tickets
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.bg,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor:Colors.card,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
   fontFamily: 'rs',
    color: 'white',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    // backgroundColor:Colors.card,
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    position: 'relative',
  },
  activeTab: {
    // Additional styles for active tab if needed
  },
  tabText: {
    fontSize: 16,
    color: '#8E8E93',
     fontFamily: 'rm',
  },
  activeTabText: {
    color: Colors.acc,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor:Colors.acc,
    borderRadius: 1,
  },
  content: {
    flex: 1,
    backgroundColor:Colors.bg,
    paddingTop: 10,
    


  },
  ticketCard: {
    backgroundColor:Colors.card,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ticketIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2d2d44',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  ticketDate: {
    fontSize: 14,
    color: '#8E8E93',
    fontFamily: 'rr',
  },
  ticketContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  ticketImage: {
    width: 120,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketTitle: {
    fontSize: 18,
   fontFamily: 'rs',
    color: 'white',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
    fontFamily: 'rr',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2d2d44',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
  avatarText: {
    fontSize: 12,
    color: 'white',
  },
  ticketActions: {
    // marginVertical: 8,
    // alignItems: 'flex-end',
  },
  cancelledBadge: {

  },
  cancelledText: {
    color: '#ef4444',
    fontSize: 12,
     fontFamily: 'rm',
     marginBottom: 8
  },
  completedBadge: {

  },
  completedText: {
    color: '#10b981',
    fontSize: 12,
     fontFamily: 'rm',
     marginBottom: 8
  },
  upcomingBadge: {
 
    // marginVertical: 8

  
  },
  upcomingText: {
    color: Colors.acc,
    fontSize: 12,
     fontFamily: 'rm',
     marginBottom: 8
  },
  ticketButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewButton: {
    flex: 1,
    backgroundColor: Colors.acc,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: 'white',
    fontSize: 14,
     fontFamily: 'rm',
  },
  eTicketButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.acc,

    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  eTicketButtonText: {
    color: 'white',
    fontSize: 14,
     fontFamily: 'rm',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    color: '#8E8E93',
    fontSize: 16,
  },
});

export default TicketScreen;