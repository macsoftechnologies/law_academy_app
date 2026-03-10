// app/(tabs)/notes/printed-notes/success.tsx
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../../constants/colors';

const C = Colors;

export default function SuccessScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.container}>
        {/* Shopping bags illustration */}
        <View style={s.illustrationWrap}>
          {/* Confetti dots */}
          {['#E65100','#1565C0','#C9A227','#1A3C8B','#00BF3F'].map((col, i) => (
            <View
              key={i}
              style={[
                s.confettiDot,
                {
                  backgroundColor: col,
                  top:  30 + Math.sin(i * 1.3) * 50,
                  left: 30 + i * 40,
                  width: i % 2 === 0 ? 8 : 5,
                  height: i % 2 === 0 ? 8 : 14,
                  borderRadius: i % 2 === 0 ? 4 : 2,
                  transform: [{ rotate: `${i * 30}deg` }],
                },
              ]}
            />
          ))}
          {['#E65100','#C9A227','#1A3C8B'].map((col, i) => (
            <View
              key={`r${i}`}
              style={[
                s.confettiDot,
                {
                  backgroundColor: col,
                  top:  60 + i * 20,
                  right: 20 + i * 30,
                  width: 6, height: 10, borderRadius: 2,
                  transform: [{ rotate: `${i * 45}deg` }],
                },
              ]}
            />
          ))}

          {/* Two shopping bags */}
          <View style={s.bagsRow}>
            <View style={[s.bag, s.bagYellow]}>
              <View style={s.bagHandle} />
              <View style={[s.bagBody, { backgroundColor: '#F5A623' }]}>
                <View style={s.bagStripe} />
              </View>
            </View>
            <View style={[s.bag, s.bagRed, { marginTop: 20 }]}>
              <View style={[s.bagHandle, { borderColor: '#C0392B' }]} />
              <View style={[s.bagBody, { backgroundColor: '#E74C3C' }]}>
                <View style={[s.bagStripe, { backgroundColor: 'rgba(255,255,255,0.15)' }]} />
                <View style={s.bagLogo}>
                  <Text style={s.bagLogoTxt}>f</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text style={s.title}>Success!</Text>
        <Text style={s.subtitle}>
          Your order will be delivered soon.{'\n'}Thank you for choosing our app!
        </Text>

        <TouchableOpacity
          style={s.okBtn}
          onPress={() => router.push('/(tabs)/notes/printed-notes' as any)}
        >
          <Text style={s.okBtnTxt}>Ok Got It!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: C.screenBg },
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 32,
  },

  illustrationWrap: {
    width: 220, height: 220,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative', marginBottom: 32,
  },

  confettiDot: { position: 'absolute' },

  bagsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  bag:     { alignItems: 'center' },
  bagYellow: {},
  bagRed:    {},

  bagHandle: {
    width: 36, height: 18,
    borderTopLeftRadius: 20, borderTopRightRadius: 20,
    borderWidth: 3, borderColor: '#333',
    borderBottomWidth: 0,
    marginBottom: -2,
  },
  bagBody: {
    width: 80, height: 90,
    borderRadius: 8, overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
  },
  bagStripe: {
    position: 'absolute', top: 0, bottom: 0, left: '40%',
    width: 8, backgroundColor: 'rgba(255,255,255,0.2)',
  },
  bagLogo: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  bagLogoTxt: { fontSize: 16, fontWeight: '900', color: C.white },

  title: {
    fontSize: 28, fontWeight: '900', color: C.textDark,
    marginBottom: 12, textAlign: 'center',
  },
  subtitle: {
    fontSize: 14, color: C.textMuted,
    textAlign: 'center', lineHeight: 22, marginBottom: 40,
  },

  okBtn: {
    backgroundColor: C.primary, paddingVertical: 15,
    paddingHorizontal: 60, borderRadius: 12, alignItems: 'center',
    position: 'absolute', bottom: 30, left: 32, right: 32,
  },
  okBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});