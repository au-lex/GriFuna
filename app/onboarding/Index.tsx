import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');



interface FloatingIconProps {
  delay: number;
  left: number;
  top: number;
  icon: string;
  size: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ delay, left, top, icon, size }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial scale animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      delay,
      useNativeDriver: true,
    }).start();

    // Floating animation
    const startFloating = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
          Animated.timing(floatAnim, {
            toValue: 0,
            duration: 2000 + Math.random() * 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    setTimeout(startFloating, delay);
  }, [delay, floatAnim, scaleAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  return (
    <Animated.View
      style={[
        styles.floatingIcon,
        {
          left,
          top,
          width: size,
          height: size,
          transform: [
            { translateY },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={[Colors.acc, '#FF8A5B']}
        style={styles.iconGradient}
      >
        <Text style={[styles.iconText, { fontSize: size * 0.4 }]}>{icon}</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const EventHubLanding: React.FC = () => {
  const router = useRouter();
  const centralPlatformAnim = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Central platform animation
    Animated.timing(centralPlatformAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Title fade in
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Button scale animation
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 800,
      delay: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const centralPlatformScale = centralPlatformAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View style={styles.container}>

      
      {/* Background with gradient */}
      <LinearGradient
        colors={[Colors.bg, Colors.card, Colors.bg]}
        style={styles.background}
      />

      {/* Floating particles/stars effect */}
      <View style={styles.particlesContainer}>
        {[...Array(60)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.particle,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                animationDelay: `${Math.random() * 3}s`,
              },
            ]}
          />
        ))}
      </View>

      {/* Header */}
      <View style={styles.header}>

      </View>

      {/* Floating event icons */}
      <FloatingIcon delay={200} left={80} top={100} icon="🎉" size={60} />
      <FloatingIcon delay={400} left={330} top={180} icon="🎤" size={50} />
      <FloatingIcon delay={600} left={20} top={200} icon="🎪" size={55} />
   
   

      {/* Central platform */}
      <View style={styles.centralContainer}>
        <Animated.View
          style={[
            styles.centralPlatform,
            {
              transform: [{ scale: centralPlatformScale }],
            },
          ]}
        >
  
  <Text style={{fontSize:20,color:'white', fontFamily:'rb'}}>GRIFUNA</Text>
          <View style={styles.platformRings}>
            <View style={[styles.ring, styles.ring1]} />
            <View style={[styles.ring, styles.ring2]} />
            <View style={[styles.ring, styles.ring3]} />
          </View>
        </Animated.View>
      </View>

      {/* Trust indicator */}
      <View style={styles.trustContainer}>

        <Text style={styles.trustText}>TRUSTED BY 1000+ EVENT ORGANIZERS</Text>
      </View>

      {/* Main content */}
      <Animated.View style={[styles.content, { opacity: titleOpacity }]}>
        <Text style={styles.mainTitle}>
          Create Amazing Events{'\n'}
          <Text style={styles.highlightText}>Manage</Text> with Ease.
        </Text>
        <Text style={styles.subtitle}>
          Plan, organize and execute unforgettable events{'\n'}
          with powerful tools and seamless coordination.
        </Text>
      </Animated.View>

      {/* Action buttons */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [{ scale: buttonScale }],
          },
        ]}
      >
        <TouchableOpacity style={styles.getStartedButton} onPress={() => router.push('/(tabs)')}>
          <LinearGradient
            colors={[Colors.acc, '#FF8A5B']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Start Planning</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity  onPress={() => router.push('/auth/login/Index')} style={styles.signInContainer}>
          <Text style={styles.signInText}>
            Already organizing events? <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particlesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: Colors.acc,
    borderRadius: 1,
    opacity: 0.6,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },


  brandName: {
    color: Colors.background,
    fontSize: 24,
   fontFamily: 'rb',
  },
  floatingIcon: {
    // position: 'absolute',
    borderRadius: 50,
    shadowColor: Colors.acc,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: Colors.background,
   fontFamily: 'rb',
  },
  centralContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  centralPlatform: {
    width: 120,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  platformGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    shadowColor: Colors.acc,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  },
  platformRings: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: `${Colors.acc}33`,
    borderRadius: 200,
  },
  ring1: {
    width: 140,
    height: 140,
  },
  ring2: {
    width: 180,
    height: 180,
  },
  ring3: {
    width: 220,
    height: 220,
  },
  trustContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  trustStars: {
    color: Colors.acc,
    fontSize: 16,
    marginBottom: 4,
  },
  trustText: {
    color: Colors.icon,
    fontSize: 12,
   fontFamily: 'rs',
    letterSpacing: 1,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 60,
  },
  mainTitle: {
    color: Colors.background,
    fontSize: 32,
   fontFamily: 'rb',
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 16,
  },
  highlightText: {
    color: Colors.acc,
  },
  subtitle: {
    color: Colors.icon,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'rr',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  getStartedButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    marginBottom: 20,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.background,
    fontSize: 18,
   fontFamily: 'rb',
  },
  signInContainer: {
    alignItems: 'center',
  },
  signInText: {
    color: Colors.icon,
    fontSize: 16,
    fontFamily: 'rr',
  },
  signInLink: {
    color: Colors.background,
   fontFamily: 'rs',
  },
});

export default EventHubLanding;