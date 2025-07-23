import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

// Type definitions
interface Notification {
  id: string;
  type: 'event_reminder' | 'new_event' | 'event_update' | 'social' | 'promotion' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  eventImage?: string;
  actionRequired?: boolean;
  eventId?: string;
}

// Sample notification data
const notificationsData: Notification[] = [
  {
    id: '1',
    type: 'event_reminder',
    title: 'Event Starting Soon!',
    message: 'Michael and Anthonia Party starts in 2 hours. Don\'t forget to check in!',
    timestamp: '2 hours ago',
    isRead: false,
    eventImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=60&h=60&fit=crop',
    actionRequired: true,
    eventId: '1',
  },
  {
    id: '2',
    type: 'new_event',
    title: 'New Event Near You',
    message: 'Tech Innovation Summit 2024 has been added to events in your area.',
    timestamp: '4 hours ago',
    isRead: false,
    eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=60&h=60&fit=crop',
    eventId: '2',
  },
  {
    id: '3',
    type: 'social',
    title: 'Friend Activity',
    message: 'Sarah Johnson and 12 others are attending Synergy Summit: Building Connections.',
    timestamp: '6 hours ago',
    isRead: true,
    eventImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=60&h=60&fit=crop',
    eventId: '3',
  },
  {
    id: '4',
    type: 'event_update',
    title: 'Event Location Changed',
    message: 'Photography Workshop venue has been updated. Check the new location details.',
    timestamp: '1 day ago',
    isRead: true,
    actionRequired: true,
    eventImage: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=60&h=60&fit=crop',
    eventId: '4',
  },
  {
    id: '5',
    type: 'promotion',
    title: 'Early Bird Discount',
    message: 'Get 30% off on Leadership Nexus tickets. Limited time offer expires in 24 hours!',
    timestamp: '1 day ago',
    isRead: false,
    eventImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=60&h=60&fit=crop',
    actionRequired: true,
    eventId: '5',
  },
  {
    id: '6',
    type: 'system',
    title: 'Profile Updated',
    message: 'Your profile information has been successfully updated.',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: '7',
    type: 'event_reminder',
    title: 'Event Tomorrow',
    message: 'Don\'t forget about Food & Wine Tasting tomorrow at 7:00 PM.',
    timestamp: '2 days ago',
    isRead: true,
    eventImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=60&h=60&fit=crop',
    eventId: '6',
  },
  {
    id: '8',
    type: 'social',
    title: 'Event Liked',
    message: 'Alex Chen liked your comment on Yoga in the Park event.',
    timestamp: '3 days ago',
    isRead: true,
  },
  {
    id: '9',
    type: 'new_event',
    title: 'Recommended for You',
    message: 'Based on your interests, you might like Creative Workshop Series.',
    timestamp: '3 days ago',
    isRead: true,
    eventImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=60&h=60&fit=crop',
    eventId: '7',
  },
  {
    id: '10',
    type: 'promotion',
    title: 'Weekend Special',
    message: 'Discover amazing weekend events with special pricing just for you!',
    timestamp: '4 days ago',
    isRead: true,
    actionRequired: true,
  },
];

// Notification type icons and colors
const getNotificationStyle = (type: Notification['type']) => {
  switch (type) {
    case 'event_reminder':
      return { icon: '⏰', color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' };
    case 'new_event':
      return { icon: '🎉', color: Colors.acc, bgColor: `rgba(139, 92, 246, 0.1)` };
    case 'event_update':
      return { icon: '📝', color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' };
    case 'social':
      return { icon: '👥', color: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.1)' };
    case 'promotion':
      return { icon: '🏷️', color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' };
    case 'system':
      return { icon: '⚙️', color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
    default:
      return { icon: '📱', color: '#6b7280', bgColor: 'rgba(107, 114, 128, 0.1)' };
  }
};

// Individual Notification Item Component
const NotificationItem: React.FC<{ 
  notification: Notification; 
  onPress: () => void;
  onMarkAsRead: (id: string) => void;
}> = ({ notification, onPress, onMarkAsRead }) => {
  const router = useRouter();
  const notificationStyle = getNotificationStyle(notification.type);

  const handlePress = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    
    // Navigate based on notification type
    if (notification.eventId) {
      router.push('/eventDetails/Index');
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.notificationItem, 
        !notification.isRead && styles.unreadNotification
      ]} 
      onPress={handlePress}
    >
      {/* Unread indicator */}
      {!notification.isRead && <View style={styles.unreadIndicator} />}
      
      {/* Icon container */}
      <View style={[styles.iconContainer, { backgroundColor: notificationStyle.bgColor }]}>
        {notification.eventImage ? (
          <Image source={{ uri: notification.eventImage }} style={styles.eventThumbnail} />
        ) : (
          <Text style={[styles.notificationIcon, { color: notificationStyle.color }]}>
            {notificationStyle.icon}
          </Text>
        )}
      </View>
      
      {/* Content */}
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={[
            styles.notificationTitle,
            !notification.isRead && styles.unreadTitle
          ]}>
            {notification.title}
          </Text>
          <Text style={styles.timestamp}>{notification.timestamp}</Text>
        </View>
        
        <Text style={[
          styles.notificationMessage,
          !notification.isRead && styles.unreadMessage
        ]} numberOfLines={2}>
          {notification.message}
        </Text>
        
        {/* Action required badge */}
        {notification.actionRequired && (
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>Action Required</Text>
          </View>
        )}
      </View>
      
      {/* Arrow indicator */}
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

// Filter Tab Component
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

// Main Notifications Component
const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'events'>('all');

  // Filter notifications based on active filter
  const filteredNotifications = notifications.filter(notification => {
    switch (activeFilter) {
      case 'unread':
        return !notification.isRead;
      case 'events':
        return ['event_reminder', 'new_event', 'event_update'].includes(notification.type);
      default:
        return true;
    }
  });

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const eventNotificationsCount = notifications.filter(n => 
    ['event_reminder', 'new_event', 'event_update'].includes(n.type)
  ).length;

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.clearButton} onPress={clearAllNotifications}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterTabs}>
            <FilterTab
              title="All"
              isActive={activeFilter === 'all'}
              onPress={() => setActiveFilter('all')}
              count={notifications.length}
            />
            <FilterTab
              title="Unread"
              isActive={activeFilter === 'unread'}
              onPress={() => setActiveFilter('unread')}
              count={unreadCount}
            />
            <FilterTab
              title="Events"
              isActive={activeFilter === 'events'}
              onPress={() => setActiveFilter('events')}
              count={eventNotificationsCount}
            />
          </View>
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onPress={() => console.log(`Pressed notification: ${notification.title}`)}
              onMarkAsRead={markAsRead}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔔</Text>
            <Text style={styles.emptyStateTitle}>No notifications</Text>
            <Text style={styles.emptyStateMessage}>
              {activeFilter === 'unread' 
                ? 'All caught up! No unread notifications.' 
                : activeFilter === 'events'
                ? 'No event notifications at the moment.'
                : 'You have no notifications right now.'}
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
    backgroundColor: Colors.bg,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2438',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'rb',
    color: '#ffffff',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markAllButton: {
    marginRight: 16,
  },
  markAllText: {
    fontSize: 14,
    color: Colors.acc,
    fontFamily: 'rr',
  },
  clearButton: {},
  clearText: {
    fontSize: 14,
    color: '#ef4444',
    fontFamily: 'rr',
  },
  
  // Filter Styles
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
  
  // Notification Item Styles
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2438',
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
  },
  unreadIndicator: {
    position: 'absolute',
    left: 8,
    top: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.acc,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  eventThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'rs',
    color: '#b0b0b0',
    flex: 1,
    marginRight: 12,
  },
  unreadTitle: {
    color: '#ffffff',
  },
  timestamp: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'rr',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#8b8b8b',
    fontFamily: 'rr',
    lineHeight: 20,
    marginBottom: 8,
  },
  unreadMessage: {
    color: '#a0a0a0',
  },
  actionBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  actionBadgeText: {
    fontSize: 10,
    color: '#ffffff',
    fontFamily: 'rs',
    textTransform: 'uppercase',
  },
  arrowContainer: {
    justifyContent: 'center',
    marginLeft: 8,
  },
  arrow: {
    fontSize: 20,
    color: '#6b7280',
  },
  
  // Empty State Styles
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

export default NotificationsScreen;