// app/combo/pmcombo/section-list.tsx
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
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
import UnlockPopup from '../../../components/ui/UnlockPopup';
import Colors from '../../../constants/colors';
import { PMCOMBO_SECTION_SUBJECTS } from '../../../data/mock/pmcombo.mock';

const C = Colors;
const DETAIL_ROUTE = '/combo/pmcombo/course-detail';
const BANNER_IMG = require('../../../assets/images/combo_civil.png');

export default function PmComboSectionListScreen() {
  const { title } = useLocalSearchParams<{ title: string }>();
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle} numberOfLines={1}>{title || 'Section'}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={BANNER_IMG} style={s.banner} resizeMode="cover" />

        <View style={s.list}>
          {PMCOMBO_SECTION_SUBJECTS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={s.card}
              activeOpacity={item.locked ? 0.7 : 1}
              onPress={() => {
                if (item.locked) setPopupVisible(true);
              }}
            >
              <View style={s.cardThumb}>
                <Image source={BANNER_IMG} style={s.thumbImg} resizeMode="cover" />
                {item.locked && (
                  <View style={s.lockOverlay}>
                    <Text style={s.lockIcon}>🔒</Text>
                  </View>
                )}
              </View>

              <View style={s.cardBody}>
                <View style={s.cardTopRow}>
                  <Text style={s.cardTitle}>{item.title}</Text>
                  <Image
  source={require('../../../assets/images/Component15.png')}
  style={s.bookmarkIcon}
/>
                </View>
                <View style={s.tagRow}>
                  {item.tags.map((tag, i) => (
                    <View key={i} style={[s.tag, i === 0 ? s.tagOrange : s.tagBlue]}>
                      <Text style={[s.tagTxt, i === 0 ? s.tagTxtOrange : s.tagTxtBlue]}>
                        {i === 0 ? '🟠 ' : '🔵 '}{tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
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
  safe:   { flex: 1, backgroundColor: C.screenBg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark, flex: 1 },
  banner: { width: '100%', height: 180 },
  list:   { padding: 16, gap: 12 },
  card: {
    backgroundColor: C.cardBg, borderRadius: 14, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  cardThumb:   { width: '100%', height: 130, position: 'relative' },
  thumbImg:    { width: '100%', height: '100%' },
  lockOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center',
  },
  lockIcon:    { fontSize: 32 },
  cardBody:    { padding: 12 },
  cardTopRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle:   { fontSize: 15, fontWeight: '700', color: C.textDark, flex: 1, marginRight: 8 },
  bookmarkIcon: {
  width: 24,
  height: 24,
  marginLeft: 8,
  resizeMode: 'contain',
},
  tagRow:      { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  tag:         { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  tagOrange:   { backgroundColor: '#FFF3E0' },
  tagBlue:     { backgroundColor: '#E3F2FD' },
  tagTxt:      { fontSize: 11, fontWeight: '600' },
  tagTxtOrange:{ color: '#E65100' },
  tagTxtBlue:  { color: '#1565C0' },
});