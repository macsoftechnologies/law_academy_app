import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal, ScrollView, StatusBar, StyleSheet, Text,
    TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const CRIMSON = '#8B1A1A';
const GOLD = '#C9A227';

type TicketStatus = 'inprogress' | 'pending' | 'resolved';
type Ticket = { id: string; ticketId: string; message: string; updated: string; status: TicketStatus };

const MOCK_TICKETS: Ticket[] = [
  { id: 't1', ticketId: '#LAW2025-001', message: '"Confused about contract law assignment clauses, need clasification.', updated: '5min ago', status: 'inprogress' },
  { id: 't2', ticketId: '#LAW2025-001', message: '"Confused about contract law assignment clauses, need clasification.', updated: '5min ago', status: 'pending' },
  { id: 't3', ticketId: '#LAW2025-001', message: '"Confused about contract law assignment clauses, need clasification.', updated: '5min ago', status: 'resolved' },
];

const STATUS_CONFIG = {
  inprogress: { label: 'In Progress', badgeBg: CRIMSON,  cardBg: '#F5E6E6', borderColor: '#E8C4C4' },
  pending:    { label: 'Pending',     badgeBg: GOLD,     cardBg: '#FDF9ED', borderColor: '#E8D8A0' },
  resolved:   { label: 'Resolved',   badgeBg: NAVY,     cardBg: '#EEF2FF', borderColor: '#C4CCE8' },
};

export default function TicketsScreen() {
  const [showCallModal, setShowCallModal] = useState(false);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Help Center</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {MOCK_TICKETS.map(ticket => {
          const cfg = STATUS_CONFIG[ticket.status];
          return (
            <View
              key={ticket.id}
              style={[s.card, { backgroundColor: cfg.cardBg, borderColor: cfg.borderColor }]}
            >
              {/* Top row */}
              <View style={s.cardTop}>
                <View>
                  <Text style={s.ticketLabel}>TICKET ID:</Text>
                  <Text style={s.ticketId}>{ticket.ticketId}</Text>
                </View>
                <View style={[s.statusBadge, { backgroundColor: cfg.badgeBg }]}>
                  <Text style={s.statusTxt}>{cfg.label}</Text>
                </View>
              </View>

              <Text style={s.ticketMsg}>{ticket.message}</Text>

              {/* Footer */}
              <View style={s.cardFooter}>
                {ticket.status === 'pending' && (
                  <TouchableOpacity
                    style={s.callBtn}
                    onPress={() => setShowCallModal(true)}
                  >
                    <Text style={s.callBtnTxt}>Call Us Now</Text>
                  </TouchableOpacity>
                )}
                <Text style={[s.updatedTxt, ticket.status !== 'pending' && { marginLeft: 'auto' as any }]}>
                  Last Updated: {ticket.updated}
                </Text>
              </View>
            </View>
          );
        })}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* New Ticket button */}
      <View style={s.bottomBar}>
        <TouchableOpacity
          style={s.newTicketBtn}
          onPress={() => router.back()}
        >
          <Text style={s.newTicketTxt}>New Ticket</Text>
        </TouchableOpacity>
      </View>

      {/* Call Scheduled modal */}
      <Modal visible={showCallModal} transparent animationType="slide">
        <View style={s.modalOverlay}>
          <TouchableOpacity style={s.modalDim} onPress={() => setShowCallModal(false)} />
          <View style={s.callSheet}>
            {/* Person illustration */}
            <View style={s.personWrap}>
              <View style={s.personCircle}>
                <Text style={s.personEmoji}>👨‍💼</Text>
              </View>
            </View>
            <Text style={s.callTitle}>Help Call Scheduled</Text>
            <View style={s.callInfoRow}>
              <View style={s.callCheckDot} />
              <Text style={s.callInfoTxt}>You have received a call{'\n'}within 2 hours.</Text>
            </View>
            <TouchableOpacity
              style={s.okBtn}
              onPress={() => setShowCallModal(false)}
            >
              <Text style={s.okTxt}>OK, Got It !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  scroll: { paddingHorizontal: 16, gap: 14 },

  card: {
    borderRadius: 14, borderWidth: 1.5,
    padding: 16, gap: 8,
  },
  cardTop: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  ticketLabel: { fontSize: 11, fontWeight: '700', color: '#555' },
  ticketId:    { fontSize: 16, fontWeight: '900', color: '#1A1A2E' },
  statusBadge: {
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 8,
  },
  statusTxt: { fontSize: 12, fontWeight: '700', color: '#fff' },
  ticketMsg: { fontSize: 13, color: '#333', lineHeight: 18 },
  cardFooter: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 4,
  },
  callBtn: {
    backgroundColor: GOLD,
    paddingHorizontal: 16, paddingVertical: 7, borderRadius: 8,
  },
  callBtnTxt: { fontSize: 12, fontWeight: '700', color: '#fff' },
  updatedTxt: { fontSize: 11, color: '#888' },

  bottomBar: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: BG },
  newTicketBtn: {
    backgroundColor: NAVY, paddingVertical: 16,
    borderRadius: 12, alignItems: 'center',
  },
  newTicketTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },

  // Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalDim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  callSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 32, alignItems: 'center', gap: 14,
  },
  personWrap: { marginBottom: 4 },
  personCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#E8F5E9',
    alignItems: 'center', justifyContent: 'center',
  },
  personEmoji: { fontSize: 48 },
  callTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A2E' },
  callInfoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  callCheckDot: {
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: CRIMSON, marginTop: 2,
  },
  callInfoTxt: { fontSize: 13, color: '#555', lineHeight: 20 },
  okBtn: {
    backgroundColor: NAVY, width: '100%',
    paddingVertical: 16, borderRadius: 12,
    alignItems: 'center', marginTop: 8,
  },
  okTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },
});