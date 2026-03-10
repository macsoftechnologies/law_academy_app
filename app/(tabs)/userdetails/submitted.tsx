// app/(tabs)/userdetails/submitted.tsx
// Shared success screen after uploading educational info or ID proofs

import { router } from 'expo-router';
import React from 'react';
import {
    StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SubmittedScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EAF0" />

      <View style={s.container}>
        {/* Illustration */}
        <View style={s.illustrationWrap}>
          {/* Security shield illustration using emojis */}
          <View style={s.illustrationBox}>
            <View style={s.shieldRow}>
              <Text style={s.lockEmoji}>🔒</Text>
              <Text style={s.shieldEmoji}>🛡️</Text>
              <Text style={s.lockEmoji}>🔒</Text>
            </View>
            <View style={s.docRow}>
              <Text style={s.gearEmoji}>⚙️</Text>
              <Text style={s.docEmoji}>📄</Text>
              <Text style={s.hammerEmoji}>⚖️</Text>
            </View>
            <View style={s.bottomRow}>
              <Text style={s.lockEmoji}>🔐</Text>
              <Text style={s.hammerEmoji}>🔨</Text>
            </View>
            {/* Orange circle bg */}
            <View style={s.orangeCircle} />
          </View>
        </View>

        {/* Text */}
        <Text style={s.title}>Submitted Successfully</Text>
        <Text style={s.subtitle}>
          We keep your information secure and never{'\n'}share it with third parties
        </Text>

        {/* Button */}
        <TouchableOpacity
          style={s.btn}
          onPress={() => router.replace('/(tabs)/userdetails/profile' as any)}
        >
          <Text style={s.btnTxt}>Ok, Got It !</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8EAF0' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  illustrationWrap: {
    width: 220,
    height: 220,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationBox: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  orangeCircle: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FF6B00',
    opacity: 0.15,
    zIndex: -1,
  },
  shieldRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  docRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: 20,
  },
  lockEmoji:   { fontSize: 28 },
  shieldEmoji: { fontSize: 48 },
  gearEmoji:   { fontSize: 24 },
  docEmoji:    { fontSize: 36 },
  hammerEmoji: { fontSize: 24 },

  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },

  btn: {
    backgroundColor: '#1A2E6E',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  btnTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },
});