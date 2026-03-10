// app/(tabs)/notes/subject-items.tsx
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal, Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import { NOTE_SUBJECT_ITEMS } from '../../../data/mock/notes.mock';

const C = Colors;
const DETAIL_ROUTE = '/notes/detail';

const PREVIEW_TEXT =
  `(a) The "participatory model" which emphasises a transformative governance of the community is the mainstream of the strong juvenile and the maximisation of legal intervention in their lives.\n\nPrinciples under the Juvenile Justice (Care and Protection of Children) Act 2015\nThe JJ Act has dedicated our chapter to Principles, thus emphasising the importance of making the Act in the light of the principal while implementing the same.`;

export default function NoteSubjectItemsScreen() {
  const { categoryTitle } = useLocalSearchParams<{ categoryTitle: string }>();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleBuyNow = () => {
    setPopupVisible(false);
    router.push(DETAIL_ROUTE as any);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle} numberOfLines={1}>
          {categoryTitle ? `AP ${categoryTitle} Notes` : 'Notes'}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

       

        {/* Subject items */}
        {NOTE_SUBJECT_ITEMS.map(item => (
          <TouchableOpacity
            key={item.id}
            style={s.subjectCard}
            activeOpacity={item.locked ? 0.75 : 1}
            onPress={() => item.locked && setPopupVisible(true)}
          >
            {/* Blurred preview */}
            <View style={s.previewWrap}>
              <Text style={[s.previewTxt, item.locked && s.blurred]} numberOfLines={5}>
                {PREVIEW_TEXT}
              </Text>
              {item.locked && (
                <View style={s.lockOverlay}>
                  <Text style={s.lockEmoji}>🔒</Text>
                </View>
              )}
            </View>

            {/* Footer */}
            <View style={s.cardFooter}>
              <View style={s.cardLeft}>
                <Text style={s.cardTitle}>{item.title}</Text>
                <View style={s.tagRow}>
                  <View style={s.tagOrange}>
                    <Text style={s.tagOrangeTxt}>🕐 Real Time examples</Text>
                  </View>
                  <View style={s.tagBlue}>
                    <Text style={s.tagBlueTxt}>👁 100+ Views</Text>
                  </View>
                </View>
              </View>
              <Text style={s.bookmarkIcon}>🔖</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ── UNLOCK POPUP (Image 10) */}
      <Modal
        transparent
        animationType="slide"
        visible={popupVisible}
        onRequestClose={() => setPopupVisible(false)}
      >
        <Pressable style={s.backdrop} onPress={() => setPopupVisible(false)}>
          <Pressable style={s.popupSheet} onPress={() => {}}>
            {/* Close */}
            <TouchableOpacity style={s.closeBtn} onPress={() => setPopupVisible(false)}>
              <Text style={s.closeTxt}>✕</Text>
            </TouchableOpacity>

            {/* Illustration */}
            <View style={s.illustration}>
              <Text style={s.illustrationEmoji}>⚖️</Text>
              <View style={s.lockBadge}>
                <Text style={s.lockBadgeTxt}>UNLOCK{'\n'}YOUR{'\n'}COURSE</Text>
              </View>
            </View>

            <Text style={s.popupTitle}>UNLOCK FULL ACCESS</Text>
            <Text style={s.popupSub}>To continue watching, purchase the full course</Text>

            <TouchableOpacity style={s.buyBtn} onPress={handleBuyNow}>
              <Text style={s.buyBtnTxt}>Buy Now  🛒</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark, flex: 1 },

  watermarkCard: {
    backgroundColor: C.cardBg, borderRadius: 14,
    padding: 14, marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  watermarkTxt: { fontSize: 11, color: C.textMuted, lineHeight: 18 },

  subjectCard: {
    backgroundColor: C.cardBg, borderRadius: 14, overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  previewWrap: { height: 90, overflow: 'hidden', position: 'relative' },
  previewTxt:  { fontSize: 11, color: C.textMuted, padding: 12, lineHeight: 17 },
  blurred:     { opacity: 0.12 },
  lockOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  lockEmoji: { fontSize: 30 },

  cardFooter: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: C.border,
  },
  cardLeft:   { flex: 1 },
  cardTitle:  { fontSize: 15, fontWeight: '700', color: C.textDark, marginBottom: 8 },
  tagRow:     { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tagOrange:  { backgroundColor: '#FFF3E0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tagOrangeTxt: { fontSize: 11, color: '#E65100', fontWeight: '600' },
  tagBlue:    { backgroundColor: '#E3F2FD', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  tagBlueTxt: { fontSize: 11, color: '#1565C0', fontWeight: '600' },
  bookmarkIcon: { fontSize: 20, marginLeft: 8 },

  // Popup
  backdrop:    { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
  popupSheet: {
    backgroundColor: C.cardBg,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 28, alignItems: 'center', paddingBottom: 40,
  },
  closeBtn: {
    position: 'absolute', top: 16, right: 20,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center',
  },
  closeTxt: { fontSize: 14, color: C.textDark, fontWeight: '700' },

  illustration: {
    width: 140, height: 140, backgroundColor: '#EEF1FA',
    borderRadius: 70, alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, marginTop: 10, position: 'relative',
  },
  illustrationEmoji: { fontSize: 48 },
  lockBadge: {
    position: 'absolute', bottom: 8, right: 8,
    backgroundColor: C.primary, borderRadius: 8,
    paddingHorizontal: 6, paddingVertical: 4,
  },
  lockBadgeTxt: { fontSize: 7, fontWeight: '800', color: C.white, textAlign: 'center', lineHeight: 10 },

  popupTitle: { fontSize: 20, fontWeight: '900', color: C.textDark, marginBottom: 8, letterSpacing: 0.3 },
  popupSub:   { fontSize: 13, color: C.textMuted, textAlign: 'center', marginBottom: 24, lineHeight: 20 },

  buyBtn: {
    backgroundColor: C.gold, width: '100%',
    paddingVertical: 16, borderRadius: 12, alignItems: 'center',
  },
  buyBtnTxt: { fontSize: 16, fontWeight: '800', color: C.white },
});