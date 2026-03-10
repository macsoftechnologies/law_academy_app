import React from 'react';
import {
  View, Text, StyleSheet,
  Image, TouchableOpacity, StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../constants/colors';
import { MOCK_COMBO_CATEGORIES } from '../../data/mock/combo.mock';
import ScreenWrapper from '../../components/ScreenWrapper';

const C = Colors;

export default function ComboIndexScreen() {

  const handleRefresh = async () => {
    console.log('Refreshing...');
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <ScreenWrapper onRefresh={handleRefresh}>
        
        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Text style={s.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={s.headerTitle}>Combo Courses</Text>
        </View>

        <View style={s.scroll}>
          {MOCK_COMBO_CATEGORIES.map(cat => (
            <View key={cat.id} style={s.card}>
              <Image source={cat.image} style={s.cardImg} resizeMode="cover" />
              <View style={s.cardBody}>
                <Text style={s.cardTitle}>{cat.title}</Text>
                <TouchableOpacity
                  style={s.btn}
                  onPress={() =>
                    router.push({
                      pathname: '/combo/subject-list',
                      params: {
                        categoryId: cat.id,
                        categoryTitle: cat.title,
                      },
                    } as any)
                  }
                >
                  <Text style={s.btnTxt}>Explore more</Text>
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
  safe:   { flex: 1, backgroundColor: C.screenBg },
  scroll: { padding: 16 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark },

  card: {
    backgroundColor: C.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardImg:   { width: '100%', height: 200 },
  cardBody:  { padding: 14 },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: C.textDark,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: C.primary,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});