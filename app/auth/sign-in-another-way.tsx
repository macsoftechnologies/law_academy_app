// app/auth/sign-in-another-way.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image, StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';

const C = Colors;

export default function SignInAnotherWayScreen() {
  const [value, setValue] = useState('');

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.white} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Sign In another way</Text>
      </View>

      {/* Illustration — place image at assets/auth/sign-in-another-way.png */}
      <View style={s.illustrationWrap}>
        <Image
          source={require('../../assets/images/signanotherway.png')}
          style={s.illustration}
          resizeMode="contain"
        />
      </View>

      <View style={s.content}>
        <Text style={s.infoTxt}>
          Enter mobile number or email to for{'\n'}signin other way
        </Text>

        <View style={s.fieldGroup}>
          <Text style={s.fieldLabel}>Enter Mobile Number or Mail Id</Text>
          <TextInput
            style={s.input}
            value={value}
            onChangeText={setValue}
            keyboardType="default"
            autoCapitalize="none"
            placeholder="Mobile number or email"
            placeholderTextColor="#AAACB0"
          />
        </View>
      </View>

      <View style={s.bottomBar}>
        <TouchableOpacity
          style={s.otpBtn}
          onPress={() =>
            router.push({
              pathname: '/auth/otp-mobile',
              params: { contact: value, mode: 'login' },
            } as any)
          }
        >
          <Text style={s.otpTxt}>Generate OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  back: { fontSize: 28, color: '#1A1A2E', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },

  illustrationWrap: {
    height: 220,
    backgroundColor: '#C8D0E8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  illustration: { width: '100%', height: '100%' },

  content: { paddingHorizontal: 24, paddingTop: 32, gap: 20 },
  infoTxt: { fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 20 },

  fieldGroup: { gap: 8 },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  input: {
    backgroundColor: '#fff', borderRadius: 10,
    borderWidth: 1, borderColor: '#E0E0E0',
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 14, color: '#1A1A2E',
  },

  bottomBar: { position: 'absolute', bottom: 32, left: 24, right: 24 },
  otpBtn: {
    backgroundColor: C.primary, paddingVertical: 16,
    borderRadius: 12, alignItems: 'center',
  },
  otpTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },
});