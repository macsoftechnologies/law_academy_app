// app/mypayments/index.tsx

import { router } from 'expo-router';
import React from 'react';
import {
    Alert, ScrollView, StatusBar, StyleSheet,
    Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';

type Billing = {
  id: string;
  type: string;
  status: 'Active' | 'Inactive';
  courseName: string;
  amount: string;
  billingCycle: string;
  validTill: string;
  transactionId: string;
  transactionDate: string;
};

const MOCK_BILLINGS: Billing[] = [
  {
    id: 'b1',
    type: 'Active Course Billing',
    status: 'Active',
    courseName: 'Constitutional Law Advanced Masterclass',
    amount: '₹499.00',
    billingCycle: 'Annual',
    validTill: 'Nov 17, 2025',
    transactionId: '#JCJ20251012XYZ',
    transactionDate: '29/10/2025',
  },
  {
    id: 'b2',
    type: 'Inactive Course Billing',
    status: 'Inactive',
    courseName: 'Constitutional Law Advanced Masterclass',
    amount: '₹499.00',
    billingCycle: 'Annual',
    validTill: 'Nov 17, 2024',
    transactionId: '#JCJ20251012XYZ',
    transactionDate: '29/10/2024',
  },
];

export default function MyPaymentsScreen() {
  const handleDownloadInvoice = (bill: Billing) => {
    Alert.alert('Invoice', `Downloading invoice for ${bill.courseName}`);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>My Billings & Payments</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {MOCK_BILLINGS.map(bill => (
          <View key={bill.id} style={s.card}>
            {/* Card header row */}
            <View style={s.cardHeader}>
              <Text style={s.billingType}>{bill.type}</Text>
              <View style={[
                s.statusBadge,
                bill.status === 'Active' ? s.badgeActive : s.badgeInactive
              ]}>
                <View style={[
                  s.statusDot,
                  bill.status === 'Active' ? s.dotActive : s.dotInactive
                ]} />
                <Text style={[
                  s.statusTxt,
                  bill.status === 'Active' ? s.statusTxtActive : s.statusTxtInactive
                ]}>
                  {bill.status}
                </Text>
              </View>
            </View>

            {/* Course name */}
            <Text style={s.courseName}>{bill.courseName}</Text>

            <View style={s.divider} />

            {/* Details */}
            <Text style={s.amountTxt}>
              {bill.amount}
              <Text style={s.cycleTxt}> /Billing cycle : {bill.billingCycle}</Text>
            </Text>
            <Text style={s.detailTxt}>Valid Till : {bill.validTill}</Text>
            <Text style={s.detailTxt}>TRANSACTION ID: {bill.transactionId}</Text>
            <Text style={s.detailTxt}>TRANSACTION DATE: {bill.transactionDate}</Text>

            {/* Download button */}
            <TouchableOpacity
              style={s.downloadBtn}
              onPress={() => handleDownloadInvoice(bill)}
            >
              <Text style={s.downloadIcon}>⬇</Text>
              <Text style={s.downloadTxt}>Download Inovice</Text>
            </TouchableOpacity>
          </View>
        ))}

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

  scroll: { padding: 14, gap: 14 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: '#E8EAF0',
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    gap: 6,
  },

  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 4,
  },
  billingType: { fontSize: 12, color: '#888', fontWeight: '500' },

  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20,
  },
  badgeActive:   { backgroundColor: '#FDF9ED' },
  badgeInactive: { backgroundColor: '#F5E6E6' },
  statusDot:     { width: 7, height: 7, borderRadius: 4 },
  dotActive:     { backgroundColor: '#C9A227' },
  dotInactive:   { backgroundColor: '#C0392B' },
  statusTxt:     { fontSize: 12, fontWeight: '700' },
  statusTxtActive:   { color: '#C9A227' },
  statusTxtInactive: { color: '#C0392B' },

  courseName: { fontSize: 16, fontWeight: '800', color: '#1A1A2E', lineHeight: 22 },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 4 },

  amountTxt: { fontSize: 15, fontWeight: '800', color: '#1A1A2E' },
  cycleTxt:  { fontSize: 13, fontWeight: '400', color: '#555' },
  detailTxt: { fontSize: 12, color: '#555', letterSpacing: 0.2 },

  downloadBtn: {
    backgroundColor: NAVY,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14,
    borderRadius: 10, marginTop: 8,
  },
  downloadIcon: { fontSize: 16, color: '#fff' },
  downloadTxt:  { fontSize: 14, fontWeight: '700', color: '#fff' },
});