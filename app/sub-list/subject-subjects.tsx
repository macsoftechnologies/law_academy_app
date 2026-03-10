import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  Image, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/colors';
import { MOCK_CIVIL_SUBJECTS } from '../../data/mock/sublist.mock';
import ScreenWrapper from '../../components/ScreenWrapper';
export default function SubjectSubjectsScreen() {
  const params = useLocalSearchParams<{ subjectTitle?: string }>();
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const toggleFav = (id: string) => setFavorites(p => ({ ...p, [id]: !p[id] }));
const onRefresh = async () => {
  await new Promise(res => setTimeout(res, 1200));
};
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Civil Laws</Text>
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
        {MOCK_CIVIL_SUBJECTS.map(subject => (
          <View key={subject.id} style={s.card}>
            <Image source={subject.image} style={s.cardImg} resizeMode="cover" />
            <View style={s.cardBody}>

              {subject.purchased ? (
                /* ── Purchased state ── */
                <>
                  <View style={s.purchasedRow}>
                    <Text style={s.cardTitle}>{subject.title}</Text>
                    <View style={s.tagsCol}>
                      <View style={s.tagOrange}>
                        <Text style={s.tagOrangeTxt}>{subject.timeLeft}</Text>
                      </View>
                      <View style={s.tagGrey}>
                        <Text style={s.tagGreyTxt}>{subject.duration}</Text>
                      </View>
                    </View>
                  </View>
                  {subject.endsOn ? (
                    <Text style={s.endsOn}>Ends on {subject.endsOn}</Text>
                  ) : null}
                  {/* "Open" stays in sub-list — no cross-folder route */}
                  <TouchableOpacity style={s.openBtn}>
                    <Text style={s.openBtnTxt}>Open</Text>
                  </TouchableOpacity>
                </>
              ) : (
                /* ── Unpurchased state ── */
                <>
                  <View style={s.unpurchasedRow}>
                    <Text style={s.cardTitle}>{subject.title}</Text>
                    {subject.id === 'relief' && (
                      <TouchableOpacity onPress={() => toggleFav(subject.id)}>
                        <Text style={[s.heart, favorites[subject.id] && s.heartFilled]}>
                          {favorites[subject.id] ? '♥' : '♡'}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <TouchableOpacity
                    style={s.exploreBtn}
                    onPress={() =>
                      router.push({
                        pathname: '/sub-list/subject-course-detail',
                        params: { subjectId: subject.id, subjectTitle: subject.title },
                      } as any)
                    }
                  >
                    <Text style={s.exploreBtnTxt}>Explore more</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}
        <View style={{ height: 30 }} />
      </ScreenWrapper>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: Colors.screenBg },
  scroll: { padding: 16 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 26, color: Colors.textDark, fontWeight: '300', lineHeight: 30 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDark },

  card: {
    backgroundColor: Colors.cardBg, borderRadius: 16, overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  cardImg:  { width: '100%', height: 175 },
  cardBody: { padding: 14 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.textDark, flex: 1, lineHeight: 22 },

  // Purchased
  purchasedRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  tagsCol:      { gap: 5, marginLeft: 8 },
  tagOrange: {
    backgroundColor: '#FFF3E0', paddingHorizontal: 10,
    paddingVertical: 4, borderRadius: 20,
  },
  tagOrangeTxt: { fontSize: 11, fontWeight: '700', color: '#E65100' },
  tagGrey: {
    backgroundColor: Colors.screenBg, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1, borderColor: Colors.border,
  },
  tagGreyTxt: { fontSize: 11, fontWeight: '600', color: Colors.textMuted },
  endsOn:     { fontSize: 12, color: Colors.primary, fontWeight: '600', marginBottom: 12 },
  openBtn: {
    backgroundColor: Colors.primary, paddingVertical: 13,
    borderRadius: 10, alignItems: 'center',
  },
  openBtnTxt: { fontSize: 15, fontWeight: '700', color: Colors.white },

  // Unpurchased
  unpurchasedRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  heart:       { fontSize: 22, color: Colors.textMuted },
  heartFilled: { color: Colors.crimson },
  exploreBtn: {
    backgroundColor: Colors.primary, paddingVertical: 13,
    borderRadius: 10, alignItems: 'center',
  },
  exploreBtnTxt: { fontSize: 15, fontWeight: '700', color: Colors.white },
});