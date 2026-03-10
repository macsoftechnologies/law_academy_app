// app/(tabs)/notes/printed-notes/shipping-addresses.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../../constants/colors';
import { MOCK_ADDRESSES } from '../../../../data/mock/printed-notes.mock';

const C = Colors;

export default function ShippingAddressesScreen() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);

  const setAsDefault = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Shipping Addresses</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {addresses.map(addr => (
          <View key={addr.id} style={s.card}>
            <View style={s.cardTop}>
              <Text style={s.name}>{addr.name}</Text>
              <TouchableOpacity>
                <Text style={s.editBtn}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={s.addrLine}>{addr.address}</Text>
            <Text style={s.addrLine}>{addr.city}</Text>
            <TouchableOpacity
              style={s.defaultRow}
              onPress={() => setAsDefault(addr.id)}
            >
              <View style={[s.checkbox, addr.isDefault && s.checkboxChecked]}>
                {addr.isDefault && <Text style={s.checkmark}>✓</Text>}
              </View>
              <Text style={s.defaultTxt}>Use as the shipping address</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* + FAB */}
      <TouchableOpacity
        style={s.fab}
        onPress={() => router.push('/notes/printed-notes/add-address' as any)}
      >
        <Text style={s.fabIcon}>+</Text>
      </TouchableOpacity>
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
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark },

  card: {
    backgroundColor: C.cardBg, borderRadius: 14,
    padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  cardTop:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name:     { fontSize: 15, fontWeight: '700', color: C.textDark },
  editBtn:  { fontSize: 13, fontWeight: '700', color: C.crimson },
  addrLine: { fontSize: 13, color: C.textMuted, lineHeight: 20 },

  defaultRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  defaultTxt: { fontSize: 13, color: C.textDark, fontWeight: '500' },

  checkbox:        { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: C.inputBorder, alignItems: 'center', justifyContent: 'center', backgroundColor: C.white },
  checkboxChecked: { backgroundColor: C.primary, borderColor: C.primary },
  checkmark:       { fontSize: 12, color: C.white, fontWeight: '800' },

  fab: {
    position: 'absolute', bottom: 30, right: 20,
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: C.crimson,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }, elevation: 8,
  },
  fabIcon: { fontSize: 28, color: C.white, lineHeight: 32 },
});