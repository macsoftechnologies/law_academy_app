
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView, Platform, ScrollView,
  StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import { loginUser } from '../services/auth/login';
const C = Colors;

export default function LoginScreen() {
  const [email,    setEmail]    = useState('test@gmail.com');
  const [phone,    setPhone]    = useState('1234567890');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

const handleLogin = async () => {
  if (!email || !phone || !password) {
    alert('Please fill all fields');
    return;
  }

  try {
    const response = await loginUser({
      email,
      mobile_number: phone,
      password,
    });

    const result = response.data;

    if (result.statusCode === 200) {
      router.replace('/(tabs)/dashboard');
    } else {
      alert(result.message || 'Login failed');
    }

  } catch (error: any) {
    console.log('Login Error:', error.response?.data || error.message);
    alert('Invalid email, phone or password');
  }
};
  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.white} />

      {/* Illustration header */}
      <View style={s.illustrationWrap}>
        <View style={s.illustrationBg}>
          <Image
  source={require('../../assets/images/login.png')}
  style={s.lawyerImage}
  resizeMode="contain"
/>
        </View>
      </View>

      {/* Form */}
      <KeyboardAvoidingView
        style={s.formWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
          <Text style={s.title}>Welcome Back</Text>
          <Text style={s.subtitle}>Login to access your account</Text>

          {/* Email */}
          <View style={s.fieldGroup}>
            <Text style={s.fieldLabel}>Email Address</Text>
            <TextInput
              style={s.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#AAACB0"
            />
          </View>

          {/* Phone */}
          <View style={s.fieldGroup}>
            <Text style={s.fieldLabel}>Phone Number</Text>
            <TextInput
              style={s.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#AAACB0"
            />
          </View>

          {/* Password */}
          <View style={s.fieldGroup}>
            <Text style={s.fieldLabel}>Password</Text>
            <View style={s.passwordRow}>
              <TextInput
                style={s.passwordInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                placeholder="Enter password"
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

          {/* Forgot password */}
          <TouchableOpacity
            style={s.forgotRow}
            onPress={() => router.push('/auth/forgot-password' as any)}
          >
            <Text style={s.forgotTxt}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login button */}
          <TouchableOpacity style={s.loginBtn} onPress={handleLogin}>
            <Text style={s.loginTxt}>Login</Text>
          </TouchableOpacity>

          {/* Sign in another way */}
          <TouchableOpacity
            style={s.anotherWayBtn}
            onPress={() => router.push('/auth/sign-in-another-way' as any)}
          >
            <Text style={s.anotherWayTxt}>Sign In another way</Text>
          </TouchableOpacity>

          {/* Sign up link */}
          <View style={s.signupRow}>
            <Text style={s.signupPrompt}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup' as any)}>
              <Text style={s.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 20 }} />
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
    alignItems: 'center',
    justifyContent: 'center',
  paddingTop: 20,
  },
 
  lawyerEmoji: { fontSize: 100 },


illustrationBg: {
  width: 200,
  height: 200,
  justifyContent: 'center',
  alignItems: 'center',
},

lawyerImage: {
  width: '100%',
  height: '100%',
},
  formWrap: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 28, gap: 14 },

  title:    { fontSize: 24, fontWeight: '900', color: '#1A1A2E', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 8 },

  fieldGroup: { gap: 6 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: '#555' },

  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: '#1A1A2E',
  },

  // Password field: row with input + eye icon
  passwordRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
    paddingVertical: 9,
  },

  forgotRow: { alignSelf: 'flex-end' },
  forgotTxt: { fontSize: 13, fontWeight: '700', color: C.crimson },

  loginBtn: {
    backgroundColor: C.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  loginTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },

  anotherWayBtn: { alignItems: 'center', paddingVertical: 4 },
  anotherWayTxt: { fontSize: 13, color: '#555' },

  signupRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signupPrompt: { fontSize: 13, color: '#555' },
  signupLink: { fontSize: 13, fontWeight: '800', color: C.primary },
});