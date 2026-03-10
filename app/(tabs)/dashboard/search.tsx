import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import {
  MOCK_SEARCH_RESULTS, MOCK_TRENDING_SEARCHES,
} from '../../../data/mock/dashboard.mock';

type Result = typeof MOCK_SEARCH_RESULTS[0];
function TrendingCard({ onSelect }: { onSelect: (t: string) => void }) {
  return (
    <View style={s.trendCard}>
      {/* Gold left accent bar + "Trending" label */}
      <View style={s.trendHeader}>
        <View style={s.trendBar} />
        <Text style={s.trendLabel}>Trending</Text>
      </View>
      {MOCK_TRENDING_SEARCHES.slice(0, 5).map((item, i) => (
        <TouchableOpacity key={i} style={s.trendRow} onPress={() => onSelect(item)}>
          {/* Circle icon with arrow */}
          <View style={s.trendIconCircle}>
            <Text style={s.trendArrow}>↗</Text>
          </View>
          <Text style={s.trendText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
function ResultRow({ item }: { item: Result }) {
  return (
    <TouchableOpacity style={s.resultRow}>
      <View style={s.resultIconCircle}>
        <Text style={{ fontSize: 18 }}>📚</Text>
      </View>
      <View style={s.resultBody}>
        <Text style={s.resultTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={s.resultSub}>{item.subtitle}</Text>
      </View>
      {item.badge && (
        <View style={[s.badge, { backgroundColor: item.badgeColor + '22' }]}>
          <Text style={[s.badgeTxt, { color: item.badgeColor! }]}>{item.badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const showTrending = query.trim() === '';

  const results = useMemo(() =>
    MOCK_SEARCH_RESULTS.filter(r =>
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.subtitle.toLowerCase().includes(query.toLowerCase())
    ), [query]);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.screenBg} />

      <View style={s.topBar}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <View style={s.searchBar}>
          <TextInput
            style={s.searchInput}
            placeholder="Type to search..."
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={setQuery}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={s.clearBtn}>
              <Text style={s.clearTxt}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={s.body}>
        {showTrending ? (
          <TrendingCard onSelect={t => setQuery(t)} />
        ) : (
          <FlatList
            data={results}
            keyExtractor={i => i.id}
            contentContainerStyle={{ paddingBottom: 24 }}
            ItemSeparatorComponent={() => <View style={s.divider} />}
            ListEmptyComponent={
              <View style={s.empty}>
                <Text style={{ fontSize: 40 }}>🔍</Text>
                <Text style={s.emptyTitle}>No results</Text>
                <Text style={s.emptyMsg}>Try a different term</Text>
              </View>
            }
            renderItem={({ item }) => <ResultRow item={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.screenBg },

  topBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 14, paddingBottom: 16, gap: 10,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 2,
  },
  backArrow: { fontSize: 24, color: Colors.textDark, fontWeight: '300', lineHeight: 28, marginTop: -2 },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, borderRadius: 24, height: 46,
    paddingHorizontal: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 2,
  },
  searchInput: {
    flex: 1, fontSize: 14, color: Colors.textDark, height: '100%',
  },
  clearBtn: { padding: 4 },
  clearTxt: { fontSize: 13, color: Colors.textMuted },

  body: { flex: 1, paddingHorizontal: 16 },

  trendCard: {
    backgroundColor: Colors.white, borderRadius: 16,
    paddingTop: 16, paddingBottom: 8, paddingHorizontal: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  trendHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  trendBar: {
    width: 4, height: 18, backgroundColor: Colors.gold,
    borderRadius: 2, marginRight: 8,
  },
  trendLabel: { fontSize: 14, fontWeight: '700', color: Colors.textDark },
  trendRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 11, gap: 12,
  },
  trendIconCircle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#EAEDF8',
    alignItems: 'center', justifyContent: 'center',
  },
  trendArrow: { fontSize: 15, color: Colors.primary, fontWeight: '700' },
  trendText:  { fontSize: 14, color: Colors.textDark, fontWeight: '500' },

  resultRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
    backgroundColor: Colors.white, borderRadius: 12, paddingHorizontal: 14,
    marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  resultIconCircle: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: Colors.screenBg,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  resultBody:  { flex: 1 },
  resultTitle: { fontSize: 14, fontWeight: '700', color: Colors.textDark },
  resultSub:   { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeTxt: { fontSize: 11, fontWeight: '700' },
  divider: { height: 0 },

  empty: { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: Colors.textDark },
  emptyMsg:   { fontSize: 13, color: Colors.textMuted },
});