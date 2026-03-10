import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Image, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/colors';
import { MOCK_COMBO_LECTURE_DETAIL } from '../../data/mock/combo.mock';
import ScreenWrapper from '../../components/ScreenWrapper';
const C = Colors;

export default function ComboLectureDetailScreen() {
  const { lectureNumber, lectureTitle, paid } = useLocalSearchParams<{
    lectureNumber?: string;
    lectureTitle?: string;
    paid?: string;
  }>();
const handleRefresh = async () => {
  console.log('Refreshing lecture detail...');
  
};
  const isPaid        = paid === '1';
  const lecture       = MOCK_COMBO_LECTURE_DETAIL;
  const [progress]    = useState(0.15);
  const displayTitle  = lectureTitle ?? lecture.title;
  const displayNumber = lectureNumber ?? '1';

  // 🔒 Guard: if not paid, redirect to payment immediately
  useEffect(() => {
    if (!isPaid) {
      router.replace('/combo/course-detail' as any);
    }
  }, [isPaid]);

  // While redirecting, render nothing to avoid flash
  if (!isPaid) return null;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>LECTURE {displayNumber}</Text>
      </View>

      <ScreenWrapper onRefresh={handleRefresh}>

        {/* ── Video player (only shown when paid) ── */}
        <View style={s.playerWrap}>
          <Image source={lecture.image} style={s.videoThumb} resizeMode="cover" />

          {/* Play button — always visible here since we only reach this screen when paid */}
          <TouchableOpacity style={s.playOverlay} activeOpacity={0.85}>
            <View style={s.playCircle}>
              <Text style={s.playTxt}>▶</Text>
            </View>
          </TouchableOpacity>

          {/* Duration badge */}
          <View style={s.durationBadge}>
            <Text style={s.durationTxt}>{lecture.duration}</Text>
          </View>

          {/* Scrubber */}
          <View style={s.scrubberWrap}>
            <View style={s.scrubberTrack}>
              <View style={[s.scrubberFill, { width: `${progress * 100}%` as any }]} />
              <View style={[s.scrubberThumb, { left: `${progress * 100}%` as any }]} />
            </View>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={s.body}>
          <Text style={s.lectureTitle}>{displayTitle}</Text>
          <Text style={s.descHead}>Description</Text>
          <Text style={s.descTxt}>{lecture.description}</Text>
          <View style={{ height: 100 }} />
        </View>
      </ScreenWrapper>

      {/* Notes PDF button */}
      <View style={s.bottomBar}>
        <TouchableOpacity style={s.pdfBtn}>
          <Text style={s.pdfBtnTxt}>Notes PDF</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: { fontSize: 15, fontWeight: '800', color: C.textDark, letterSpacing: 1 },

  playerWrap: {
    width: '100%', height: 220,
    backgroundColor: '#111', position: 'relative',
  },
  videoThumb: { width: '100%', height: '100%' },

  playOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
  },
  playCircle: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 2, borderColor: C.white,
    alignItems: 'center', justifyContent: 'center',
  },
  playTxt: { fontSize: 22, color: C.white, marginLeft: 3 },

  durationBadge: {
    position: 'absolute', bottom: 30, right: 10,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4,
  },
  durationTxt: { fontSize: 11, color: C.white, fontWeight: '600' },

  scrubberWrap: { position: 'absolute', bottom: 10, left: 10, right: 10 },
  scrubberTrack: {
    height: 3, backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2, position: 'relative',
  },
  scrubberFill: {
    position: 'absolute', height: '100%',
    backgroundColor: C.primary, borderRadius: 2,
  },
  scrubberThumb: {
    position: 'absolute', top: -5,
    width: 13, height: 13, borderRadius: 7,
    backgroundColor: C.primary, marginLeft: -6,
  },

  body: { padding: 16 },
  lectureTitle: {
    fontSize: 20, fontWeight: '800', color: C.textDark,
    marginBottom: 12, lineHeight: 26,
  },
  descHead: { fontSize: 14, fontWeight: '800', color: C.textDark, marginBottom: 6 },
  descTxt:  { fontSize: 13, color: C.textMuted, lineHeight: 21 },

  bottomBar: {
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: C.screenBg,
    borderTopWidth: 1, borderTopColor: C.border,
  },
  pdfBtn: {
    backgroundColor: C.primary,
    paddingVertical: 15, borderRadius: 10, alignItems: 'center',
  },
  pdfBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});