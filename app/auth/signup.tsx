import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image, KeyboardAvoidingView, Platform, ScrollView,
  StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import { registerUser } from '../services/auth/signup';

const C = Colors;

export default function SignupScreen() {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [phone,    setPhone]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // const handleSignup = () => {
  //   if (!accepted) return;
  //   router.replace('/auth/referral' as any);
  // };
  const handleSignup = async () => {
  if (!accepted) return;

  if (!name || !email || !phone || !password || !confirm) {
    alert('Please fill all fields');
    return;
  }

  if (password !== confirm) {
    alert('Passwords do not match');
    return;
  }

  try {
    const response = await registerUser({
      name,
      email,
      mobile_number: phone,
      password,
    });

    console.log('Success:', response.data);

    const userId = response.data?.data?.userId;
if (!userId) {
  alert('User ID not received from server');
  return;
}
router.replace({
  pathname: '/auth/referral',
  params: { userId },
});

  } catch (error: any) {
    console.log('Error:', error.response?.data || error.message);
    alert('Registration failed');
  }
};

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.white} />

      <View style={s.illustrationWrap}>
        <Image
          source={require('../../assets/images/signup.png')}
          style={s.illustration}
          resizeMode="contain"
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <Text style={s.title}>Create New Account</Text>

          <View style={s.fieldGroup}>
            <Text style={s.fieldLabel}>Name</Text>
            <TextInput style={s.input} value={name} onChangeText={setName}
              placeholder="Full name" placeholderTextColor="#AAACB0" />
          </View>

          <View style={s.fieldGroup}>
            <Text style={s.fieldLabel}>Email</Text>
            <TextInput style={s.input} value={email} onChangeText={setEmail}
              keyboardType="email-address" autoCapitalize="none"
              placeholder="Email address" placeholderTextColor="#AAACB0" />
          </View>

          <View style={s.fieldGroup}>
            <Text style={s.fieldLabel}>Phone Number</Text>
            <TextInput style={s.input} value={phone} onChangeText={setPhone}
              keyboardType="phone-pad" placeholder="Phone number" placeholderTextColor="#AAACB0" />
          </View>

          <View style={s.fieldGroup}>
            <Text style={s.fieldLabel}>Create Password</Text>
            <View style={s.passwordRow}>
              <TextInput
                style={s.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                placeholder="Create password"
                placeholderTextColor="#AAACB0"
              />
              <TouchableOpacity
                onPress={() => setShowPass(v => !v)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showPass ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={s.fieldGroup}>
            <Text style={s.fieldLabel}>Confirm Password</Text>
            <View style={s.passwordRow}>
              <TextInput
                style={s.passwordInput}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConf}
                placeholder="Confirm password"
                placeholderTextColor="#AAACB0"
              />
              <TouchableOpacity
                onPress={() => setShowConf(v => !v)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showConf ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={s.checkRow}
            onPress={() => setAccepted(v => !v)}
            activeOpacity={0.8}
          >
            <View style={[s.checkbox, accepted && s.checkboxChecked]}>
              {accepted && (
                <Ionicons name="checkmark" size={13} color="#fff" />
              )}
            </View>
            <Text style={s.checkTxt}>
              Entered carefully and fill according to aadhar card{'\n'}
              These details once registered cannot be edited in profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.signupBtn, !accepted && s.signupBtnDisabled]}
            onPress={handleSignup}
            disabled={!accepted}
          >
            <Text style={s.signupTxt}>Sign up</Text>
          </TouchableOpacity>

          <View style={s.signinRow}>
            <Text style={s.signinPrompt}>Already Registered? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={s.signinLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },

  illustrationWrap: {
    height: 220,
    backgroundColor: '#C8D0E8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  illustration: { width: '100%', height: '100%' },

  scroll: { paddingHorizontal: 24, paddingTop: 24, gap: 12 },

  title: { fontSize: 22, fontWeight: '900', color: '#1A1A2E', textAlign: 'center', marginBottom: 8 },

  fieldGroup: { gap: 5 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: '#555' },

  input: {
    backgroundColor: '#fff', borderRadius: 10,
    borderWidth: 1, borderColor: '#E0E0E0',
    paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 14, color: '#1A1A2E',
  },

  passwordRow: {
    backgroundColor: '#fff', borderRadius: 10,
    borderWidth: 1, borderColor: '#E0E0E0',
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 4,
  },
  passwordInput: {
    flex: 1, fontSize: 14, color: '#1A1A2E', paddingVertical: 9,
  },

  checkRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  checkbox: {
    width: 20, height: 20, borderWidth: 1.5, borderColor: '#888',
    borderRadius: 4, alignItems: 'center', justifyContent: 'center',
    marginTop: 2, flexShrink: 0,
  },
  checkboxChecked: { backgroundColor: C.primary, borderColor: C.primary },
  checkTxt: { fontSize: 12, color: '#555', flex: 1, lineHeight: 18 },

  signupBtn: {
    backgroundColor: C.primary, paddingVertical: 16,
    borderRadius: 12, alignItems: 'center', marginTop: 6,
  },
  signupBtnDisabled: { backgroundColor: '#B0BEC5' },
  signupTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },

  signinRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signinPrompt: { fontSize: 13, color: '#555' },
  signinLink: { fontSize: 13, fontWeight: '800', color: C.primary },
});