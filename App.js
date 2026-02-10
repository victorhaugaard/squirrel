import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useEffect, useRef, useState, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// "Warm Hug" color theme
const C = {
  bg: '#FFF8F0',
  bgSub: '#FFF1E3',
  surface: '#FFFFFF',
  surfaceHover: '#FEF0E1',
  text: '#3D2C1E',
  textSub: '#8C7561',
  accent: '#D97D55',
  accentSoft: '#FADBC7',
  accentGlow: 'rgba(217, 125, 85, 0.15)',
  highlight: '#F2A93B',
  calm: '#7BAE7F',
  calmSoft: '#D6ECDA',
  border: '#F0DCC6',
  pill: '#3D2C1E',
  pillText: '#FFF8F0',
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Staggered reveal
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const titleFade = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(24)).current;
  const subFade = useRef(new Animated.Value(0)).current;
  const subSlide = useRef(new Animated.Value(16)).current;
  const ctaFade = useRef(new Animated.Value(0)).current;
  const ctaSlide = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Breathing glow ring
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        'Fraunces-Regular': require('./assets/fonts/Fraunces-Regular.ttf'),
        'Fraunces-SemiBold': require('./assets/fonts/Fraunces-SemiBold.ttf'),
        'Fraunces-Bold': require('./assets/fonts/Fraunces-Bold.ttf'),
        'Fraunces-ExtraBold': require('./assets/fonts/Fraunces-ExtraBold.ttf'),
        'Fraunces-Black': require('./assets/fonts/Fraunces-Black.ttf'),
        'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
        'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
        'DMSans-SemiBold': require('./assets/fonts/DMSans-SemiBold.ttf'),
        'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
      });
      setFontsLoaded(true);
    } catch (e) {
      console.warn('Font load error:', e);
      setFontsLoaded(true); // fallback to system fonts
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  useEffect(() => {
    if (!fontsLoaded) return;

    // Staggered entrance
    Animated.stagger(200, [
      // Logo
      Animated.parallel([
        Animated.timing(logoFade, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Title
      Animated.parallel([
        Animated.timing(titleFade, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Subtitle
      Animated.parallel([
        Animated.timing(subFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(subSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // CTA
      Animated.parallel([
        Animated.timing(ctaFade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(ctaSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Gentle CTA pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.03,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Breathing glow ring
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.7,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="small" color={C.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Subtle decorative shapes */}
      <View style={styles.decoTopRight} />
      <View style={styles.decoBottomLeft} />

      {/* Main content area - centered */}
      <View style={styles.centerContent}>

        {/* Logo icon with breathing glow */}
        <Animated.View style={[styles.logoArea, {
          opacity: logoFade,
          transform: [{ scale: logoScale }],
        }]}>
          <Animated.View style={[styles.logoGlow, { opacity: glowAnim }]} />
          <View style={styles.logoCircle}>
            <Feather name="zap" size={28} color={C.accent} />
          </View>
        </Animated.View>

        {/* Hero title */}
        <Animated.View style={{
          opacity: titleFade,
          transform: [{ translateY: titleSlide }],
        }}>
          <Text style={styles.title}>
            Stop fighting{'\n'}your brain.
          </Text>
        </Animated.View>

        {/* Accent divider */}
        <Animated.View style={[styles.divider, { opacity: subFade }]}>
          <View style={styles.dividerLine} />
          <Feather name="heart" size={14} color={C.border} style={{ marginHorizontal: 12 }} />
          <View style={styles.dividerLine} />
        </Animated.View>

        {/* Subtitle */}
        <Animated.View style={{
          opacity: subFade,
          transform: [{ translateY: subSlide }],
        }}>
          <Text style={styles.subtitle}>
            The daily assistant for{'\n'}neurodivergent minds.
          </Text>
        </Animated.View>
      </View>

      {/* Bottom CTA area */}
      <Animated.View style={[styles.bottomArea, {
        opacity: ctaFade,
        transform: [{ translateY: ctaSlide }],
      }]}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85}>
            <LinearGradient
              colors={[C.accent, '#D4612E']}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.ctaText}>Get started</Text>
              <Feather name="arrow-right" size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.6}>
          <Text style={styles.secondaryText}>I already have an account</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  loadingScreen: {
    flex: 1,
    backgroundColor: C.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Decorative shapes
  decoTopRight: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: C.accentSoft,
    opacity: 0.35,
    top: -90,
    right: -90,
  },
  decoBottomLeft: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: C.calmSoft,
    opacity: 0.3,
    bottom: -70,
    left: -70,
  },

  // Center content
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
  },

  // Logo
  logoArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  logoGlow: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: C.accentGlow,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: C.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: C.border,
    shadowColor: C.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },

  // Title
  title: {
    fontSize: 40,
    color: C.text,
    textAlign: 'center',
    lineHeight: 50,
    letterSpacing: -0.8,
    marginBottom: 20,
    fontFamily: 'Fraunces-Black',
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    width: 32,
    height: 1.5,
    backgroundColor: C.border,
    borderRadius: 1,
  },

  // Subtitle
  subtitle: {
    fontSize: 17,
    color: C.textSub,
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'DMSans-Regular',
  },

  // Bottom area
  bottomArea: {
    paddingHorizontal: 36,
    paddingBottom: Platform.OS === 'ios' ? 50 : 36,
    alignItems: 'center',
  },
  ctaButton: {
    width: width - 72,
    maxWidth: 360,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: C.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  ctaGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.3,
    fontFamily: 'DMSans-SemiBold',
  },
  secondaryButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  secondaryText: {
    fontSize: 13,
    color: C.textSub,
    fontFamily: 'DMSans-Regular',
    opacity: 0.7,
  },
});
