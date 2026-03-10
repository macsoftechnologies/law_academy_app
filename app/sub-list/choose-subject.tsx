import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image, StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '../../components/ScreenWrapper';
import Colors from '../../constants/colors';
import { GridSubject, MOCK_GRID_SUBJECTS } from '../../data/mock/sublist.mock';
type Tab = 'civil' | 'criminal';

function GridCard({ item }: { item: GridSubject }) {
  const handlePress = () => {
    if (!item.purchased) {
      router.push({
        pathname: '/sub-list/subject-subjects',
        params: { subjectId: item.id, subjectTitle: item.title },
      } as any);
    }
    else {
      router.push({
        pathname: '/sub-list/subject-subjects',
        params: { subjectId: item.id, subjectTitle: item.title },
      } as any);
    }
  };

  return (
    <View style={s.gridCard}>
  <View style={s.thumbWrap}>
    <Image source={item.image} style={s.thumb} resizeMode="cover" />
  </View>

  <Text style={s.gridTitle}>{item.title}</Text>

  {item.purchased ? (
    <TouchableOpacity
      style={[s.gridBtn, s.purchasedBtn]}
      onPress={handlePress}   
    >
      <Text style={s.purchasedTxt}>Purchased</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[s.gridBtn, s.openBtn]}
      onPress={() => router.push('/sub-list/subject-course-detail')} 
    >
      <Text style={s.openTxt}>Open Now</Text>
    </TouchableOpacity>
  )}
</View>
  );
}

export default function ChooseSubjectScreen() {
  const params = useLocalSearchParams<{ stateTitle?: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('civil');
  const subjects = MOCK_GRID_SUBJECTS[activeTab];
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
        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>Choose Your Subject</Text>
          <Text style={s.headerSub}>{params.stateTitle ?? 'AP JCJ Subjects'}</Text>
        </View>
        
      </View>

      {/* Toggle tabs */}
      <View style={s.tabsWrap}>
        <TouchableOpacity
          style={[s.tab, activeTab === 'civil' && s.tabActive]}
          onPress={() => setActiveTab('civil')}
        >
          <Text style={[s.tabTxt, activeTab === 'civil' && s.tabTxtActive]}>Civil Laws</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.tab, activeTab === 'criminal' && s.tabActive]}
          onPress={() => setActiveTab('criminal')}
        >
          <Text style={[s.tabTxt, activeTab === 'criminal' && s.tabTxtActive]}>Criminal Laws</Text>
        </TouchableOpacity>
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
        <View style={s.grid}>
          {subjects.map(item => <GridCard key={item.id} item={item} />)}
        </View>
        <View style={{ height: 30 }} />
      </ScreenWrapper>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.screenBg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn:      { marginRight: 10 },
  backArrow:    { fontSize: 26, color: Colors.textDark, fontWeight: '300', lineHeight: 30 },
  headerCenter: { flex: 1 },
  headerTitle:  { fontSize: 17, fontWeight: '800', color: Colors.textDark },
  headerSub:    { fontSize: 12, color: Colors.textMuted, marginTop: 1 },
  cartBtn:      { padding: 4 },
  cartIcon:     { fontSize: 22 },

  tabsWrap: {
    flexDirection: 'row', marginHorizontal: 16, marginBottom: 16,
    backgroundColor: Colors.cardBg, borderRadius: 30, padding: 4,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  tab:          { flex: 1, paddingVertical: 10, borderRadius: 26, alignItems: 'center' },
  tabActive:    { backgroundColor: Colors.primary },
  tabTxt:       { fontSize: 14, fontWeight: '700', color: Colors.textMuted },
  tabTxtActive: { color: Colors.white },

  scroll: { paddingHorizontal: 16 },
  grid:   { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },

  gridCard: {
    width: '47.5%', backgroundColor: Colors.cardBg, borderRadius: 12,
    overflow: 'hidden', paddingBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  thumbWrap:    { position: 'relative' },
  thumb:        { width: '100%', height: 100 },
  thumbBadge: {
    position: 'absolute', top: 6, right: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2,
  },
  thumbBadgeTxt: { fontSize: 10, color: Colors.white, fontWeight: '700' },
  gridTitle: {
    fontSize: 13, fontWeight: '700', color: Colors.textDark,
    paddingHorizontal: 8, paddingTop: 8, marginBottom: 8,
  },
  gridBtn:      { marginHorizontal: 8, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  openBtn:      { backgroundColor: Colors.primary },
  openTxt:      { fontSize: 13, fontWeight: '700', color: Colors.white },
  purchasedBtn: { backgroundColor: Colors.gold },
  purchasedTxt: { fontSize: 13, fontWeight: '700', color: Colors.white },
});