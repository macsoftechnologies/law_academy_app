import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  Image, TextInput, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/colors';
import { MOCK_COMBO_LECTURES, ComboLecture } from '../../data/mock/combo.mock';

const C = Colors;

// ─── Single lecture row ───────────────────────────────────────────────────────
function LectureRow({ item }: { item: ComboLecture }) {
  const handlePress = () => {
    if (item.paid) {
      // ✅ Unlocked → go to lecture player
      router.push({
        pathname: '/combo/lecture-detail',
        params: {
          lectureId:     item.id,
          lectureNumber: String(item.number),
          lectureTitle:  item.title,
          paid:          '1',
        },
      } as any);
    } else {
      // 🔒 Locked → redirect to course-detail (payment flow)
      router.push('/combo/course-detail' as any);
    }
  };

  return (
    <TouchableOpacity style={s.row} activeOpacity={0.8} onPress={handlePress}>
      {/* Thumbnail */}
      <View style={s.thumbWrap}>
        <Image source={item.image} style={s.thumb} resizeMode="cover" />

        {/* Lock overlay — ONLY rendered when unpaid */}
        {!item.paid && (
          <View style={s.lockOverlay}>
            <View style={s.lockCircle}>
              <Text style={s.lockIcon}>🔒</Text>
            </View>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={s.info}>
        <Text style={s.lectureNum}>LECTURE {item.number}</Text>
        <Text style={s.lectureTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={s.lectureBy}>By {item.instructor}</Text>
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function ComboLecturesScreen() {
  const { subjectTitle } = useLocalSearchParams<{ subjectTitle?: string }>();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);

    // Simulate reload (replace later with API call)
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const filtered = MOCK_COMBO_LECTURES.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle} numberOfLines={1}>
          {subjectTitle ?? 'Civil Procedure Code'}
        </Text>
        <TouchableOpacity style={s.filterBtn}>
          <Text style={s.filterIcon}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={s.searchWrap}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Search for.."
          placeholderTextColor={C.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={s.sep} />}
        ListFooterComponent={<View style={{ height: 30 }} />}
        renderItem={({ item }) => <LectureRow item={item} />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.screenBg },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: C.textDark },
  filterBtn:   { padding: 4 },
  filterIcon:  { fontSize: 20, color: C.textMuted },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.cardBg, borderRadius: 12,
    marginHorizontal: 16, marginBottom: 12,
    paddingHorizontal: 14, height: 46,
    borderWidth: 1, borderColor: C.border,
  },
  searchIcon:  { fontSize: 16, marginRight: 8, color: C.textMuted },
  searchInput: { flex: 1, fontSize: 14, color: C.textDark },

  list: { paddingHorizontal: 16 },
  sep:  { height: 10 },

  // Row card
  row: {
    flexDirection: 'row', backgroundColor: C.cardBg,
    borderRadius: 14, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },

  // Thumbnail
  thumbWrap: { width: 130, height: 90, position: 'relative' },
  thumb:     { width: '100%', height: '100%' },

  // Lock overlay — only when !paid
  lockOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.52)',
    alignItems: 'center', justifyContent: 'center',
  },
  lockCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  lockIcon: { fontSize: 18 },

  // Info
  info:         { flex: 1, padding: 10, justifyContent: 'center' },
  lectureNum:   { fontSize: 10, fontWeight: '800', color: C.gold, letterSpacing: 0.6, marginBottom: 4 },
  lectureTitle: { fontSize: 13, fontWeight: '700', color: C.textDark, lineHeight: 18, marginBottom: 4 },
  lectureBy:    { fontSize: 11, color: C.textMuted },
});