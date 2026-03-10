// app/(tabs)/mains/testlist.tsx
// Screen: Shows Civil Law, Criminal Law, Essay & Translation test cards with Start Test button
// Navigated to from mainstest.tsx after clicking "Open" on a Mains Test card

import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import { TEST_SUBJECTS } from '../../../data/mock/mains.mock';

const C = Colors;

const BLURRED_TEXT =
  '(b) The "participatory model" which emphasizes a constructive participation of the community in the mainstreaming of the strong premises and the mainstreaming of legal information in their lives.\n\nPrinciples under the Juvenile Justice (Care and Protection of Children) Act 2015:\nThe Act has dedicated one chapter to Principles, thus emphasizing the significance of reading the Act in the light of the principles while implementing the same.\n\n1 Principles of presumption of innocence:\nAny child shall be presumed to be an innocent of any man-like criminal actions up to the age of eighteen years. The three principles of criminal jurisprudence in India are:\n\na) The same law differently as the presumption to prove by case beyond reasonable doubt.\nb) That a criminal act the accused must be presumed to be innocent unless proved guilty; and\nc) That the onus of the prosecution shifts.\n\nArticle 11 of the Universal Declaration of Human Rights (UNDHR) states, "Everyone charged with a penal offence has the right to be presumed innocent until proved guilty according to law in a public trial at which he has had all the guarantees necessary for his defence."\n\n2 Principle of dignity and worth: All human beings shall be treated with equal dignity and rights.';

export default function TestListScreen() {
  const { subject = 'Mains Test-1', subjectId = 'test1' } =
    useLocalSearchParams<{ subject?: string; subjectId?: string }>();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<(typeof TEST_SUBJECTS)[0] | null>(null);
  const [accepted, setAccepted] = useState(false);

  const handleStartPress = (item: (typeof TEST_SUBJECTS)[0]) => {
    setSelectedSubject(item);
    setAccepted(false);
    setModalVisible(true);
  };

  const handleConfirmStart = () => {
    if (!accepted || !selectedSubject) return;
    setModalVisible(false);
    router.push({
      pathname: '/(tabs)/mains/testpaper',
      params: {
        examType: subject,
        subjectName: selectedSubject.subjectName,
        subjectId: selectedSubject.id,
        durationHours: selectedSubject.hours,
      },
    });
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTop}>AP JCJ Mains Preparation</Text>
          <Text style={s.headerSub}>{subject}</Text>
        </View>
        <TouchableOpacity
          style={s.resultBtn}
          onPress={() =>
            router.push({
              pathname: '/(tabs)/mains/testresults',
              params: { examType: subject },
            })
          }
        >
          <Text style={s.resultBtnTxt}>Result</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {TEST_SUBJECTS.map((item) => (
          <View key={item.id} style={s.card}>
            {/* Blurred paper preview */}
            <View style={s.preview}>
              <Text style={s.previewText} numberOfLines={20}>
                {BLURRED_TEXT}
              </Text>
            </View>

            {/* Right info */}
            <View style={s.info}>
              <Text style={s.cardTitle}>{item.title}</Text>
              <View style={s.metaRow}>
                <Text style={s.metaIcon}>📋</Text>
                <Text style={s.metaTxt}>{item.questions} Questions</Text>
              </View>
              <View style={s.metaRow}>
                <Text style={s.metaIcon}>🕐</Text>
                <Text style={s.metaTxt}>{item.hours} Hours</Text>
              </View>
              <TouchableOpacity
                style={s.startBtn}
                onPress={() => handleStartPress(item)}
              >
                <Text style={s.startBtnTxt}>Start Test</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Start Test Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={s.overlay}>
          <View style={s.modal}>
            {/* Close */}
            <TouchableOpacity style={s.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={s.closeTxt}>✕</Text>
            </TouchableOpacity>

            <Text style={s.modalNote}>Note:</Text>
            <View style={s.noteList}>
              <Text style={s.noteItem}>
                <Text style={s.noteNum}>1. </Text>
                Are you sure you want to start the {selectedSubject?.subjectName} Mains Test?
              </Text>
              <Text style={s.noteItem}>
                <Text style={s.noteNum}>2. </Text>
                Once the test begins, you must complete it within {selectedSubject?.hours} hours.
              </Text>
              <Text style={s.noteItem}>
                <Text style={s.noteNum}>3. </Text>
                After submission time, you'll get an additional 15 minutes grace period to scan your
                answer sheets, convert them into a PDF, and upload the file.
              </Text>
              <Text style={s.noteItem}>
                <Text style={s.noteNum}>4. </Text>
                Once started, the test cannot be paused or restarted.
              </Text>
            </View>

            {/* Checkbox */}
            <TouchableOpacity
              style={s.checkRow}
              onPress={() => setAccepted((v) => !v)}
              activeOpacity={0.8}
            >
              <View style={[s.checkbox, accepted && s.checkboxChecked]}>
                {accepted && <Text style={s.checkmark}>✓</Text>}
              </View>
              <Text style={s.checkLabel}>I accept Terms &amp; Conditions</Text>
            </TouchableOpacity>

            {/* Action buttons */}
            <View style={s.modalBtns}>
              <TouchableOpacity
                style={s.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={s.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.confirmBtn, !accepted && s.confirmBtnDisabled]}
                onPress={handleConfirmStart}
                disabled={!accepted}
              >
                <Text style={[s.confirmTxt, !accepted && s.confirmTxtDisabled]}>
                  Start Test
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.screenBg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: C.screenBg,
  },
  back: { fontSize: 28, color: C.textDark, marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerCenter: { flex: 1 },
  headerTop: { fontSize: 13, fontWeight: '600', color: C.textDark },
  headerSub: { fontSize: 17, fontWeight: '800', color: C.textDark },
  resultBtn: {
    backgroundColor: '#8B1A1A',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },
  resultBtnTxt: { color: '#fff', fontWeight: '700', fontSize: 13 },

  scroll: { padding: 14, gap: 14 },

  card: {
    backgroundColor: C.cardBg,
    borderRadius: 14,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  preview: {
    width: 110,
    backgroundColor: '#f5f5f5',
    padding: 7,
    overflow: 'hidden',
  },
  previewText: {
    fontSize: 7,
    color: '#666',
    lineHeight: 10,
    opacity: 0.8,
  },

  info: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: C.textDark,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  metaIcon: { fontSize: 12, marginRight: 6 },
  metaTxt: { fontSize: 12, color: C.textMuted, fontWeight: '500' },

  startBtn: {
    backgroundColor: C.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  startBtnTxt: { fontSize: 13, fontWeight: '700', color: '#fff' },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 36,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 20,
    zIndex: 10,
  },
  closeTxt: { fontSize: 18, color: '#333', fontWeight: '600' },

  modalNote: { fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 14 },
  noteList: { gap: 10, marginBottom: 20 },
  noteItem: { fontSize: 14, color: '#333', lineHeight: 20 },
  noteNum: { fontWeight: '700' },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#C0392B',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#C0392B',
  },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  checkLabel: { fontSize: 14, fontWeight: '600', color: '#C0392B' },

  modalBtns: { flexDirection: 'row', gap: 12 },
  cancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#ccc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelTxt: { fontSize: 15, fontWeight: '700', color: '#555' },

  confirmBtn: {
    flex: 1,
    backgroundColor: C.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmBtnDisabled: { backgroundColor: '#B0BEC5' },
  confirmTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },
  confirmTxtDisabled: { color: '#fff' },
});