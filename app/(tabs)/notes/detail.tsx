// app/(tabs)/notes/detail.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar,
  ScrollView, Modal, Pressable, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../constants/colors';
import { NOTE_DETAIL } from '../../../data/mock/notes.mock';

const C = Colors;
const D = NOTE_DETAIL;

type ModalStep = 'plan' | 'summary' | 'coupon' | null;

export default function NoteDetailScreen() {
  const [agreed, setAgreed]           = useState(false);
  const [termsOpen, setTermsOpen]     = useState(false);
  const [modalStep, setModalStep]     = useState<ModalStep>(null);
  const [selectedPlan, setSelectedPlan] = useState(D.plans[0].id);
  const [couponCode, setCouponCode]   = useState('');

  const plan = D.plans.find(p => p.id === selectedPlan) || D.plans[0];
  const total = D.summaryPrice + D.internetHandlingFee;

  const handleBuyNow = () => {
    if (!agreed) return;
    setModalStep('plan');
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>{D.headerTitle}</Text>
        <TouchableOpacity style={s.cartBtn}>
          <Text style={s.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        {/* Preview watermark text */}
        <View style={s.previewCard}>
          <Text style={s.previewTxt}>{D.previewText}</Text>
        </View>

        <View style={s.body}>
          {/* About */}
          <Text style={s.aboutTitle}>{D.aboutTitle}</Text>
          <Text style={s.aboutEmoji}>{D.aboutEmoji} About the book</Text>
          <Text style={s.aboutDesc}>{D.aboutDesc}</Text>

          {/* Topics */}
          <Text style={s.topicsTitle}>{D.topicsTitle}</Text>
          {D.topics.map((section, si) => (
            <View key={si} style={{ marginBottom: 12 }}>
              <Text style={s.sectionLabel}>{section.section}</Text>
              {section.items.map((item, ii) => (
                <Text key={ii} style={s.topicItem}>{`   ${ii + 1}. ${item}`}</Text>
              ))}
            </View>
          ))}

          {/* Price breakdown */}
          <View style={s.priceBox}>
            <Text style={s.priceBoxTitle}>Price Breakdown</Text>
            <View style={s.priceRow}>
              <Text style={s.priceKey}>MRP</Text>
              <Text style={s.priceVal}>₹{D.pricing.mrp}</Text>
            </View>
            <View style={s.priceRow}>
              <Text style={s.priceKey}>Price</Text>
              <Text style={s.priceVal}>₹{D.pricing.price}</Text>
            </View>
            <View style={s.priceRow}>
              <Text style={s.priceKey}>Shipping Price</Text>
              <Text style={s.priceVal}>₹{D.pricing.shipping}</Text>
            </View>
            <View style={[s.priceRow, s.totalRow]}>
              <Text style={[s.priceKey, { fontWeight: '700', color: C.textDark }]}>Total Price</Text>
              <Text style={[s.priceVal, { fontWeight: '800', color: C.textDark }]}>
                ₹{D.pricing.price + D.pricing.shipping}
              </Text>
            </View>
            <TouchableOpacity style={s.couponBtn}>
              <Text style={s.couponBtnTxt}>Apply Coupon</Text>
            </TouchableOpacity>
          </View>

          {/* Terms checkbox */}
          <TouchableOpacity
            style={s.termsRow}
            onPress={() => { setAgreed(v => !v); setTermsOpen(false); }}
            activeOpacity={0.8}
          >
            <View style={[s.checkbox, agreed && s.checkboxChecked]}>
              {agreed && <Text style={s.checkmark}>✓</Text>}
            </View>
            <Text style={s.termsTxt}>I accept Terms &amp; Conditions</Text>
            <TouchableOpacity onPress={() => setTermsOpen(v => !v)} style={s.chevron}>
              <Text style={s.chevronTxt}>{termsOpen ? '∧' : '∨'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {termsOpen && (
            <View style={s.termsList}>
              {[
                'Are you sure you want to start the Civil Laws Mains Test?',
                'Once the test begins, you must complete it within 3 hours.',
                'After submission time, you\'ll get an additional 15 minutes grace period to scan your answer sheets, convert them into a PDF, and upload the file.',
                'Once started, the test cannot be paused or restarted.',
              ].map((t, i) => (
                <Text key={i} style={s.termsItem}>{`${i + 1}. ${t}`}</Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Buy Now button */}
      <View style={s.stickyBottom}>
        <TouchableOpacity
          style={[s.buyBtn, !agreed && s.btnDisabled]}
          onPress={handleBuyNow}
          disabled={!agreed}
        >
          <Text style={s.buyBtnTxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* ── MODAL: Plan selection */}
      <Modal transparent animationType="slide" visible={modalStep === 'plan'} onRequestClose={() => setModalStep(null)}>
        <Pressable style={s.backdrop} onPress={() => setModalStep(null)}>
          <Pressable style={s.modalSheet} onPress={() => {}}>
            <Text style={s.modalTitle}>Choose your plan</Text>
            {D.plans.map(p => (
              <TouchableOpacity
                key={p.id}
                style={[s.planOption, selectedPlan === p.id && s.planOptionSelected]}
                onPress={() => setSelectedPlan(p.id)}
              >
                <View style={[s.radio, selectedPlan === p.id && s.radioSelected]} />
                <Text style={s.planLabel}>₹{p.price.toLocaleString('en-IN')}</Text>
                <Text style={s.planOriginal}>₹{p.originalPrice.toLocaleString('en-IN')}</Text>
                <Text style={s.planDuration}>for {p.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={s.nextBtn} onPress={() => setModalStep('summary')}>
              <Text style={s.nextBtnTxt}>Next</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── MODAL: Summary */}
      <Modal transparent animationType="slide" visible={modalStep === 'summary'} onRequestClose={() => setModalStep('plan')}>
        <Pressable style={s.backdrop} onPress={() => setModalStep('plan')}>
          <Pressable style={s.modalSheet} onPress={() => {}}>
            <Text style={s.modalTitle}>{D.summaryTitle}</Text>
            <View style={s.summaryRow}>
              <Text style={s.summaryKey}>Price</Text>
              <Text style={s.summaryVal}>₹{D.summaryPrice.toLocaleString('en-IN')}</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryKey}>Internet Handling Fee</Text>
              <Text style={s.summaryVal}>₹{D.internetHandlingFee}</Text>
            </View>
            <View style={[s.summaryRow, s.summaryTotal]}>
              <Text style={[s.summaryKey, { fontWeight: '700', color: C.textDark }]}>Total</Text>
              <Text style={[s.summaryVal, { fontWeight: '800', color: C.textDark }]}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity style={s.couponBtn2} onPress={() => setModalStep('coupon')}>
              <Text style={s.couponBtnTxt}>Apply Coupon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.payBtn}>
              <Text style={s.payBtnTxt}>Pay Online</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── MODAL: Coupon */}
      <Modal transparent animationType="slide" visible={modalStep === 'coupon'} onRequestClose={() => setModalStep('summary')}>
        <Pressable style={s.backdrop} onPress={() => setModalStep('summary')}>
          <Pressable style={s.modalSheet} onPress={() => {}}>
            <Text style={s.modalTitle}>{D.summaryTitle}</Text>
            <View style={s.summaryRow}>
              <Text style={s.summaryKey}>Price</Text>
              <Text style={s.summaryVal}>₹{D.summaryPrice.toLocaleString('en-IN')}</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryKey}>Internet Handling Fee</Text>
              <Text style={s.summaryVal}>₹{D.internetHandlingFee}</Text>
            </View>
            <View style={[s.summaryRow, s.summaryTotal]}>
              <Text style={[s.summaryKey, { fontWeight: '700', color: C.textDark }]}>Total</Text>
              <Text style={[s.summaryVal, { fontWeight: '800', color: C.textDark }]}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity style={s.couponBtn2}>
              <Text style={s.couponBtnTxt}>Apply Coupon</Text>
            </TouchableOpacity>
            <View style={s.couponInputRow}>
              <TextInput
                style={s.couponInput}
                placeholder="Discount Coupon"
                placeholderTextColor={C.textMuted}
                value={couponCode}
                onChangeText={setCouponCode}
              />
              <TouchableOpacity style={s.couponApplyBtn}>
                <Text style={s.couponApplyTxt}>Apply</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={s.payBtn}>
              <Text style={s.payBtnTxt}>Pay Online</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
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
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: C.textDark },
  cartBtn:     { padding: 4 },
  cartIcon:    { fontSize: 20 },

  previewCard: {
    backgroundColor: C.cardBg, marginHorizontal: 16, marginBottom: 0,
    borderRadius: 14, padding: 14,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  previewTxt: { fontSize: 11, color: C.textMuted, lineHeight: 18 },

  body: { padding: 16 },

  aboutTitle: { fontSize: 17, fontWeight: '800', color: C.textDark, marginBottom: 4, marginTop: 8 },
  aboutEmoji: { fontSize: 14, fontWeight: '700', color: C.textDark, marginBottom: 8 },
  aboutDesc:  { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 16 },

  topicsTitle: { fontSize: 15, fontWeight: '800', color: C.textDark, marginBottom: 10 },
  sectionLabel:{ fontSize: 13, fontWeight: '700', color: C.textDark, marginBottom: 4 },
  topicItem:   { fontSize: 12, color: C.textMuted, lineHeight: 20 },

  // Price box
  priceBox: {
    backgroundColor: C.cardBg, borderRadius: 14,
    padding: 16, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  priceBoxTitle: { fontSize: 15, fontWeight: '800', color: C.textDark, marginBottom: 12 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  totalRow: { borderTopWidth: 1, borderTopColor: C.border, paddingTop: 10, marginTop: 2 },
  priceKey: { fontSize: 13, color: C.textMuted },
  priceVal: { fontSize: 13, color: C.textMuted },

  couponBtn: {
    borderWidth: 1.5, borderColor: C.primary,
    borderRadius: 10, paddingVertical: 12,
    alignItems: 'center', marginTop: 6,
  },
  couponBtnTxt: { fontSize: 14, fontWeight: '700', color: C.primary },

  // Terms
  termsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: C.cardBg, borderRadius: 12,
    padding: 14, marginBottom: 8,
  },
  checkbox:        { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: C.inputBorder, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: C.primary, borderColor: C.primary },
  checkmark:       { fontSize: 13, color: C.white, fontWeight: '800' },
  termsTxt:        { flex: 1, fontSize: 13, fontWeight: '600', color: C.primary },
  chevron:         { padding: 4 },
  chevronTxt:      { fontSize: 14, color: C.textMuted, fontWeight: '700' },
  termsList:       { backgroundColor: C.cardBg, borderRadius: 12, padding: 14, marginBottom: 16 },
  termsItem:       { fontSize: 12, color: C.textMuted, lineHeight: 20, marginBottom: 8 },

  // Sticky bottom
  stickyBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 28,
    backgroundColor: C.cardBg,
    borderTopWidth: 1, borderTopColor: C.border,
  },
  buyBtn: {
    backgroundColor: C.primary,
    paddingVertical: 15, borderRadius: 12, alignItems: 'center',
  },
  buyBtnTxt:  { fontSize: 15, fontWeight: '700', color: C.white },
  btnDisabled: { opacity: 0.35 },

  // Modals shared
  backdrop:   { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: C.cardBg,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36,
  },
  modalTitle: { fontSize: 17, fontWeight: '800', color: C.textDark, marginBottom: 20, lineHeight: 24 },

  // Plan modal
  planOption: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1.5, borderColor: C.border,
    borderRadius: 12, padding: 14, marginBottom: 10,
  },
  planOptionSelected: { borderColor: C.primary, backgroundColor: '#F0F4FF' },
  radio:         { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: C.inputBorder },
  radioSelected: { borderColor: C.primary, backgroundColor: C.primary },
  planLabel:    { fontSize: 15, fontWeight: '700', color: C.textDark, flex: 1 },
  planOriginal: { fontSize: 12, color: C.textMuted, textDecorationLine: 'line-through', marginRight: 4 },
  planDuration: { fontSize: 12, fontWeight: '600', color: C.primary },
  nextBtn:    { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  nextBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },

  // Summary modal
  summaryRow:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryTotal: { borderTopWidth: 1, borderTopColor: C.border, paddingTop: 12, marginTop: 4 },
  summaryKey:   { fontSize: 14, color: C.textMuted },
  summaryVal:   { fontSize: 14, color: C.textMuted },
  couponBtn2: {
    borderWidth: 1.5, borderColor: C.primary,
    borderRadius: 12, paddingVertical: 13,
    alignItems: 'center', marginTop: 8, marginBottom: 10,
  },
  payBtn:    { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  payBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },

  // Coupon modal
  couponInputRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  couponInput:    {
    flex: 1, borderWidth: 1, borderColor: C.inputBorder,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 13, color: C.textDark,
  },
  couponApplyBtn: {
    backgroundColor: C.primary, paddingHorizontal: 16,
    borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  couponApplyTxt: { fontSize: 13, fontWeight: '700', color: C.white },
});