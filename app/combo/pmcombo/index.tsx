// app/combo/pmcombo/index.tsx
import React from 'react';
import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../constants/colors';
import { PMCOMBO_CARDS } from '../../../data/mock/pmcombo.mock';
import ScreenWrapper from '../../../components/ScreenWrapper';
const C = Colors;

export default function PmComboIndexScreen() {
  const onRefresh = async () => {
  await new Promise(res => setTimeout(res, 1200));
};
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Combinations</Text>
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
        {PMCOMBO_CARDS.map(card => (
          <View key={card.id} style={s.card}>
            <Image source={card.image} style={s.cardImg} resizeMode="cover" />
            <View style={s.cardBody}>
              <Text style={s.cardTitle}>{card.title}</Text>
              {card.price ? <Text style={s.cardPrice}>{card.price}</Text> : null}
              <TouchableOpacity
                style={s.btn}
                onPress={() => router.push(card.route as any)}
              >
                <Text style={s.btnTxt}>Explore more</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ height: 30 }} />
      </ScreenWrapper>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.screenBg },
  scroll: { padding: 16 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark },

  card: {
    backgroundColor: C.cardBg,
    borderRadius: 16, overflow: 'hidden',
    marginBottom: 16,
    marginHorizontal: 16,  
  marginTop: 16, 
    shadowColor: '#000', shadowOpacity: 0.07,
    shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
    
  },
  cardImg:   { width: '100%', height: 200 },
  cardBody:  { padding: 14 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: C.textDark, marginBottom: 6 },
  cardPrice: { fontSize: 18, fontWeight: '800', color: C.textDark, marginBottom: 10 },
  btn: {
    backgroundColor: C.primary, paddingVertical: 13,
    borderRadius: 10, alignItems: 'center',
  },
  btnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});