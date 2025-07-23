import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import Noti from "../../../assets/svg/Noti.svg";
import { Colors } from '@/constants/Colors';


interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onSearchChange?: (text: string) => void;
  onNotificationPress?: () => void;
  onFilterPress?: () => void;
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName = 'Script',
  userAvatar = 'https://i.pinimg.com/1200x/3e/f3/50/3ef350dc86cc82a092463e5d795654b5.jpg',
  onSearchChange,
  onNotificationPress,
  onFilterPress,
  onProfilePress,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationCount] = useState(3); // You can make this dynamic

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const router = useRouter();
  const notifcation = () => {
    router.push('/notifica/Index');
  };

  const handleSearchPress = () => {
    router.push('/search/Index');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* User Profile Section */}
        <TouchableOpacity 
          style={styles.profileSection}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <View style={styles.avatarContainer}>
            {userAvatar ? (
              <Image source={{ uri: userAvatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={24} color="#fff" />
              </View>
            )}
            {/* Online status indicator */}
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>
              {getGreeting()}, {userName}! 👋
            </Text>
            <Text style={styles.subtitle}>
              Welcome to Grifuna
            </Text>
          </View>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {/* Notification Button */}
          <TouchableOpacity 
            style={[styles.actionButton, styles.notificationButton]}
            onPress={notifcation}
          >
            <Noti width={22} height={22} />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>
                  {/* {notificationCount > 9 ? '9+' : notificationCount} */}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <TouchableOpacity 
          style={[
            styles.searchContainer,
            searchFocused && styles.searchContainerFocused
          ]}
          onPress={handleSearchPress}
          activeOpacity={0.7}
        >
          <Ionicons 
            name="search-outline" 
            size={20} 
            color={searchFocused ? "#AD112A" : "#999"} 
            style={styles.searchIcon}
          />
          <Text style={styles.searchPlaceholder}>
            Discover trends, events, and more...
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    paddingTop: 10,
    paddingBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor:  Colors.acc,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:  Colors.acc,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.acc,
  },

  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,

    color: '#fff',
   fontFamily: 'rm',
    // marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#fff',
   fontFamily: 'rr',
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.acc,
    borderWidth: 1,
    borderColor: '#ff8c69',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor:  Colors.acc,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.acc,
  },
  notificationText: {
    color: Colors.acc,
    fontSize: 10,
    fontFamily: 'Raleway-Bold',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchContainerFocused: {
    borderColor: '#FF8C69',
    shadowColor: '#FF8C69',
    shadowOpacity: 0.2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: '#999',
    fontFamily: 'Lato-Regular',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.acc,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.acc,
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickActionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  quickActionText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
  },
});

export default Header;