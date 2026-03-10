// app/(tabs)/userdetails/admin-consult.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView, StatusBar, StyleSheet, Text,
    TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminConsultScreen() {
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = () => {
    if (!accepted) return;
    router.replace('/(tabs)/userdetails/submitted' as any);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EAF0" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Admin Consulting</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <Text style={s.subTitle}>Consult Admin to Update Details</Text>

        {/* Name field - read only */}
        <View style={s.inputRow}>
          <TextInput
            style={s.input}
            value="Bhagya Sree"
            editable={false}
            placeholderTextColor="#AAACB0"
          />
          <Text style={s.inputIcon}>👤</Text>
        </View>

        {/* Mobile field - read only */}
        <View style={s.inputRow}>
          <TextInput
            style={s.input}
            value="123456789"
            editable={false}
            placeholderTextColor="#AAACB0"
          />
          <Text style={s.inputIcon}>📞</Text>
        </View>

        {/* Email field - read only */}
        <View style={s.inputRow}>
          <TextInput
            style={s.input}
            value="bhagyasree@gmail.com"
            editable={false}
            placeholderTextColor="#AAACB0"
          />
          <Text style={s.inputIcon}>✉️</Text>
        </View>

        {/* Checkbox */}
        <TouchableOpacity
          style={s.checkRow}
          onPress={() => setAccepted(v => !v)}
          activeOpacity={0.8}
        >
          <View style={[s.checkbox, accepted && s.checkboxChecked]}>
            {accepted && <Text style={s.checkmark}>✓</Text>}
          </View>
          <Text style={s.checkLabel}>I accept Terms & Conditions</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />
      </ScrollView>

      {/* Submit button fixed at bottom */}
      <View style={s.bottomBar}>
        <TouchableOpacity
          style={[s.submitBtn, !accepted && s.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={!accepted}
        >
          <Text style={s.submitTxt}>Submit Request to  Admin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8EAF0' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  back: { fontSize: 28, color: '#1A1A2E', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },

  scroll: { paddingHorizontal: 16, gap: 12, paddingBottom: 20 },
  subTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },

  inputRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 52,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  input: { flex: 1, fontSize: 15, color: '#1A1A2E', fontWeight: '500' },
  inputIcon: { fontSize: 18, marginLeft: 8 },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  checkbox: {
    width: 20, height: 20,
    borderWidth: 2, borderColor: '#C0392B',
    borderRadius: 4,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#C0392B' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkLabel: { fontSize: 14, fontWeight: '600', color: '#C0392B' },

  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#E8EAF0',
  },
  submitBtn: {
    backgroundColor: '#1A2E6E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnDisabled: { backgroundColor: '#B0BEC5' },
  submitTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },
});