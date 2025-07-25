import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  MessageCircle,
  Phone,
  Video,
  Edit3,
  MoreVertical,
  Archive,
  Trash2,
  Pin,
  VolumeX,
  CheckCheck,
  Check,
  Clock,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import SafeLayout from '@/Layout/SafeAreaLayout';

// Type definitions
interface Conversation {
  id: string;
  contact: {
    name: string;
    avatar?: string;
    isOnline: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: Date;
    sender: 'user' | 'other';
    status?: 'sending' | 'sent' | 'delivered' | 'read';
    type: 'text' | 'image' | 'audio' | 'file';
  };
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  isArchived: boolean;
  isTyping: boolean;
}

// Sample conversations data
const sampleConversations: Conversation[] = [
  {
    id: '1',
    contact: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
    lastMessage: {
      text: 'Thanks for the event details! See you there 🎉',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      sender: 'other',
      type: 'text',
    },
    unreadCount: 2,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    isTyping: false,
  },
  {
    id: '2',
    contact: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
    },
    lastMessage: {
      text: 'Perfect! The tickets are ready for pickup',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      sender: 'user',
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
    isArchived: false,
    isTyping: false,
  },
  {
    id: '3',
    contact: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
    lastMessage: {
      text: 'Can we reschedule the meeting?',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      sender: 'other',
      type: 'text',
    },
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isTyping: true,
  },
  {
    id: '4',
    contact: {
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
    },
    lastMessage: {
      text: '📷 Photo',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      sender: 'other',
      type: 'image',
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: true,
    isArchived: false,
    isTyping: false,
  },
  {
    id: '5',
    contact: {
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
    lastMessage: {
      text: 'Thanks for organizing the workshop!',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      sender: 'other',
      type: 'text',
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isTyping: false,
  },
  {
    id: '6',
    contact: {
      name: 'David Kim',
      isOnline: false,
    },
    lastMessage: {
      text: 'Let me know when you\'re available',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      sender: 'user',
      status: 'delivered',
      type: 'text',
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isTyping: false,
  },
  {
    id: '7',
    contact: {
      name: 'Rachel Green',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
    },
    lastMessage: {
      text: '🎵 Audio message',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      sender: 'other',
      type: 'audio',
    },
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
    isArchived: false,
    isTyping: false,
  },
];

// Utility functions
const formatMessageTime = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
  if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getMessagePreview = (message: Conversation['lastMessage']): string => {
  switch (message.type) {
    case 'image':
      return '📷 Photo';
    case 'audio':
      return '🎵 Audio message';
    case 'file':
      return '📎 File';
    default:
      return message.text;
  }
};

// Message Status Component
const MessageStatus: React.FC<{ status?: string; isUser: boolean }> = ({ status, isUser }) => {
  if (!isUser || !status) return null;

  switch (status) {
    case 'sending':
      return <Clock size={12} color="#9ca3af" />;
    case 'sent':
      return <Check size={12} color="#9ca3af" />;
    case 'delivered':
      return <CheckCheck size={12} color="#9ca3af" />;
    case 'read':
      return <CheckCheck size={12} color={Colors.acc} />;
    default:
      return null;
  }
};

// Conversation Item Component
interface ConversationItemProps {
  conversation: Conversation;
  onPress: () => void;
  onLongPress: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onPress,
  onLongPress,
}) => {
  const { contact, lastMessage, unreadCount, isPinned, isMuted, isTyping } = conversation;
  const isUser = lastMessage.sender === 'user';

  return (
    <TouchableOpacity
      style={[styles.conversationItem, isPinned && styles.pinnedConversation]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ 
            uri: contact.avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiM2YjcyODAiLz4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyMCIgcj0iNyIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEwIDQwQzEwIDMzLjM3MjYgMTUuMzcyNiAyOCAyMiAyOEgyOEMzNC42Mjc0IDI4IDQwIDMzLjM3MjYgNDAgNDBWNDJIMTBWNDBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K' 
          }}
          style={styles.avatar}
        />
        {contact.isOnline && <View style={styles.onlineIndicator} />}
        {isPinned && <Pin size={12} color={Colors.acc} style={styles.pinnedIcon} />}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={[styles.contactName, unreadCount > 0 && styles.unreadContactName]}>
            {contact.name}
          </Text>
          <View style={styles.timeContainer}>
            {isMuted && <VolumeX size={12} color="#9ca3af" style={styles.mutedIcon} />}
            <Text style={[styles.messageTime, unreadCount > 0 && styles.unreadTime]}>
              {formatMessageTime(lastMessage.timestamp)}
            </Text>
          </View>
        </View>

        <View style={styles.messagePreview}>
          <View style={styles.lastMessageContainer}>
            <MessageStatus status={lastMessage.status} isUser={isUser} />
            <Text 
              style={[
                styles.lastMessage, 
                unreadCount > 0 && styles.unreadMessage,
                isTyping && styles.typingMessage
              ]}
              numberOfLines={1}
            >
              {isTyping ? 'typing...' : getMessagePreview(lastMessage)}
            </Text>
          </View>
          
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Main Message List Component
const MessageListUI: React.FC = () => {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [searchText, setSearchText] = useState('');
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>(conversations);
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Filter conversations based on search
  useEffect(() => {
    if (searchText.trim()) {
      const filtered = conversations.filter(conv =>
        conv.contact.name.toLowerCase().includes(searchText.toLowerCase()) ||
        conv.lastMessage.text.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchText, conversations]);

  // Sort conversations (pinned first, then by timestamp)
  const sortedConversations = [...filteredConversations].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime();
  });

  const handleConversationPress = (conversationId: string) => {
    if (isSelectionMode) {
      toggleSelection(conversationId);
    } else {
      // Navigate to message UI
      router.push(`/chat/MsgChat/Index`);
    }
  };

  const handleConversationLongPress = (conversationId: string) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
      setSelectedConversations([conversationId]);
    }
  };

  const toggleSelection = (conversationId: string) => {
    setSelectedConversations(prev => {
      const newSelection = prev.includes(conversationId)
        ? prev.filter(id => id !== conversationId)
        : [...prev, conversationId];
      
      if (newSelection.length === 0) {
        setIsSelectionMode(false);
      }
      
      return newSelection;
    });
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedConversations([]);
  };

  const handleArchive = () => {
    Alert.alert(
      'Archive Conversations',
      `Archive ${selectedConversations.length} conversation(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Archive',
          onPress: () => {
            setConversations(prev =>
              prev.map(conv =>
                selectedConversations.includes(conv.id)
                  ? { ...conv, isArchived: true }
                  : conv
              )
            );
            exitSelectionMode();
          }
        }
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Conversations',
      `Delete ${selectedConversations.length} conversation(s)? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setConversations(prev =>
              prev.filter(conv => !selectedConversations.includes(conv.id))
            );
            exitSelectionMode();
          }
        }
      ]
    );
  };

  const handleMute = () => {
    setConversations(prev =>
      prev.map(conv =>
        selectedConversations.includes(conv.id)
          ? { ...conv, isMuted: !conv.isMuted }
          : conv
      )
    );
    exitSelectionMode();
  };

  const handlePin = () => {
    setConversations(prev =>
      prev.map(conv =>
        selectedConversations.includes(conv.id)
          ? { ...conv, isPinned: !conv.isPinned }
          : conv
      )
    );
    exitSelectionMode();
  };

  const handleNewMessage = () => {
    Alert.alert('New Message', 'Start a new conversation');
  };

  const totalUnreadCount = conversations.reduce((count, conv) => count + conv.unreadCount, 0);

  const renderConversation = ({ item }: { item: Conversation }) => (
    <ConversationItem
      conversation={item}
      onPress={() => handleConversationPress(item.id)}
      onLongPress={() => handleConversationLongPress(item.id)}
    />
  );

  return (
    <SafeLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Messages</Text>
            {totalUnreadCount > 0 && (
              <View style={styles.totalUnreadBadge}>
                <Text style={styles.totalUnreadCount}>
                  {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={handleNewMessage}>
              <Edit3 size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Selection Mode Header */}
        {isSelectionMode && (
          <View style={styles.selectionHeader}>
            <TouchableOpacity onPress={exitSelectionMode}>
              <Text style={styles.cancelSelection}>Cancel</Text>
            </TouchableOpacity>
            
            <Text style={styles.selectionCount}>
              {selectedConversations.length} selected
            </Text>

            <View style={styles.selectionActions}>
              <TouchableOpacity style={styles.selectionButton} onPress={handlePin}>
                <Pin size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectionButton} onPress={handleMute}>
                <VolumeX size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectionButton} onPress={handleArchive}>
                <Archive size={18} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectionButton} onPress={handleDelete}>
                <Trash2 size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search messages..."
              placeholderTextColor="#6b7280"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Conversations List */}
        <FlatList
          data={sortedConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.conversationsList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MessageCircle size={48} color="#6b7280" />
              <Text style={styles.emptyStateTitle}>No conversations</Text>
              <Text style={styles.emptyStateText}>
                {searchText ? 'No messages found matching your search' : 'Start a new conversation'}
              </Text>
            </View>
          }
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'rs',
  },
  totalUnreadBadge: {
    backgroundColor: Colors.acc,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  totalUnreadCount: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'rs',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#374151',
    borderBottomWidth: 1,
    borderBottomColor: '#4b5563',
  },
  cancelSelection: {
    color: Colors.acc,
    fontSize: 16,
    fontFamily: 'rr',
  },
  selectionCount: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
  },
  selectionActions: {
    flexDirection: 'row',
    gap: 16,
  },
  selectionButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBar: {
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
    color: 'white',
    fontSize: 16,
    fontFamily: 'rr',
  },
  conversationsList: {
    paddingHorizontal: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },

  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: Colors.bg,
  },
  pinnedIcon: {
    position: 'absolute',
    top: -2,
    left: -2,
    backgroundColor: Colors.bg,
    borderRadius: 8,
    padding: 2,
  },
  conversationContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
    flex: 1,
  },
  unreadContactName: {
    fontFamily: 'rs',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  mutedIcon: {
    opacity: 0.6,
  },
  messageTime: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'rr',
  },
  unreadTime: {
    color: Colors.acc,
    fontFamily: 'rs',
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lastMessage: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'rr',
    flex: 1,
  },
  unreadMessage: {
    color: 'white',
    fontFamily: 'rs',
  },
  typingMessage: {
    color: Colors.acc,
    fontStyle: 'italic',
  },
  unreadBadge: {
    backgroundColor: Colors.acc,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'rs',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'rs',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'rr',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.acc,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default MessageListUI;