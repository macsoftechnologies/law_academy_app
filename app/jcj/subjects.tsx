
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
import { MOCK_SUBJECT_CATEGORIES } from '../../data/mock/jcj.mock';
export default function SubjectsScreen() {
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
        <Text style={s.headerTitle}>Andhra Pradesh JCJ</Text>
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
        {MOCK_SUBJECT_CATEGORIES.map(cat => (
          <View key={cat.id} style={s.card}>
            <Image source={cat.image} style={s.cardImg} resizeMode="cover" />
            <View style={s.cardBody}>
              <Text style={s.cardTitle}>{cat.title}</Text>
              <TouchableOpacity
                style={s.exploreBtn}
                onPress={() => router.push(`/jcj/subject-list?category=${cat.id}` as any)}
              >
                <Text style={s.exploreBtnTxt}>Explore more</Text>
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
  safe:   { flex: 1, backgroundColor: Colors.screenBg },
  scroll: { padding: 16 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
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
  cardTitle: { fontSize: 15, fontWeight: '700', color: Colors.textDark, marginBottom: 12 },
  exploreBtn: {
    backgroundColor: Colors.primary, paddingVertical: 13,   borderWidth: 1,alignItems: 'center',
  justifyContent: 'center', 
  borderRadius: 10,
  },
  exploreBtnTxt: { fontSize: 15, fontWeight: '700', color: Colors.white },
});