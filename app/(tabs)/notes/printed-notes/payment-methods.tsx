// app/(tabs)/notes/printed-notes/payment-methods.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Modal, Pressable, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../../constants/colors';
import { MOCK_CARDS } from '../../../../data/mock/printed-notes.mock';

const C = Colors;

export default function PaymentMethodsScreen() {
  const [cards, setCards]         = useState(MOCK_CARDS);
  const [showModal, setShowModal] = useState(false);
  const [name, setName]           = useState('');
  const [number, setNumber]       = useState('');
  const [expiry, setExpiry]       = useState('');
  const [cvv, setCvv]             = useState('');
  const [setDefault, setSetDefault] = useState(true);

  const setAsDefault = (id: string) => {
    setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Payment Methods</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <Text style={s.subTitle}>Your payment cards</Text>

        {cards.map(card => (
          <View key={card.id} style={[s.creditCard, card.dark ? s.cardDark : s.cardLight]}>
            {/* Chip */}
            <View style={[s.chip, card.dark ? s.chipDark : s.chipLight]} />

            {/* Card number */}
            <Text style={[s.cardNumber, card.dark ? s.textWhite : s.textDark]}>
              {'* * * * * * * * * * * * ' + card.last4}
            </Text>

            {/* Card info row */}
            <View style={s.cardInfoRow}>
              <View>
                <Text style={[s.cardLabel, card.dark ? s.textMutedWhite : s.textMutedDark]}>Card Holder Name</Text>
                <Text style={[s.cardValue, card.dark ? s.textWhite : s.textDark]}>{card.holder}</Text>
              </View>
              <View>
                <Text style={[s.cardLabel, card.dark ? s.textMutedWhite : s.textMutedDark]}>Expiry Date</Text>
                <Text style={[s.cardValue, card.dark ? s.textWhite : s.textDark]}>{card.expiry}</Text>
              </View>
              <Text style={[s.cardType, card.dark ? s.textWhite : s.textDark]}>
                {card.type === 'mastercard' ? '⬤◎' : 'VISA'}
              </Text>
            </View>

            {/* Default checkbox below card */}
            <TouchableOpacity
              style={s.defaultRow}
              onPress={() => setAsDefault(card.id)}
            >
              <View style={[s.checkbox, card.isDefault && s.checkboxChecked]}>
                {card.isDefault && <Text style={s.checkmark}>✓</Text>}
              </View>
              <Text style={s.defaultTxt}>Use as default payment method</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* + FAB */}
      <TouchableOpacity style={s.fab} onPress={() => setShowModal(true)}>
        <Text style={s.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* Add new card modal - Image 6 */}
      <Modal transparent animationType="slide" visible={showModal} onRequestClose={() => setShowModal(false)}>
        <Pressable style={s.backdrop} onPress={() => setShowModal(false)}>
          <Pressable style={s.modalSheet} onPress={() => {}}>
            <TouchableOpacity style={s.closeBtn} onPress={() => setShowModal(false)}>
              <Text style={s.closeTxt}>✕</Text>
            </TouchableOpacity>

            <TextInput style={s.input} placeholder="Name on card"    placeholderTextColor={C.textMuted} value={name}   onChangeText={setName}   />
            <TextInput style={s.input} placeholder="Card Number"     placeholderTextColor={C.textMuted} value={number} onChangeText={setNumber} keyboardType="numeric" />
            <TextInput style={s.input} placeholder="Expire Date"     placeholderTextColor={C.textMuted} value={expiry} onChangeText={setExpiry} />
            <TextInput style={s.input} placeholder="CVV"             placeholderTextColor={C.textMuted} value={cvv}    onChangeText={setCvv}    keyboardType="numeric" secureTextEntry />

            <TouchableOpacity style={s.defaultRow2} onPress={() => setSetDefault(v => !v)}>
              <View style={[s.checkbox, setDefault && s.checkboxChecked]}>
                {setDefault && <Text style={s.checkmark}>✓</Text>}
              </View>
              <Text style={s.defaultTxt}>Set as default payment method</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={s.addBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={s.addBtnTxt}>Add Card</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.screenBg },
  scroll: { padding: 16, paddingBottom: 80 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark },

  subTitle: { fontSize: 14, fontWeight: '600', color: C.textDark, marginBottom: 14 },

  // Credit card visual
  creditCard: {
    borderRadius: 16, padding: 20,
    marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 }, elevation: 6,
  },
  cardDark:  { backgroundColor: '#1A1A2E' },
  cardLight: { backgroundColor: '#B0B8C8' },

  chip:      { width: 38, height: 28, borderRadius: 6, marginBottom: 24 },
  chipDark:  { backgroundColor: '#C9A227' },
  chipLight: { backgroundColor: '#C9A227', opacity: 0.8 },

  cardNumber: { fontSize: 16, letterSpacing: 2, marginBottom: 20, fontWeight: '600' },

  cardInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardLabel:   { fontSize: 10, marginBottom: 2 },
  cardValue:   { fontSize: 13, fontWeight: '700' },
  cardType:    { fontSize: 18, fontWeight: '900', letterSpacing: -2 },

  textWhite:     { color: '#FFFFFF' },
  textDark:      { color: '#1A1A2E' },
  textMutedWhite:{ color: 'rgba(255,255,255,0.6)' },
  textMutedDark: { color: 'rgba(26,26,46,0.5)' },

  defaultRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginTop: 16, paddingTop: 0,
  },
  defaultRow2: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  defaultTxt:  { fontSize: 13, color: C.textDark, fontWeight: '500' },

  checkbox:        { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: C.inputBorder, alignItems: 'center', justifyContent: 'center', backgroundColor: C.white },
  checkboxChecked: { backgroundColor: C.primary, borderColor: C.primary },
  checkmark:       { fontSize: 12, color: C.white, fontWeight: '800' },

  // FAB
  fab: {
    position: 'absolute', bottom: 30, right: 20,
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: C.crimson,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }, elevation: 8,
  },
  fabIcon: { fontSize: 28, color: C.white, lineHeight: 32 },

  // Modal
  backdrop:    { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: C.cardBg,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36,
  },
  closeBtn: {
    alignSelf: 'flex-end', width: 32, height: 32,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  closeTxt: { fontSize: 18, color: C.textMuted },

  input: {
    backgroundColor: C.cardBg, borderRadius: 12,
    borderWidth: 1, borderColor: C.inputBorder,
    paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 14, color: C.textDark, marginBottom: 12,
  },

  addBtn:    { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  addBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});