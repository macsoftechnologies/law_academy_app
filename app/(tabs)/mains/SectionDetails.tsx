
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';

const C = Colors;


export interface SectionItem {
  id: string;
  label: string;
  questions: number;
  mins: number;
}

interface Props {
  title: string;
  items: SectionItem[];
}

export default function SectionDetail({ title, items }: Props) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? items.filter(i => i.label.toLowerCase().includes(search.toLowerCase()))
    : items;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle} numberOfLines={1}>{title}</Text>
      </View>

      {/* Search bar */}
      <View style={s.searchWrap}>
        <Text style={s.searchIcon}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Search for..."
          placeholderTextColor={C.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {filtered.map(item => (
          <View key={item.id} style={s.card}>
            {/* Preview watermark */}
            <View style={s.preview}>
  <Image
    source={require('../../../assets/images/cat_ddj.png')}
    style={s.previewImage}
  />
</View>

            {/* Card body */}
            <View style={s.body}>
              <Text style={s.itemLabel}>{item.label}</Text>

              {/* Tags */}
              <View style={s.tagsRow}>
                <View style={s.tagRed}>
                  <Text style={s.tagRedTxt}>🔴 {item.questions} Ques</Text>
                </View>
                <View style={s.tagGold}>
                  <Text style={s.tagGoldTxt}>🕐 {item.mins} mins</Text>
                </View>
              </View>

              {/* [Watch now | View Pdf] */}
              <View style={s.btnRow}>
                <TouchableOpacity style={s.btnOutline}>
                  <Text style={s.btnOutlineTxt}>Watch now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.btnPrimary}>
                  <Text style={s.btnPrimaryTxt}>View Pdf</Text>
                </TouchableOpacity>
              </View>
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

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark, flex: 1 },

  // Search bar
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: C.cardBg,
    marginHorizontal: 16, marginBottom: 12,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  searchIcon:  { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: C.textDark, padding: 0 },

  scroll: { paddingHorizontal: 16 },

  // Card
  card: {
    backgroundColor: C.cardBg, borderRadius: 16, overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },

  // Preview area
 preview: {
  height: 180,
  overflow: 'hidden',
  borderBottomWidth: 1,
  borderBottomColor: C.border,
},

previewImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
  // Body
  body: { padding: 14 },
  itemLabel: { fontSize: 15, fontWeight: '800', color: C.textDark, marginBottom: 10 },

  tagsRow:   { flexDirection: 'row', gap: 10, marginBottom: 14 },
  tagRed:    { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF0F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagRedTxt: { fontSize: 12, fontWeight: '700', color: '#C0392B' },
  tagGold:   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF8E1', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagGoldTxt:{ fontSize: 12, fontWeight: '700', color: '#C9A227' },

  btnRow: { flexDirection: 'row', gap: 10 },
  btnOutline: {
    flex: 1, borderWidth: 1.5, borderColor: C.primary,
    paddingVertical: 13, borderRadius: 10, alignItems: 'center',
  },
  btnOutlineTxt: { fontSize: 14, fontWeight: '700', color: C.primary },
  btnPrimary: {
    flex: 1, backgroundColor: C.primary,
    paddingVertical: 13, borderRadius: 10, alignItems: 'center',
  },
  btnPrimaryTxt: { fontSize: 14, fontWeight: '700', color: C.white },
});