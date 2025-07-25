import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Plus,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Tag,
  FileText,
  ChevronDown,
  Camera,
  Ticket,
  Info,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import SafeLayout from '@/Layout/SafeAreaLayout';

// Type definitions
interface EventData {
  name: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  capacity: string;
  price: string;
  category: string;
}

interface CoverImage {
  id: number;
  uri: string | null;
}

interface DropdownOption {
  label: string;
  value: string;
}

// Sample data
const eventTypes: DropdownOption[] = [
  { label: 'Conference', value: 'conference' },
  { label: 'Workshop', value: 'workshop' },
  { label: 'Concert', value: 'concert' },
  { label: 'Seminar', value: 'seminar' },
  { label: 'Networking', value: 'networking' },
  { label: 'Exhibition', value: 'exhibition' },
  { label: 'Festival', value: 'festival' },
  { label: 'Sports', value: 'sports' },
  { label: 'Party', value: 'party' },
  { label: 'Other', value: 'other' },
];

const categories: DropdownOption[] = [
  { label: 'Business', value: 'business' },
  { label: 'Technology', value: 'technology' },
  { label: 'Arts & Culture', value: 'arts-culture' },
  { label: 'Music', value: 'music' },
  { label: 'Sports', value: 'sports' },
  { label: 'Education', value: 'education' },
  { label: 'Health & Wellness', value: 'health-wellness' },
  { label: 'Food & Drink', value: 'food-drink' },
  { label: 'Community', value: 'community' },
];

// Custom Dropdown Component
interface CustomDropdownProps {
  visible: boolean;
  onClose: () => void;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  title: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  visible,
  onClose,
  options,
  onSelect,
  title,
}) => {
  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.dropdownModal}>
          <Text style={styles.dropdownTitle}>{title}</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Main Create Event Component
const CreateEventPage: React.FC = () => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<string>('');
  
  const [eventData, setEventData] = useState<EventData>({
    name: '',
    type: '',
    date: '',
    time: '',
    location: '',
    description: '',
    capacity: '',
    price: '',
    category: '',
  });

  const [coverImages, setCoverImages] = useState<CoverImage[]>([]);

  const handleInputChange = (field: keyof EventData, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleDropdownSelect = (field: keyof EventData, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const addCoverImage = () => {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => openCamera() },
        { text: 'Gallery', onPress: () => openGallery() },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = () => {
    // Implement camera functionality
    Alert.alert('Camera', 'Camera functionality would be implemented here');
  };

  const openGallery = () => {
    // Implement gallery functionality
    Alert.alert('Gallery', 'Gallery functionality would be implemented here');
  };

  const handleCreateTicket = () => {
    // Validate event details
    if (!eventData.name || !eventData.type || !eventData.date || !eventData.description) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert(
      'Create Ticket',
      'Proceed to create tickets for this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Create', onPress: () => createTicket() },
      ]
    );
  };

  const createTicket = () => {
    const eventPayload = {
      eventData,
      coverImages,
    };
    console.log('Creating ticket for event:', eventPayload);
    Alert.alert('Success', 'Event created! You can now add tickets.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const getSelectedLabel = (options: DropdownOption[], value: string): string => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : '';
  };

  return (
    <SafeLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Event</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Cover Photos Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Photos</Text>
            
            {/* Main Cover Photo */}
            <TouchableOpacity style={styles.mainPhotoContainer} onPress={addCoverImage}>
              <Plus size={24} color={Colors.acc} />
              <Text style={styles.addPhotoText}>Add Cover Photos</Text>
            </TouchableOpacity>
          </View>

          {/* Event Details Form */}
          <View style={styles.section}>
            

            {/* Event Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Event Name<Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Type your event name"
                placeholderTextColor="#6b7280"
                value={eventData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>

       

            {/* Date and Time */}
            <View style={styles.rowContainer}>
              <View style={styles.halfWidth}>
                <Text style={styles.inputLabel}>
                  Event Date<Text style={styles.required}>*</Text>
                </Text>
                <TouchableOpacity style={styles.dateTimeInput}>
                  <Text style={[styles.dropdownText, eventData.date && styles.dropdownTextSelected]}>
                    {eventData.date || 'Choose event Date'}
                  </Text>
                  <Calendar size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              <View style={styles.halfWidth}>
                <Text style={styles.inputLabel}>
                  Event Time<Text style={styles.required}>*</Text>
                </Text>
                <TouchableOpacity style={styles.dateTimeInput}>
                  <Text style={[styles.dropdownText, eventData.time && styles.dropdownTextSelected]}>
                    {eventData.time || 'Select time'}
                  </Text>
                  <Clock size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Event Location<Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={[styles.textInput, styles.textInputWithIcon]}
                  placeholder="Enter event location"
                  placeholderTextColor="#6b7280"
                  value={eventData.location}
                  onChangeText={(text) => handleInputChange('location', text)}
                />
                <MapPin size={20} color="#9ca3af" style={styles.inputIcon} />
              </View>
            </View>

            {/* Category */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Event Category</Text>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setActiveDropdown('category')}
              >
                <Text style={[styles.dropdownText, eventData.category && styles.dropdownTextSelected]}>
                  {eventData.category ? getSelectedLabel(categories, eventData.category) : 'Choose category'}
                </Text>
                <ChevronDown size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            {/* Event Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Event Description<Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Type your event description..."
                placeholderTextColor="#6b7280"
                value={eventData.description}
                onChangeText={(text) => handleInputChange('description', text)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Create Ticket Button */}
          <TouchableOpacity style={styles.createTicketButton} onPress={()=> router.push('/createTicket/Index')}>
            <Text style={styles.createTicketButtonText}>CREATE TICKET</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Dropdowns */}
        <CustomDropdown
          visible={activeDropdown === 'type'}
          onClose={() => setActiveDropdown('')}
          options={eventTypes}
          onSelect={(value) => handleDropdownSelect('type', value)}
          title="Select Event Type"
        />

        <CustomDropdown
          visible={activeDropdown === 'category'}
          onClose={() => setActiveDropdown('')}
          options={categories}
          onSelect={(value) => handleDropdownSelect('category', value)}
          title="Select Category"
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'rs',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
    marginBottom: 16,
  },
  mainPhotoContainer: {
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderColor: '#6b7280',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    minHeight: 120,
  },
  addPhotoText: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'rr',
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#d1d5db',
    fontSize: 14,
    fontFamily: 'rr',
    marginBottom: 8,
  },
  required: {
    color: '#ef4444',
  },
  textInput: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 16,
    color: 'white',
    fontSize: 16,
    fontFamily: 'rr',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dropdownButton: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: '#6b7280',
    fontSize: 16,
    fontFamily: 'rr',
  },
  dropdownTextSelected: {
    color: 'white',
  },
  dateTimeInput: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  halfWidth: {
    flex: 1,
  },
  inputWithIcon: {
    position: 'relative',
  },
  textInputWithIcon: {
    paddingRight: 50,
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  createTicketButton: {
    backgroundColor: Colors.acc,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  createTicketButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  dropdownTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'rs',
    marginBottom: 16,
    textAlign: 'center',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4b5563',
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rr',
  },
});

export default CreateEventPage;