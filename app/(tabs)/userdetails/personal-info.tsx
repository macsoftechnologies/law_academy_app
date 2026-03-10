// app/(tabs)/userdetails/personal-info.tsx

import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FIELDS = [
  { key: 'name', label: 'Name', icon: '👤', editable: false, value: 'Bhagya Sree' },
  { key: 'dob', label: 'Date of birth', icon: '🎂', editable: true, value: '' },
  { key: 'gender', label: 'Gender', icon: '⚧', editable: true, value: '' },
  { key: 'mobile', label: 'Mobile', icon: '📞', editable: false, value: '1234567890' },
  { key: 'email', label: 'Email', icon: '✉️', editable: false, value: 'bhagyasree@gmail.com' },
  { key: 'mother', label: 'Mother Name', icon: '👩', editable: true, value: '' },
  { key: 'father', label: 'Father Name', icon: '👨', editable: true, value: '' },
  { key: 'corrAddress', label: 'Corresponding Address', icon: '📍', editable: true, value: '' },
  { key: 'permAddress', label: 'Permanent Address', icon: '📍', editable: true, value: '' },
];

export default function PersonalInfoScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [form, setForm] = useState<Record<string, string>>(
    Object.fromEntries(FIELDS.map(f => [f.key, f.value]))
  );

  const handleSave = () => {
    // Validate mobile number
    if (!/^\d{10}$/.test(form.mobile)) {
      Alert.alert('Invalid Mobile Number', 'Mobile number must be exactly 10 digits.');
      return;
    }

    setIsEditing(false);
    Alert.alert('Saved', 'Personal information updated successfully.');
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EAF0" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>

        <Text style={s.headerTitle}>Personal Information</Text>

        <TouchableOpacity
          onPress={() => setIsEditing(v => !v)}
          style={s.editBtn}
        >
          <Text style={s.editBtnTxt}>✏️ Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Note */}
      <View style={s.noteBanner}>
        <Text style={s.noteText}>
          <Text style={s.noteRed}>Note: </Text>
          Name, Mobile and Email cannot be edited. Please consult admin for assistance.
          <Text
            style={s.noteLink}
            onPress={() =>
              router.push('/(tabs)/userdetails/admin-consult' as any)
            }
          >
            {' '}Click here
          </Text>
        </Text>
      </View>

      {/* ✅ KeyboardAvoidingView pushes the ScrollView up when keyboard opens */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // ✅ Taps still register even when keyboard is open
        >
          {FIELDS.map(field => {
            const isLocked = !field.editable;
            const canEdit = isEditing && !isLocked;

            // DATE FIELD
            if (field.key === 'dob') {
              return (
                <View key={field.key} style={{ marginBottom: 10 }}>
                  <TouchableOpacity
                    style={[s.inputRow, !isEditing && s.inputLocked]}
                    onPress={() => isEditing && setShowDatePicker(true)}
                    activeOpacity={0.8}
                  >
                    <Text style={s.input}>
                      {form.dob ? form.dob : 'Select Date of Birth'}
                    </Text>
                    <Text style={s.inputIcon}>{field.icon}</Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={form.dob ? new Date(form.dob) : new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                          const formatted =
                            selectedDate.toISOString().split('T')[0];
                          setForm(prev => ({
                            ...prev,
                            dob: formatted,
                          }));
                        }
                      }}
                    />
                  )}
                </View>
              );
            }

            return (
              <View key={field.key} style={s.inputRow}>
                <TextInput
                  style={[s.input, isLocked && s.inputLocked]}
                  value={form[field.key]}
                  onChangeText={v => {
                    // Mobile validation
                    if (field.key === 'mobile') {
                      if (/^\d*$/.test(v) && v.length <= 10) {
                        setForm(prev => ({ ...prev, [field.key]: v }));
                      }
                    } else {
                      setForm(prev => ({ ...prev, [field.key]: v }));
                    }
                  }}
                  placeholder={field.label}
                  placeholderTextColor="#AAACB0"
                  editable={canEdit}
                  keyboardType={
                    field.key === 'mobile' ? 'number-pad' : 'default'
                  }
                  maxLength={field.key === 'mobile' ? 10 : undefined}
                />
                <Text style={s.inputIcon}>{field.icon}</Text>
              </View>
            );
          })}

          <TouchableOpacity style={s.saveBtn} onPress={handleSave}>
            <Text style={s.saveTxt}>Save</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
  back: {
    fontSize: 28,
    color: '#1A1A2E',
    marginRight: 8,
    fontWeight: '300',
    lineHeight: 32,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  editBtn: { flexDirection: 'row', alignItems: 'center' },
  editBtnTxt: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },

  noteBanner: { marginHorizontal: 16, marginBottom: 16 },
  noteText: { fontSize: 12, color: '#555', lineHeight: 18 },
  noteRed: { color: '#C0392B', fontWeight: '700' },
  noteLink: {
    color: '#1A1A2E',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  scroll: { paddingHorizontal: 16, gap: 10 },

  inputRow: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    height: 52,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A2E',
    fontWeight: '500',
  },
  inputLocked: { color: '#333' },
  inputIcon: { fontSize: 18, marginLeft: 8 },

  saveBtn: {
    backgroundColor: '#1A2E6E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },
});