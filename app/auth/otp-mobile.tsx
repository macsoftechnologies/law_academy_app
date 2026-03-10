// app/auth/otp-mobile.tsx

import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Image, StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';

const C = Colors;
const OTP_LEN = 5;

export default function OtpMobileScreen() {
  const { contact = '1234567890', mode = 'verify' } =
    useLocalSearchParams<{ contact?: string; mode?: string }>();

  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const isLogin  = mode === 'login';
  const title    = isLogin ? 'Check your Mobile Number' : 'Verify your Mobile Number';
  const btnLabel = isLogin ? 'Login' : 'Verify';

  const illustration = isLogin
    ? require('../../assets/images/check.png')
    : require('../../assets/images/verify.png');

  const handleChange = (val: string, idx: number) => {
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < OTP_LEN - 1) inputs.current[idx + 1]?.focus();
  };

  const handleKeyPress = (key: string, idx: number) => {
    if (key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (isLogin) {
      router.replace('/(tabs)/dashboard' as any);
    } else {
      router.replace('/auth/referral' as any);
    }
  };

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.white} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Illustration */}
      <View style={s.illustrationWrap}>
        <Image source={illustration} style={s.illustration} resizeMode="contain" />
      </View>

      <View style={s.content}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.sub}>We sent a OTP to {contact}</Text>
        <Text style={s.sub2}>enter {OTP_LEN} digit code that mentioned in the sms</Text>

        {/* OTP boxes */}
        <View style={s.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={el => { inputs.current[i] = el; }}
              style={[s.otpBox, digit ? s.otpBoxFilled : s.otpBoxEmpty]}
              value={digit}
              onChangeText={val => handleChange(val.slice(-1), i)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        <View style={s.resendRow}>
          <Text style={s.resendPrompt}>Haven't got the SMS yet? </Text>
          <TouchableOpacity>
            <Text style={s.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.bottomBar}>
        <TouchableOpacity style={s.verifyBtn} onPress={handleVerify}>
          <Text style={s.verifyTxt}>{btnLabel}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },

  header: { paddingHorizontal: 16, paddingVertical: 12 },
  back: { fontSize: 28, color: '#1A1A2E', fontWeight: '300', lineHeight: 32 },

  illustrationWrap: {
    height: 220,
    backgroundColor: '#C8D0E8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  illustration: { width: '100%', height: '100%' },

  content: { paddingHorizontal: 24, paddingTop: 28, gap: 6 },

  title: { fontSize: 20, fontWeight: '800', color: '#1A1A2E', textAlign: 'center', marginBottom: 6 },
  sub:   { fontSize: 13, color: '#666', textAlign: 'center' },
  sub2:  { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 16 },

  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 8 },
  otpBox: {
    width: 52, height: 58, borderRadius: 10,
    fontSize: 22, fontWeight: '800', color: '#1A1A2E',
  },
  otpBoxFilled: {
    borderWidth: 2, borderColor: C.primary, backgroundColor: '#fff',
  },
  otpBoxEmpty: {
    borderWidth: 1.5, borderColor: '#D0D0D0', backgroundColor: '#F5F5F5',
  },

  resendRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  resendPrompt: { fontSize: 13, color: '#555' },
  resendLink: { fontSize: 13, fontWeight: '700', color: C.primary },

  bottomBar: { position: 'absolute', bottom: 32, left: 24, right: 24 },
  verifyBtn: {
    backgroundColor: C.primary, paddingVertical: 16,
    borderRadius: 12, alignItems: 'center',
  },
  verifyTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },
});