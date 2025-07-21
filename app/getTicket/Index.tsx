import { Colors } from '@/constants/Colors';
import SafeLayout from '@/Layout/SafeAreaLayout';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Type definitions
interface TicketType {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  availableQuantity: number;
  isPopular?: boolean;
  color: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  month: string;
  location: string;
  image: string;
  organizer: string;
  category: string;
  description: string;
}

// Sample event data
const eventData: Event = {
  id: 'f1',
  title: 'Global Leadership Conference 2024',
  date: '25',
  month: 'Jul',
  location: 'Convention Center, Hawaii',
  image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=250&fit=crop',
  organizer: 'Leadership Institute',
  category: 'Business',
  description: 'Join industry leaders and innovators for an inspiring day of keynotes, workshops, and networking opportunities.',
};

// Sample ticket types
const ticketTypes: TicketType[] = [
  {
    id: 't1',
    name: 'Early Bird',
    price: 85,
    originalPrice: 125,
    description: 'Limited time offer with full access',
    features: ['Full conference access', 'Welcome kit', 'Lunch included', 'Networking session'],
    availableQuantity: 15,
    color: '#10b981',
  },
  {
    id: 't2',
    name: 'Standard',
    price: 125,
    description: 'Regular admission ticket',
    features: ['Full conference access', 'Welcome kit', 'Lunch included'],
    availableQuantity: 250,
    isPopular: true,
    color: '#6366f1',
  },
  {
    id: 't3',
    name: 'VIP Premium',
    price: 250,
    description: 'Premium experience with exclusive perks',
    features: ['Front row seating', 'VIP lounge access', 'Meet & greet with speakers', 'Premium welcome kit', 'Exclusive dinner'],
    availableQuantity: 50,
    color: '#f59e0b',
  },
];

// Ticket Type Card Component
const TicketTypeCard: React.FC<{ 
  ticket: TicketType; 
  quantity: number; 
  onQuantityChange: (id: string, quantity: number) => void;
}> = ({ ticket, quantity, onQuantityChange }) => {
  const hasDiscount = ticket.originalPrice && ticket.originalPrice > ticket.price;
  const discountPercent = hasDiscount 
    ? Math.round(((ticket.originalPrice! - ticket.price) / ticket.originalPrice!) * 100)
    : 0;

  return (
    <View style={[styles.ticketCard, { borderColor: quantity > 0 ? ticket.color : 'transparent' }]}>
      {ticket.isPopular && (
        <View style={[styles.popularBadge, { backgroundColor: ticket.color }]}>
          <Text style={styles.popularText}>🌟 POPULAR</Text>
        </View>
      )}
      
      <View style={styles.ticketHeader}>
        <View>
          <Text style={styles.ticketName}>{ticket.name}</Text>
          <Text style={styles.ticketDescription}>{ticket.description}</Text>
        </View>
        
        <View style={styles.priceSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>${ticket.price}</Text>
            {hasDiscount && (
              <>
                <Text style={styles.originalPrice}>${ticket.originalPrice}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{discountPercent}% OFF</Text>
                </View>
              </>
            )}
          </View>
        </View>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {ticket.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Quantity Selector */}
      <View style={styles.quantitySection}>
        <View style={styles.availabilityInfo}>
          <Text style={styles.availabilityText}>
            {ticket.availableQuantity} tickets remaining
          </Text>
        </View>
        
        <View style={styles.quantitySelector}>
          <TouchableOpacity 
            style={[styles.quantityButton, { opacity: quantity > 0 ? 1 : 0.5 }]}
            onPress={() => quantity > 0 && onQuantityChange(ticket.id, quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          
          <Text style={styles.quantityText}>{quantity}</Text>
          
          <TouchableOpacity 
            style={[styles.quantityButton, { 
              opacity: quantity < ticket.availableQuantity && quantity < 10 ? 1 : 0.5 
            }]}
            onPress={() => {
              if (quantity < ticket.availableQuantity && quantity < 10) {
                onQuantityChange(ticket.id, quantity + 1);
              }
            }}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Promo Code Component
const PromoCodeSection: React.FC<{
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
  onApplyPromo: () => void;
  promoApplied: boolean;
}> = ({ promoCode, onPromoCodeChange, onApplyPromo, promoApplied }) => {
  return (
    <View style={styles.promoSection}>
      <Text style={styles.promoTitle}>Have a promo code?</Text>
      <View style={styles.promoInputContainer}>
        <TextInput
          style={[styles.promoInput, promoApplied && styles.promoInputSuccess]}
          value={promoCode}
          onChangeText={onPromoCodeChange}
          placeholder="Enter promo code"
          placeholderTextColor="#666"
          editable={!promoApplied}
        />
        <TouchableOpacity 
          style={[styles.promoButton, promoApplied && styles.promoButtonSuccess]} 
          onPress={onApplyPromo}
          disabled={promoApplied}
        >
          <Text style={styles.promoButtonText}>
            {promoApplied ? '✓ Applied' : 'Apply'}
          </Text>
        </TouchableOpacity>
      </View>
      {promoApplied && (
        <Text style={styles.promoSuccessText}>🎉 Promo code applied! You saved $10</Text>
      )}
    </View>
  );
};

// Order Summary Component
const OrderSummary: React.FC<{
  selectedTickets: { [key: string]: number };
  ticketTypes: TicketType[];
  promoDiscount: number;
}> = ({ selectedTickets, ticketTypes, promoDiscount }) => {
  const subtotal = Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
    const ticket = ticketTypes.find(t => t.id === ticketId);
    return total + (ticket ? ticket.price * quantity : 0);
  }, 0);

  const serviceFee = Math.round(subtotal * 0.05 * 100) / 100; // 5% service fee
  const total = subtotal + serviceFee - promoDiscount;

  if (subtotal === 0) return null;

  return (
    <View style={styles.summarySection}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      
      {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
        if (quantity === 0) return null;
        const ticket = ticketTypes.find(t => t.id === ticketId);
        if (!ticket) return null;
        
        return (
          <View key={ticketId} style={styles.summaryRow}>
            <Text style={styles.summaryItemText}>
              {ticket.name} × {quantity}
            </Text>
            <Text style={styles.summaryItemPrice}>
              ${(ticket.price * quantity).toFixed(2)}
            </Text>
          </View>
        );
      })}
      
      <View style={styles.summaryDivider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryItemText}>Subtotal</Text>
        <Text style={styles.summaryItemPrice}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryItemText}>Service fee</Text>
        <Text style={styles.summaryItemPrice}>${serviceFee.toFixed(2)}</Text>
      </View>
      
      {promoDiscount > 0 && (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryItemTextDiscount}>Promo discount</Text>
          <Text style={styles.summaryItemPriceDiscount}>-${promoDiscount.toFixed(2)}</Text>
        </View>
      )}
      
      <View style={styles.summaryDivider} />
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryTotalText}>Total</Text>
        <Text style={styles.summaryTotalPrice}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

// Main Get Ticket Component
const GetTicketScreen: React.FC = () => {
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: Math.max(0, quantity)
    }));
  };

  const handleApplyPromo = () => {
    // Simple promo code logic - in real app, validate with API
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      setPromoDiscount(10);
      Alert.alert('Success!', 'Promo code applied successfully!');
    } else {
      Alert.alert('Invalid Code', 'Please enter a valid promo code.');
    }
  };

  const handleProceedToCheckout = () => {
    const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);
    
    if (totalTickets === 0) {
      Alert.alert('No Tickets Selected', 'Please select at least one ticket to proceed.');
      return;
    }

    // This will be connected to navigation later
    console.log('Proceeding to checkout with:', {
      eventId: eventData.id,
      selectedTickets,
      promoDiscount,
    });
    
    Alert.alert('Checkout', `Proceeding with ${totalTickets} ticket${totalTickets > 1 ? 's' : ''}!`);
  };

  const handleGoBack = () => {
    // This will be connected to navigation later
    console.log('Going back');
    Alert.alert('Back', 'Back button pressed');
  };

  const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);

  return (
    <SafeLayout>


    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Get Tickets</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Event Info Header */}
        <View style={styles.eventHeader}>
          <Image source={{ uri: eventData.image }} style={styles.eventImage} />
          <View style={styles.eventInfo}>
            <View style={styles.eventDateContainer}>
              <Text style={styles.eventDateNumber}>{eventData.date}</Text>
              <Text style={styles.eventDateMonth}>{eventData.month}</Text>
            </View>
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{eventData.title}</Text>
              <Text style={styles.eventLocation}>📍 {eventData.location}</Text>
              <Text style={styles.eventOrganizer}>By {eventData.organizer}</Text>
            </View>
          </View>
        </View>

        {/* Ticket Types Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Tickets</Text>
          {ticketTypes.map((ticket) => (
            <TicketTypeCard
              key={ticket.id}
              ticket={ticket}
              quantity={selectedTickets[ticket.id] || 0}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </View>

        {/* Promo Code Section */}
        {totalTickets > 0 && (
          <View style={styles.section}>
            <PromoCodeSection
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
              onApplyPromo={handleApplyPromo}
              promoApplied={promoApplied}
            />
          </View>
        )}

        {/* Order Summary */}
        <OrderSummary
          selectedTickets={selectedTickets}
          ticketTypes={ticketTypes}
          promoDiscount={promoDiscount}
        />

        {/* Spacing for fixed button */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Fixed Checkout Button */}
      {totalTickets > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.checkoutInfo}>
            <Text style={styles.checkoutTicketCount}>
              {totalTickets} ticket{totalTickets > 1 ? 's' : ''} selected
            </Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleProceedToCheckout}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1625', // Default dark background
  },
  scrollView: {
    flex: 1,
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#2a2438',
  },
  backButton: {
    padding: 4,
  },
  backButtonText: {
    color: '#6366f1', // Default accent color
    fontSize: 16,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  headerRight: {
    width: 60, // Balance the header
  },

  // Event Header Styles
  eventHeader: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#2a2438',
    marginBottom: 20,
  },
  eventImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#333',
  },
  eventInfo: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
  },
  eventDateContainer: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  eventDateNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 24,
  },
  eventDateMonth: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    lineHeight: 22,
  },
  eventLocation: {
    fontSize: 14,
    color: '#a0a0a0',
    fontWeight: '400',
    marginBottom: 2,
  },
  eventOrganizer: {
    fontSize: 12,
    color: '#666',
    fontWeight: '300',
  },

  // Section Styles
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },

  // Ticket Card Styles
  ticketCard: {
    backgroundColor: '#2a2438',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  popularText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  ticketName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  ticketDescription: {
    fontSize: 14,
    color: '#a0a0a0',
    fontWeight: '400',
    lineHeight: 20,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  originalPrice: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  discountBadge: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  discountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },

  // Features Styles
  featuresContainer: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    color: '#10b981',
    fontSize: 16,
    marginRight: 12,
    fontWeight: '600',
  },
  featureText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },

  // Quantity Styles
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityInfo: {},
  availabilityText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '300',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1625',
    borderRadius: 12,
    padding: 4,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  quantityText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
    minWidth: 20,
    textAlign: 'center',
  },

  // Promo Code Styles
  promoSection: {
    backgroundColor: '#2a2438',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  promoInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#1a1625',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '400',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  promoInputSuccess: {
    borderWidth: 2,
    borderColor: '#10b981',
  },
  promoButton: {
    backgroundColor: '#6366f1', // Default accent color
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  promoButtonSuccess: {
    backgroundColor: '#10b981',
  },
  promoButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  promoSuccessText: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 8,
  },

  // Summary Styles
  summarySection: {
    backgroundColor: '#2a2438',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryItemText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
  },
  summaryItemTextDiscount: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '400',
  },
  summaryItemPrice: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '400',
  },
  summaryItemPriceDiscount: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '400',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  summaryTotalText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  summaryTotalPrice: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Checkout Styles
  checkoutContainer: {
    backgroundColor: '#2a2438',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  checkoutTicketCount: {
    color: '#a0a0a0',
    fontSize: 14,
    fontWeight: '400',
  },
  checkoutButton: {
    backgroundColor: '#6366f1', // Default accent color
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100, // Space for fixed checkout button
  },
});

export default GetTicketScreen;