// components/ui/UnlockPopup.tsx
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal, Pressable,
} from 'react-native';
import { router } from 'expo-router';
import Colors from '../../constants/colors';

const C = Colors;

interface Props {
  visible: boolean;
  onClose: () => void;
  detailRoute: string;
}

export default function UnlockPopup({ visible, onClose, detailRoute }: Props) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose}>
        <Pressable style={s.sheet} onPress={() => {}}>
          <TouchableOpacity style={s.closeBtn} onPress={onClose}>
            <Text style={s.closeTxt}>✕</Text>
          </TouchableOpacity>

          <View style={s.illustration}>
            <Text style={s.illustrationEmoji}>⚖️</Text>
            <View style={s.lockBadge}>
              <Text style={s.lockBadgeTxt}>UNLOCK{'\n'}YOUR{'\n'}COURSE</Text>
            </View>
          </View>

          <Text style={s.title}>UNLOCK FULL ACCESS</Text>
          <Text style={s.subtitle}>To continue watching, purchase the full course</Text>

          <TouchableOpacity
            style={s.buyBtn}
            onPress={() => {
              onClose();
              router.push(detailRoute as any);
            }}
          >
            <Text style={s.buyBtnTxt}>Buy Now 🛒</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: C.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: C.cardBg,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, alignItems: 'center', paddingBottom: 40,
  },
  closeBtn: {
    position: 'absolute', top: 16, right: 20,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center',
  },
  closeTxt: { fontSize: 14, color: C.textDark, fontWeight: '700' },
  illustration: {
    width: 140, height: 140, backgroundColor: '#EEF1FA',
    borderRadius: 70, alignItems: 'center', justifyContent: 'center',
    marginBottom: 20, marginTop: 10,
  },
  illustrationEmoji: { fontSize: 48 },
  lockBadge: {
    position: 'absolute', bottom: 8, right: 8,
    backgroundColor: C.primary, borderRadius: 8,
    paddingHorizontal: 6, paddingVertical: 4,
  },
  lockBadgeTxt: { fontSize: 7, fontWeight: '800', color: C.white, textAlign: 'center', lineHeight: 10 },
  title:    { fontSize: 20, fontWeight: '900', color: C.textDark, marginBottom: 8, letterSpacing: 0.3 },
  subtitle: { fontSize: 13, color: C.textMuted, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
  buyBtn: {
    backgroundColor: C.gold, width: '100%',
    paddingVertical: 16, borderRadius: 12, alignItems: 'center',
  },
  buyBtnTxt: { fontSize: 16, fontWeight: '800', color: C.white },
});