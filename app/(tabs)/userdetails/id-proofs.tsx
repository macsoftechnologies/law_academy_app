// app/(tabs)/userdetails/id-proofs.tsx

import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert, ScrollView, StatusBar, StyleSheet, Text,
    TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ID_SECTIONS = [
  { key: 'aadhar',   label: 'Aadhar Number',   icon: '🪪', color: '#1A2E6E', borderColor: '#1A2E6E', bgColor: '#EEF2FF' },
  { key: 'pan',      label: 'PAN Number',       icon: '💳', color: '#C0392B', borderColor: '#C0392B', bgColor: '#FFF0F0' },
  { key: 'passport', label: 'Passport Number',  icon: '🛂', color: '#C9A227', borderColor: '#C9A227', bgColor: '#FDF9ED' },
];

type IDData = { number: string; file: string | null };

export default function IDProofsScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Record<string, IDData>>(
    Object.fromEntries(ID_SECTIONS.map(s => [s.key, { number: '', file: null }]))
  );

  const updateNumber = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: { ...prev[key], number: value } }));
  };

  const handleUploadCert = async (key: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets.length > 0) {
        setData(prev => ({ ...prev, [key]: { ...prev[key], file: result.assets[0].name } }));
        Alert.alert('Uploaded', `${result.assets[0].name} selected.`);
      }
    } catch {
      Alert.alert('Error', 'Failed to pick file.');
    }
  };

  const handleUpload = () => {
    router.replace('/(tabs)/userdetails/submitted' as any);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EAF0" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>ID Proofs</Text>
        <TouchableOpacity onPress={() => setIsEditing(v => !v)} style={s.editBtn}>
          <Text style={s.editBtnTxt}>✏️ Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {ID_SECTIONS.map((sec) => {
          const d = data[sec.key];
          const filled = d.number;

          return (
            <View key={sec.key} style={[s.card, { borderColor: sec.borderColor, backgroundColor: sec.bgColor }]}>
              {/* Section header */}
              <View style={s.cardHeader}>
                <Text style={s.cardIcon}>{sec.icon}</Text>
                <Text style={[s.cardTitle, { color: sec.color }]}>{sec.label}</Text>
              </View>

              {/* View mode */}
              {!isEditing && filled ? (
                <View style={s.viewRow}>
                  <View style={s.certThumb}>
                    <Text style={s.certEmoji}>📜</Text>
                  </View>
                  <View style={s.viewInfo}>
                    <Text style={s.viewLabel}>Number :</Text>
                    <Text style={s.viewValue}>{d.number}</Text>
                  </View>
                </View>
              ) : (
                <>
                  <View style={s.fieldRow}>
                    <Text style={s.fieldLabel}>Number :</Text>
                    <TextInput
                      style={s.fieldInput}
                      value={d.number}
                      onChangeText={v => updateNumber(sec.key, v)}
                      editable={isEditing}
                      placeholder=""
                      placeholderTextColor="#ccc"
                      keyboardType="default"
                    />
                  </View>
                  <TouchableOpacity
                    style={[s.uploadCertBtn, { backgroundColor: sec.bgColor }]}
                    onPress={() => handleUploadCert(sec.key)}
                  >
                    <Text style={s.uploadCertIcon}>⬆</Text>
                    <Text style={s.uploadCertTxt}>
                      {d.file ? d.file : 'Upload Certificate'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          );
        })}

        <TouchableOpacity style={s.uploadBtn} onPress={handleUpload}>
          <Text style={s.uploadTxt}>Upload</Text>
        </TouchableOpacity>

        <Text style={s.encryptNote}>All certificates are encrypted</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8EAF0' },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  back: { fontSize: 28, color: '#1A1A2E', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
  editBtn: { flexDirection: 'row', alignItems: 'center' },
  editBtnTxt: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },

  scroll: { paddingHorizontal: 16, gap: 12, paddingBottom: 20 },

  card: {
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 14,
    gap: 10,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  cardIcon: { fontSize: 18 },
  cardTitle: { fontSize: 15, fontWeight: '800' },

  // View mode
  viewRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  certThumb: {
    width: 70, height: 60,
    backgroundColor: '#E8EAF0',
    borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  certEmoji: { fontSize: 30 },
  viewInfo: { gap: 4 },
  viewLabel: { fontSize: 13, color: '#555', fontWeight: '600' },
  viewValue: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },

  // Edit mode
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fieldLabel: { fontSize: 13, color: '#555', width: 72 },
  fieldInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  uploadCertBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  uploadCertIcon: { fontSize: 16 },
  uploadCertTxt: { fontSize: 13, fontWeight: '600', color: '#555' },

  uploadBtn: {
    backgroundColor: '#1A2E6E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  uploadTxt: { fontSize: 16, fontWeight: '700', color: '#fff' },

  encryptNote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
});