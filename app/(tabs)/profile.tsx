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
  Alert,
  Switch,
} from 'react-native';
import {
  User,
  Edit3,
  Bell,
  Shield,
  CreditCard,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Camera,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Heart,
  Share2,
  Download,
  Ticket,
  Star,
  X,
  Check,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import SafeLayout from '@/Layout/SafeAreaLayout';

// Type definitions
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  joinDate: string;
  totalEvents: number;
  favoriteEvents: number;
  ticketsBooked: number;
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  isVerified: boolean;
}

interface NotificationSettings {
  eventReminders: boolean;
  promotionalEmails: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  weeklyDigest: boolean;
}

// Sample user data
const userProfile: UserProfile = {
  id: 'user_001',
  firstName: 'Script ',
  lastName: 'Devv',
  email: 'scriptDevv@email.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://i.pinimg.com/736x/08/41/3f/08413f3942b7cf8af45b986a4120a347.jpg',
  location: 'San Francisco, CA',
  joinDate: '2022-03-15',
  totalEvents: 24,
  favoriteEvents: 12,
  ticketsBooked: 45,
  membershipTier: 'Gold',
  isVerified: true,
};

const defaultNotificationSettings: NotificationSettings = {
  eventReminders: true,
  promotionalEmails: true,
  pushNotifications: true,
  smsNotifications: false,
  weeklyDigest: true,
};

// Settings Modal Component
interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotificationSettings);

  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'Notifications',
      items: [
        {
          key: 'eventReminders' as keyof NotificationSettings,
          label: 'Event Reminders',
          description: 'Get notified about upcoming events',
          value: notifications.eventReminders,
        },
        {
          key: 'pushNotifications' as keyof NotificationSettings,
          label: 'Push Notifications',
          description: 'Receive push notifications on your device',
          value: notifications.pushNotifications,
        },
        {
          key: 'promotionalEmails' as keyof NotificationSettings,
          label: 'Promotional Emails',
          description: 'Receive updates about new events and offers',
          value: notifications.promotionalEmails,
        },
        {
          key: 'smsNotifications' as keyof NotificationSettings,
          label: 'SMS Notifications',
          description: 'Get text messages for important updates',
          value: notifications.smsNotifications,
        },
        {
          key: 'weeklyDigest' as keyof NotificationSettings,
          label: 'Weekly Digest',
          description: 'Receive a weekly summary of events',
          value: notifications.weeklyDigest,
        },
      ],
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Settings</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {settingSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.settingsSection}>
              <Text style={styles.settingsSectionTitle}>{section.title}</Text>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.settingsItem}>
                  <View style={styles.settingsItemContent}>
                    <Text style={styles.settingsItemLabel}>{item.label}</Text>
                    <Text style={styles.settingsItemDescription}>{item.description}</Text>
                  </View>
                  <Switch
                    value={item.value}
                    onValueChange={(value) => updateNotificationSetting(item.key, value)}
                    trackColor={{ false: '#374151', true: Colors.acc }}
                    thumbColor="white"
                  />
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

// Stats Card Component
interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, value, color }) => (
  <View style={[styles.statsCard, { borderLeftColor: color }]}>
    <View style={[styles.statsIcon, { backgroundColor: `${color}20` }]}>
      {icon}
    </View>
    <View style={styles.statsContent}>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  </View>
);

// Menu Item Component
interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  color?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  color = '#d1d5db'
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <View style={styles.menuItemIcon}>
        {React.cloneElement(icon as React.ReactElement, { size: 20, color })}
      </View>
      <View>
        <Text style={[styles.menuItemTitle, { color }]}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {showArrow && <ChevronRight size={20} color="#6b7280" />}
  </TouchableOpacity>
);

// Main Profile Component
const ProfilePage: React.FC = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return '#cd7f32';
      case 'Silver': return '#c0c0c0';
      case 'Gold': return '#ffd700';
      case 'Platinum': return '#e5e4e2';
      default: return '#6b7280';
    }
  };


  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing functionality would be implemented here.');
  };



  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('User logged out') },
      ]
    );
  };

  return (
    <SafeLayout>


    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
  
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
       
    
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>
                {userProfile.firstName} {userProfile.lastName}
              </Text>
         
            </View>
            
            <View style={styles.contactInfo}>
              <View style={styles.infoRow}>
                <Mail size={14} color={Colors.acc} />
                <Text style={styles.contactText}>{userProfile.email}</Text>
              </View>
           
         
        
            </View>

            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit3 size={16} color="white" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Activity</Text>
          <View style={styles.statsGrid}>
        
     
            <StatsCard
              icon={<Calendar size={20} color="#10b981" />}
              label="Tickets Booked"
              value={userProfile.ticketsBooked}
              color="#10b981"
            />
            <StatsCard
              icon={<Star size={20} color="#f59e0b" />}
              label="Member Tier"
              value={userProfile.membershipTier}
              color={getTierColor(userProfile.membershipTier)}
            />
          </View>
        </View>

        {/* Account Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon={<CreditCard />}
              title="Payment Methods"
              subtitle="Manage your payment options"
              onPress={() => Alert.alert('Payment Methods', 'Payment methods would be managed here.')}
            />
            <MenuItem
              icon={<Shield />}
              title="Security"
              subtitle="Password and security settings"
              onPress={() => Alert.alert('Security', 'Security settings would be managed here.')}
            />
            <MenuItem
              icon={<Bell />}
              title="Notifications"
              subtitle="Manage notification preferences"
              onPress={() => setSettingsVisible(true)}
            />
            <MenuItem
              icon={<Download />}
              title="Download Data"
              subtitle="Export your account data"
              onPress={() => Alert.alert('Download Data', 'Data export would be initiated here.')}
            />
          </View>
        </View>

        {/* Support Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuContainer}>
            <MenuItem
              icon={<HelpCircle />}
              title="Help Center"
              subtitle="Get help and support"
              onPress={() => Alert.alert('Help Center', 'Help center would open here.')}
            />
            <MenuItem
              icon={<Share2 />}
              title="Share App"
              subtitle="Invite friends to join"
              onPress={() => Alert.alert('Share App', 'App sharing would be initiated here.')}
            />
            <MenuItem
              icon={<LogOut />}
              title="Logout"
              onPress={handleLogout}
              showArrow={false}
              color="#ef4444"
            />
          </View>
        </View>
      </ScrollView>

      {/* Settings Modal */}
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
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
    fontSize: 20,
   fontFamily: 'rs',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileSection: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    padding: 24,
    marginBottom: 24,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
    marginRight: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.acc,
  },

  profileInfo: {
    // alignItems: 'center',
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 12,
  },
  userName: {
    color: 'white',
    fontSize: 24,
   fontFamily: 'rs',
  },

  membershipText: {
    fontSize: 12,
     fontFamily: 'rr',
  },
  contactInfo: {
    width: '100%',
    marginVertical:10,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    color: '#d1d5db',
    fontSize: 14,
   fontFamily: 'rr',
    flex: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.acc,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: '50%',
    justifyContent: 'center',
    gap: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
     fontFamily: 'rr',
  },
  statsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
   fontFamily: 'rs',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statsCard: {
    backgroundColor: Colors.card,
    borderRadius: 6,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    borderLeftWidth: 4,
  },
  statsIcon: {
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  statsContent: {
    flex: 1,
  },
  statsValue: {
    color: 'white',
    fontSize: 20,
   fontFamily: 'rs',
  },
  statsLabel: {
    color: '#9ca3af',
    fontSize: 12,
   fontFamily: 'rr',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuContainer: {
    backgroundColor: Colors.card,
    borderRadius: 6,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemTitle: {
    fontSize: 16,
     fontFamily: 'rr',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    color: '#9ca3af',
    fontSize: 12,
   fontFamily: 'rr',
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
   fontFamily: 'rs',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  settingsSection: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  settingsSectionTitle: {
    color: 'white',
    fontSize: 16,
   fontFamily: 'rs',
    marginBottom: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  settingsItemContent: {
    flex: 1,
    marginRight: 12,
  },
  settingsItemLabel: {
    color: 'white',
    fontSize: 14,
     fontFamily: 'rr',
    marginBottom: 2,
  },
  settingsItemDescription: {
    color: '#9ca3af',
    fontSize: 12,
   fontFamily: 'rr',
  },
});

export default ProfilePage;