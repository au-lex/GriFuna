import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,

  ScrollView,

} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';

import { useRouter } from 'expo-router';
import { Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const EventDetailsScreen: React.FC = () => {

  const [activeTab, setActiveTab] = useState<'Details' | 'Review' | 'Carpooling'>('Details');
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };



  const sampleAvatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4',

  ];

  return (


      <View style={styles.container}>


        {/* Header Image */}
        <View style={styles.headerContainer}>
          <ImageBackground
            source={{ uri: 'https://i.pinimg.com/1200x/52/e9/3a/52e93af2dec0bcf6db8ee3213c8dcf3b.jpg' }}
            style={styles.headerImage}
            resizeMode="cover"
          >
            <View style={styles.headerOverlay} />

            {/* Header Actions */}
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? "#FF6B6B" : "#FFFFFF"}
                />
              </TouchableOpacity>
            </View>

            {/* Event Title Overlay */}
            <View style={styles.eventTitleContainer}>
              <View style={styles.inviteButton}>
                <Text style={styles.inviteText}>Share</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Event Info */}
          <View style={styles.eventInfoContainer}>
            <Text style={styles.eventTitle}>Corporate Events</Text>

            <View style={styles.organizerContainer}>
              <View style={styles.organizerAvatar}>
                <Text style={styles.organizerAvatarText}>M</Text>
              </View>
              <Text style={styles.organizerText}>Organized by <Text style={styles.organizerName}>Malek Shah</Text></Text>
            </View>

            {/* Date and Time */}
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color="#6B7280" />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailTitle}>Saturday, January 25, 2025</Text>
                <Text style={styles.detailSubtitle}>18:00-23:00 PM (GMT +07:00)</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.calendarButton}>
              <Text style={styles.calendarButtonText}>Add to My Calendar</Text>
            </TouchableOpacity>

            {/* Location */}
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color="#6B7280" />
              <View style={styles.detailTextContainer}>
                <Text style={styles.detailTitle}>Grand Park, New York City, US</Text>
                <Text style={styles.detailSubtitle}>Grand city st 100, New York, United States</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.locationButtonText}>Get Location</Text>
            </TouchableOpacity>

            {/* Attendees */}
            <View style={styles.attendeesContainer}>
              <View style={styles.attendeesAvatars}>
                {sampleAvatars.map((attendee, index) => (
                  <View key={attendee} style={[styles.attendeeAvatar, { marginLeft: index > 0 ? -8 : 0 }]}>
                    <Image source={{ uri: attendee }} style={{ width: 32, height: 32, borderRadius: 16}} />
                  </View>
                ))}
              </View>
              <Text style={styles.attendeesText}>1.4k people are joined</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            {['Details', 'Review', 'Carpooling'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTabButton
                ]}
                onPress={() => setActiveTab(tab as any)}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View style={styles.tabContent}>
            {activeTab === 'Details' && (
              <View>
                <Text style={styles.descriptionText}>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to...
                  <Text style={styles.readMoreText}>Read more</Text>
                </Text>
              </View>
            )}

            {activeTab === 'Review' && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No reviews yet</Text>
              </View>
            )}

            {activeTab === 'Carpooling' && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No carpool options available</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Get Ticket Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => router.push('/getTicket/Index')} style={styles.getTicketButton}>
            <Text style={styles.getTicketText}>Get Ticket</Text>
          </TouchableOpacity>
        </View>
      </View>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
backgroundColor: '#1a1625'
  },
  headerContainer: {
    height: height * 0.35,
  },
  headerImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(22, 22, 22, 1.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(22, 22, 22, 1.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTitleContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inviteButton: {
    backgroundColor: Colors.acc,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  inviteText: {
    color: '#FFFFFF',
    fontSize: 14,
   fontFamily: 'rm',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  eventInfoContainer: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 28,
   fontFamily: 'rb',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  organizerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  organizerAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
   fontFamily: 'rm',
  },
  organizerText: {
    color: '#9CA3AF',
    fontSize: 14,
   fontFamily: 'rr',
  },
  organizerName: {
    color: '#FFFFFF',
   fontFamily: 'rm',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  detailTitle: {
    color: '#FFFFFF',
    fontSize: 16,
   fontFamily: 'rm',
    marginBottom: 4,
  },
  detailSubtitle: {
    color: '#9CA3AF',
    fontSize: 14,
   fontFamily: 'rr',
  },
  calendarButton: {
  
    borderWidth: 1,
    borderColor: Colors.acc,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginLeft: 32,
  },
  calendarButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
   fontFamily: 'rm',
  },
  locationButton: {

    borderWidth: 1,
    borderColor: Colors.acc,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
    marginLeft: 32,
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
   fontFamily: 'rm',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  attendeesAvatars: {
    flexDirection: 'row',
    marginRight: 12,
  },
  attendeeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#1a1a2e',
  },
  attendeeAvatarText: {
    fontSize: 16,
  },
  attendeesText: {
    color: '#9CA3AF',
    fontSize: 14,
    flex: 1,
   fontFamily: 'rr',
  },
  viewAllText: {
    color: Colors.acc,
    fontSize: 14,
   fontFamily: 'rm',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.acc,
  },
  tabText: {
    color: '#9CA3AF',
    fontSize: 16,
       fontFamily: 'rm',
  },
  activeTabText: {
    color: Colors.acc,
   fontFamily: 'rm',
  },
  tabContent: {
    padding: 20,
    minHeight: 100,
  },
  descriptionText: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 22,
   fontFamily: 'rr',
  },
  readMoreText: {
    color: Colors.acc,
   fontFamily: 'rm',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    color: '#6B7280',
    fontSize: 16,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 0.6,
    borderTopColor: '#374151',
  },
  getTicketButton: {
    backgroundColor: Colors.acc,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  getTicketText: {
    color: '#FFFFFF',
    fontSize: 18,
   fontFamily: 'rm',
  },
});

export default EventDetailsScreen;