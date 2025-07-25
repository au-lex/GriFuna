import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Plus,
  Trash2,
  Edit3,
  Ticket,
  DollarSign,
  Users,
  Star,
  Crown,
  Coffee,
  Car,
  Gift,
  X,
  ChevronLeft,
  Save,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import SafeLayout from '@/Layout/SafeAreaLayout';

// Type definitions
interface TicketFeature {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface TicketType {
  id: string;
  name: string;
  price: string;
  quantity: string;
  description: string;
  features: string[];
  isUnlimited: boolean;
  color: string;
}

// Predefined ticket features
const availableFeatures: TicketFeature[] = [
  { id: '1', name: 'VIP Access', icon: 'crown', description: 'Exclusive VIP area access' },
  { id: '2', name: 'Premium Seating', icon: 'star', description: 'Best seats in the venue' },
  { id: '3', name: 'Meet & Greet', icon: 'users', description: 'Meet with organizers/speakers' },
  { id: '4', name: 'Free Refreshments', icon: 'coffee', description: 'Complimentary food and drinks' },
  { id: '5', name: 'Free Parking', icon: 'car', description: 'Reserved parking space' },
  { id: '6', name: 'Welcome Gift', icon: 'gift', description: 'Special welcome package' },
  { id: '7', name: 'Early Access', icon: 'clock', description: 'Enter venue before general admission' },
  { id: '8', name: 'Photo Opportunity', icon: 'camera', description: 'Professional photo session' },
];

// Ticket color options
const ticketColors = [
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#6366F1', // Indigo
  '#84CC16', // Lime
];

// Feature Modal Component
interface FeatureModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFeatures: string[];
  onFeaturesChange: (features: string[]) => void;
}

const FeatureModal: React.FC<FeatureModalProps> = ({
  visible,
  onClose,
  selectedFeatures,
  onFeaturesChange,
}) => {
  const [tempSelected, setTempSelected] = useState<string[]>(selectedFeatures);

  const toggleFeature = (featureId: string) => {
    setTempSelected(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSave = () => {
    onFeaturesChange(tempSelected);
    onClose();
  };

  const renderFeatureIcon = (iconName: string) => {
    const iconProps = { size: 20, color: Colors.acc };
    switch (iconName) {
      case 'crown': return <Crown {...iconProps} />;
      case 'star': return <Star {...iconProps} />;
      case 'users': return <Users {...iconProps} />;
      case 'coffee': return <Coffee {...iconProps} />;
      case 'car': return <Car {...iconProps} />;
      case 'gift': return <Gift {...iconProps} />;
      default: return <Star {...iconProps} />;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.featureModal}>
          <View style={styles.featureModalHeader}>
            <Text style={styles.featureModalTitle}>Select Features</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={availableFeatures}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.featureItem,
                  tempSelected.includes(item.id) && styles.featureItemSelected
                ]}
                onPress={() => toggleFeature(item.id)}
              >
                <View style={styles.featureItemLeft}>
                  {renderFeatureIcon(item.icon)}
                  <View style={styles.featureItemText}>
                    <Text style={styles.featureItemName}>{item.name}</Text>
                    <Text style={styles.featureItemDescription}>{item.description}</Text>
                  </View>
                </View>
                <View style={[
                  styles.featureCheckbox,
                  tempSelected.includes(item.id) && styles.featureCheckboxSelected
                ]}>
                  {tempSelected.includes(item.id) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
          
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Features</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Main Ticket Management Page Component
const TicketManagementPage: React.FC = () => {
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTicket, setEditingTicket] = useState<TicketType | undefined>();
  
  const [formData, setFormData] = useState<TicketType>({
    id: Date.now().toString(),
    name: '',
    price: '',
    quantity: '',
    description: '',
    features: [],
    isUnlimited: false,
    color: ticketColors[0],
  });

  const [featureModalVisible, setFeatureModalVisible] = useState(false);

  const handleAddTicket = () => {
    setFormData({
      id: Date.now().toString(),
      name: '',
      price: '',
      quantity: '',
      description: '',
      features: [],
      isUnlimited: false,
      color: ticketColors[0],
    });
    setEditingTicket(undefined);
    setIsCreating(true);
  };

  const handleEditTicket = (ticket: TicketType) => {
    setFormData(ticket);
    setEditingTicket(ticket);
    setIsCreating(true);
  };

  const handleDeleteTicket = (ticketId: string) => {
    Alert.alert(
      'Delete Ticket',
      'Are you sure you want to delete this ticket type?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
          }
        },
      ]
    );
  };

  const handleSaveTicket = () => {
    if (!formData.name || !formData.price || (!formData.isUnlimited && !formData.quantity)) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    if (editingTicket) {
      setTickets(prev => prev.map(t => t.id === formData.id ? formData : t));
    } else {
      setTickets(prev => [...prev, formData]);
    }
    
    setIsCreating(false);
    setEditingTicket(undefined);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    setEditingTicket(undefined);
  };

  const handlePublishTickets = () => {
    if (tickets.length === 0) {
      Alert.alert('No Tickets', 'Please create at least one ticket type before publishing');
      return;
    }

    Alert.alert(
      'Publish Tickets',
      'Are you sure you want to publish these tickets? This will make them available for purchase.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Publish', 
          onPress: () => {
            Alert.alert('Success', 'Tickets published successfully!', [
              { text: 'OK', onPress: () => router.back() }
            ]);
          }
        },
      ]
    );
  };

  const getFeatureNames = (featureIds: string[]) => {
    return availableFeatures
      .filter(feature => featureIds.includes(feature.id))
      .map(feature => feature.name);
  };

  const getSelectedFeatureNames = () => {
    return availableFeatures
      .filter(feature => formData.features.includes(feature.id))
      .map(feature => feature.name);
  };

  if (isCreating) {
    return (
      <SafeLayout>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancelCreate} style={styles.backButton}>
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {editingTicket ? 'Edit Ticket' : 'Create Ticket'}
            </Text>
            <TouchableOpacity onPress={handleSaveTicket} style={styles.saveHeaderButton}>
              <Save size={20} color={Colors.acc} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Ticket Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Ticket Name<Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., General Admission, VIP, Early Bird"
                placeholderTextColor="#6b7280"
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              />
            </View>

            {/* Price */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Price<Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={[styles.textInput, styles.textInputWithIcon]}
                  placeholder="0.00"
                  placeholderTextColor="#6b7280"
                  value={formData.price}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
                  keyboardType="numeric"
                />
                <DollarSign size={20} color="#9ca3af" style={styles.inputIcon} />
              </View>
            </View>

            {/* Quantity */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Quantity{!formData.isUnlimited && <Text style={styles.required}>*</Text>}
              </Text>
              <View style={styles.quantityContainer}>
                <View style={styles.unlimitedToggle}>
                  <Text style={styles.unlimitedText}>Unlimited tickets</Text>
                  <Switch
                    value={formData.isUnlimited}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, isUnlimited: value }))}
                    trackColor={{ false: '#374151', true: Colors.acc }}
                    thumbColor="white"
                  />
                </View>
                {!formData.isUnlimited && (
                  <View style={styles.inputWithIcon}>
                    <TextInput
                      style={[styles.textInput, styles.textInputWithIcon]}
                      placeholder="Number of tickets available"
                      placeholderTextColor="#6b7280"
                      value={formData.quantity}
                      onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
                      keyboardType="numeric"
                    />
                    <Ticket size={20} color="#9ca3af" style={styles.inputIcon} />
                  </View>
                )}
              </View>
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Describe what's included with this ticket..."
                placeholderTextColor="#6b7280"
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            {/* Color Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Ticket Color</Text>
              <View style={styles.colorPicker}>
                {ticketColors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      formData.color === color && styles.colorOptionSelected
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, color }))}
                  />
                ))}
              </View>
            </View>

            {/* Features */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Features & Benefits</Text>
              <TouchableOpacity
                style={styles.featuresButton}
                onPress={() => setFeatureModalVisible(true)}
              >
                <Text style={styles.featuresButtonText}>
                  {formData.features.length > 0 
                    ? `${formData.features.length} features selected`
                    : 'Add features'
                  }
                </Text>
                <Plus size={20} color="#9ca3af" />
              </TouchableOpacity>
              
              {formData.features.length > 0 && (
                <View style={styles.selectedFeatures}>
                  {getSelectedFeatureNames().map((featureName, index) => (
                    <View key={index} style={styles.featureTag}>
                      <Text style={styles.featureTagText}>{featureName}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveTicketButton} onPress={handleSaveTicket}>
              <Text style={styles.saveTicketButtonText}>
                {editingTicket ? 'Update Ticket' : 'Create Ticket'}
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <FeatureModal
            visible={featureModalVisible}
            onClose={() => setFeatureModalVisible(false)}
            selectedFeatures={formData.features}
            onFeaturesChange={(features) => setFormData(prev => ({ ...prev, features }))}
          />
        </View>
      </SafeLayout>
    );
  }

  return (
    <SafeLayout>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ticket Management</Text>
          <TouchableOpacity style={styles.addHeaderButton} onPress={handleAddTicket}>
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ticket Types</Text>
            <Text style={styles.sectionSubtitle}>
              Create different ticket types with custom pricing and features
            </Text>
          </View>

          {tickets.length === 0 ? (
            <View style={styles.emptyState}>
              <Ticket size={48} color="#6b7280" />
              <Text style={styles.emptyStateTitle}>No ticket types created</Text>
              <Text style={styles.emptyStateText}>
                Create different ticket types with custom pricing and features
              </Text>
              <TouchableOpacity style={styles.emptyStateButton} onPress={handleAddTicket}>
                <Text style={styles.emptyStateButtonText}>Create First Ticket</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <FlatList
                data={tickets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={[styles.ticketCard, { borderLeftColor: item.color }]}>
                    <View style={styles.ticketCardHeader}>
                      <View>
                        <Text style={styles.ticketName}>{item.name}</Text>
                        <Text style={styles.ticketPrice}>${item.price}</Text>
                      </View>
                      <View style={styles.ticketActions}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleEditTicket(item)}
                        >
                          <Edit3 size={18} color="#9ca3af" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => handleDeleteTicket(item.id)}
                        >
                          <Trash2 size={18} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.ticketDetails}>
                      <Text style={styles.ticketQuantity}>
                        {item.isUnlimited ? 'Unlimited' : `${item.quantity} tickets`}
                      </Text>
                      {item.description && (
                        <Text style={styles.ticketDescription}>{item.description}</Text>
                      )}
                    </View>

                    {item.features.length > 0 && (
                      <View style={styles.ticketFeatures}>
                        {getFeatureNames(item.features).map((featureName, index) => (
                          <View key={index} style={styles.featureChip}>
                            <Text style={styles.featureChipText}>{featureName}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}
                scrollEnabled={false}
              />

              {/* Publish Button */}
              <TouchableOpacity style={styles.publishButton} onPress={handlePublishTickets}>
                <Text style={styles.publishButtonText}>PUBLISH TICKETS</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
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
  addHeaderButton: {
    backgroundColor: Colors.acc,
    padding: 8,
    borderRadius: 20,
  },
  saveHeaderButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'rs',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#9ca3af',
    fontSize: 16,
    fontFamily: 'rr',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
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
    marginBottom: 24,
  },
  emptyStateButton: {
    backgroundColor: Colors.acc,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
  },
  ticketCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  ticketCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ticketName: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
    marginBottom: 4,
  },
  ticketPrice: {
    color: Colors.acc,
    fontSize: 18,
    fontFamily: 'rs',
  },
  ticketActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  ticketDetails: {
    marginBottom: 12,
  },
  ticketQuantity: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'rr',
    marginBottom: 4,
  },
  ticketDescription: {
    color: '#d1d5db',
    fontSize: 14,
    fontFamily: 'rr',
  },
  ticketFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  featureChip: {
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featureChipText: {
    color: '#9ca3af',
    fontSize: 12,
    fontFamily: 'rr',
  },
  publishButton: {
    backgroundColor: Colors.acc,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  publishButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
    letterSpacing: 0.5,
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
    height: 80,
    textAlignVertical: 'top',
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
  quantityContainer: {
    gap: 12,
  },
  unlimitedToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 16,
  },
  unlimitedText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rr',
  },
  colorPicker: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: 'white',
  },
  featuresButton: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuresButtonText: {
    color: '#9ca3af',
    fontSize: 16,
    fontFamily: 'rr',
  },
  selectedFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  featureTag: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featureTagText: {
    color: Colors.acc,
    fontSize: 12,
    fontFamily: 'rr',
  },
  saveTicketButton: {
    backgroundColor: Colors.acc,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  saveTicketButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureModal: {
    backgroundColor: Colors.bg,
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
  },
  featureModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  featureModalTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'rs',
  },
  featureItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  featureItemSelected: {
    backgroundColor: '#1f2937',
  },
  featureItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  featureItemText: {
    flex: 1,
  },
  featureItemName: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
    marginBottom: 2,
  },
  featureItemDescription: {
    color: '#9ca3af',
    fontSize: 14,
    fontFamily: 'rr',
  },
  featureCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6b7280',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCheckboxSelected: {
    backgroundColor: Colors.acc,
    borderColor: Colors.acc,
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
  },
  saveButton: {
    backgroundColor: Colors.acc,
    margin: 20,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'rs',
  },
});

export default TicketManagementPage;