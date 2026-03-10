// app/(tabs)/prelims/course-detail.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Modal, Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import { PRELIMS_COURSE_DETAIL } from '../../../data/mock/prelims.mock';

const C = Colors;
const D = PRELIMS_COURSE_DETAIL;

type ModalStep = 'plan' | 'summary' | 'coupon' | null;

const TAB_BAR_HEIGHT = 60;

export default function CourseDetailScreen() {
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed]             = useState(false);
  const [termsOpen, setTermsOpen]       = useState(false);
  const [modalStep, setModalStep]       = useState<ModalStep>(null);
  const [selectedPlan, setSelectedPlan] = useState(D.plans[0].id);
  const [couponCode, setCouponCode]     = useState('');

  const total = D.summaryPrice + D.internetHandlingFee;
  const stickyH = 16 + 52 + insets.bottom + TAB_BAR_HEIGHT;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>{D.headerTitle}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: stickyH }}>

        {/* Hero image */}
        <Image source={D.heroImage} style={s.heroImg} resizeMode="cover" />

        <View style={s.body}>
          {/* Course title */}
          <Text style={s.courseTitle}>{D.title}</Text>

          {/* Price row */}
          <View style={s.priceRow}>
            <Text style={s.price}>₹{D.price.toLocaleString('en-IN')}</Text>
            <Text style={s.originalPrice}>₹{D.originalPrice.toLocaleString('en-IN')}</Text>
            <View style={s.discountBadge}>
              <Text style={s.discountTxt}>{D.discountPct}% off</Text>
            </View>
          </View>

          {/* About the course */}
          <Text style={s.sectionHead}>About the course</Text>
          <Text style={s.bodyTxt}>{D.aboutDesc}</Text>

          {/* Learning Materials */}
          <View style={s.materialsRow}>
            <View style={s.playBtn}>
              <Text style={s.playIcon}>▶</Text>
            </View>
            <View>
              <Text style={s.materialsTitle}>100+ Learning Materials</Text>
              <Text style={s.materialsSubtitle}>250 files, 200 Video, 500 Tests</Text>
            </View>
          </View>

          {/* Bullet points */}
          {D.bulletPoints.map((bp, i) => (
            <View key={i} style={s.bulletRow}>
              <Text style={s.bullet}>•</Text>
              <Text style={s.bulletTxt}>{bp}</Text>
            </View>
          ))}

          {/* What additional things box (gold bg) */}
          <View style={s.extrasBox}>
            <Text style={s.extrasTitle}>what additional things will you get?</Text>
            <View style={s.extrasGrid}>
              {D.extras.map((e, i) => (
                <View key={i} style={s.extraItem}>
                  <Text style={s.extraIcon}>{e.icon}</Text>
                  <Text style={s.extraItemTitle}>{e.title}</Text>
                  <Text style={s.extraItemSub}>{e.sub}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* CTA text */}
          <Text style={s.ctaTxt}>{D.extrasCta}</Text>

          {/* Terms checkbox row */}
          <TouchableOpacity
            style={s.termsRow}
            onPress={() => { setAgreed(v => !v); setTermsOpen(false); }}
            activeOpacity={0.8}
          >
            <View style={[s.checkbox, agreed && s.checkboxChecked]}>
              {agreed && <Text style={s.checkmark}>✓</Text>}
            </View>
            <Text style={[s.termsTxt, { color: agreed ? C.primary : C.textDark }]}>
              I accept Terms &amp; Conditions
            </Text>
            <TouchableOpacity onPress={() => setTermsOpen(v => !v)} style={s.chevron}>
              <Text style={s.chevronTxt}>{termsOpen ? '∧' : '∨'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {termsOpen && (
            <View style={s.termsList}>
              {D.termsItems.map((t, i) => (
                <Text key={i} style={s.termsItem}>{`${i + 1}. ${t}`}</Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Buy Now */}
      <View style={[s.stickyBottom, { paddingBottom: insets.bottom + TAB_BAR_HEIGHT + 8 }]}>
        <TouchableOpacity
          style={[s.buyBtn, !agreed && s.btnDisabled]}
          disabled={!agreed}
          onPress={() => agreed && setModalStep('plan')}
        >
          <Text style={s.buyBtnTxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* ── MODAL: Choose your plan */}
      <Modal transparent animationType="slide" visible={modalStep === 'plan'} onRequestClose={() => setModalStep(null)}>
        <Pressable style={s.backdrop} onPress={() => setModalStep(null)}>
          <Pressable style={s.modalSheet} onPress={() => {}}>
            <Text style={s.modalTitle}>Choose your plan</Text>
            {D.plans.map(p => (
              <TouchableOpacity
                key={p.id}
                style={[s.planRow, selectedPlan === p.id && s.planRowSelected]}
                onPress={() => setSelectedPlan(p.id)}
              >
                <View style={[s.radio, selectedPlan === p.id && s.radioSelected]} />
                <Text style={s.planPrice}>₹{p.price.toLocaleString('en-IN')}</Text>
                <Text style={s.planOriginal}>₹{p.originalPrice.toLocaleString('en-IN')}</Text>
                <Text style={s.planLabel}>for {p.label}</Text>
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
            {[
              { k: 'Price',                v: `₹${D.summaryPrice.toLocaleString('en-IN')}` },
              { k: 'Internet Handling Fee', v: `₹${D.internetHandlingFee}` },
            ].map(r => (
              <View key={r.k} style={s.sumRow}>
                <Text style={s.sumKey}>{r.k}</Text>
                <Text style={s.sumVal}>{r.v}</Text>
              </View>
            ))}
            <View style={[s.sumRow, s.sumTotalRow]}>
              <Text style={[s.sumKey, s.sumTotalTxt]}>Total</Text>
              <Text style={[s.sumVal, s.sumTotalTxt]}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity style={s.couponOutlineBtn} onPress={() => setModalStep('coupon')}>
              <Text style={s.couponOutlineTxt}>Apply Coupon</Text>
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
            {[
              { k: 'Price',                v: `₹${D.summaryPrice.toLocaleString('en-IN')}` },
              { k: 'Internet Handling Fee', v: `₹${D.internetHandlingFee}` },
            ].map(r => (
              <View key={r.k} style={s.sumRow}>
                <Text style={s.sumKey}>{r.k}</Text>
                <Text style={s.sumVal}>{r.v}</Text>
              </View>
            ))}
            <View style={[s.sumRow, s.sumTotalRow]}>
              <Text style={[s.sumKey, s.sumTotalTxt]}>Total</Text>
              <Text style={[s.sumVal, s.sumTotalTxt]}>₹{total.toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity style={s.couponOutlineBtn}>
              <Text style={s.couponOutlineTxt}>Apply Coupon</Text>
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
  safe:  { flex: 1, backgroundColor: C.screenBg },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 17, fontWeight: '800', color: C.textDark },

  heroImg: { width: '100%', height: 200 },

  body: { padding: 16 },

  courseTitle: { fontSize: 20, fontWeight: '900', color: C.textDark, marginBottom: 10, marginTop: 4, lineHeight: 28 },

  priceRow:      { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18 },
  price:         { fontSize: 20, fontWeight: '900', color: C.primary },
  originalPrice: { fontSize: 14, color: C.textMuted, textDecorationLine: 'line-through' },
  discountBadge: { backgroundColor: C.gold, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginLeft: 'auto' as any },
  discountTxt:   { fontSize: 12, fontWeight: '800', color: C.white },

  sectionHead: { fontSize: 15, fontWeight: '800', color: C.textDark, marginBottom: 8 },
  bodyTxt:     { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 16 },

  materialsRow:     { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  playBtn:          { width: 36, height: 36, borderRadius: 18, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' },
  playIcon:         { fontSize: 14, color: C.white, marginLeft: 2 },
  materialsTitle:   { fontSize: 14, fontWeight: '700', color: C.textDark },
  materialsSubtitle:{ fontSize: 12, color: C.textMuted },

  bulletRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  bullet:    { fontSize: 14, color: C.textMuted, marginTop: 1 },
  bulletTxt: { fontSize: 13, color: C.textMuted, flex: 1, lineHeight: 20 },

  extrasBox: {
    backgroundColor: '#FFFDE7', borderRadius: 14,
    padding: 14, marginTop: 16, marginBottom: 16,
  },
  extrasTitle: { fontSize: 13, fontWeight: '700', color: C.textDark, marginBottom: 12 },
  extrasGrid:  { flexDirection: 'row', gap: 12 },
  extraItem:   { flex: 1, alignItems: 'center' },
  extraIcon:   { fontSize: 22, marginBottom: 4 },
  extraItemTitle: { fontSize: 12, fontWeight: '700', color: C.textDark, textAlign: 'center', marginBottom: 2 },
  extraItemSub:   { fontSize: 11, color: C.textMuted, textAlign: 'center' },

  ctaTxt: { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 18 },

  termsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: C.cardBg, borderRadius: 12, padding: 14, marginBottom: 8,
  },
  checkbox:        { width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: C.inputBorder, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: C.primary, borderColor: C.primary },
  checkmark:       { fontSize: 13, color: C.white, fontWeight: '800' },
  termsTxt:        { flex: 1, fontSize: 13, fontWeight: '600' },
  chevron:         { padding: 4 },
  chevronTxt:      { fontSize: 14, color: C.textMuted, fontWeight: '700' },
  termsList:       { backgroundColor: C.cardBg, borderRadius: 12, padding: 14, marginBottom: 16 },
  termsItem:       { fontSize: 12, color: C.textMuted, lineHeight: 20, marginBottom: 8 },

  stickyBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingTop: 12, paddingHorizontal: 16,
    backgroundColor: C.cardBg, borderTopWidth: 1, borderTopColor: C.border,
  },
  buyBtn:      { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  buyBtnTxt:   { fontSize: 15, fontWeight: '700', color: C.white },
  btnDisabled: { opacity: 0.35 },

  // Modals
  backdrop:   { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: C.cardBg,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36,
  },
  modalTitle: { fontSize: 17, fontWeight: '800', color: C.textDark, marginBottom: 20, lineHeight: 26 },

  planRow:         { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1.5, borderColor: C.border, borderRadius: 12, padding: 14, marginBottom: 10 },
  planRowSelected: { borderColor: C.primary, backgroundColor: '#EEF2FF' },
  radio:           { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: C.inputBorder },
  radioSelected:   { borderColor: C.primary, backgroundColor: C.primary },
  planPrice:       { fontSize: 15, fontWeight: '800', color: C.textDark, flex: 1 },
  planOriginal:    { fontSize: 12, color: C.textMuted, textDecorationLine: 'line-through', marginRight: 4 },
  planLabel:       { fontSize: 12, fontWeight: '700', color: C.gold },
  nextBtn:         { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  nextBtnTxt:      { fontSize: 15, fontWeight: '700', color: C.white },

  sumRow:      { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sumTotalRow: { borderTopWidth: 1, borderTopColor: C.border, paddingTop: 12, marginTop: 4 },
  sumKey:      { fontSize: 14, color: C.textMuted },
  sumVal:      { fontSize: 14, color: C.textMuted },
  sumTotalTxt: { fontWeight: '800', color: C.textDark },

  couponOutlineBtn: { borderWidth: 1.5, borderColor: C.primary, borderRadius: 12, paddingVertical: 13, alignItems: 'center', marginTop: 8, marginBottom: 10 },
  couponOutlineTxt: { fontSize: 14, fontWeight: '700', color: C.primary },
  payBtn:           { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  payBtnTxt:        { fontSize: 15, fontWeight: '700', color: C.white },

  couponInputRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  couponInput:    { flex: 1, borderWidth: 1, borderColor: C.inputBorder, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 13, color: C.textDark },
  couponApplyBtn: { backgroundColor: C.primary, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  couponApplyTxt: { fontSize: 13, fontWeight: '700', color: C.white },
});