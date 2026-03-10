
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '../../components/ScreenWrapper';
import Colors from '../../constants/colors';
import { MOCK_GUEST_DETAIL } from '../../data/mock/guest.mock';

// ─── Unlock Full Access modal (Image 3) ───────────────────────────────────────
function UnlockModal({
  visible, onClose,
}: { visible: boolean; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* Dim backdrop — tapping does NOT close so user must tap X */}
      <View style={s.backdrop} />
      <View style={s.sheetOuter}>
        <View style={s.sheet}>
          {/* Close X */}
          <TouchableOpacity style={s.closeBtn} onPress={onClose}>
            <Text style={s.closeTxt}>✕</Text>
          </TouchableOpacity>

          {/* Illustration */}
          <View style={s.illustration}>
            <Text style={{ fontSize: 64 }}>⚖️</Text>
            <Text style={{ fontSize: 40, position: 'absolute', bottom: 0, right: 0 }}>📚</Text>
          </View>

          <Text style={s.unlockTitle}>UNLOCK FULL ACCESS</Text>
          <Text style={s.unlockSub}>
            To continue watching, purchase the full course
          </Text>

          <TouchableOpacity
            style={s.buyBtn}
            onPress={() => {
              onClose();
              router.push('/jcj/course-detail' as any);
            }}
          >
            <Text style={s.buyBtnTxt}>Buy Now  🛒</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function GuestDetailScreen() {
  const params = useLocalSearchParams<{ id: string; locked: string }>();
  const isLocked = params.locked === '1';

  const lecture = MOCK_GUEST_DETAIL;

  const [showUnlock, setShowUnlock] = useState(false);
  useEffect(() => {
    if (isLocked) {
      // Small delay so screen renders first, then modal slides up
      const t = setTimeout(() => setShowUnlock(true), 350);
      return () => clearTimeout(t);
    }
  }, [isLocked]);
const handleRefresh = async () => {
  console.log('Refreshing...');
  await new Promise(res => setTimeout(res, 1000));
};
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>{lecture.title}</Text>
      </View>

      <ScreenWrapper onRefresh={handleRefresh}>
        {/* Hero image */}
        <Image source={lecture.image} style={s.heroImg} resizeMode="cover" />

        <View style={s.body}>
          {/* Title */}
          <Text style={s.lectureTitle}>{lecture.title}</Text>

          {/* About the Class */}
          <Text style={s.sectionHead}>About the Class</Text>
          <Text style={s.bodyTxt}>{lecture.aboutClass}</Text>

          {/* About the Lecture */}
          <Text style={s.sectionHead}>About the Lecture</Text>
          <Text style={s.bodyTxt}>{lecture.aboutLecture}</Text>

          <View style={{ height: 90 }} />
        </View>
      </ScreenWrapper>

      {/* Bottom action — Watch Video (only shown when unlocked) */}
      {!isLocked && (
        <View style={s.bottomBar}>
          <TouchableOpacity
            style={s.watchBtn}
            onPress={() => router.push('' as any)}
          >
            <Text style={s.watchBtnTxt}>Watch Video</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Unlock modal — shown when locked */}
      <UnlockModal
        visible={showUnlock}
        onClose={() => setShowUnlock(false)}
      />
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.screenBg },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 26, color: Colors.textDark, fontWeight: '300', lineHeight: 30 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDark },

  heroImg: { width: '100%', height: 220 },

  body: { padding: 16 },

  lectureTitle: {
    fontSize: 20, fontWeight: '800', color: Colors.textDark,
    marginTop: 6, marginBottom: 14, lineHeight: 26,
  },
  sectionHead: {
    fontSize: 15, fontWeight: '800', color: Colors.textDark, marginBottom: 6,
  },
  bodyTxt: {
    fontSize: 13, color: Colors.textMuted, lineHeight: 20, marginBottom: 18,
  },

  // Bottom bar
  bottomBar: {
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: Colors.screenBg,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  watchBtn: {
    backgroundColor: Colors.primary, paddingVertical: 15,
    borderRadius: 10, alignItems: 'center',
  },
  watchBtnTxt: { fontSize: 15, fontWeight: '700', color: Colors.white },

  // Unlock modal
  backdrop: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetOuter: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
  },
  sheet: {
    backgroundColor: Colors.screenBg,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 28, paddingBottom: 44,
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: 16, right: 20 },
  closeTxt: { fontSize: 20, color: Colors.textMuted, fontWeight: '600' },

  illustration: {
    width: 120, height: 120,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 18, marginTop: 12,
  },
  unlockTitle: {
    fontSize: 22, fontWeight: '900', color: Colors.textDark,
    letterSpacing: 0.5, marginBottom: 10,
  },
  unlockSub: {
    fontSize: 14, color: Colors.textMuted,
    textAlign: 'center', lineHeight: 21, marginBottom: 28,
  },
  buyBtn: {
    backgroundColor: Colors.gold, paddingVertical: 14,
    paddingHorizontal: 40, borderRadius: 10,
    alignItems: 'center', width: '100%',
  },
  buyBtnTxt: { fontSize: 16, fontWeight: '800', color: Colors.white },
});