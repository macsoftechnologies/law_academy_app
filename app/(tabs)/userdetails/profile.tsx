// app/(tabs)/userdetails/profile.tsx

import { router } from 'expo-router';
import React from 'react';
import {
    StatusBar, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const MENU = [
    { label: 'Personal Information', route: '/(tabs)/userdetails/personal-info' },
    { label: 'Educational Information', route: '/(tabs)/userdetails/educational-info' },
    { label: 'ID Proofs', route: '/(tabs)/userdetails/id-proofs' },
  ];

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EAF0" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Profile</Text>
      </View>

      {/* Avatar */}
      <View style={s.avatarSection}>
        <View style={s.avatarWrap}>
          <View style={s.avatarBg}>
            <Text style={s.avatarEmoji}>👤</Text>
          </View>
          <TouchableOpacity style={s.editBtn}>
            <Text style={s.editIcon}>✏️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu list */}
      <View style={s.menuList}>
        {MENU.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={s.menuItem}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.7}
          >
            <Text style={s.menuLabel}>{item.label}</Text>
            <Text style={s.menuChevron}>›</Text>
          </TouchableOpacity>
        ))}
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

  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarWrap: { position: 'relative' },
  avatarBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF6B00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 52 },
  editBtn: {
    position: 'absolute',
    bottom: 2,
    right: -4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  editIcon: { fontSize: 14 },

  menuList: {
    marginHorizontal: 16,
    gap: 10,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  menuLabel: { fontSize: 15, color: '#888', fontWeight: '500' },
  menuChevron: { fontSize: 22, color: '#888', fontWeight: '300' },
});