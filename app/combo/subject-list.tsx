import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '../../components/ScreenWrapper';
import Colors from '../../constants/colors';
import { MOCK_COMBO_SUBJECTS } from '../../data/mock/combo.mock';

const C = Colors;

export default function ComboSubjectListScreen() {
  const { categoryId, categoryTitle } = useLocalSearchParams<{
    categoryId?: string;
    categoryTitle?: string;
  }>();

  const subjects = MOCK_COMBO_SUBJECTS[categoryId ?? 'civil'] ?? [];
  const title = categoryTitle ?? 'Civil Laws';

  const handleRefresh = async () => {
    console.log('Refreshing subjects...');
    
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <ScreenWrapper onRefresh={handleRefresh}>

        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Text style={s.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={s.headerTitle}>{title}</Text>
        </View>

        <View style={s.scroll}>
          {subjects.map(subject => (
            <View key={subject.id} style={s.card}>
              <Image source={subject.image} style={s.cardImg} resizeMode="cover" />
              <View style={s.cardBody}>
                <Text style={s.cardTitle}>{subject.title}</Text>
                <TouchableOpacity
                  style={s.btn}
                  onPress={() =>
                    router.push({
                      pathname: '/combo/lectures',
                      params: {
                        subjectId: subject.id,
                        subjectTitle: subject.title,
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