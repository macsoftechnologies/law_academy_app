import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MOCK_NOTIFICATIONS } from '../../../data/mock/dashboard.mock';

const C = {
  primary:  '#1A3C8B',
  gold:     '#C9A227',
  white:    '#FFFFFF',
  crimson:  '#6C1E1E',
  green:    '#00BF3F',
  bg:       '#F4F6FC',
  card:     '#FFFFFF',
  text:     '#1A1A2E',
  muted:    '#6B7A99',
  border:   '#E4EAF5',
};

type Notif = typeof MOCK_NOTIFICATIONS[0];

const TYPE_COLOR: Record<string, string> = {
  batch:   C.primary,
  offer:   C.gold,
  result:  C.green,
  lecture: C.crimson,
  update:  C.primary,
  exam:    C.gold,
};

function NotifCard({ item, onPress }: { item: Notif; onPress: () => void }) {
  const accent = TYPE_COLOR[item.type] ?? C.primary;
  return (
    <TouchableOpacity
      style={[s.card, !item.read && s.cardUnread]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {!item.read && <View style={[s.accentBar, { backgroundColor: accent }]} />}
      <View style={[s.iconBox, { backgroundColor: accent + '18' }]}>
        <Text style={s.emoji}>{item.icon}</Text>
      </View>
      <View style={s.body}>
        <View style={s.topRow}>
          <Text style={[s.title, !item.read && s.titleBold]} numberOfLines={1}>
            {item.title}
          </Text>
          {!item.read && <View style={[s.dot, { backgroundColor: accent }]} />}
        </View>
        <Text style={s.msg} numberOfLines={2}>{item.message}</Text>
        <Text style={s.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function NotificationsScreen() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const unread = notifs.filter(n => !n.read).length;
const [refreshing, setRefreshing] = useState(false);
  const markAll  = () => setNotifs(p => p.map(n => ({ ...n, read: true })));
  const markOne  = (id: string) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
const handleRefresh = async () => {
  setRefreshing(true);

  await new Promise(resolve => setTimeout(resolve, 1000));
  setRefreshing(false);
};
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => router.back()}>
          <Text style={s.backTxt}>←</Text>
        </TouchableOpacity>

        <View style={s.headerCenter}>
          <Text style={s.headerTitle}>Notifications</Text>
          {unread > 0 && (
            <View style={s.badge}>
              <Text style={s.badgeTxt}>{unread}</Text>
            </View>
          )}
        </View>

        {unread > 0 ? (
          <TouchableOpacity style={s.markAllBtn} onPress={markAll}>
            <Text style={s.markAllTxt}>✓ Mark all</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}
      </View>

      {notifs.length === 0 ? (
        <View style={s.empty}>
          <Text style={{ fontSize: 52 }}>🔕</Text>
          <Text style={s.emptyTitle}>All caught up!</Text>
          <Text style={s.emptyMsg}>No notifications right now.</Text>
        </View>
      ) : (
        <FlatList
  data={notifs}
  keyExtractor={i => i.id}
  contentContainerStyle={s.list}
  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
  showsVerticalScrollIndicator={false}
  renderItem={({ item }) => (
    <NotifCard item={item} onPress={() => markOne(item.id)} />
  )}

  refreshing={refreshing}
  onRefresh={handleRefresh}
/>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: C.white, alignItems: 'center', justifyContent: 'center',
    shadowColor: C.primary, shadowOpacity: 0.1, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  backTxt: { fontSize: 20, color: C.primary, fontWeight: '700', lineHeight: 24 },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle:  { fontSize: 19, fontWeight: '800', color: C.text, letterSpacing: -0.4 },
  badge: {
    backgroundColor: C.crimson, borderRadius: 10,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  badgeTxt: { fontSize: 11, fontWeight: '800', color: C.white },
  markAllBtn: {
    backgroundColor: '#EBF0FA', borderRadius: 10,
    paddingHorizontal: 10, paddingVertical: 7,
  },
  markAllTxt: { fontSize: 12, fontWeight: '700', color: C.primary },

  list: { paddingHorizontal: 16, paddingBottom: 90, paddingTop: 4 },

  card: {
    flexDirection: 'row', backgroundColor: C.card,
    borderRadius: 14, padding: 14, alignItems: 'flex-start',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 1, overflow: 'hidden',
  },
  cardUnread: { backgroundColor: '#FAFBFF', shadowOpacity: 0.08, elevation: 3 },
  accentBar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, borderRadius: 2 },
  iconBox: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  emoji: { fontSize: 22 },
  body: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  title: { fontSize: 14, fontWeight: '600', color: C.text, flex: 1 },
  titleBold: { fontWeight: '800' },
  dot: { width: 8, height: 8, borderRadius: 4, marginLeft: 6 },
  msg:  { fontSize: 12, color: C.muted, lineHeight: 17, marginBottom: 6 },
  time: { fontSize: 11, color: C.muted, opacity: 0.7 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: C.text },
  emptyMsg:   { fontSize: 13, color: C.muted },
});