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

interface FloatingIconProps {
  delay: number;
  left: number;
  top: number;
  icon: string;
  size: number;
}


const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      router.push('/(tabs)');
    }, 1500);
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
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
            <Text style={styles.welcomeTitle}>Welcome Back!</Text>
            <Text style={styles.welcomeSubtitle}>
              Sign in to continue managing your amazing events
            </Text>
          </View>

          {/* Login Form */}
          <View style={styles.formSection}>
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
                placeholder="Enter your password"
                placeholderTextColor={Colors.icon}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <Animated.View
            style={[
              styles.buttonSection,
              {
                transform: [{ scale: buttonScale }],
              },
            ]}
          >
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[Colors.acc, '#FF8A5B']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <TouchableOpacity style={styles.socialButton}>
              <LinearGradient
                colors={[Colors.card, Colors.card]}
                style={styles.socialButtonGradient}
              >
                <Text style={styles.socialButtonIcon}>G</Text>
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </LinearGradient>
            </TouchableOpacity>

          </Animated.View>

          {/* Sign Up Link */}
          <TouchableOpacity 
            style={styles.signUpContainer}
            onPress={handleSignUp}
          >
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
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
    paddingVertical: 60,
  },
  content: {
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },

  welcomeSection: {

    marginBottom: 40,
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
    textAlign: 'center',
    lineHeight: 22,
  },
  formSection: {
    width: '100%',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: Colors.acc,
    fontSize: 14,
    fontFamily: 'rs',
  },
  buttonSection: {
    width: '100%',
    marginBottom: 30,
  },
  loginButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    marginBottom: 24,
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
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: `${Colors.icon}33`,
  },
  dividerText: {
    color: Colors.icon,
    fontSize: 14,
    fontFamily: 'rs',
    marginHorizontal: 16,
  },
  socialButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    marginBottom: 12,
  },
  socialButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${Colors.acc}33`,
  },
  socialButtonIcon: {
    color: Colors.acc,
    fontSize: 20,
    fontFamily: 'rb',
    marginRight: 12,
  },
  socialButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontFamily: 'rs',
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: Colors.icon,
    fontSize: 16,
    fontFamily: 'rr',
  },
  signUpLink: {
    color: Colors.acc,
    fontFamily: 'rs',
  },
});

export default LoginPage;