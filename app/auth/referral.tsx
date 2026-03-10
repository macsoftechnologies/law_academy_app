
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert, Image, StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import { claimReferral } from '../services/auth/referral';
const C = Colors;

export default function ReferralScreen() {
  const params = useLocalSearchParams();
const userId = params.userId as string | undefined;
  const [code, setCode] = useState('');

  // const handleClaim = () => {
  //   if (!code.trim()) { Alert.alert('Error', 'Please enter a referral code'); return; }
  //   router.replace('/auth/login' as any);
  // };
const handleClaim = async () => {
  if (!code.trim()) {
    Alert.alert('Error', 'Please enter a referral code');
    return;
  }

  if (!userId) {
    Alert.alert('Error', 'User ID missing. Please signup again.');
    return;
  }

  try {
    const response = await claimReferral({
      userId: userId as string,
      referred_by: code.trim(),
    });

    console.log('Referral Success:', response.data);

    router.replace('/auth/login');

  } catch (error: any) {
    console.log('Referral Error:', error.response?.data || error.message);
    Alert.alert('Error', 'Invalid referral code');
  }
};

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.white} />

      <View style={s.topText}>
        <Text style={s.topTitle}>Enter Your referral code</Text>
        <Text style={s.topSub}>To get more coins</Text>
      </View>

      <View style={s.illustrationWrap}>
        <Image
          source={require('../../assets/images/referral.png')}
          style={s.illustration}
          resizeMode="contain"
        />
      </View>

      <View style={s.content}>
        <View style={s.fieldGroup}>
          <Text style={s.fieldLabel}>Enter here</Text>
          <TextInput
            style={s.input}
            placeholder="Paste here..."
            placeholderTextColor="#AAACB0"
            value={code}
            onChangeText={setCode}
          />
        </View>

        <TouchableOpacity style={s.claimBtn} onPress={handleClaim}>
          <Text style={s.claimTxt}>Claim the referral</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.skipBtn}
          onPress={() => router.replace('/auth/login' as any)}
        >
          <Text style={s.skipTxt}>Skip For Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },

  topText: { paddingTop: 32, paddingHorizontal: 24, gap: 4, marginBottom: 16 },
  topTitle: { fontSize: 22, fontWeight: '900', color: C.crimson, textAlign: 'center' },
  topSub:   { fontSize: 16, fontWeight: '700', color: C.primary, textAlign: 'center' },

  illustrationWrap: {
    height: 220,
    backgroundColor: '#C8D0E8',
    borderRadius: 24,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  illustration: { width: '100%', height: '100%' },

  content: { paddingHorizontal: 24, paddingTop: 28, gap: 16 },

  fieldGroup: { gap: 8 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#555' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.5, borderColor: '#D0D8E8', borderStyle: 'dashed',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 14,
    fontSize: 14, color: '#1A1A2E',
  },

  claimBtn: {
    backgroundColor: C.primary, paddingVertical: 16,
    borderRadius: 12, alignItems: 'center',
  },
  claimTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },

  skipBtn: {
    borderWidth: 1.5, borderColor: C.primary,
    paddingVertical: 16, borderRadius: 12, alignItems: 'center',
  },
  skipTxt: { fontSize: 16, fontWeight: '700', color: C.primary },
});