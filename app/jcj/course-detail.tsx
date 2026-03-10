// app/jcj/course-detail.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '../../components/ScreenWrapper';
import Colors from '../../constants/colors';
import { MOCK_COURSE_DETAIL, MOCK_PLANS } from '../../data/mock/jcj.mock';
const C = Colors;

// ─── Plan selector bottom sheet ───────────────────────────────────────────────
function PlanSheet({
  visible, onClose, onSelect,
}: { visible: boolean; onClose: () => void; onSelect: (id: string) => void }) {
  const [selected, setSelected] = useState('p1');
  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={onClose} />
      <View style={s.sheet}>
        <Text style={s.sheetTitle}>Choose your plan</Text>
        {MOCK_PLANS.map(plan => (
          <TouchableOpacity
            key={plan.id}
            style={[s.planRow, selected === plan.id && s.planRowSelected]}
            onPress={() => setSelected(plan.id)}
          >
            <View style={[s.radio, selected === plan.id && s.radioSelected]}>
              {selected === plan.id && <View style={s.radioDot} />}
            </View>
            <View style={s.planPrices}>
              <Text style={s.planPrice}>₹{plan.price.toLocaleString('en-IN')}</Text>
              <Text style={s.planOrig}>₹{plan.originalPrice.toLocaleString('en-IN')}</Text>
            </View>
            <Text style={s.planDuration}>{plan.duration}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={s.nextBtn}
          onPress={() => { onClose(); onSelect(selected); }}
        >
          <Text style={s.nextBtnTxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─── Payment summary bottom sheet ─────────────────────────────────────────────
function PaymentSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const course = MOCK_COURSE_DETAIL;
  const handling = 53;
  const total = course.price + handling;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={s.overlay} activeOpacity={1} onPress={onClose} />
      <View style={s.sheet}>
        <Text style={s.sheetTitle}>{course.title}</Text>
        <View style={s.payRow}>
          <Text style={s.payLabel}>Price</Text>
          <Text style={s.payVal}>₹{course.price.toLocaleString('en-IN')}</Text>
        </View>
        <View style={s.payRow}>
          <Text style={s.payLabel}>Internet Handling Fee</Text>
          <Text style={s.payVal}>₹{handling}</Text>
        </View>
        <View style={[s.payRow, { marginBottom: 16 }]}>
          <Text style={[s.payLabel, { fontWeight: '700' }]}>Total</Text>
          <Text style={[s.payVal, { fontWeight: '800' }]}>₹{total.toLocaleString('en-IN')}</Text>
        </View>

        <TouchableOpacity style={s.couponBtn} onPress={() => setCouponOpen(o => !o)}>
          <Text style={s.couponBtnTxt}>Apply Coupon</Text>
        </TouchableOpacity>

        {couponOpen && (
          <View style={s.couponInputRow}>
            <TextInput
              style={s.couponInput}
              placeholder="Discount Coupon"
              placeholderTextColor={C.textMuted}
              value={coupon}
              onChangeText={setCoupon}
            />
            <TouchableOpacity style={s.couponApply}>
              <Text style={s.couponApplyTxt}>Apply</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={s.payOnlineBtn} onPress={onClose}>
          <Text style={s.payOnlineTxt}>Pay Online</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function CourseDetailScreen() {
  const course = MOCK_COURSE_DETAIL;
  const [termsOpen, setTermsOpen]       = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [planSheet, setPlanSheet]       = useState(false);
  const [paySheet, setPaySheet]         = useState(false);

 const onRefresh = async () => {
  await new Promise(res => setTimeout(res, 1200));
};

  // ── Swipe-right-to-go-back gesture ───────────────────────────────────────
  const swipeBack = Gesture.Pan()
    .activeOffsetX(20)           // only trigger after 20px horizontal move
    .onEnd((e) => {
      if (e.translationX > 60 && Math.abs(e.translationY) < 80) {
        router.back();
      }
    })
    .runOnJS(true);

  const handleBuyNow      = () => { if (termsChecked) setPlanSheet(true); };
  const handlePlanSelected = () => setPaySheet(true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={swipeBack}>
        <SafeAreaView style={s.safe} edges={['top']}>
          <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

          {/* Header */}
          <View style={s.header}>
            <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
              <Text style={s.backArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={s.headerTitle} numberOfLines={1}>Andhra Pradesh JCJ Course(JCJ)</Text>
          </View>

          <ScreenWrapper onRefresh={onRefresh}>
            {/* Hero image */}
            <Image source={course.image} style={s.heroImg} resizeMode="cover" />

            <View style={s.body}>
              {/* Title + price row */}
              <Text style={s.courseTitle}>{course.title}</Text>
              <View style={s.metaRow}>
                <Text style={s.coursePrice}>₹{course.price.toLocaleString('en-IN')}</Text>
                <Text style={s.courseOrig}>₹{course.originalPrice.toLocaleString('en-IN')}</Text>
                <Text style={s.stars}>⭐ {course.rating}</Text>
                <View style={s.discountBadge}>
                  <Text style={s.discountTxt}>{course.discount}% off</Text>
                </View>
              </View>

              {/* About */}
              <Text style={s.sectionHead}>About the course</Text>
              <Text style={s.bodyTxt}>{course.description}</Text>

              {/* Learning materials */}
              <View style={s.materialsRow}>
                <Text style={s.playIcon}>▶</Text>
                <View>
                  <Text style={s.materialTitle}>100+ Learning Materials</Text>
                  <Text style={s.materialSub}>
                    {course.learningMaterials.files} files,{' '}
                    {course.learningMaterials.videos} Video,{' '}
                    {course.learningMaterials.tests} Tests
                  </Text>
                </View>
              </View>

              {/* Highlights */}
              {course.highlights.map((h, i) => (
                <View key={i} style={s.bulletRow}>
                  <Text style={s.bullet}>•</Text>
                  <Text style={s.bulletTxt}>{h}</Text>
                </View>
              ))}

              {/* Extras box */}
              <View style={s.extrasBox}>
                <Text style={s.extrasQuestion}>what additional things will you get?</Text>
                <View style={s.extrasRow}>
                  {course.extras.map((e, i) => (
                    <View key={i} style={s.extraItem}>
                      <Text style={{ fontSize: 20 }}>{e.icon}</Text>
                      <View>
                        <Text style={s.extraLabel}>{e.label}</Text>
                        <Text style={s.extraSub}>{e.sub}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              <Text style={s.bodyTxt}>
                Start your journey to becoming a Junior Civil Judge in Andhra Pradesh with the right
                guidance and resources!
              </Text>

              {/* ── Terms & Conditions ─────────────────────────────────────── */}
              <TouchableOpacity
                style={s.termsToggle}
                activeOpacity={0.7}
                onPress={() => {
                  const next = !termsChecked;
                  setTermsChecked(next);
                  setTermsOpen(next);   // open when checking, close when unchecking
                }}
              >
                {/* Checkbox */}
                <View style={[s.checkbox, termsChecked && s.checkboxChecked]}>
                  {termsChecked && <Text style={s.checkmark}>✓</Text>}
                </View>

                <Text style={[s.termsTxt, termsChecked && s.termsTxtActive]}>
                  I accept Terms &amp; Conditions
                </Text>

                {/* Clean chevron icon — rotates based on open state */}
                <TouchableOpacity
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => setTermsOpen(o => !o)}
                  style={s.chevronBtn}
                >
                  <View style={[s.chevron, termsOpen && s.chevronUp]} />
                </TouchableOpacity>
              </TouchableOpacity>

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

              <View style={{ height: 20 }} />
            </View>
         </ScreenWrapper>

          {/* ── Bottom action bar ─────────────────────────────────────────── */}
          <View style={s.bottomBar}>
            {/* Add to Cart */}
            <TouchableOpacity
              style={[s.addCartBtn, !termsChecked && s.btnDisabled]}
              onPress={() => { if (termsChecked) handleBuyNow(); }}
              activeOpacity={termsChecked ? 0.7 : 1}
            >
              <Text style={[s.addCartTxt, !termsChecked && s.btnDisabledTxt]}>
                Add to Cart
              </Text>
            </TouchableOpacity>

            {/* Buy Now */}
            <TouchableOpacity
              style={[s.buyBtn, !termsChecked && s.buyBtnDisabled]}
              onPress={handleBuyNow}
              activeOpacity={termsChecked ? 0.7 : 1}
            >
              <Text style={s.buyTxt}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          <PlanSheet
            visible={planSheet}
            onClose={() => setPlanSheet(false)}
            onSelect={handlePlanSelected}
          />
          <PaymentSheet
            visible={paySheet}
            onClose={() => setPaySheet(false)}
          />
        </SafeAreaView>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.screenBg },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 26, color: C.textDark, fontWeight: '300', lineHeight: 30 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: C.textDark, flex: 1 },

  heroImg: { width: '100%', height: 210 },
  body:    { padding: 16 },

  courseTitle: { fontSize: 20, fontWeight: '800', color: C.textDark, marginTop: 12, marginBottom: 8, lineHeight: 26 },
  metaRow:     { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
  coursePrice: { fontSize: 20, fontWeight: '800', color: C.primary },
  courseOrig:  { fontSize: 14, color: C.textMuted, textDecorationLine: 'line-through' },
  stars:       { fontSize: 13, color: C.textMuted, fontWeight: '600' },
  discountBadge: {
    backgroundColor: C.gold, borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 3, marginLeft: 'auto',
  },
  discountTxt: { fontSize: 12, fontWeight: '800', color: C.white },

  sectionHead:   { fontSize: 15, fontWeight: '800', color: C.textDark, marginBottom: 8 },
  bodyTxt:       { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 14 },
  materialsRow:  { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  playIcon:      { fontSize: 22, color: C.primary },
  materialTitle: { fontSize: 14, fontWeight: '700', color: C.textDark },
  materialSub:   { fontSize: 12, color: C.textMuted },
  bulletRow:     { flexDirection: 'row', gap: 6, marginBottom: 5 },
  bullet:        { fontSize: 14, color: C.textMuted },
  bulletTxt:     { fontSize: 13, color: C.textMuted, flex: 1 },

  extrasBox: {
    backgroundColor: '#FFFDE7', borderRadius: 12,
    padding: 14, marginVertical: 14,
    borderWidth: 1, borderColor: '#FFF9C4',
  },
  extrasQuestion: { fontSize: 13, fontWeight: '700', color: C.textDark, marginBottom: 12 },
  extrasRow:  { flexDirection: 'row', gap: 20 },
  extraItem:  { flexDirection: 'row', alignItems: 'flex-start', gap: 8, flex: 1 },
  extraLabel: { fontSize: 13, fontWeight: '700', color: C.textDark },
  extraSub:   { fontSize: 11, color: C.textMuted },

  // ── Terms ────────────────────────────────────────────────────────────────
  termsToggle: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginTop: 8, marginBottom: 10,
    backgroundColor: C.white, borderRadius: 12,
    padding: 14,
    borderWidth: 1.5, borderColor: C.border,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: C.inputBorder,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.white,
  },
  checkboxChecked: { backgroundColor: C.crimson, borderColor: C.crimson },
  checkmark:       { fontSize: 13, color: C.white, fontWeight: '900' },
  termsTxt:        { flex: 1, fontSize: 14, fontWeight: '600', color: C.textMuted },
  termsTxtActive:  { color: C.crimson },

  // Clean CSS-drawn chevron (no emoji/text)
  chevronBtn: { padding: 4 },
  chevron: {
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: C.textMuted,
    transform: [{ rotate: '45deg' }],   // points DOWN  ∨
    marginTop: -4,
  },
  chevronUp: {
    transform: [{ rotate: '-135deg' }], // points UP  ∧
    marginTop: 2,
  },

  termsList: { paddingHorizontal: 4, gap: 8, marginBottom: 8 },
  termsItem: { fontSize: 12, color: C.textMuted, lineHeight: 18 },

  // ── Bottom bar ───────────────────────────────────────────────────────────
  bottomBar: {
    flexDirection: 'row', gap: 12, paddingHorizontal: 16,
    paddingVertical: 12, backgroundColor: C.screenBg,
    borderTopWidth: 1, borderTopColor: C.border,
  },

  // Add to Cart — outline, disabled when unchecked
  addCartBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 10,
    backgroundColor: C.white, borderWidth: 1.5, borderColor: C.primary,
    alignItems: 'center',
  },
  addCartTxt:    { fontSize: 15, fontWeight: '700', color: C.primary },

  // Buy Now — filled, disabled style when unchecked
  buyBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 10,
    backgroundColor: C.primary, alignItems: 'center',
  },
  buyTxt:        { fontSize: 15, fontWeight: '700', color: C.white },

  // Disabled states
  btnDisabled: {
    borderColor: C.inputBorder,
    backgroundColor: C.screenBg,
  },
  btnDisabledTxt: { color: C.textMuted },
  buyBtnDisabled: { backgroundColor: C.inputBorder },

  // ── Overlay + Sheet ──────────────────────────────────────────────────────
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: {
    backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36,
  },
  sheetTitle: { fontSize: 17, fontWeight: '800', color: C.textDark, marginBottom: 20 },

  planRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 12,
    borderRadius: 10, borderWidth: 1.5, borderColor: C.border,
    marginBottom: 10, gap: 12,
  },
  planRowSelected: { borderColor: C.primary, backgroundColor: '#F0F4FF' },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected:   { borderColor: C.primary },
  radioDot:        { width: 10, height: 10, borderRadius: 5, backgroundColor: C.primary },
  planPrices:      { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  planPrice:       { fontSize: 16, fontWeight: '800', color: C.textDark },
  planOrig:        { fontSize: 12, color: C.textMuted, textDecorationLine: 'line-through' },
  planDuration:    { fontSize: 13, fontWeight: '700', color: C.gold },
  nextBtn: {
    backgroundColor: C.primary, paddingVertical: 15,
    borderRadius: 10, alignItems: 'center', marginTop: 8,
  },
  nextBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },

  payRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  payLabel: { fontSize: 14, color: C.textMuted },
  payVal:   { fontSize: 14, color: C.textDark },
  couponBtn: {
    backgroundColor: '#EBF0FA', paddingVertical: 12,
    paddingHorizontal: 18, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 14,
  },
  couponBtnTxt: { fontSize: 14, fontWeight: '700', color: C.primary },
  couponInputRow: {
    flexDirection: 'row', borderWidth: 1.5, borderColor: C.border,
    borderRadius: 8, overflow: 'hidden', marginBottom: 14,
  },
  couponInput:    { flex: 1, paddingHorizontal: 14, fontSize: 14, color: C.textDark, height: 46 },
  couponApply:    { paddingHorizontal: 16, justifyContent: 'center' },
  couponApplyTxt: { fontSize: 14, fontWeight: '700', color: C.textMuted },
  payOnlineBtn: {
    backgroundColor: C.primary, paddingVertical: 15,
    borderRadius: 10, alignItems: 'center', marginTop: 6,
  },
  payOnlineTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});