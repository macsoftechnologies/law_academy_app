

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Image, TextInput, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../constants/colors';
import { MOCK_GUEST_LECTURES } from '../../data/mock/guest.mock';

type Lecture = typeof MOCK_GUEST_LECTURES[0];

function LectureRow({ item }: { item: Lecture }) {
  const handleView = () => {
    router.push({
      pathname: '/guest-lecturer/detail',
      params: { id: item.id, locked: item.locked ? '1' : '0' },
    } as any);
  };

  return (
    <View style={s.row}>
      {/* Thumbnail + lock overlay */}
      <View style={s.thumbWrap}>
        <Image source={item.image} style={s.thumb} resizeMode="cover" />
        {item.locked && (
          <View style={s.lockOverlay}>
            <Text style={s.lockIcon}>🔒</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={s.info}>
        {/* Title spans two lines matching screenshot */}
        <Text style={s.title} numberOfLines={2}>{item.title} |</Text>
        <Text style={s.instructor}>{item.instructor}</Text>
        <Text style={s.duration}>Duration : {item.duration}</Text>
        <TouchableOpacity style={s.viewBtn} onPress={handleView}>
          <Text style={s.viewBtnIcon}>▶</Text>
          <Text style={s.viewBtnTxt}>View</Text>
        </TouchableOpacity>
      </View>

      {/* Bookmark */}
      <TouchableOpacity style={s.bookmarkBtn}>
        <Text style={s.bookmarkIcon}>🔖</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function GuestLecturesScreen() {
  const [search, setSearch] = useState('');
const [refreshing, setRefreshing] = useState(false);
const handleRefresh = async () => {
  setRefreshing(true);

  await new Promise(resolve => setTimeout(resolve, 1000));

  setRefreshing(false);
};
  const filtered = MOCK_GUEST_LECTURES.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Guest Lectures</Text>
      </View>

      {/* Search bar */}
      <View style={s.searchWrap}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Search for..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {/* Filter icon */}
        <TouchableOpacity style={s.filterBtn}>
          <Text style={s.filterIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      <FlatList
  data={filtered}
  keyExtractor={i => i.id}
  contentContainerStyle={s.list}
  ItemSeparatorComponent={() => <View style={s.sep} />}
  showsVerticalScrollIndicator={false}
  renderItem={({ item }) => <LectureRow item={item} />}

  refreshing={refreshing}
  onRefresh={handleRefresh}
/>
      
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.screenBg },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 26, color: Colors.textDark, fontWeight: '300', lineHeight: 30 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDark },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.cardBg, borderRadius: 12,
    marginHorizontal: 16, marginBottom: 10,
    paddingHorizontal: 12, height: 46,
    borderWidth: 1, borderColor: Colors.border,
  },
  searchIcon:  { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textDark },
  filterBtn:   { paddingLeft: 8 },
  filterIcon:  { fontSize: 20, color: Colors.textMuted },

  list: { paddingHorizontal: 16, paddingBottom: 24 },
  sep:  { height: 10 },

  // Row card
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },

  // Thumbnail
  thumbWrap: { width: 120, height: 100, position: 'relative' },
  thumb:     { width: '100%', height: '100%' },
  lockOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center', justifyContent: 'center',
  },
  lockIcon: { fontSize: 26 },

  // Info section
  info: { flex: 1, padding: 10, justifyContent: 'space-between' },
  title:      { fontSize: 13, fontWeight: '700', color: Colors.textDark, lineHeight: 17, marginBottom: 2 },
  instructor: { fontSize: 12, color: Colors.textMuted, marginBottom: 2 },
  duration:   { fontSize: 11, color: Colors.textMuted, marginBottom: 6 },
  viewBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 6, gap: 5,
  },
  viewBtnIcon: { fontSize: 10, color: Colors.white },
  viewBtnTxt:  { fontSize: 12, fontWeight: '700', color: Colors.white },

  // Bookmark
  bookmarkBtn: { padding: 10, justifyContent: 'flex-start' },
  bookmarkIcon:{ fontSize: 16 },
});