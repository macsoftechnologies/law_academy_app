

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '../../components/ScreenWrapper';
import Colors from '../../constants/colors';
import { MOCK_LECTURES } from '../../data/mock/jcj.mock';
// ─── Unlock Full Access modal (Image 10) ─────────────────────────────────────
function UnlockModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={onClose} />
      <View style={s.unlockSheet}>
        <TouchableOpacity style={s.closeBtn} onPress={onClose}>
          <Text style={s.closeTxt}>✕</Text>
        </TouchableOpacity>
        {/* Illustration placeholder */}
        <View style={s.illustration}>
          <Text style={{ fontSize: 60 }}>⚖️</Text>
        </View>
        <Text style={s.unlockTitle}>UNLOCK FULL ACCESS</Text>
        <Text style={s.unlockSub}>To continue watching, purchase the full course</Text>
        <TouchableOpacity
          style={s.buyNowBtn}
          onPress={() => { onClose(); router.push('/jcj/course-detail' as any); }}
        >
          <Text style={s.buyNowTxt}>Buy Now  🛒</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─── Lecture row ──────────────────────────────────────────────────────────────
function LectureRow({
  item, onPress,
}: { item: typeof MOCK_LECTURES[0]; onPress: () => void }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <TouchableOpacity style={s.lectureRow} onPress={onPress} activeOpacity={0.8}>
      {/* Thumbnail */}
      <Image source={item.image} style={s.thumb} resizeMode="cover" />

      {/* Info */}
      <View style={s.lectureInfo}>
        <Text style={s.lectureNum}>LECTURE {item.number}</Text>
        <Text style={s.lectureTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={s.lectureBy}>By {item.instructor}</Text>
      </View>

      {/* Right side: bookmark + buy now if locked */}
      <View style={s.lectureRight}>
        <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
          <Image
            source={require('../../assets/images/Component15.png')}
            style={[s.bookmarkIcon, isBookmarked && { tintColor: Colors.primary }]}
          />
        </TouchableOpacity>
        {item.locked && (
          <TouchableOpacity style={s.buyNowSmall} onPress={onPress}>
            <Text style={s.buyNowSmallTxt}>Buy Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function LecturesScreen() {
  const [search, setSearch] = useState('');
  const [unlockVisible, setUnlockVisible] = useState(false);

  const filtered = MOCK_LECTURES.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleLecturePress = (lecture: typeof MOCK_LECTURES[0]) => {
    if (lecture.locked) {
      setUnlockVisible(true);
    } else {
      router.push('/jcj/lecture-player' as any);
    }
  };
const onRefresh = async () => {
  await new Promise(res => setTimeout(res, 1200));
};
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Civil Procedure Code</Text>
        {/* Filter icon */}
        <TouchableOpacity style={s.filterBtn}>
          <Text style={s.filterIcon}>⚙</Text>
        </TouchableOpacity>
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
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
        {filtered.map(item => (
          <LectureRow
            key={item.id}
            item={item}
            onPress={() => handleLecturePress(item)}
          />
        ))}
        <View style={{ height: 30 }} />
      </ScreenWrapper>

      <UnlockModal visible={unlockVisible} onClose={() => setUnlockVisible(false)} />
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
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: Colors.textDark },
  filterBtn:   { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  filterIcon:  { fontSize: 20, color: Colors.textDark },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.cardBg, borderRadius: 12,
    marginHorizontal: 16, marginBottom: 12,
    paddingHorizontal: 14, height: 46,
    borderWidth: 1, borderColor: Colors.border,
  },
  searchIcon:  { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textDark },

  scroll: { paddingHorizontal: 16 },

  // Lecture row
  lectureRow: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg, borderRadius: 14,
    marginBottom: 12, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  thumb:       { width: 120, height: 90 },
  lectureInfo: { flex: 1, padding: 10, justifyContent: 'center' },
  lectureNum:  { fontSize: 10, fontWeight: '800', color: Colors.textMuted, letterSpacing: 0.5, marginBottom: 3 },
  lectureTitle:{ fontSize: 13, fontWeight: '700', color: Colors.textDark, lineHeight: 18, marginBottom: 4 },
  lectureBy:   { fontSize: 11, color: Colors.textMuted },
  lectureRight:{ padding: 10, alignItems: 'flex-end', justifyContent: 'space-between' },
  bookmarkIcon:{ width: 20, height: 20, resizeMode: 'contain' },
  buyNowSmall: {
    backgroundColor: Colors.primary, paddingHorizontal: 10,
    paddingVertical: 6, borderRadius: 6,
  },
  buyNowSmallTxt: { fontSize: 11, fontWeight: '700', color: Colors.white },

  // Unlock modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  unlockSheet: {
    backgroundColor: Colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 28, paddingBottom: 40, alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: 16, right: 20 },
  closeTxt: { fontSize: 18, color: Colors.textMuted, fontWeight: '600' },
  illustration: { marginBottom: 16, marginTop: 8 },
  unlockTitle: { fontSize: 20, fontWeight: '900', color: Colors.textDark, marginBottom: 8, letterSpacing: 0.5 },
  unlockSub:   { fontSize: 13, color: Colors.textMuted, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  buyNowBtn: {
    backgroundColor: Colors.gold, paddingVertical: 14, paddingHorizontal: 40,
    borderRadius: 10, alignItems: 'center', width: '100%',
  },
  buyNowTxt: { fontSize: 16, fontWeight: '800', color: Colors.white },
});