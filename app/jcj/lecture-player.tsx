
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Image, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../constants/colors';
import { MOCK_LECTURE_DETAIL } from '../../data/mock/jcj.mock';
import ScreenWrapper from '../../components/ScreenWrapper';

export default function LecturePlayerScreen() {
  const lecture = MOCK_LECTURE_DETAIL;
  const [progress, setProgress] = useState(0.15); 
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
        <Text style={s.headerTitle}>LECTURE {lecture.number}</Text>
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
        {/* Video player area */}
        <View style={s.playerWrap}>
          <Image source={lecture.image} style={s.videoThumb} resizeMode="cover" />
          {/* Play button overlay */}
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
              <View style={[s.scrubberFill, { width: `${progress * 100}%` }]} />
              <View style={[s.scrubberThumb, { left: `${progress * 100}%` }]} />
            </View>
          </View>
        </View>

        <View style={s.body}>
          {/* Title + Download */}
          <View style={s.titleRow}>
            <Text style={s.lectureTitle}>{lecture.title}</Text>
            <TouchableOpacity style={s.downloadBtn}>
              <Text style={s.downloadTxt}>Download ⬇</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={s.descHead}>Description</Text>
          <Text style={s.descTxt}>{lecture.description}</Text>

          <View style={{ height: 100 }} />
        </View>
      </ScreenWrapper>

      {/* Notes PDF bottom button */}
      <View style={s.bottomBar}>
        <TouchableOpacity style={s.notesPdfBtn}>
          <Text style={s.notesPdfTxt}>Notes PDF</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: { fontSize: 16, fontWeight: '800', color: Colors.textDark, letterSpacing: 1 },

  // Video player
  playerWrap: {
    width: '100%', height: 220,
    backgroundColor: '#000', position: 'relative',
  },
  videoThumb: { width: '100%', height: '100%' },
  playOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
  },
  playCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2, borderColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  playTxt:      { fontSize: 24, color: Colors.white, marginLeft: 4 },
  durationBadge:{
    position: 'absolute', bottom: 32, right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4,
  },
  durationTxt: { fontSize: 12, color: Colors.white, fontWeight: '600' },
  scrubberWrap: {
    position: 'absolute', bottom: 12, left: 12, right: 12,
  },
  scrubberTrack: {
    height: 3, backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2, position: 'relative',
  },
  scrubberFill: {
    position: 'absolute', height: '100%',
    backgroundColor: Colors.primary, borderRadius: 2,
  },
  scrubberThumb: {
    position: 'absolute', top: -5,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: Colors.primary,
    marginLeft: -7,
  },

  // Body
  body: { padding: 16 },
  titleRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', gap: 10, marginBottom: 14,
  },
  lectureTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDark, flex: 1, lineHeight: 24 },
  downloadBtn: {
    backgroundColor: Colors.screenBg, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 7,
    borderWidth: 1, borderColor: Colors.border,
  },
  downloadTxt: { fontSize: 12, fontWeight: '700', color: Colors.textDark },

  descHead: { fontSize: 15, fontWeight: '800', color: Colors.textDark, marginBottom: 8 },
  descTxt:  { fontSize: 13, color: Colors.textMuted, lineHeight: 21 },

  // Bottom bar
  bottomBar: {
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: Colors.screenBg,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  notesPdfBtn: {
    backgroundColor: Colors.primary, paddingVertical: 15,
    borderRadius: 10, alignItems: 'center',
  },
  notesPdfTxt: { fontSize: 15, fontWeight: '700', color: Colors.white },
});