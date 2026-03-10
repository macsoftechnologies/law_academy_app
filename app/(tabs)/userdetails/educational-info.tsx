// app/(tabs)/userdetails/educational-info.tsx

import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert, ScrollView, StatusBar, StyleSheet, Text,
    TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SECTIONS = [
  { key: 'secondary',     label: 'Secondary Education',    icon: '📘', color: '#1A2E6E', borderColor: '#1A2E6E', bgColor: '#EEF2FF', marksLabel: 'Marks' },
  { key: 'intermediate',  label: 'Intermediate Education', icon: '📕', color: '#C0392B', borderColor: '#C0392B', bgColor: '#FFF0F0', marksLabel: 'Marks' },
  { key: 'graduation',    label: 'Graduation',             icon: '🎓', color: '#C9A227', borderColor: '#C9A227', bgColor: '#FDF9ED', marksLabel: 'CGPA' },
  { key: 'llb',           label: 'LLB Certificate',        icon: '🎓', color: '#555',    borderColor: '#ccc',    bgColor: '#F8F8F8', marksLabel: 'CGPA' },
];

type SectionData = { marks: string; institute: string; file: string | null };

export default function EducationalInfoScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Record<string, SectionData>>(
    Object.fromEntries(SECTIONS.map(s => [s.key, { marks: '', institute: '', file: null }]))
  );

  const updateField = (key: string, field: keyof SectionData, value: string) => {
    setData(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
  };

  const handleUploadCert = async (key: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets.length > 0) {
        updateField(key, 'file', result.assets[0].name);
        Alert.alert('Uploaded', `${result.assets[0].name} selected.`);
      }
    } catch {
      Alert.alert('Error', 'Failed to pick file.');
    }
  };

  const handleUpload = () => {
    router.replace('/(tabs)/userdetails/submitted' as any);
  };

  // Check if any data is filled (view mode)
  const hasData = Object.values(data).some(d => d.marks || d.institute || d.file);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EAF0" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Educational Information</Text>
        <TouchableOpacity onPress={() => setIsEditing(v => !v)} style={s.editBtn}>
          <Text style={s.editBtnTxt}>✏️ Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {SECTIONS.map((sec) => {
          const d = data[sec.key];
          const filled = d.marks && d.institute;

          return (
            <View key={sec.key} style={[s.card, { borderColor: sec.borderColor, backgroundColor: sec.bgColor }]}>
              {/* Section header */}
              <View style={s.cardHeader}>
                <Text style={s.cardIcon}>{sec.icon}</Text>
                <Text style={[s.cardTitle, { color: sec.color }]}>{sec.label}</Text>
              </View>

              {/* View mode - show certificate image + data */}
              {!isEditing && filled ? (
                <View style={s.viewRow}>
                  <View style={s.certThumb}>
                    <Text style={s.certEmoji}>📜</Text>
                  </View>
                  <View style={s.viewInfo}>
                    <Text style={s.viewTxt}>{d.marks} {sec.marksLabel === 'CGPA' ? 'CGPA' : 'Marks'}</Text>
                    <Text style={s.viewTxt}>{d.institute}</Text>
                  </View>
                </View>
              ) : (
                <>
                  {/* Marks/CGPA row */}
                  <View style={s.fieldRow}>
                    <Text style={s.fieldLabel}>{sec.marksLabel} :</Text>
                    <TextInput
                      style={s.fieldInput}
                      value={d.marks}
                      onChangeText={v => updateField(sec.key, 'marks', v)}
                      editable={isEditing}
                      placeholder=""
                      placeholderTextColor="#ccc"
                    />
                  </View>
                  {/* Institute row */}
                  <View style={s.fieldRow}>
                    <Text style={s.fieldLabel}>Institute :{'\n'}name</Text>
                    <TextInput
                      style={s.fieldInput}
                      value={d.institute}
                      onChangeText={v => updateField(sec.key, 'institute', v)}
                      editable={isEditing}
                      placeholder=""
                      placeholderTextColor="#ccc"
                    />
                  </View>
                  {/* Upload cert button */}
                  <TouchableOpacity
                    style={[s.uploadCertBtn, { backgroundColor: sec.bgColor === '#F8F8F8' ? '#eee' : sec.bgColor }]}
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
  viewTxt: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },

  // Edit mode
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fieldLabel: { fontSize: 13, color: '#555', width: 72, lineHeight: 18 },
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
});