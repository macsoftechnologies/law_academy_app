// app/wishlist/index.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView, StatusBar, StyleSheet, Text,
    TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const GOLD = '#C9A227';
const CRIMSON = '#8B1A1A';

const FOLDERS = [
  { id: 'f1', title: 'Civil Procedure Code',    items: 2 },
  { id: 'f2', title: 'Indian Evidence Act',      items: 2 },
  { id: 'f3', title: 'Specific Relief Act',      items: 2 },
  { id: 'f4', title: 'Indian Panel Code',        items: 2 },
  { id: 'f5', title: 'Mains Preparation',        items: 2 },
  { id: 'f6', title: 'Prelims Preparation',      items: 2 },
];

const FOLDER_ITEMS = [
  { id: 'l1', title: 'Introduction', lecture: 'Lecture 1' },
  { id: 'l2', title: 'Introduction', lecture: 'Lecture 2' },
  { id: 'l3', title: 'Introduction', lecture: 'Lecture 3' },
  { id: 'l4', title: 'Introduction', lecture: 'Lecture 4' },
];

// Folder card with dog-ear corner effect
function FolderCard({ item, onPress }: { item: typeof FOLDERS[0]; onPress: () => void }) {
  return (
    <TouchableOpacity style={fc.card} onPress={onPress} activeOpacity={0.8}>
      {/* Dog-ear top-right */}
      <View style={fc.dogEar} />
      <Text style={fc.title}>{item.title}</Text>
      <View style={fc.badge}>
        <Text style={fc.badgeTxt}>{item.items} Items</Text>
      </View>
    </TouchableOpacity>
  );
}
const fc = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderTopRightRadius: 0,
    padding: 14,
    minHeight: 110,
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
    position: 'relative',
    borderWidth: 1, borderColor: '#E8E0E0',
  },
  dogEar: {
    position: 'absolute',
    top: 0, right: 0,
    width: 0, height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 24,
    borderBottomWidth: 24,
    borderLeftColor: 'transparent',
    borderBottomColor: '#E8EAF0',
    // The actual folded corner
  },
  title: { fontSize: 14, fontWeight: '800', color: '#1A1A2E', lineHeight: 20, paddingRight: 20 },
  badge: {
    alignSelf: 'flex-end',
    backgroundColor: GOLD,
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 6,
  },
  badgeTxt: { fontSize: 11, fontWeight: '700', color: '#fff' },
});

// Lecture video card
function LectureCard({ item }: { item: typeof FOLDER_ITEMS[0] }) {
  return (
    <View style={lc.card}>
      <View style={lc.thumb}>
        <View style={lc.thumbBg}>
          <Text style={lc.thumbTxt}>CPC</Text>
          <Text style={lc.thumbSub}>01</Text>
          <Text style={lc.introTxt}>INTRODUCTION</Text>
          <Text style={lc.bottomTxt}>JUDICIARY ASPIRANTS</Text>
        </View>
      </View>
      <Text style={lc.title}>{item.title}</Text>
      <View style={lc.pill}>
        <Text style={lc.pillTxt}>{item.lecture}</Text>
      </View>
    </View>
  );
}
const lc = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
  },
  thumb: { height: 110 },
  thumbBg: {
    flex: 1, backgroundColor: '#1A1A1A',
    alignItems: 'center', justifyContent: 'center',
    padding: 8,
  },
  thumbTxt: { fontSize: 14, fontWeight: '900', color: '#E53935' },
  thumbSub: { fontSize: 11, color: '#fff', position: 'absolute', top: 6, right: 8 },
  introTxt: { fontSize: 12, fontWeight: '900', color: GOLD, letterSpacing: 1 },
  bottomTxt: { fontSize: 8, color: '#ccc', position: 'absolute', bottom: 6 },
  title: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', padding: 8, paddingBottom: 6 },
  pill: {
    backgroundColor: GOLD,
    marginHorizontal: 8, marginBottom: 10,
    paddingVertical: 5, borderRadius: 6, alignItems: 'center',
  },
  pillTxt: { fontSize: 11, fontWeight: '700', color: '#fff' },
});

export default function WishlistScreen() {
  const [search, setSearch] = useState('');
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  const filtered = FOLDERS.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity
          onPress={() => openFolder ? setOpenFolder(null) : router.back()}
          hitSlop={12}
        >
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={s.headerTitle}>Wish List</Text>
          <Text style={s.headerSub}>Organize & Review Saved Content</Text>
        </View>
      </View>

      {/* Search */}
      <View style={s.searchWrap}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Search folders"
          placeholderTextColor="#AAACB0"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {!openFolder ? (
          // Folder grid
          <View style={s.grid}>
            {filtered.map((folder, i) => (
              i % 2 === 0 ? (
                <View key={folder.id} style={s.gridRow}>
                  <FolderCard item={folder} onPress={() => setOpenFolder(folder.id)} />
                  {filtered[i + 1] ? (
                    <FolderCard item={filtered[i + 1]} onPress={() => setOpenFolder(filtered[i + 1].id)} />
                  ) : (
                    <View style={{ flex: 1 }} />
                  )}
                </View>
              ) : null
            ))}
          </View>
        ) : (
          // Lecture cards grid
          <View style={s.grid}>
            {FOLDER_ITEMS.map((item, i) => (
              i % 2 === 0 ? (
                <View key={item.id} style={s.gridRow}>
                  <LectureCard item={item} />
                  {FOLDER_ITEMS[i + 1] ? (
                    <LectureCard item={FOLDER_ITEMS[i + 1]} />
                  ) : (
                    <View style={{ flex: 1 }} />
                  )}
                </View>
              ) : null
            ))}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, gap: 8,
  },
  back: { fontSize: 28, color: '#1A1A2E', fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
  headerSub: { fontSize: 12, color: '#888' },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12,
    marginHorizontal: 16, marginBottom: 14,
    paddingHorizontal: 14, paddingVertical: 10,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
    gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 14, color: '#1A1A2E' },

  scroll: { paddingHorizontal: 14 },
  grid: { gap: 12 },
  gridRow: { flexDirection: 'row', gap: 12 },
});