import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  QrCode,
  Eye,
  Download,
  Share2,
  MoreVertical,
  Ticket,
  Users,
  X,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const { width: screenWidth } = Dimensions.get('window');

// Type definitions
interface MyTicket {
  id: string;
  eventId: string;
  ticketNumber: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventImage: string;
  organizer: string;
  ticketType: string;
  seatInfo?: string;
  price: number;
  status: 'upcoming' | 'past' | 'cancelled';
  qrCode: string;
  purchaseDate: string;
  category: string;
  isTransferable: boolean;
}

// Sample ticket data
const myTickets: MyTicket[] = [
  {
    id: 'tick_001',
    eventId: 'evt_001',
    ticketNumber: 'TK2024071501',
    eventTitle: 'Global Leadership Conference 2024',
    eventDate: '2024-07-25',
    eventTime: '09:00 AM',
    eventLocation: 'Convention Center, Hawaii',
    eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    organizer: 'Leadership Institute',
    ticketType: 'VIP Premium',
    seatInfo: 'Section A, Row 1, Seat 15',
    price: 250,
    status: 'upcoming',
    qrCode: 'QR_TK2024071501_VIP',
    purchaseDate: '2024-06-15',
    category: 'Business',
    isTransferable: true,
  },
  {
    id: 'tick_002',
    eventId: 'evt_002',
    ticketNumber: 'TK2024081202',
    eventTitle: 'Tech Innovation Summit',
    eventDate: '2024-08-12',
    eventTime: '10:00 AM',
    eventLocation: 'Silicon Valley Expo Center',
    eventImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    organizer: 'TechForward Inc',
    ticketType: 'Standard',
    price: 125,
    status: 'upcoming',
    qrCode: 'QR_TK2024081202_STD',
    purchaseDate: '2024-07-01',
    category: 'Technology',
    isTransferable: false,
  },
  {
    id: 'tick_003',
    eventId: 'evt_003',
    ticketNumber: 'TK2024060103',
    eventTitle: 'Music Festival 2024',
    eventDate: '2024-06-01',
    eventTime: '06:00 PM',
    eventLocation: 'Central Park, New York',
    eventImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    organizer: 'Music Events Co',
    ticketType: 'Early Bird',
    price: 85,
    status: 'past',
    qrCode: 'QR_TK2024060103_EB',
    purchaseDate: '2024-04-15',
    category: 'Entertainment',
    isTransferable: true,
  },
];

// Ticket Card Component
interface TicketCardProps {
  ticket: MyTicket;
  onViewDetails: (ticket: MyTicket) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'upcoming':
        return { color: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.1)' };
      case 'past':
        return { color: '#9ca3af', backgroundColor: 'rgba(156, 163, 175, 0.1)' };
      case 'cancelled':
        return { color: '#f87171', backgroundColor: 'rgba(248, 113, 113, 0.1)' };
      default:
        return { color: '#9ca3af', backgroundColor: 'rgba(156, 163, 175, 0.1)' };
    }
  };

  const getTicketTypeColors = (type: string) => {
    switch (type.toLowerCase()) {
      case 'vip premium':
        return ['#f59e0b', '#ea580c'];
      case 'standard':
        return ['#3b82f6', '#8b5cf6'];
      case 'early bird':
        return ['#10b981', '#059669'];
      default:
        return ['#6b7280', '#4b5563'];
    }
  };

  const dateInfo = formatDate(ticket.eventDate);
  const isUpcoming = ticket.status === 'upcoming';
  const statusStyle = getStatusStyle(ticket.status);

  return (
    <View style={[styles.ticketCard, isUpcoming && styles.upcomingBorder]}>
      {/* Ticket Type Badge */}
      <View style={[styles.ticketTypeBadge, { backgroundColor: getTicketTypeColors(ticket.ticketType)[0] }]}>
        <Text style={styles.ticketTypeBadgeText}>{ticket.ticketType.toUpperCase()}</Text>
      </View>

      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
        <Text style={[styles.statusBadgeText, { color: statusStyle.color }]}>
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </Text>
      </View>

      <View style={styles.ticketContent}>
        {/* Event Image & Date */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: ticket.eventImage }} style={styles.eventImage} />
          <View style={styles.imageOverlay} />
          <View style={styles.dateContainer}>
            <Text style={styles.dateDay}>{dateInfo.day}</Text>
            <Text style={styles.dateMonth}>{dateInfo.month}</Text>
            <Text style={styles.dateWeekday}>{dateInfo.weekday}</Text>
          </View>
        </View>

        {/* Ticket Details */}
        <View style={styles.ticketDetails}>
          <View style={styles.ticketHeader}>
            <View style={styles.ticketTitleContainer}>
              <Text style={styles.eventTitle} numberOfLines={2}>
                {ticket.eventTitle}
              </Text>
              <Text style={styles.organizer}>by {ticket.organizer}</Text>
            </View>
          </View>

          <View style={styles.eventInfo}>
            <View style={styles.infoRow}>
              <Clock size={14} color="#a855f7" />
              <Text style={styles.infoText}>{ticket.eventTime}</Text>
            </View>
            <View style={styles.infoRow}>
              <MapPin size={14} color="#a855f7" />
              <Text style={styles.infoText} numberOfLines={1}>
                {ticket.eventLocation}
              </Text>
            </View>
            {ticket.seatInfo && (
              <View style={styles.infoRow}>
                <Users size={14} color="#a855f7" />
                <Text style={styles.infoText}>{ticket.seatInfo}</Text>
              </View>
            )}
          </View>

          <View style={styles.ticketFooter}>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketInfoLabel}>Ticket #</Text>
              <Text style={styles.ticketNumber}>{ticket.ticketNumber}</Text>
            </View>
            <View style={styles.priceInfo}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>${ticket.price}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => onViewDetails(ticket)}
          >
            <Eye size={16} color="white" />
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
          
          {isUpcoming && (
            <>
         
              <TouchableOpacity style={styles.secondaryButton}>
                <Share2 size={16} color="white" />
                <Text style={styles.buttonText}>Share</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

      </View>
    </View>
  );
};

// Ticket Detail Modal Component
interface TicketDetailModalProps {
  ticket: MyTicket | null;
  visible: boolean;
  onClose: () => void;
}

const TicketDetailModal: React.FC<TicketDetailModalProps> = ({ ticket, visible, onClose }) => {
  if (!ticket) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Ticket Details</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* QR Code */}
          <View style={styles.qrContainer}>
            <View style={styles.qrCodeWrapper}>
              <View style={styles.qrCodePlaceholder}>
                <QrCode size={80} color="#6b7280" />
              </View>
            </View>
            <Text style={styles.qrInstructions}>Show this QR code at the venue</Text>
          </View>

          {/* Event Info */}
          <View style={styles.modalInfoContainer}>
            <Text style={styles.modalEventTitle}>{ticket.eventTitle}</Text>
            <View style={styles.modalEventInfo}>
              <View style={styles.modalInfoRow}>
                <Calendar size={16} color="#a855f7" />
                <Text style={styles.modalInfoText}>
                  {formatDate(ticket.eventDate)} at {ticket.eventTime}
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <MapPin size={16} color="#a855f7" />
                <Text style={styles.modalInfoText}>{ticket.eventLocation}</Text>
              </View>
              {ticket.seatInfo && (
                <View style={styles.modalInfoRow}>
                  <Users size={16} color="#a855f7" />
                  <Text style={styles.modalInfoText}>{ticket.seatInfo}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Ticket Info */}
          <View style={styles.modalInfoContainer}>
            <Text style={styles.modalSectionTitle}>Ticket Information</Text>
            <View style={styles.ticketInfoGrid}>
              <View style={styles.ticketInfoItem}>
                <Text style={styles.ticketInfoItemLabel}>Ticket Number</Text>
                <Text style={styles.ticketInfoItemValue}>{ticket.ticketNumber}</Text>
              </View>
              <View style={styles.ticketInfoItem}>
                <Text style={styles.ticketInfoItemLabel}>Type</Text>
                <Text style={styles.ticketInfoItemValue}>{ticket.ticketType}</Text>
              </View>
              <View style={styles.ticketInfoItem}>
                <Text style={styles.ticketInfoItemLabel}>Price</Text>
                <Text style={[styles.ticketInfoItemValue, styles.priceValue]}>${ticket.price}</Text>
              </View>
              <View style={styles.ticketInfoItem}>
                <Text style={styles.ticketInfoItemLabel}>Status</Text>
                <Text style={[styles.ticketInfoItemValue, styles.statusValue]}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.downloadButton}>
              <Download size={18} color="white" />
              <Text style={styles.modalButtonText}>Download Ticket</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Share2 size={18} color="white" />
              <Text style={styles.modalButtonText}>Share Ticket</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// Main My Tickets Component
const MyTicketsPage: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<MyTicket | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');

  const filteredTickets = myTickets.filter(ticket => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return ticket.status === 'upcoming';
    if (activeTab === 'past') return ticket.status === 'past';
    return true;
  });

  const upcomingCount = myTickets.filter(t => t.status === 'upcoming').length;
  const pastCount = myTickets.filter(t => t.status === 'past').length;

  return (
    <View style={styles.container}>

      
      {/* Header */}
      <View >

        <Text style={{color: 'white', fontSize: 20, fontFamily: "ob", paddingTop: 20, paddingLeft: 20}}> My Tickets</Text>
     

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All ({myTickets.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              Upcoming ({upcomingCount})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
              Past ({pastCount})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tickets List */}
      <ScrollView style={styles.ticketsList} showsVerticalScrollIndicator={false}>
        {filteredTickets.length === 0 ? (
          <View style={styles.emptyState}>
            <Ticket size={64} color="#4b5563" />
            <Text style={styles.emptyStateTitle}>No tickets found</Text>
            <Text style={styles.emptyStateSubtitle}>
              {activeTab === 'upcoming' && 'No upcoming events'}
              {activeTab === 'past' && 'No past events'}
              {activeTab === 'all' && "You haven't purchased any tickets yet"}
            </Text>
          </View>
        ) : (
          filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onViewDetails={setSelectedTicket}
            />
          ))
        )}
      </ScrollView>

      {/* Ticket Detail Modal */}
      <TicketDetailModal
        ticket={selectedTicket}
        visible={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    paddingBottom: 16,
  },

  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 14,
   
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginRight: 8,
  },
  activeTab: {
    borderBottomColor: Colors.acc,
  },
  tabText: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: "os",
  },
  activeTabText: {
    color:Colors.acc,
  },
  ticketsList: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 14,
  },
  ticketCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',

  },
  upcomingBorder: {

  
  },
  ticketTypeBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    zIndex: 10,
  },
  ticketTypeBadgeText: {
    color: 'white',
    fontSize: 10,
  fontFamily: "ob",
  },
  statusBadge: {
    position: 'absolute',
    top: 6,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    zIndex: 10,
  },
  statusBadgeText: {
    fontSize: 10,
    fontFamily: "os",
  },
  ticketContent: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 130,
    height: 160,
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  dateContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    alignItems: 'center',
  },
  dateDay: {
    color: 'white',
    fontSize: 24,
  fontFamily: "ob",
  },
  dateMonth: {
    color: 'white',
    fontSize: 10,
    opacity: 0.8,
  },
  dateWeekday: {
    color: 'white',
    fontSize: 10,
    opacity: 0.6,
  },
  ticketDetails: {
    flex: 1,
    padding: 24,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  ticketTitleContainer: {
    flex: 1,
  },
  eventTitle: {
    color: 'white',
    fontSize: 16,
  fontFamily: "ob",
    marginBottom: 4,
    lineHeight: 22,
  paddingTop: 8,
  },
  organizer: {
    color: Colors.acc,
    fontSize: 12,
    fontFamily: "os",
    // marginBottom: 8,
  },
  eventInfo: {
    // marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    color: '#d1d5db',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
    fontFamily: "ol",
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  ticketInfo: {
    alignItems: 'flex-start',
  },
  ticketInfoLabel: {
    color: '#9ca3af',
    fontSize: 10,
  },
  ticketNumber: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    color: '#9ca3af',
    fontSize: 10,
  },
  price: {
    color: 'white',
    fontSize: 14,
  fontFamily: "ob",
  },
  actionButtons: {
    backgroundColor: Colors.card,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.acc,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: "os",
  },
  moreButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    color: '#9ca3af',
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
  fontFamily: "ob",
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  qrCodeWrapper: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 16,
    marginBottom: 12,
  },
  qrCodePlaceholder: {
    width: 128,
    height: 128,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrInstructions: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },
  modalInfoContainer: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  modalEventTitle: {
    color: 'white',
    fontSize: 18,
  fontFamily: "ob",
    marginBottom: 12,
  },
  modalEventInfo: {
    gap: 8,
  },
  modalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalInfoText: {
    color: '#d1d5db',
    fontSize: 14,
    flex: 1,
    fontFamily: "ol",
  },
  modalSectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ticketInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  ticketInfoItem: {
    width: '45%',
  },
  ticketInfoItemLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: "ol",
    marginBottom: 4,
  },
  ticketInfoItemValue: {
    color: 'white',
    fontSize: 14,
  },
  priceValue: {
  fontFamily: "ob",
  },
  statusValue: {
    color: '#4ade80',
  },
  modalActions: {
    gap: 12,
    marginBottom: 24,
  },
  downloadButton: {
    backgroundColor: Colors.acc,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  shareButton: {
    backgroundColor: Colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: "os",
  },
});

export default MyTicketsPage;