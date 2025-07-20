import SafeLayout from '@/Layout/SafeAreaLayout';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

interface OnboardingData {
  id: number;
  backgroundImage: string;
  title: string;
  description: string;
  notificationText: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface OnboardingScreenProps {
  onNext?: () => void;
  onSkip?: () => void;
  navigation: {
    navigate: (screen: string) => void;
  };
}

const { width, height } = Dimensions.get('window');

const onboardingData: OnboardingData[] = [
  {
    id: 1,
    backgroundImage: 'https://i.pinimg.com/736x/9b/c9/e5/9bc9e597fb74e1fc75959f7c17d49d83.jpg',
    title: 'Discover Amazing Events',
    description: '🧍‍♂️ Browse and discover exciting events in your area. Buy tickets, save favorites, and never miss out on the experiences you love.',
    notificationText: 'New Event Discovered',
    icon: 'calendar'
  },
  {
    id: 2,
    backgroundImage: 'https://i.pinimg.com/736x/9b/c9/e5/9bc9e597fb74e1fc75959f7c17d49d83.jpg',
    title: 'Create & Manage Events',
    description: '🎤 Organize memorable events with ease. Sell tickets, track analytics, hire talented professionals, and manage everything from one place.',
    notificationText: 'Event Created Successfully',
    icon: 'create'
  },
  {
    id: 3,
    backgroundImage: 'https://i.pinimg.com/736x/9b/c9/e5/9bc9e597fb74e1fc75959f7c17d49d83.jpg',
    title: 'Showcase Your Talent',
    description: '👩‍🎤 Join as a professional talent - MC, DJ, makeup artist, or any service provider. Get booked for events and grow your business.',
    notificationText: 'Booking Request Received',
    icon: 'star'
  }
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onNext, onSkip }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useRouter();

  const handleNext = (): void => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      navigation.navigate('/(tabs)');
    }
  };

  const handlePrev = (): void => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollViewRef.current?.scrollTo({
        x: prevIndex * width,
        animated: true,
      });
    }
  };

  const handleSkip = (): void => {
    navigation.push('/login/Login');
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onMomentumScrollEnd = (event: any): void => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentIndex(pageNum);
  };

  const renderContentSlide = (item: OnboardingData, index: number): JSX.Element => (
    <View key={item.id} style={styles.contentSlide}>
   

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          {item.description}
        </Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, dotIndex) => {
          const inputRange = [
            (dotIndex - 1) * width,
            dotIndex * width,
            (dotIndex + 1) * width,
          ];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={dotIndex}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {/* Previous Button */}
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.prevButton,
            currentIndex === 0 && styles.disabledButton
          ]}
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Ionicons 
            name="arrow-back" 
            size={20} 
            color={currentIndex === 0 ? "#666" : "#FF6B35"} 
          />
          <Text style={[
            styles.navButtonText,
            styles.prevButtonText,
            currentIndex === 0 && styles.disabledButtonText
          ]}>
            Back
          </Text>
        </TouchableOpacity>

        {/* Next Button */}
        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <Ionicons 
            name={currentIndex === onboardingData.length - 1 ? "checkmark" : "arrow-forward"} 
            size={20} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeLayout>
      <View style={styles.container}>
        {/* Static Background Half */}
        <View style={styles.backgroundHalf}>
          <ImageBackground
            source={{ uri: onboardingData[currentIndex].backgroundImage }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
            {/* Optional: You can add static content here like logo */}
            <View style={styles.backgroundContent}>
      
            </View>
          </ImageBackground>
        </View>

        {/* Scrollable Content Half */}
        <View style={styles.contentHalf}>
          <View style={styles.contentBackground} />
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            onMomentumScrollEnd={onMomentumScrollEnd}
            scrollEventThrottle={16}
            style={styles.scrollView}
          >
            {onboardingData.map((item, index) => renderContentSlide(item, index))}
          </ScrollView>
        </View>
      </View>
    </SafeLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundHalf: {
    flex: 1.5,
    height: height * 0.6,
  },
  contentHalf: {
    flex: 1,
    height: height * 0.4,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  contentBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.card,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  backgroundContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  contentSlide: {
    width: width,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  skipButton: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  skipText: {
fontFamily:"ol",
    fontSize: 16,
    color: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
fontFamily:"mb",
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 16,
    color: '#FFFFFF',
    lineHeight: 34,
  },
  description: {
fontFamily:"ol",
    fontSize: 16,
    textAlign: 'center',
    color: '#CCCCCC',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
    marginHorizontal: 4,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 100,
    justifyContent: 'center',
  },
  prevButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.5)',
  },
  nextButton: {
    backgroundColor: '#FF6B35',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  navButtonText: {
fontFamily:"mb",
    fontSize: 16,
    marginHorizontal: 8,
  },
  prevButtonText: {
    color: '#FFFFFF',
  },
  nextButtonText: {
    color: '#FFFFFF',
fontFamily:"mb",
    fontSize: 16,
    marginRight: 8,
  },
  disabledButtonText: {
    color: '#666',
  },
});

export default OnboardingScreen;