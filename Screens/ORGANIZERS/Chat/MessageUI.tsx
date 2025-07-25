import React, { useState, useRef, useEffect } from 'react';
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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Camera,
  Mic,
  Smile,
  Check,
  CheckCheck,
  Info,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import SafeLayout from '@/Layout/SafeAreaLayout';

// Type definitions
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'audio' | 'file';
  attachment?: {
    uri: string;
    name?: string;
    size?: string;
  };
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'typing';
  lastSeen?: Date;
}

// Sample data
const contact: Contact = {
  id: '1',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  status: 'online',
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    sender: 'other',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read',
    type: 'text',
  },
  {
    id: '2',
    text: 'I\'m doing great! Thanks for asking. How about you?',
    sender: 'user',
    timestamp: new Date(Date.now() - 3000000),
    status: 'read',
    type: 'text',
  },
  {
    id: '3',
    text: 'I\'m good too! Are you coming to the event this weekend?',
    sender: 'other',
    timestamp: new Date(Date.now() - 2400000),
    status: 'read',
    type: 'text',
  },
  {
    id: '4',
    text: 'Yes, definitely! I\'m really excited about it. What time does it start?',
    sender: 'user',
    timestamp: new Date(Date.now() - 1800000),
    status: 'read',
    type: 'text',
  },
  {
    id: '5',
    text: 'It starts at 7 PM. Don\'t forget to bring your ticket!',
    sender: 'other',
    timestamp: new Date(Date.now() - 900000),
    status: 'read',
    type: 'text',
  },
];

// Utility functions
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const formatLastSeen = (date: Date): string => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return date.toLocaleDateString();
};

// Typing Indicator Component
const TypingIndicator: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.typingContainer}>
      <View style={styles.typingBubble}>
        <Text style={styles.typingText}>typing{dots}</Text>
      </View>
    </View>
  );
};

// Message Status Icon Component
const MessageStatus: React.FC<{ status: Message['status'] }> = ({ status }) => {
  switch (status) {
    case 'sending':
      return <View style={styles.statusDot} />;
    case 'sent':
      return <Check size={14} color="#9ca3af" />;
    case 'delivered':
      return <CheckCheck size={14} color="#9ca3af" />;
    case 'read':
      return <CheckCheck size={14} color={Colors.acc} />;
    default:
      return null;
  }
};

// Message Bubble Component
interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.otherMessage]}>
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.otherBubble]}>
        <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.otherMessageText]}>
          {message.text}
        </Text>
      </View>
      <View style={[styles.messageInfo, isUser ? styles.userMessageInfo : styles.otherMessageInfo]}>
        <Text style={styles.messageTime}>{formatTime(message.timestamp)}</Text>
        {isUser && <MessageStatus status={message.status} />}
      </View>
    </View>
  );
};

// Attachment Menu Component
interface AttachmentMenuProps {
  visible: boolean;
  onClose: () => void;
  onSelectCamera: () => void;
  onSelectGallery: () => void;
  onSelectDocument: () => void;
}

const AttachmentMenu: React.FC<AttachmentMenuProps> = ({
  visible,
  onClose,
  onSelectCamera,
  onSelectGallery,
  onSelectDocument,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.attachmentMenu}>
      <TouchableOpacity style={styles.attachmentOption} onPress={onSelectDocument}>
        <View style={[styles.attachmentIcon, { backgroundColor: '#8B5CF6' }]}>
          <Paperclip size={20} color="white" />
        </View>
        <Text style={styles.attachmentText}>Document</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.attachmentOption} onPress={onSelectCamera}>
        <View style={[styles.attachmentIcon, { backgroundColor: '#EF4444' }]}>
          <Camera size={20} color="white" />
        </View>
        <Text style={styles.attachmentText}>Camera</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.attachmentOption} onPress={onSelectGallery}>
        <View style={[styles.attachmentIcon, { backgroundColor: '#10B981' }]}>
          <Image 
            source={{ uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0ibTkgMTIgMiAyIDQtNE0yMSAzSDNDMS44OTU0MyAzIDEgMy44OTU0MyAxIDVWMTlDMSAyMC4xMDQ2IDEuODk1NDMgMjEgMyAyMUgyMUMyMi4xMDQ2IDIxIDIzIDIwLjEwNDYgMjMgMTlWNUMyMyAzLjg5NTQzIDIyLjEwNDYgMyAyMSAzWiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==' }}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <Text style={styles.attachmentText}>Gallery</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main Message UI Component
const MessageUI: React.FC = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date(),
        status: 'sending',
        type: 'text',
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');

      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        );
      }, 2000);

      // Simulate other person typing
      setTimeout(() => {
        setIsTyping(true);
      }, 3000);
    }
  };

  const handleCall = () => {
    Alert.alert('Voice Call', `Calling ${contact.name}...`);
  };

  const handleVideoCall = () => {
    Alert.alert('Video Call', `Starting video call with ${contact.name}...`);
  };

  const handleMoreOptions = () => {
    Alert.alert(
      'More Options',
      'Choose an action',
      [
        { text: 'View Contact', onPress: () => {} },
        { text: 'Block User', onPress: () => {} },
        { text: 'Report', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleAttachmentPress = () => {
    setShowAttachmentMenu(!showAttachmentMenu);
  };

  const handleMicPress = () => {
    if (isRecording) {
      setIsRecording(false);
      Alert.alert('Voice Message', 'Voice message recorded and sent!');
    } else {
      setIsRecording(true);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  const getStatusText = () => {
    if (contact.status === 'online') return 'Online';
    if (contact.status === 'typing') return 'Typing...';
    if (contact.lastSeen) return `Last seen ${formatLastSeen(contact.lastSeen)}`;
    return 'Offline';
  };

  return (
    <SafeLayout>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.contactInfo}>
              <View style={styles.avatarContainer}>
                <Image 
                  source={{ uri: contact.avatar }} 
                  style={styles.avatar}
                  defaultSource={{ uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2YjcyODAiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNiIgcj0iNiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTggMzJDOCAyNi40NzcyIDEyLjQ3NzIgMjIgMTggMjJIMjJDMjcuNTIyOCAyMiAzMiAyNi40NzcyIDMyIDMyVjM0SDhWMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K' }}
                />
                {contact.status === 'online' && <View style={styles.onlineIndicator} />}
              </View>
              
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactStatus}>{getStatusText()}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={handleCall}>
              <Phone size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleVideoCall}>
              <Video size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleMoreOptions}>
              <MoreVertical size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
          
          {isTyping && <TypingIndicator />}
        </View>

        {/* Attachment Menu */}
        <AttachmentMenu
          visible={showAttachmentMenu}
          onClose={() => setShowAttachmentMenu(false)}
          onSelectCamera={() => {
            setShowAttachmentMenu(false);
            Alert.alert('Camera', 'Opening camera...');
          }}
          onSelectGallery={() => {
            setShowAttachmentMenu(false);
            Alert.alert('Gallery', 'Opening gallery...');
          }}
          onSelectDocument={() => {
            setShowAttachmentMenu(false);
            Alert.alert('Document', 'Opening document picker...');
          }}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.attachButton} 
            onPress={handleAttachmentPress}
          >
            <Paperclip size={20} color="#9ca3af" />
          </TouchableOpacity>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#6b7280"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Smile size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          {inputText.trim() ? (
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Send size={18} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.micButton, isRecording && styles.micButtonRecording]} 
              onPress={handleMicPress}
            >
              <Mic size={18} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: Colors.bg,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
    marginBottom: 2,
  },
  contactStatus: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'rr',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesList: {
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: Colors.acc,
  },
  otherBubble: {
    backgroundColor: Colors.card,
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'rr',
    lineHeight: 20,
  },
  userMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: 'white',
  },
  messageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  userMessageInfo: {
    justifyContent: 'flex-end',
  },
  otherMessageInfo: {
    justifyContent: 'flex-start',
  },
  messageTime: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'rr',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9ca3af',
  },
  typingContainer: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  typingBubble: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  typingText: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'rr',
    fontStyle: 'italic',
  },
  attachmentMenu: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  attachmentOption: {
    alignItems: 'center',
    gap: 8,
  },
  attachmentIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'rr',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    gap: 8,
  },
  attachButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    fontFamily: 'rr',
    paddingVertical: 4,
  },
  emojiButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    backgroundColor: Colors.acc,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    backgroundColor: '#6b7280',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonRecording: {
    backgroundColor: '#EF4444',
  },
});

export default MessageUI;