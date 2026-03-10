// app/(tabs)/notes/printed-notes/add-address.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, ScrollView, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../../constants/colors';

const C = Colors;

export default function AddAddressScreen() {
  const [form, setForm] = useState({
    fullName: '', address: '', city: '',
    state: '', zip: '', country: '',
  });

  const set = (key: keyof typeof form) => (val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Adding Shipping Addresses</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {[
          { key: 'fullName', placeholder: 'Full Name'              },
          { key: 'address',  placeholder: 'Address'                },
          { key: 'city',     placeholder: 'City'                   },
          { key: 'state',    placeholder: 'State/Province/Region'  },
          { key: 'zip',      placeholder: 'Zip Code'               },
          { key: 'country',  placeholder: 'Country'                },
        ].map(field => (
          <TextInput
            key={field.key}
            style={s.input}
            placeholder={field.placeholder}
            placeholderTextColor={C.textMuted}
            value={form[field.key as keyof typeof form]}
            onChangeText={set(field.key as keyof typeof form)}
          />
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={s.stickyBottom}>
        <TouchableOpacity
          style={s.saveBtn}
          onPress={() => router.back()}
        >
          <Text style={s.saveBtnTxt}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.screenBg },
  scroll: { padding: 16 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: C.textDark },

  input: {
    backgroundColor: C.cardBg, borderRadius: 12,
    borderWidth: 1, borderColor: C.inputBorder,
    paddingHorizontal: 16, paddingVertical: 16,
    fontSize: 14, color: C.textDark,
    marginBottom: 12,
  },

  stickyBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 28,
    backgroundColor: C.screenBg,
  },
  saveBtn:    { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  saveBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});