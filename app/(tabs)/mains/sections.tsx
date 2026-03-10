
import { MAINS_SECTIONS_LIST } from '@/data/mock/mains.mock';
import { router } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';

const C = Colors;


export default function SectionsScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>AP JCJ Mains Preparation</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

       

        {/* Section cards */}
        {MAINS_SECTIONS_LIST.map(item => (
          <View key={item.id} style={s.card}>
            {/* Full-width section image */}
            <Image source={item.image} style={s.cardImg} resizeMode="cover" />

            <View style={s.cardBody}>
              <Text style={s.cardTitle}>{item.title}</Text>
              <Text style={s.subTitle}>{item.subtitle}</Text>

              {/* Tags */}
              <View style={s.tagsRow}>
                <View style={s.tagRed}>
                  <Text style={s.tagRedTxt}>🔴 {item.questions} Ques</Text>
                </View>
                <View style={s.tagGold}>
                  <Text style={s.tagGoldTxt}>🕐 {item.mins} mins</Text>
                </View>
              </View>

              {/* Explore more */}
              <TouchableOpacity
                style={s.btnPrimary}
                onPress={() => router.push(item.route as any)}
              >
                <Text style={s.btnPrimaryTxt}>Explore more</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 90 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.screenBg },
  scroll: { padding: 16 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark },

  watermarkCard: {
    backgroundColor: C.cardBg, borderRadius: 14, padding: 14, marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  watermarkTxt: { fontSize: 11, color: C.textMuted, lineHeight: 18 },

  card: {
    backgroundColor: C.cardBg, borderRadius: 16, overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.07,
    shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  cardImg:  { width: '100%', height: 170 },
  cardBody: { padding: 14 },

  cardTitle: { fontSize: 16, fontWeight: '800', color: C.textDark, marginBottom: 2 },
    subTitle: { fontSize: 12, fontWeight: '500', color: C.textDark, marginBottom: 10 },

  tagsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  tagRed:  { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF0F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagRedTxt: { fontSize: 12, fontWeight: '700', color: '#C0392B' },
  tagGold:   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF8E1', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagGoldTxt:{ fontSize: 12, fontWeight: '700', color: '#C9A227' },

  btnPrimary: {
    backgroundColor: C.primary,
    paddingVertical: 13, borderRadius: 10, alignItems: 'center',
  },
  btnPrimaryTxt: { fontSize: 14, fontWeight: '700', color: C.white },
});