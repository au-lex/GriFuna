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
import { useRouter } from 'expo-router';
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
  BarChart3,
  Users,
  DollarSign,
  Globe,
  Building2,
  FileText,
  Eye,
  TrendingUp,
  Award,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import SafeLayout from '@/Layout/SafeAreaLayout';

// Type definitions
interface OrganizerProfile {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  joinDate: string;
  totalEvents: number;
  activeEvents: number;
  totalRevenue: number;
  totalAttendees: number;
  businessType: 'Individual' | 'Company' | 'Non-Profit' | 'Government';
  verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  rating: number;
}

interface OrganizerSettings {
  autoApproveBookings: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  eventReminders: boolean;
  publicProfile: boolean;
  dataAnalytics: boolean;
  refundRequests: boolean;
}

// Sample organizer data
const organizerProfile: OrganizerProfile = {
  id: 'org_001',
  businessName: 'EventMaster Pro',
  ownerName: 'Sarah Johnson',
  email: 'sarah@eventmasterpro.com',
  phone: '+1 (555) 987-6543',
  avatar: 'https://i.pinimg.com/736x/7e/83/0e/7e830e9c49dee63d546ba2b376523d30.jpg',
  location: 'New York, NY',
  joinDate: '2021-08-15',
  totalEvents: 156,
  activeEvents: 12,
  totalRevenue: 245000,
  totalAttendees: 8650,
  businessType: 'Company',
  verificationStatus: 'Verified',
  rating: 4.8,
};

const defaultOrganizerSettings: OrganizerSettings = {
  autoApproveBookings: true,
  emailNotifications: true,
  smsNotifications: false,
  marketingEmails: true,
  eventReminders: true,
  publicProfile: true,
  dataAnalytics: true,
  refundRequests: false,
};

// Settings Modal Component
interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ visible, onClose }) => {
  const [settings, setSettings] = useState<OrganizerSettings>(defaultOrganizerSettings);

  const updateSetting = (key: keyof OrganizerSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'Event Management',
      items: [
        {
          key: 'autoApproveBookings' as keyof OrganizerSettings,
          label: 'Auto-Approve Bookings',
          description: 'Automatically approve ticket bookings',
          value: settings.autoApproveBookings,
        },
        {
          key: 'eventReminders' as keyof OrganizerSettings,
          label: 'Event Reminders',
          description: 'Send reminders to attendees',
          value: settings.eventReminders,
        },
        {
          key: 'refundRequests' as keyof OrganizerSettings,
          label: 'Auto-Handle Refunds',
          description: 'Automatically process refund requests',
          value: settings.refundRequests,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          key: 'emailNotifications' as keyof OrganizerSettings,
          label: 'Email Notifications',
          description: 'Receive booking and event updates via email',
          value: settings.emailNotifications,
        },
        {
          key: 'smsNotifications' as keyof OrganizerSettings,
          label: 'SMS Notifications',
          description: 'Get urgent notifications via text',
          value: settings.smsNotifications,
        },
        {
          key: 'marketingEmails' as keyof OrganizerSettings,
          label: 'Marketing Updates',
          description: 'Receive platform updates and tips',
          value: settings.marketingEmails,
        },
      ],
    },
    {
      title: 'Privacy & Analytics',
      items: [
        {
          key: 'publicProfile' as keyof OrganizerSettings,
          label: 'Public Profile',
          description: 'Make your organizer profile visible to users',
          value: settings.publicProfile,
        },
        {
          key: 'dataAnalytics' as keyof OrganizerSettings,
          label: 'Advanced Analytics',
          description: 'Enable detailed event analytics',
          value: settings.dataAnalytics,
        },
      ],
    },
  ];

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Organizer Settings</Text>
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
                    onValueChange={(value) => updateSetting(item.key, value)}
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

// Main Organizer Settings Component
const OrganizerSettingsPage: React.FC = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const router = useRouter();

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'Verified': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Business Profile', 'Business profile editing would be implemented here.');
  };

  const handleLogout = () => {
    router.push('/auth/login/Index');
  };

  return (
    <SafeLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Organizer Settings</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Business Profile Info */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: organizerProfile.avatar }} style={styles.avatar} />
     
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.businessName}>{organizerProfile.businessName}</Text>
                <Text style={styles.ownerName}>by {organizerProfile.ownerName}</Text>
              </View>
              
              <View style={styles.contactInfo}>
                <View style={styles.infoRow}>
                  <Mail size={14} color={Colors.acc} />
                  <Text style={styles.contactText}>{organizerProfile.email}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Building2 size={14} color={Colors.acc} />
                  <Text style={styles.contactText}>{organizerProfile.businessType}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Star size={14} color="#f59e0b" />
                  <Text style={styles.contactText}>{organizerProfile.rating} ★ Rating</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Edit3 size={16} color="white" />
                <Text style={styles.editButtonText}>Edit Business Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Business Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Business Overview</Text>
            <View style={styles.statsGrid}>
              <StatsCard
                icon={<Calendar size={20} color="#8b5cf6" />}
                label="Total Events"
                value={organizerProfile.totalEvents}
                color="#8b5cf6"
              />
              <StatsCard
                icon={<TrendingUp size={20} color="#10b981" />}
                label="Active Events"
                value={organizerProfile.activeEvents}
                color="#10b981"
              />
              <StatsCard
                icon={<DollarSign size={20} color="#f59e0b" />}
                label="Total Revenue"
                value={formatCurrency(organizerProfile.totalRevenue)}
                color="#f59e0b"
              />
              <StatsCard
                icon={<Users size={20} color="#06b6d4" />}
                label="Total Attendees"
                value={organizerProfile.totalAttendees.toLocaleString()}
                color="#06b6d4"
              />
            </View>
          </View>

          {/* Business Management Menu */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Business Management</Text>
            <View style={styles.menuContainer}>
              <MenuItem
                icon={<BarChart3 />}
                title="Analytics & Reports"
                subtitle="View detailed event analytics"
                onPress={() => Alert.alert('Analytics', 'Analytics dashboard would open here.')}
              />
              <MenuItem
                icon={<CreditCard />}
                title="Payment & Payouts"
                subtitle="Manage payment methods and payouts"
                onPress={() => Alert.alert('Payment & Payouts', 'Payment management would open here.')}
              />
              <MenuItem
                icon={<Award />}
                title="Verification Status"
                subtitle={`Status: ${organizerProfile.verificationStatus}`}
                onPress={() => Alert.alert('Verification', 'Verification details would be shown here.')}
              />
              <MenuItem
                icon={<FileText />}
                title="Event Templates"
                subtitle="Manage your event templates"
                onPress={() => Alert.alert('Templates', 'Event templates would be managed here.')}
              />
            </View>
          </View>

          {/* Settings Menu */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Settings & Preferences</Text>
            <View style={styles.menuContainer}>
              <MenuItem
                icon={<Settings />}
                title="Organizer Settings"
                subtitle="Configure event and notification settings"
                onPress={() => setSettingsVisible(true)}
              />
              <MenuItem
                icon={<Shield />}
                title="Security & Privacy"
                subtitle="Account security and privacy settings"
                onPress={() => Alert.alert('Security', 'Security settings would be managed here.')}
              />
              <MenuItem
                icon={<Eye />}
                title="Public Profile"
                subtitle="Manage your public organizer profile"
                onPress={() => Alert.alert('Public Profile', 'Public profile settings would open here.')}
              />
              <MenuItem
                icon={<Globe />}
                title="Business Information"
                subtitle="Update business details and location"
                onPress={() => Alert.alert('Business Info', 'Business information would be updated here.')}
              />
            </View>
          </View>

          {/* Support Menu */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Support & Resources</Text>
            <View style={styles.menuContainer}>
              <MenuItem
                icon={<HelpCircle />}
                title="Organizer Help Center"
                subtitle="Get help with event management"
                onPress={() => Alert.alert('Help Center', 'Organizer help center would open here.')}
              />
              <MenuItem
                icon={<Download />}
                title="Export Business Data"
                subtitle="Download your business reports"
                onPress={() => Alert.alert('Export Data', 'Business data export would be initiated here.')}
              />
              <MenuItem
                icon={<Share2 />}
                title="Refer Other Organizers"
                subtitle="Earn rewards for referrals"
                onPress={() => Alert.alert('Refer Organizers', 'Referral program would be shown here.')}
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
  verificationBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.card,
  },
  profileInfo: {
    width: '100%',
  },
  nameContainer: {
    gap: 4,
  },
  businessName: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'rs',
  },
  ownerName: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'rr',
  },
  contactInfo: {
    width: '100%',
    marginVertical: 12,
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    width: '60%',
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
    fontSize: 18,
    fontFamily: 'rs',
  },
  statsLabel: {
    color: '#9ca3af',
    fontSize: 11,
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

export default OrganizerSettingsPage;