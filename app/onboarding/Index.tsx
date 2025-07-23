import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User, 
  ArrowRight, 
  Star, 
  Calendar, 
  Users, 
  Sparkles 
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import SafeLayout from '@/Layout/SafeAreaLayout';
import { useRouter } from 'expo-router';



// Feature highlight component
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureHighlight: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      {icon}
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const LandingPage: React.FC = () => {

  const router = useRouter();

  const handleGetStarted = () => {
    console.log('Get Started pressed');
    // Navigation logic would go here
  };

  return (
    <SafeLayout>


    <View style={styles.container}>

      
      {/* Background with gradient overlay */}
      <ImageBackground
        source={{
          uri:'https://i.pinimg.com/736x/ab/ce/a6/abcea61a5afed3ec9b37e193c0063edb.jpg'
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(15, 23, 42, 0.9)', 'rgba(15, 23, 42, 0.7)', 'rgba(15, 23, 42, 0.95)']}
          style={styles.gradientOverlay}
        >
          <View style={styles.content}>
            
            {/* Hero Section */}
            <View style={styles.heroSection}>
          
              {/* Main headline */}
              <View style={styles.headlineContainer}>
                <Text style={styles.headline}>
                  Connect with{'\n'}
                  <Text style={styles.headlineAccent}>Amazing Events</Text>
                </Text>
                <Text style={styles.subheadline}>
                  Join thousands of users discovering and attending incredible events in their city
                </Text>
              </View>

              {/* Feature highlights */}
              <View style={styles.featuresContainer}>
                <FeatureHighlight
                  icon={<Calendar size={20} color={Colors.acc} />}
                  title="Discover Events"
                  description="Find events that match your interests"
                />
                <FeatureHighlight
                  icon={<Users size={20} color={Colors.acc} />}
                  title="Connect & Share"
                  description="Meet like-minded people at events"
                />
                <FeatureHighlight
                  icon={<Star size={20} color={Colors.acc} />}
                  title="Premium Experience"
                  description="Enjoy exclusive member benefits"
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={{ ...styles.secondaryButton, backgroundColor: Colors.acc }} 
                onPress={() => router.push('/(tabs)')}
                activeOpacity={0.8}
              >
          
                  <Text style={styles.primaryButtonText}>Get Started</Text>
                  <ArrowRight size={20} color="white" />
         
              </TouchableOpacity>


        
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 60,
  },



  headlineContainer: {
    marginBottom: 40,
    // alignItems: 'center',
  },
  headline: {
    color: 'white',
    fontSize: 36,
   fontFamily: 'rb',
    // textAlign: 'center',
    lineHeight: 44,
    marginBottom: 16,
  },
  headlineAccent: {
    color: Colors.acc,
  },
  subheadline: {
    color: '#d1d5db',
    fontSize: 16,
   fontFamily: 'rr',
    // textAlign: 'center',
    lineHeight: 24,
    // paddingHorizontal: 20,
  },
  featuresContainer: {
    marginTop: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${Colors.card}60`,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: `${Colors.acc}50`,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    // backgroundColor: `${Colors.acc}`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    color: 'white',
    fontSize: 16,
   fontFamily: 'rb',
    marginBottom: 2,
  },
  featureDescription: {
    color: '#9ca3af',
    fontSize: 12,
   fontFamily: 'rr',
  },
  actionSection: {
    paddingBottom: 40,
  },
  primaryButton: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,

  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
       fontFamily: 'rb',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: `${Colors.acc}60`,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: Colors.acc,
    fontSize: 16,
   fontFamily: 'rb',
  },
  termsText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: Colors.acc,
    textDecorationLine: 'underline',
  },
});

export default LandingPage;