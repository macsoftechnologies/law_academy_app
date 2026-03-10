import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, StatusBar, Modal, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import { MOCK_SUBJECT_COURSE, MOCK_SUBJECT_PLANS } from '../../data/mock/sublist.mock';
import ScreenWrapper from '../../components/ScreenWrapper';

const C = Colors;

// ─── Plan Sheet – Image 6 ─────────────────────────────────────────────────────
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
      <TouchableOpacity style={ms.overlay} activeOpacity={1} onPress={onClose} />
      <View style={ms.sheet}>
        <Text style={ms.sheetTitle}>Choose your plan</Text>
        {MOCK_SUBJECT_PLANS.map(plan => (
          <TouchableOpacity
            key={plan.id}
            style={[ms.planRow, selected === plan.id && ms.planRowActive]}
            onPress={() => setSelected(plan.id)}
          >
            <View style={[ms.radio, selected === plan.id && ms.radioActive]}>
              {selected === plan.id && <View style={ms.radioDot} />}
            </View>
            <View style={ms.planMid}>
              <Text style={ms.planPrice}>
                ₹{plan.price.toLocaleString('en-IN')}
              </Text>
              <Text style={ms.planOrig}>
                ₹{plan.originalPrice.toLocaleString('en-IN')}
              </Text>
            </View>
            <Text style={ms.planDur}>{plan.duration}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={ms.nextBtn}
          onPress={() => { onClose(); onNext(); }}
        >
          <Text style={ms.nextBtnTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─── Payment Sheet – Images 7 & 8 ────────────────────────────────────────────
function PaymentSheet({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const course = MOCK_SUBJECT_COURSE;
  const fee = 53;
  const total = course.price + fee;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={ms.overlay} activeOpacity={1} onPress={onClose} />
      <View style={ms.sheet}>
        <Text style={ms.sheetTitle}>{course.title}</Text>

        {[
          { label: 'Price',                value: `₹${course.price.toLocaleString('en-IN')}`, bold: false },
          { label: 'Internet Handling Fee', value: `₹${fee}`,                                  bold: false },
          { label: 'Total',                value: `₹${total.toLocaleString('en-IN')}`,         bold: true  },
        ].map((row, i) => (
          <View key={i} style={[ms.payRow, i === 2 && { marginBottom: 18 }]}>
            <Text style={[ms.payLabel, row.bold && ms.payLabelBold]}>{row.label}</Text>
            <Text style={[ms.payVal,   row.bold && ms.payValBold]}>{row.value}</Text>
          </View>
        ))}

        {/* Apply Coupon button */}
        <TouchableOpacity
          style={ms.couponBtn}
          onPress={() => setCouponOpen(o => !o)}
        >
          <Text style={ms.couponBtnTxt}>Apply Coupon</Text>
        </TouchableOpacity>

        {/* Coupon input field – Image 8 */}
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

        <TouchableOpacity style={ms.payOnlineBtn} onPress={onClose}>
          <Text style={ms.payOnlineTxt}>Pay Online</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SubjectCourseDetailScreen() {
  const course = MOCK_SUBJECT_COURSE;
  const [termsOpen, setTermsOpen]       = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [planVisible, setPlanVisible]   = useState(false);
  const [payVisible,  setPayVisible]    = useState(false);

  const openPlan = () => setPlanVisible(true);
  const openPay  = () => setPayVisible(true);
const onRefresh = async () => {
  await new Promise(res => setTimeout(res, 1200));
};
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header — back goes to sub-list/subject-subjects */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle} numberOfLines={1}>
          {course.headerTitle}
        </Text>
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
        {/* Hero image */}
        <Image source={course.image} style={s.heroImg} resizeMode="cover" />

        <View style={s.body}>
          {/* Title + price */}
          <Text style={s.courseTitle}>{course.title}</Text>
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

          {/* About */}
          <Text style={s.sectionHead}>About the course</Text>
          <Text style={s.bodyTxt}>{course.description}</Text>

          {/* Learning materials */}
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
              <Text style={s.checkIcon}>✔</Text>
              <Text style={s.bulletTxt}>{h}</Text>
            </View>
          ))}

          {/* Product Offering */}
          <Text style={[s.sectionHead, { marginTop: 16 }]}>Product Offering</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 16 }}
          >
            {course.productOffering.map((p, i) => (
              <View key={i} style={s.offeringCard}>
                <Text style={{ fontSize: 22 }}>{p.icon}</Text>
                <Text style={s.offeringCount}>{p.count}</Text>
                <Text style={s.offeringLabel}>{p.label}</Text>
              </View>
            ))}
          </ScrollView>

          <Text style={s.bodyTxt}>
            Start your journey to becoming a Junior Civil Judge in Andhra Pradesh
            with the right guidance and resources!
          </Text>

          {/* Terms & Conditions */}
          <View style={s.termsToggle}>
            {/* Checkbox — ticking accepts terms independently */}
            <TouchableOpacity
              onPress={() => setTermsChecked(o => !o)}
              style={[s.checkbox, termsChecked && s.checkboxOn]}
            >
              {termsChecked && (
                <Ionicons name="checkmark" size={14} color={C.white} />
              )}
            </TouchableOpacity>

            {/* Label — tapping also ticks the checkbox */}
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setTermsChecked(o => !o)}
            >
              <Text style={[s.termsTxt, termsChecked && s.termsTxtChecked]}>
                I accept Terms & Conditions
              </Text>
            </TouchableOpacity>

            {/* Chevron — only toggles the dropdown */}
            <TouchableOpacity onPress={() => setTermsOpen(o => !o)} style={s.chevBtn}>
              <Ionicons
                name={termsOpen ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={termsChecked ? C.crimson : C.textMuted}
              />
            </TouchableOpacity>
          </View>

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

      {/* Bottom bar — disabled until checkbox is ticked */}
      <View style={s.bottomBar}>
        <TouchableOpacity
          style={[s.addCartBtn, !termsChecked && s.btnDisabled]}
          onPress={termsChecked ? openPlan : undefined}
          activeOpacity={termsChecked ? 0.75 : 1}
        >
          <Text style={[s.addCartTxt, !termsChecked && s.btnTxtDisabled]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.buyBtn, !termsChecked && s.btnDisabledFilled]}
          onPress={termsChecked ? openPlan : undefined}
          activeOpacity={termsChecked ? 0.75 : 1}
        >
          <Text style={s.buyBtnTxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* Inline modals – no external navigation */}
      <PlanSheet
        visible={planVisible}
        onClose={() => setPlanVisible(false)}
        onNext={openPay}
      />
      <PaymentSheet
        visible={payVisible}
        onClose={() => setPayVisible(false)}
      />
    </SafeAreaView>
  );
}

// ─── Page styles ──────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.screenBg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 26, color: C.textDark, fontWeight: '300', lineHeight: 30 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: C.textDark, flex: 1 },

  heroImg: { width: '100%', height: 210 },
  body:    { padding: 16 },

  courseTitle: {
    fontSize: 20, fontWeight: '800', color: C.textDark,
    marginTop: 10, marginBottom: 8, lineHeight: 26,
  },
  metaRow: {
    flexDirection: 'row', alignItems: 'center',
    flexWrap: 'wrap', gap: 10, marginBottom: 18,
  },
  coursePrice: { fontSize: 20, fontWeight: '800', color: C.primary },
  courseOrig:  { fontSize: 14, color: C.textMuted, textDecorationLine: 'line-through' },
  discBadge: {
    backgroundColor: C.gold, borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 3, marginLeft: 'auto',
  },
  discBadgeTxt: { fontSize: 12, fontWeight: '800', color: C.white },

  sectionHead: { fontSize: 15, fontWeight: '800', color: C.textDark, marginBottom: 8 },
  bodyTxt:     { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 14 },

  materialsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  playIcon:     { fontSize: 22, color: C.primary },
  matTitle:     { fontSize: 14, fontWeight: '700', color: C.textDark },
  matSub:       { fontSize: 12, color: C.textMuted },

  bulletRow: { flexDirection: 'row', gap: 6, marginBottom: 5, alignItems: 'flex-start' },
  checkIcon: { fontSize: 13, color: C.primary, marginTop: 1 },
  bulletTxt: { fontSize: 13, color: C.textMuted, flex: 1 },

  offeringCard: {
    backgroundColor: C.cardBg, borderRadius: 12, padding: 12,
    marginRight: 10, alignItems: 'center', minWidth: 80,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  offeringCount: { fontSize: 16, fontWeight: '800', color: C.textDark, marginTop: 4 },
  offeringLabel: { fontSize: 11, color: C.textMuted, marginTop: 2, textAlign: 'center' },

  termsToggle: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8, marginBottom: 6 },
  checkbox:    { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: C.primary, alignItems: 'center', justifyContent: 'center' },
  checkboxOn:  { backgroundColor: C.crimson, borderColor: C.crimson },
  termsTxt:    { fontSize: 14, fontWeight: '600', color: C.textDark },
  termsTxtChecked: { color: C.crimson, fontWeight: '700' },
  chevBtn:     { padding: 2 },
  termsList:   { paddingLeft: 8, gap: 8, marginBottom: 10 },
  termsItem:   { fontSize: 12, color: C.textMuted, lineHeight: 18 },

  bottomBar: {
    flexDirection: 'row', gap: 12, paddingHorizontal: 16,
    paddingVertical: 12, backgroundColor: C.screenBg,
    borderTopWidth: 1, borderTopColor: C.border,
  },
  addCartBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 10,
    borderWidth: 1.5, borderColor: C.primary,
    backgroundColor: C.screenBg, alignItems: 'center',
  },
  addCartTxt: { fontSize: 15, fontWeight: '700', color: C.primary },
  buyBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 10,
    backgroundColor: C.primary, alignItems: 'center',
  },
  buyBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
  // Disabled states
  btnDisabled:      { borderColor: C.border, backgroundColor: C.screenBg },
  btnTxtDisabled:   { color: C.textMuted },
  btnDisabledFilled:{ backgroundColor: C.inputBorder },
});

// ─── Modal styles ─────────────────────────────────────────────────────────────
const ms = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36,
  },
  sheetTitle: { fontSize: 17, fontWeight: '800', color: C.textDark, marginBottom: 20 },

  // Plan rows
  planRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 12,
    borderRadius: 10, borderWidth: 1.5, borderColor: C.border,
    marginBottom: 10, gap: 12,
  },
  planRowActive: { borderColor: C.primary, backgroundColor: '#F0F4FF' },
  radio:    { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: C.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.primary },
  planMid:  { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  planPrice: { fontSize: 16, fontWeight: '800', color: C.textDark },
  planOrig:  { fontSize: 12, color: C.textMuted, textDecorationLine: 'line-through' },
  planDur:   { fontSize: 13, fontWeight: '700', color: C.gold },
  nextBtn:   { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  nextBtnTxt:{ fontSize: 15, fontWeight: '700', color: C.white },

  // Payment rows
  payRow:      { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  payLabel:    { fontSize: 14, color: C.textMuted },
  payLabelBold:{ fontWeight: '700', color: C.textDark },
  payVal:      { fontSize: 14, color: C.textDark },
  payValBold:  { fontWeight: '800' },
  couponBtn:   { backgroundColor: '#EBF0FA', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 14 },
  couponBtnTxt:{ fontSize: 14, fontWeight: '700', color: C.primary },
  couponRow:   { flexDirection: 'row', borderWidth: 1.5, borderColor: C.border, borderRadius: 8, overflow: 'hidden', marginBottom: 14 },
  couponInput: { flex: 1, paddingHorizontal: 14, fontSize: 14, color: C.textDark, height: 46 },
  couponApply: { paddingHorizontal: 16, justifyContent: 'center' },
  couponApplyTxt: { fontSize: 14, fontWeight: '700', color: C.textMuted },
  payOnlineBtn:{ backgroundColor: C.primary, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 6 },
  payOnlineTxt:{ fontSize: 15, fontWeight: '700', color: C.white },
});