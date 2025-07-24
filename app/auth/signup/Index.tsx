import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

type UserRole = 'attendee' | 'talent' | 'organizer';

interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
}

const roleOptions: RoleOption[] = [
  {
    id: 'attendee',
    title: 'Attendee',
    description: 'Discover and attend amazing events',
    icon: '🎫'
  },
  {
    id: 'talent',
    title: 'Talent',
    description: 'Showcase your skills and perform at events',
    icon: '🎭'
  },
  {
    id: 'organizer',
    title: 'Organizer',
    description: 'Create and manage your own events',
    icon: '🎪'
  }
];

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const containerOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(50)).current;
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const buttonScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate container fade in
    Animated.timing(containerOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animate logo scale
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 800,
      delay: 200,
      useNativeDriver: true,
    }).start();

    // Animate form slide up
    Animated.timing(formTranslateY, {
      toValue: 0,
      duration: 800,
      delay: 400,
      useNativeDriver: true,
    }).start();

    // Animate button scale
    Animated.timing(buttonScale, {
      toValue: 1,
      duration: 600,
      delay: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const navigateToRoleApp = (role: UserRole) => {
    // Navigate based on role
    switch (role) {
      case 'attendee':
        router.replace('/(attendee)/');
        break;
      case 'talent':
        router.replace('/(talent)/'); // You'll need to create this
        break;
      case 'organizer':
        router.replace('/(organizer)/dashboard');
        break;
      default:
        router.replace('/(attendee)/');
    }
  };

  const handleSignUp = () => {
    if (!selectedRole) {
      alert('Please select your role');
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate to appropriate app section
      navigateToRoleApp(selectedRole);
    }, 1500);
  };

  const handleLogin = () => {
    router.push('/auth/login/Index');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  // Quick role selection (bypasses form for testing)
  const handleQuickRoleSelect = (role: UserRole) => {
    navigateToRoleApp(role);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Background with gradient */}
      <LinearGradient
        colors={[Colors.bg, Colors.card, Colors.bg]}
        style={styles.background}
      />

      {/* Floating particles/stars effect */}
      <View style={styles.particlesContainer}>
        {[...Array(40)].map((_, i) => (
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

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: containerOpacity,
              transform: [{ translateY: formTranslateY }],
            },
          ]}
        >
          {/* Welcome Text */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Create Account</Text>
            <Text style={styles.welcomeSubtitle}>
              Join our community and start your event journey
            </Text>
          </View>


          {/* Quick Access Buttons (for testing - you can remove these) */}
          <View style={styles.quickAccessSection}>
            <Text style={[styles.sectionTitle, { fontSize: 16, marginBottom: 12 }]}>
              Quick Access (Testing)
            </Text>
            <View style={styles.quickButtonsContainer}>
              {roleOptions.map((role) => (
                <TouchableOpacity
                  key={`quick-${role.id}`}
                  style={styles.quickButton}
                  onPress={() => handleQuickRoleSelect(role.id)}
                >
                  <Text style={styles.quickButtonText}>
                    {role.icon} {role.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sign Up Form */}
          <View style={styles.formSection}>
            <View style={styles.nameRow}>
              <View style={[styles.inputContainer, styles.halfInput]}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter first name"
                  placeholderTextColor={Colors.icon}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <View style={[styles.inputContainer, styles.halfInput]}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter last name"
                  placeholderTextColor={Colors.icon}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your email"
                placeholderTextColor={Colors.icon}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Create a password"
                placeholderTextColor={Colors.icon}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Confirm your password"
                placeholderTextColor={Colors.icon}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Sign Up Button */}
          <Animated.View
            style={[
              styles.buttonSection,
              {
                transform: [{ scale: buttonScale }],
              },
            ]}
          >
            <TouchableOpacity 
              style={styles.signUpButton}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[Colors.acc, '#FF8A5B']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Login Link */}
          <TouchableOpacity 
            style={styles.loginContainer}
            onPress={handleLogin}
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    opacity: 0.4,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    // alignItems: 'center',
  },
  welcomeSection: {
    paddingTop: 20,
    // alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    color: Colors.background,
    fontSize: 28,
    fontFamily: 'rb',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: Colors.icon,
    fontSize: 16,
    fontFamily: 'rr',
    // textAlign: 'center',
    lineHeight: 22,
  },
  roleSection: {
    width: '100%',
    marginBottom: 32,
  },
  sectionTitle: {
    color: Colors.background,
    fontSize: 18,
    fontFamily: 'rs',
    marginBottom: 16,
    textAlign: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  roleCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  roleCardSelected: {
    transform: [{ scale: 0.98 }],
  },
  roleCardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: `${Colors.acc}33`,
    borderRadius: 16,
  },
  roleIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  roleTitle: {
    color: Colors.background,
    fontSize: 14,
    fontFamily: 'rs',
    marginBottom: 4,
    textAlign: 'center',
  },
  roleTextSelected: {
    color: Colors.background,
  },
  roleDescription: {
    color: Colors.icon,
    fontSize: 11,
    fontFamily: 'rr',
    textAlign: 'center',
    lineHeight: 14,
  },
  roleDescriptionSelected: {
    color: `${Colors.background}CC`,
  },
  quickAccessSection: {
    width: '100%',
    marginBottom: 24,
    padding: 16,
    backgroundColor: `${Colors.card}50`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${Colors.acc}20`,
  },
  quickButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  quickButton: {
    flex: 1,
    backgroundColor: Colors.card,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${Colors.acc}40`,
  },
  quickButtonText: {
    color: Colors.background,
    fontSize: 12,
    fontFamily: 'rs',
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
    marginBottom: 24,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  inputLabel: {
    color: Colors.background,
    fontSize: 16,
    fontFamily: 'rs',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.background,
    fontFamily: 'rr',
    borderWidth: 1,
    borderColor: `${Colors.acc}33`,
  },
  buttonSection: {
    width: '100%',
    marginBottom: 20,
  },
  signUpButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    marginBottom: 4,
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
  loginContainer: {
    // alignItems: 'center',
    // marginTop: 8,
  },
  loginText: {
    color: Colors.icon,
    fontSize: 16,
    fontFamily: 'rr',
  },
  loginLink: {
    color: Colors.acc,
    fontFamily: 'rs',
  },
});

export default SignUpPage;