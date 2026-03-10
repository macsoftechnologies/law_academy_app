

import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = {
  primary: '#1A3C8B',
  bg: '#F4F6FC',
  card: '#FFFFFF',
  text: '#1A1A2E',
  muted: '#6B7A99',
  crimson: '#6C1E1E',
};

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.backTxt}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Privacy Policy
        </Text>

        <View style={{ width: 40 }} />
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Please read carefully before continuing
      </Text>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.text}>
          By using this Law E-Learning app, you agree to follow all platform
          rules and guidelines. All study materials, videos, and notes are
          provided for educational purposes only.
        </Text>

        <Text style={styles.text}>
          The content does not constitute legal advice. You are responsible
          for your account activity. Any misuse may result in suspension or
          permanent restriction.
        </Text>

        <Text style={styles.text}>
          The company is not liable for any errors, losses, or decisions made
          based on the information provided in this application.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },

  /* Header (Same style as Notifications) */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  backTxt: {
    fontSize: 20,
    color: C.primary,
    fontWeight: '700',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.text,
  },

  /* Red Notice Text (Professional Style) */
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: C.crimson,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },

  /* Content */
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  text: {
    fontSize: 14,
    lineHeight: 22,
    color: C.text,
    marginBottom: 14,
  },
});