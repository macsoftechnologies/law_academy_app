// app/mycourses/index.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView, StatusBar, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const GOLD = '#C9A227';

const ACTIVE_COURSES = [
  {
    id: 'c1',
    title: 'Andhra Pradesh Junior Civil Judge',
    pct: 45,
    image: null,
  },
  {
    id: 'c2',
    title: 'Combo of JCJ & DDJ',
    pct: 45,
    image: null,
  },
];

const ACTIVE_ORDERS = [
  {
    id: 'o1',
    orderId: 'INV-2388',
    title: 'JCJ Printed Notes',
    qty: 1,
    price: '₹45,000',
    estShip: 'May 22',
    image: null,
  },
];

const COMPLETED_COURSES = [
  {
    id: 'cc1',
    title: 'Andhra Pradesh Junior Civil Judge',
    pct: 100,
    image: null,
  },
];

const COMPLETED_ORDERS = [
  {
    id: 'co1',
    deliveredOn: 'Dec 23, 2025',
    title: 'DDJ Printed Notes',
    image: null,
  },
];

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={pb.track}>
      <View style={[pb.fill, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}
const pb = StyleSheet.create({
  track: { height: 7, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden', flex: 1 },
  fill: { height: '100%', borderRadius: 4 },
});

export default function MyCoursesScreen() {
  const [tab, setTab] = useState<'active' | 'completed'>('active');

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>My Courses</Text>
      </View>

      {/* Tab switcher */}
      <View style={s.tabBar}>
        <TouchableOpacity
          style={[s.tabBtn, tab === 'active' && s.tabBtnActive]}
          onPress={() => setTab('active')}
        >
          <Text style={[s.tabTxt, tab === 'active' && s.tabTxtActive]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.tabBtn, tab === 'completed' && s.tabBtnActive]}
          onPress={() => setTab('completed')}
        >
          <Text style={[s.tabTxt, tab === 'completed' && s.tabTxtActive]}>Completed</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {tab === 'active' ? (
          <>
            {ACTIVE_COURSES.map(course => (
              <TouchableOpacity
                key={course.id}
                style={s.courseCard}
                onPress={() => router.push({ pathname: '/mycourses/detail', params: { id: course.id, status: 'active', title: course.title } } as any)}
                activeOpacity={0.85}
              >
                {/* Course image */}
                <View style={s.courseImgWrap}>
                  <View style={s.courseImgPlaceholder}>
                    <Text style={s.courseImgEmoji}>🏛️</Text>
                  </View>
                </View>
                <View style={s.courseBottom}>
                  <Text style={s.courseTitle}>{course.title}</Text>
                  <View style={s.progressRow}>
                    <ProgressBar pct={course.pct} color={NAVY} />
                  </View>
                  <View style={s.courseFooter}>
                    <Text style={s.pctTxt}>{course.pct}% Completed</Text>
                    <TouchableOpacity style={s.continueBtn}>
                      <Text style={s.continueTxt}>Continue</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Orders */}
            {ACTIVE_ORDERS.map(order => (
              <View key={order.id} style={s.orderCard}>
                <View style={s.orderImgWrap}>
                  <View style={s.orderImgPlaceholder}>
                    <Text style={s.orderImgEmoji}>🏛️</Text>
                  </View>
                </View>
                <View style={s.orderInfo}>
                  <Text style={s.orderIdTxt}>Order #{order.orderId}</Text>
                  <Text style={s.orderTitle}>{order.title}</Text>
                  <Text style={s.orderMeta}>Qty : {order.qty}</Text>
                  <View style={s.shipRow}>
                    <Text style={s.shipIcon}>🚚</Text>
                    <Text style={s.shipTxt}>Est. ship:  {order.estShip}</Text>
                  </View>
                </View>
                <Text style={s.orderPrice}>{order.price}</Text>
              </View>
            ))}
          </>
        ) : (
          <>
            {COMPLETED_COURSES.map(course => (
              <TouchableOpacity
                key={course.id}
                style={s.courseCard}
                onPress={() => router.push({ pathname: '/mycourses/detail', params: { id: course.id, status: 'completed', title: course.title } } as any)}
                activeOpacity={0.85}
              >
                <View style={s.courseImgWrap}>
                  <View style={s.courseImgPlaceholder}>
                    <Text style={s.courseImgEmoji}>🏛️</Text>
                  </View>
                </View>
                <View style={s.courseBottom}>
                  <Text style={s.courseTitle}>{course.title}</Text>
                  <View style={s.progressRow}>
                    <ProgressBar pct={course.pct} color={NAVY} />
                  </View>
                  <View style={s.courseFooter}>
                    <Text style={s.pctTxt}>{course.pct}% Completed</Text>
                    <TouchableOpacity style={s.completedBtn}>
                      <Text style={s.completedTxt}>Completed</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Delivered orders */}
            {COMPLETED_ORDERS.map(order => (
              <View key={order.id} style={s.deliveredCard}>
                <View style={s.orderImgWrap}>
                  <View style={s.orderImgPlaceholder}>
                    <Text style={s.orderImgEmoji}>🏛️</Text>
                  </View>
                </View>
                <View style={s.orderInfo}>
                  <Text style={s.deliveredTxt}>Delivered on {order.deliveredOn}</Text>
                  <Text style={s.orderTitle}>{order.title}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  back: { fontSize: 28, color: '#1A1A2E', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },

  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16, marginBottom: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
  },
  tabBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10,
    alignItems: 'center',
  },
  tabBtnActive: { backgroundColor: NAVY },
  tabTxt: { fontSize: 14, fontWeight: '700', color: NAVY },
  tabTxtActive: { color: '#fff' },

  scroll: { paddingHorizontal: 14, gap: 14 },

  // Course card
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  courseImgWrap: { width: '100%', height: 160 },
  courseImgPlaceholder: {
    flex: 1, backgroundColor: '#C8D8E8',
    alignItems: 'center', justifyContent: 'center',
  },
  courseImgEmoji: { fontSize: 60 },
  courseBottom: { padding: 14 },
  courseTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A2E', marginBottom: 10 },
  progressRow: { marginBottom: 10 },
  courseFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pctTxt: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  continueBtn: {
    backgroundColor: GOLD,
    paddingHorizontal: 20, paddingVertical: 8,
    borderRadius: 8,
  },
  continueTxt: { fontSize: 13, fontWeight: '700', color: '#fff' },
  completedBtn: {
    backgroundColor: GOLD,
    paddingHorizontal: 20, paddingVertical: 8,
    borderRadius: 8,
  },
  completedTxt: { fontSize: 13, fontWeight: '700', color: '#fff' },

  // Order card (active - shipping)
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 14, padding: 12,
    flexDirection: 'row', alignItems: 'center',
    gap: 10,
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  orderImgWrap: { width: 70, height: 70 },
  orderImgPlaceholder: {
    flex: 1, backgroundColor: '#C8D8E8',
    borderRadius: 8, alignItems: 'center', justifyContent: 'center',
  },
  orderImgEmoji: { fontSize: 28 },
  orderInfo: { flex: 1, gap: 3 },
  orderIdTxt: { fontSize: 11, color: '#888' },
  orderTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  orderMeta: { fontSize: 12, color: '#555' },
  shipRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  shipIcon: { fontSize: 13 },
  shipTxt: { fontSize: 12, color: '#E05C5C', fontWeight: '600' },
  orderPrice: { fontSize: 14, fontWeight: '800', color: '#1A1A2E' },

  // Delivered order card
  deliveredCard: {
    backgroundColor: '#fff',
    borderRadius: 14, padding: 12,
    flexDirection: 'row', alignItems: 'center',
    gap: 10,
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  deliveredTxt: { fontSize: 11, color: '#888', marginBottom: 2 },
});