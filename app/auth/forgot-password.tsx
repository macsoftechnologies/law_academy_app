import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert, Image, StatusBar, StyleSheet, Text, TextInput,
  TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import { forgotPassword } from '../services/auth/forgotpassword';

const C = Colors;

export default function ForgotPasswordScreen() {
  const [newPass,  setNewPass]  = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [showNew,  setShowNew]  = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [email, setEmail] = useState('');

  // const handleUpdate = () => {
  //   Alert.alert('Success', 'Password updated successfully!', [
  //     { text: 'OK', onPress: () => router.replace('/auth/login' as any) },
  //   ]);
  // };
  const handleUpdate = async () => {
  if (!email || !newPass || !confirm) {
    Alert.alert('Error', 'All fields are required');
    return;
  }

  if (newPass !== confirm) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  try {
    await forgotPassword({
      userId: email,   
      password: newPass,
    });

    Alert.alert('Success', 'Password updated successfully!', [
      { text: 'OK', onPress: () => router.replace('/auth/login' as any) },
    ]);
  } catch (error) {
    Alert.alert('Error', 'Something went wrong');
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

      
      <View style={s.illustrationWrap}>
        <Image
          source={require('../../assets/images/reset.png')}
          style={s.illustration}
          resizeMode="contain"
        />
      </View>
<View style={s.fieldGroup}>
  <Text style={s.fieldLabel}>Email or Phone</Text>
  <View style={s.passwordRow}>
    <TextInput
      style={s.passwordInput}
      value={email}
      onChangeText={setEmail}
      placeholder="Enter email or phone"
      placeholderTextColor="#AAACB0"
      keyboardType="email-address"
      autoCapitalize="none"
    />
  </View>
</View>
      <View style={s.content}>
        <Text style={s.title}>Forgot Password</Text>
        <Text style={s.subtitle}>
          Create a new password. Ensure it differs from{'\n'}previous ones for security
        </Text>

        {/* New password */}
        <View style={s.fieldGroup}>
          <Text style={s.fieldLabel}>Create New Password</Text>
          <View style={s.passwordRow}>
            <TextInput
              style={s.passwordInput}
              value={newPass}
              onChangeText={setNewPass}
              secureTextEntry={!showNew}
              placeholder="Enter new password"
              placeholderTextColor="#AAACB0"
            />
            <TouchableOpacity
              onPress={() => setShowNew(v => !v)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={showNew ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm password */}
        <View style={s.fieldGroup}>
          <Text style={s.fieldLabel}>Confirm Password</Text>
          <View style={s.passwordRow}>
            <TextInput
              style={s.passwordInput}
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={!showConf}
              placeholder="Confirm new password"
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

        <TouchableOpacity style={s.updateBtn} onPress={handleUpdate}>
          <Text style={s.updateTxt}>Update Password</Text>
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
    height: 250,
    backgroundColor: '#C8D0E8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  illustration: { width: '100%', height: '100%' },

  content: { paddingHorizontal: 24, paddingTop: 28, gap: 14 },

  title:    { fontSize: 22, fontWeight: '900', color: '#1A1A2E', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 20 },

  fieldGroup: { gap: 6 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: '#555' },

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

  updateBtn: {
    backgroundColor: C.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  updateTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },
});