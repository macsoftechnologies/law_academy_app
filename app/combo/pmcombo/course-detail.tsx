
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
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import { PMCOMBO_COURSE_DETAIL } from '../../../data/mock/pmcombo.mock';

const C = Colors;
const D = PMCOMBO_COURSE_DETAIL;

type ModalStep = 'plan' | 'summary' | 'coupon' | null;

export default function PmComboCourseDetailScreen() {
  const [agreed, setAgreed]           = useState(false);
  const [termsOpen, setTermsOpen]     = useState(false);
  const [modalStep, setModalStep]     = useState<ModalStep>(null);
  const [selectedPlan, setSelectedPlan] = useState(D.plans[0].id);
  const [couponCode, setCouponCode]   = useState('');

  const plan = D.plans.find(p => p.id === selectedPlan) || D.plans[0];

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Combination Mains&Prelims</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero image */}
        <Image source={D.image} style={s.hero} resizeMode="cover" />

        <View style={s.body}>
          {/* Title + price */}
          <View style={s.titleRow}>
            <Text style={s.courseTitle}>{D.title}</Text>
            <View style={s.discountBadge}>
              <Text style={s.discountTxt}>{D.discount}% off</Text>
            </View>
          </View>
          <View style={s.priceRow}>
            <Text style={s.price}>₹{D.price.toLocaleString('en-IN')}</Text>
            <Text style={s.originalPrice}>₹{D.originalPrice.toLocaleString('en-IN')}</Text>
          </View>

          {/* About */}
          <Text style={s.sectionHead}>About the course</Text>
          <Text style={s.description}>{D.description}</Text>

          <Text style={s.subHead}>What's included:</Text>
          {D.includes.map((item, i) => (
            <Text key={i} style={s.bullet}>• {item}</Text>
          ))}

          <View style={s.divider} />

          {D.highlights.map((item, i) => (
            <View key={i} style={s.highlightRow}>
              <Text style={s.highlightDot}>▶</Text>
              <Text style={s.highlightTxt}>{item}</Text>
            </View>
          ))}

          {/* Stats */}
          <View style={s.statsRow}>
            {D.stats.map((stat, i) => (
              <View key={i} style={s.statBox}>
                <Text style={s.statIcon}>{stat.icon}</Text>
                {stat.value ? <Text style={s.statValue}>{stat.value}</Text> : null}
                <Text style={s.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <Text style={s.tagline}>
            Start your journey to becoming a Junior Civil Judge in Andhra Pradesh with the right guidance and resources!
          </Text>

          {/* Terms & Conditions checkbox */}
          <TouchableOpacity style={s.termsRow} onPress={() => setAgreed(v => !v)}>
            <View style={[s.checkbox, agreed && s.checkboxChecked]}>
              {agreed && <Text style={s.checkmark}>✓</Text>}
            </View>
            <Text style={s.termsTxt}>I accept Terms & Conditions</Text>
            <TouchableOpacity onPress={() => setTermsOpen(v => !v)} style={s.chevron}>
              <Text style={s.chevronTxt}>{termsOpen ? '∧' : '∨'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Terms list */}
          {termsOpen && (
            <View style={s.termsList}>
              {D.termsItems.map((item, i) => (
                <Text key={i} style={s.termsItem}>{i + 1}. {item}</Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky bottom buttons */}
      <View style={s.stickyBottom}>
        <TouchableOpacity
          style={[s.cartBtn, !agreed && s.btnDisabled]}
          disabled={!agreed}
          onPress={() => setModalStep('plan')}
        >
          <Text style={[s.cartBtnTxt, !agreed && s.btnTxtDisabled]}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.buyBtn, !agreed && s.btnDisabled]}
          disabled={!agreed}
          onPress={() => setModalStep('plan')}
        >
          <Text style={[s.buyBtnTxt, !agreed && s.btnTxtDisabled]}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      {/* ── Plan selection modal */}
      <Modal visible={modalStep === 'plan'} transparent animationType="slide">
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
                <Text style={s.planLabel}>{p.label}</Text>
                <Text style={s.planOriginal}>
  ₹{p.originalPrice.toLocaleString('en-IN')}
</Text>

<Text style={s.planDuration}>
  ₹{p.price.toLocaleString('en-IN')}
</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={s.nextBtn} onPress={() => setModalStep('summary')}>
              <Text style={s.nextBtnTxt}>Next</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Summary modal */}
      <Modal visible={modalStep === 'summary'} transparent animationType="slide">
        <Pressable style={s.backdrop} onPress={() => setModalStep(null)}>
          <Pressable style={s.modalSheet} onPress={() => {}}>
            <Text style={s.modalTitle}>Andhra Pradesh Junior Civil{'\n'}Judge Course</Text>
            <View style={s.summaryRow}>
              <Text style={s.summaryKey}>Price</Text>
              <Text style={s.summaryVal}>₹{D.originalPrice.toLocaleString('en-IN')}</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryKey}>Internet Handling Fee</Text>
              <Text style={s.summaryVal}>₹53</Text>
            </View>
            <View style={[s.summaryRow, s.summaryTotal]}>
              <Text style={s.summaryKey}>Total</Text>
              <Text style={s.summaryVal}>₹{(D.originalPrice + 53).toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity style={s.couponBtn} onPress={() => setModalStep('coupon')}>
              <Text style={s.couponBtnTxt}>Apply Coupon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.payBtn}>
              <Text style={s.payBtnTxt}>Pay Online</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Coupon modal */}
      <Modal visible={modalStep === 'coupon'} transparent animationType="slide">
        <Pressable style={s.backdrop} onPress={() => setModalStep('summary')}>
          <Pressable style={s.modalSheet} onPress={() => {}}>
            <Text style={s.modalTitle}>Andhra Pradesh Junior Civil{'\n'}Judge Course</Text>
            <View style={s.summaryRow}>
              <Text style={s.summaryKey}>Price</Text>
              <Text style={s.summaryVal}>₹{D.originalPrice.toLocaleString('en-IN')}</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryKey}>Internet Handling Fee</Text>
              <Text style={s.summaryVal}>₹53</Text>
            </View>
            <View style={[s.summaryRow, s.summaryTotal]}>
              <Text style={s.summaryKey}>Total</Text>
              <Text style={s.summaryVal}>₹{(D.originalPrice + 53).toLocaleString('en-IN')}</Text>
            </View>
            <TouchableOpacity style={s.couponBtn}>
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
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark },

  hero: { width: '100%', height: 220 },
  body: { padding: 16 },

  titleRow:      { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6, gap: 10 },
  courseTitle:   { fontSize: 18, fontWeight: '800', color: C.textDark, flex: 1, lineHeight: 24 },
  discountBadge: { backgroundColor: C.gold, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  discountTxt:   { fontSize: 12, fontWeight: '800', color: C.white },

  priceRow:      { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  price:         { fontSize: 22, fontWeight: '900', color: C.primary },
  originalPrice: { fontSize: 14, color: C.textMuted, textDecorationLine: 'line-through' },

  sectionHead: { fontSize: 16, fontWeight: '800', color: C.textDark, marginBottom: 8 },
  subHead:     { fontSize: 13, fontWeight: '700', color: C.textDark, marginBottom: 6 },
  description: { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 10 },
  bullet:      { fontSize: 13, color: C.textMuted, lineHeight: 22, marginLeft: 8 },
  divider:     { height: 1, backgroundColor: C.border, marginVertical: 14 },

  highlightRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  highlightDot: { color: C.primary, fontSize: 12, marginTop: 2 },
  highlightTxt: { fontSize: 13, color: C.textMuted, flex: 1, lineHeight: 20 },

  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: C.cardBg, borderRadius: 14, padding: 16,
    marginVertical: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  statBox:   { alignItems: 'center', gap: 4 },
  statIcon:  { fontSize: 24 },
  statValue: { fontSize: 16, fontWeight: '800', color: C.textDark },
  statLabel: { fontSize: 11, color: C.textMuted, textAlign: 'center' },

  tagline: { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 20 },

  // Terms checkbox
  termsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: C.cardBg, borderRadius: 12,
    padding: 14, marginBottom: 8,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: C.inputBorder,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: C.primary, borderColor: C.primary },
  checkmark: { fontSize: 13, color: C.white, fontWeight: '800' },
  termsTxt:  { flex: 1, fontSize: 13, fontWeight: '600', color: C.textDark },
  chevron:   { padding: 4 },
  chevronTxt:{ fontSize: 14, color: C.textMuted, fontWeight: '700' },

  termsList:  { backgroundColor: C.cardBg, borderRadius: 12, padding: 14, marginBottom: 16 },
  termsItem:  { fontSize: 12, color: C.textMuted, lineHeight: 20, marginBottom: 8 },

  // Sticky buttons
  stickyBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', gap: 12,
    padding: 16, paddingBottom: 28,
    backgroundColor: C.cardBg,
    borderTopWidth: 1, borderTopColor: C.border,
  },
  cartBtn: {
    flex: 1, borderWidth: 1.5, borderColor: C.primary,
    paddingVertical: 14, borderRadius: 12, alignItems: 'center',
  },
  cartBtnTxt: { fontSize: 15, fontWeight: '700', color: C.primary },
  buyBtn: {
    flex: 1, backgroundColor: C.primary,
    paddingVertical: 14, borderRadius: 12, alignItems: 'center',
  },
  buyBtnTxt:      { fontSize: 15, fontWeight: '700', color: C.white },
  btnDisabled:    { opacity: 0.35 },
  btnTxtDisabled: { opacity: 0.6 },

  // Modals
  backdrop:    { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
  modalSheet:  {
    backgroundColor: C.cardBg,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36,
  },
  modalTitle:  { fontSize: 17, fontWeight: '800', color: C.textDark, marginBottom: 20, lineHeight: 24 },

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

  nextBtn: {
    backgroundColor: C.primary, paddingVertical: 15,
    borderRadius: 12, alignItems: 'center', marginTop: 8,
  },
  nextBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },

  summaryRow:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryTotal: { borderTopWidth: 1, borderTopColor: C.border, paddingTop: 12 },
  summaryKey:   { fontSize: 14, color: C.textMuted },
  summaryVal:   { fontSize: 14, fontWeight: '700', color: C.textDark },

  couponBtn: {
    borderWidth: 1.5, borderColor: C.primary, borderRadius: 12,
    paddingVertical: 13, alignItems: 'center', marginTop: 8, marginBottom: 10,
  },
  couponBtnTxt: { fontSize: 14, fontWeight: '700', color: C.primary },

  couponInputRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  couponInput: {
    flex: 1, borderWidth: 1, borderColor: C.inputBorder,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 13, color: C.textDark,
  },
  couponApplyBtn: {
    backgroundColor: C.primary, paddingHorizontal: 16,
    borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  couponApplyTxt: { fontSize: 13, fontWeight: '700', color: C.white },

  payBtn: {
    backgroundColor: C.primary, paddingVertical: 15,
    borderRadius: 12, alignItems: 'center',
  },
  payBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});