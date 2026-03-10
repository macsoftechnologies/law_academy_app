// app/combo/pmcombo/prelims.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  StatusBar, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../constants/colors';
import { PMCOMBO_PRELIMS_SECTIONS } from '../../../data/mock/pmcombo.mock';
import UnlockPopup from '../../../components/ui/UnlockPopup';

const C = Colors;
const DETAIL_ROUTE = '/combo/pmcombo/course-detail';

export default function PmComboPrelimsScreen() {
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>AP JCJ Prelims</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top blurred/preview banner */}
        {/* <Image source={require('../../../assets/images/combo_civil.png')} style={s.banner} resizeMode="cover" /> */}

        <View style={s.list}>
          {PMCOMBO_PRELIMS_SECTIONS.map((item, index) => (
            <View key={item.id} style={s.card}>
              

              <Image source={item.image} style={s.cardImg} resizeMode="cover" />
<View style={s.cardMeta}>
                <Text style={s.cardTitle}>{item.title}</Text>
                <View style={s.metaRow}>
                  <View style={s.metaChip}>
                    <Text style={s.metaChipTxt}>🟠 {item.questions}</Text>
                  </View>
                  <View style={s.metaChipBlue}>
                    <Text style={s.metaChipBlueTxt}>🕐 {item.mins}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={s.exploreBtn}
                onPress={() => {
                  // First section unlocked, rest locked → popup
                  if (index === 0) {
                    router.push({
                      pathname: '/combo/pmcombo/section-list',
                      params: { title: item.title },
                    } as any);
                  } else {
                    setPopupVisible(true);
                  }
                }}
              >
                <Text style={s.exploreBtnTxt}>Explore more</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      <UnlockPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        detailRoute={DETAIL_ROUTE}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.screenBg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark },

  banner: { width: '100%', height: 180 },
  list:   { padding: 16, gap: 14 },

  card: {
    backgroundColor: C.cardBg, borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.07,
    shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  cardMeta:    { padding: 14, paddingBottom: 10 },
  cardTitle:   { fontSize: 16, fontWeight: '700', color: C.textDark, marginBottom: 8 },
  metaRow:     { flexDirection: 'row', gap: 8 },
  metaChip:    { backgroundColor: '#FFF3E0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  metaChipTxt: { fontSize: 12, fontWeight: '600', color: '#E65100' },
  metaChipBlue:    { backgroundColor: '#E3F2FD', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  metaChipBlueTxt: { fontSize: 12, fontWeight: '600', color: '#1565C0' },
  cardImg:     { width: '100%', height: 160 },
  exploreBtn:  {
    backgroundColor: C.primary, margin: 14, marginTop: 12,
    paddingVertical: 13, borderRadius: 10, alignItems: 'center',
  },
  exploreBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});