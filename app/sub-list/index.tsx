import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '../../components/ScreenWrapper';
import Colors from '../../constants/colors';
import { MOCK_SUBJECT_STATES } from '../../data/mock/sublist.mock';

export default function SubListIndexScreen() {
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
        <Text style={s.headerTitle}>JCJ Subject List</Text>
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
  <View style={s.scroll}>
    {MOCK_SUBJECT_STATES.map(item => (
      <View key={item.id} style={s.card}>
        <Image source={item.image} style={s.cardImg} resizeMode="cover" />
        <View style={s.cardBody}>
          <Text style={s.cardTitle}>{item.title}</Text>
          <TouchableOpacity
            style={s.exploreBtn}
            onPress={() =>
              router.push({
                pathname: '/sub-list/choose-subject',
                params: { stateId: item.id, stateTitle: item.title },
              } as any)
            }
          >
            <Text style={s.exploreBtnTxt}>Explore more</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
    <View style={{ height: 30 }} />
  </View>
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
  cardImg:  { width: '100%', height: 180 },
  cardBody: { padding: 14 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.textDark, marginBottom: 12 },
  exploreBtn: {
    backgroundColor: Colors.primary, paddingVertical: 13,
    borderRadius: 10, alignItems: 'center',
  },
  exploreBtnTxt: { fontSize: 15, fontWeight: '700', color: Colors.white },
});