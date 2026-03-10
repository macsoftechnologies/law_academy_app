import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, StatusBar, Modal, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { MOCK_COMBO_COURSE, MOCK_COMBO_PLANS } from '../../data/mock/combo.mock';
import ScreenWrapper from '../../components/ScreenWrapper';

const C = Colors;

// ─────────────────────────────────────────────────────────────────────────────
// Plan Sheet  ── Image 6
// ─────────────────────────────────────────────────────────────────────────────
function PlanSheet({
  visible,
  onClose,
  onNext,
}: {
  visible: boolean;
  onClose: () => void;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState('p1');

  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* Dim backdrop */}
      <TouchableOpacity style={ms.overlay} activeOpacity={1} onPress={onClose} />
      <View style={ms.sheet}>
        <Text style={ms.sheetTitle}>Choose your plan</Text>

        {MOCK_COMBO_PLANS.map(plan => (
          <TouchableOpacity
            key={plan.id}
            style={[ms.planRow, selected === plan.id && ms.planRowActive]}
            onPress={() => setSelected(plan.id)}
            activeOpacity={0.8}
          >
            {/* Radio button */}
            <View style={[ms.radio, selected === plan.id && ms.radioActive]}>
              {selected === plan.id && <View style={ms.radioDot} />}
            </View>

            {/* Prices */}
            <View style={ms.planPrices}>
              <Text style={ms.planPrice}>
                ₹{plan.price.toLocaleString('en-IN')}
              </Text>
              <Text style={ms.planOrig}>
                ₹{plan.originalPrice.toLocaleString('en-IN')}
              </Text>
            </View>

            {/* Duration */}
            <Text style={ms.planDur}>{plan.duration}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={ms.nextBtn}
          onPress={() => { onClose(); onNext(); }}
          activeOpacity={0.85}
        >
          <Text style={ms.nextBtnTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Payment Sheet  ── Images 7 & 8
// ─────────────────────────────────────────────────────────────────────────────
function PaymentSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon]         = useState('');

  const course  = MOCK_COMBO_COURSE;
  const fee     = 53;
  const total   = course.price + fee;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={ms.overlay} activeOpacity={1} onPress={onClose} />
      <View style={ms.sheet}>
        {/* Sheet title */}
        <Text style={ms.sheetTitle}>Andhra Pradesh Junior Civil{'\n'}Judge Course</Text>

        {/* Price rows */}
        {[
          { label: 'Price',                 value: `₹${course.price.toLocaleString('en-IN')}`, bold: false },
          { label: 'Internet Handling Fee', value: `₹${fee}`,                                   bold: false },
          { label: 'Total',                 value: `₹${total.toLocaleString('en-IN')}`,         bold: true  },
        ].map((row, i) => (
          <View
            key={i}
            style={[ms.payRow, i === 2 && { marginBottom: 18 }]}
          >
            <Text style={[ms.payLabel, row.bold && ms.payBold]}>
              {row.label}
            </Text>
            <Text style={[ms.payVal, row.bold && ms.payBold]}>
              {row.value}
            </Text>
          </View>
        ))}

        {/* Apply Coupon button (Image 7) */}
        <TouchableOpacity
          style={ms.couponBtn}
          onPress={() => setCouponOpen(o => !o)}
          activeOpacity={0.8}
        >
          <Text style={ms.couponBtnTxt}>Apply Coupon</Text>
        </TouchableOpacity>

        {/* Coupon input field (Image 8) — toggled */}
        {couponOpen && (
          <View style={ms.couponRow}>
            <TextInput
              style={ms.couponInput}
              placeholder="Discount Coupon"
              placeholderTextColor={C.textMuted}
              value={coupon}
              onChangeText={setCoupon}
            />
            <TouchableOpacity style={ms.couponApply}>
              <Text style={ms.couponApplyTxt}>Apply</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Pay Online */}
        <TouchableOpacity
          style={ms.payOnlineBtn}
          onPress={onClose}
          activeOpacity={0.85}
        >
          <Text style={ms.payOnlineTxt}>Pay Online</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Screen  ── Image 5
// ─────────────────────────────────────────────────────────────────────────────
export default function ComboCourseDetailScreen() {
  const course = MOCK_COMBO_COURSE;

  const [termsChecked, setTermsChecked] = useState(false);
  const [termsOpen,    setTermsOpen]    = useState(false);
  const [planVisible,  setPlanVisible]  = useState(false);
  const [payVisible,   setPayVisible]   = useState(false);

  const handleBuy = () => { if (termsChecked) setPlanVisible(true); };
const handleRefresh = async () => {
  console.log('Refreshing course detail...');
};
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle} numberOfLines={1}>
          {course.headerTitle}
        </Text>
      </View>

      <ScreenWrapper onRefresh={handleRefresh}>
        {/* Hero image */}
        <Image source={course.image} style={s.heroImg} resizeMode="cover" />

        <View style={s.body}>

          {/* Title */}
          <Text style={s.courseTitle}>{course.title}</Text>

          {/* Price row */}
          <View style={s.metaRow}>
            <Text style={s.coursePrice}>
              ₹{course.price.toLocaleString('en-IN')}
            </Text>
            <Text style={s.courseOrig}>
              ₹{course.originalPrice.toLocaleString('en-IN')}
            </Text>
            <View style={s.discBadge}>
              <Text style={s.discBadgeTxt}>{course.discount}% off</Text>
            </View>
          </View>

          {/* About the course */}
          <Text style={s.sectionHead}>About the course</Text>
          <Text style={s.bodyTxt}>{course.description}</Text>

          {/* What's Included */}
          <Text style={s.bodyTxt2}>What's Included:</Text>
          {course.whatsIncluded.map((section, si) => (
            <View key={si} style={{ marginBottom: 8 }}>
              {/* Category with diamond bullet */}
              <View style={s.includedCatRow}>
                <Text style={s.diamondBullet}>♦</Text>
                <Text style={s.includedCatTxt}>{section.category}</Text>
              </View>
              {/* Sub-items */}
              {section.items.map((item, ii) => (
                <View key={ii} style={s.includedItemRow}>
                  <Text style={s.bulletDot}>•</Text>
                  <Text style={s.includedItemTxt}>{item}</Text>
                </View>
              ))}
            </View>
          ))}

          {/* 100+ Learning Materials */}
          <View style={s.materialsRow}>
            <Text style={s.playIcon}>▶</Text>
            <View>
              <Text style={s.matTitle}>100+ Learning Materials</Text>
              <Text style={s.matSub}>
                {course.learningMaterials.files} files,{' '}
                {course.learningMaterials.videos} Video,{' '}
                {course.learningMaterials.tests} Tests
              </Text>
            </View>
          </View>

          {/* Highlights */}
          {course.highlights.map((h, i) => (
            <View key={i} style={s.bulletRow}>
              <Text style={s.bulletDot}>•</Text>
              <Text style={s.bulletTxt}>{h}</Text>
            </View>
          ))}

          {/* Product Offering */}
          <View style={s.offeringRow}>
            {course.productOffering.map((p, i) => (
              <View key={i} style={s.offeringCard}>
                <Text style={s.offeringIcon}>{p.icon}</Text>
                {p.count !== '' && (
                  <Text style={s.offeringCount}>{p.count}</Text>
                )}
                <Text style={s.offeringLabel}>{p.label}</Text>
              </View>
            ))}
          </View>

          {/* Footer text */}
          <Text style={s.bodyTxt}>
            Start your journey to becoming a Junior Civil Judge in Andhra
            Pradesh with the right guidance and resources!
          </Text>

          {/* ── Terms & Conditions ── */}
          <View style={s.termsRow}>
            {/* Checkbox */}
            <TouchableOpacity
              style={[s.checkbox, termsChecked && s.checkboxOn]}
              onPress={() => setTermsChecked(o => !o)}
              activeOpacity={0.8}
            >
              {termsChecked && (
                <Ionicons name="checkmark" size={14} color={C.white} />
              )}
            </TouchableOpacity>

            {/* Label — tapping also toggles checkbox */}
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setTermsChecked(o => !o)}
              activeOpacity={0.8}
            >
              <Text style={[s.termsTxt, termsChecked && s.termsTxtOn]}>
                I accept Terms & Conditions
              </Text>
            </TouchableOpacity>

            {/* Chevron — only toggles dropdown list */}
            <TouchableOpacity
              onPress={() => setTermsOpen(o => !o)}
              style={s.chevBtn}
              activeOpacity={0.7}
            >
              <Ionicons
                name={termsOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={termsChecked ? C.crimson : C.textMuted}
              />
            </TouchableOpacity>
          </View>

          {/* Terms list — shown when dropdown open */}
          {termsOpen && (
            <View style={s.termsList}>
              {[
                'Are you sure you want to start the Civil Laws Mains Test?',
                'Once the test begins, you must complete it within 3 hours.',
                "After submission time, you'll get an additional 15 minutes grace period to scan your answer sheets, convert them into a PDF, and upload the file.",
                'Once started, the test cannot be paused or restarted.',
              ].map((t, i) => (
                <Text key={i} style={s.termsItem}>{i + 1}. {t}</Text>
              ))}
            </View>
          )}

        </View>
      </ScreenWrapper>

      {/* ── Bottom action bar ── */}
      <View style={s.bottomBar}>
        {/* Add to Cart — disabled until checked */}
        <TouchableOpacity
          style={[s.addCartBtn, !termsChecked && s.btnDisabled]}
          onPress={handleBuy}
          activeOpacity={termsChecked ? 0.75 : 1}
        >
          <Text style={[s.addCartTxt, !termsChecked && s.btnTxtDisabled]}>
            Add to Cart
          </Text>
        </TouchableOpacity>

        {/* Buy Now — disabled until checked */}
        <TouchableOpacity
          style={[s.buyBtn, !termsChecked && s.buyBtnDisabled]}
          onPress={handleBuy}
          activeOpacity={termsChecked ? 0.75 : 1}
        >
          <Text style={[s.buyBtnTxt, !termsChecked && s.buyBtnTxtDisabled]}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modals — stay in combo/, zero external routes */}
      <PlanSheet
        visible={planVisible}
        onClose={() => setPlanVisible(false)}
        onNext={() => setPayVisible(true)}
      />
      <PaymentSheet
        visible={payVisible}
        onClose={() => setPayVisible(false)}
      />
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page styles
// ─────────────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.screenBg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: C.textDark },

  heroImg: { width: '100%', height: 210 },
  body:    { padding: 16 },

  courseTitle: {
    fontSize: 20, fontWeight: '800',
    color: C.textDark, marginTop: 10, marginBottom: 8, lineHeight: 26,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  coursePrice: { fontSize: 20, fontWeight: '800', color: C.primary },
  courseOrig:  {
    fontSize: 14, color: C.textMuted,
    textDecorationLine: 'line-through',
  },
  discBadge: {
    backgroundColor: C.gold,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 'auto',
  },
  discBadgeTxt: { fontSize: 12, fontWeight: '800', color: C.white },

  sectionHead: {
    fontSize: 15, fontWeight: '800',
    color: C.textDark, marginBottom: 8,
  },
  bodyTxt:  { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 10 },
  bodyTxt2: { fontSize: 13, fontWeight: '700', color: C.textDark, marginBottom: 8 },

  // What's included
  includedCatRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4,
  },
  diamondBullet:   { fontSize: 12, color: C.primary },
  includedCatTxt:  { fontSize: 13, fontWeight: '700', color: C.textDark },
  includedItemRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    gap: 6, paddingLeft: 18, marginBottom: 2,
  },
  bulletDot:      { fontSize: 13, color: C.textMuted, lineHeight: 20 },
  includedItemTxt:{ fontSize: 12, color: C.textMuted, flex: 1, lineHeight: 18 },

  // Learning materials
  materialsRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginTop: 12, marginBottom: 10,
  },
  playIcon: { fontSize: 22, color: C.primary },
  matTitle: { fontSize: 14, fontWeight: '700', color: C.textDark },
  matSub:   { fontSize: 12, color: C.textMuted },

  // Highlights
  bulletRow: {
    flexDirection: 'row', gap: 6,
    marginBottom: 5, alignItems: 'flex-start',
  },
  bulletTxt: { fontSize: 13, color: C.textMuted, flex: 1 },

  // Product offering
  offeringRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14, marginBottom: 14,
  },
  offeringCard: {
    flex: 1,
    backgroundColor: C.cardBg,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  offeringIcon:  { fontSize: 22 },
  offeringCount: {
    fontSize: 16, fontWeight: '800',
    color: C.textDark, marginTop: 4,
  },
  offeringLabel: {
    fontSize: 11, color: C.textMuted,
    marginTop: 2, textAlign: 'center',
  },

  // Terms & Conditions
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12, marginBottom: 6,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: C.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxOn: {
    backgroundColor: C.crimson,
    borderColor: C.crimson,
  },
  termsTxt:   { fontSize: 14, fontWeight: '600', color: C.textDark },
  termsTxtOn: { color: C.crimson, fontWeight: '700' },
  chevBtn:    { padding: 2 },
  termsList:  { paddingLeft: 8, gap: 8, marginBottom: 10 },
  termsItem:  { fontSize: 12, color: C.textMuted, lineHeight: 18 },

  // Bottom bar
  bottomBar: {
    flexDirection: 'row', gap: 12,
    paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: C.screenBg,
    borderTopWidth: 1, borderTopColor: C.border,
  },
  addCartBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 10,
    borderWidth: 1.5, borderColor: C.primary,
    backgroundColor: C.screenBg, alignItems: 'center',
  },
  addCartTxt:   { fontSize: 15, fontWeight: '700', color: C.primary },
  buyBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 10,
    backgroundColor: C.primary, alignItems: 'center',
  },
  buyBtnTxt:    { fontSize: 15, fontWeight: '700', color: C.white },

  // Disabled states
  btnDisabled:      { borderColor: C.inputBorder, backgroundColor: C.screenBg },
  btnTxtDisabled:   { color: C.textMuted },
  buyBtnDisabled:   { backgroundColor: C.inputBorder },
  buyBtnTxtDisabled:{ color: C.white },
});

// ─────────────────────────────────────────────────────────────────────────────
// Modal styles
// ─────────────────────────────────────────────────────────────────────────────
const ms = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    backgroundColor: C.white,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36,
  },
  sheetTitle: {
    fontSize: 17, fontWeight: '800',
    color: C.textDark, marginBottom: 20, lineHeight: 24,
  },

  // Plan rows
  planRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 12,
    borderRadius: 10, borderWidth: 1.5, borderColor: C.border,
    marginBottom: 10, gap: 12,
  },
  planRowActive: { borderColor: C.primary, backgroundColor: '#F0F4FF' },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioActive: { borderColor: C.primary },
  radioDot: {
    width: 10, height: 10, borderRadius: 5,
    backgroundColor: C.primary,
  },
  planPrices: {
    flex: 1, flexDirection: 'row',
    alignItems: 'center', gap: 8,
  },
  planPrice: { fontSize: 16, fontWeight: '800', color: C.textDark },
  planOrig:  {
    fontSize: 12, color: C.textMuted,
    textDecorationLine: 'line-through',
  },
  planDur: { fontSize: 13, fontWeight: '700', color: C.gold },
  nextBtn: {
    backgroundColor: C.primary,
    paddingVertical: 15, borderRadius: 10,
    alignItems: 'center', marginTop: 8,
  },
  nextBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },

  // Payment rows
  payRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  payLabel: { fontSize: 14, color: C.textMuted },
  payVal:   { fontSize: 14, color: C.textDark },
  payBold:  { fontWeight: '800', color: C.textDark },

  // Coupon
  couponBtn: {
    backgroundColor: '#EBF0FA',
    paddingVertical: 12, paddingHorizontal: 18,
    borderRadius: 8, alignSelf: 'flex-start', marginBottom: 14,
  },
  couponBtnTxt: { fontSize: 14, fontWeight: '700', color: C.primary },
  couponRow: {
    flexDirection: 'row',
    borderWidth: 1.5, borderColor: C.inputBorder,
    borderRadius: 8, overflow: 'hidden', marginBottom: 14,
  },
  couponInput: {
    flex: 1, paddingHorizontal: 14,
    fontSize: 14, color: C.textDark, height: 46,
  },
  couponApply:    { paddingHorizontal: 16, justifyContent: 'center' },
  couponApplyTxt: { fontSize: 14, fontWeight: '700', color: C.textMuted },

  // Pay Online
  payOnlineBtn: {
    backgroundColor: C.primary,
    paddingVertical: 15, borderRadius: 10,
    alignItems: 'center', marginTop: 6,
  },
  payOnlineTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});