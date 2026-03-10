// app/(tabs)/mains/testpaper.tsx

import * as DocumentPicker from 'expo-document-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';

const C = Colors;
const GRACE_SECONDS = 15 * 60;

export default function TestPaperScreen() {
  const {
    examType = 'Mains Test-1',
    subjectName = 'Civil Laws',
    subjectId = 'civil',
    durationHours = '3',
  } = useLocalSearchParams<{
    examType?: string;
    subjectName?: string;
    subjectId?: string;
    durationHours?: string;
  }>();

  const totalSeconds = parseInt(durationHours) * 3600;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isGrace, setIsGrace] = useState(false);
  const [graceSeconds, setGraceSeconds] = useState(GRACE_SECONDS);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // MAIN TIMER
  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsGrace(true);
      return;
    }
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  // GRACE TIMER
  useEffect(() => {
    if (!isGrace) return;
    if (graceSeconds <= 0) {
      handleAutoSubmit();
      return;
    }
    const t = setInterval(() => setGraceSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [isGrace, graceSeconds]);

  // GRACE ANIMATION
  useEffect(() => {
    if (!isGrace) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [isGrace]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(
      2,
      '0'
    )}:${String(s).padStart(2, '0')}`;
  };

  // const handleUpload = () => {
  //   setUploadedFile('answer_script.pdf');
  //   Alert.alert('Uploaded', 'answer_script.pdf uploaded successfully.');
  // };
  const handleUpload = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const file = result.assets[0];
      setUploadedFile(file.name);
      Alert.alert('Uploaded', `${file.name} uploaded successfully.`);
    }
  } catch (err) {
    Alert.alert('Error', 'Failed to pick file.');
  }
};

  const handleAutoSubmit = () => {
    router.replace({
      pathname: '/(tabs)/mains/testsubmitted',
      params: { examType, subjectName, subjectId },
    });
  };

  const handleSubmit = () => {
    setSubmitModalVisible(true);
  };

  const confirmSubmit = () => {
    setSubmitModalVisible(false);
    router.replace({
      pathname: '/(tabs)/mains/testsubmitted',
      params: { examType, subjectName, subjectId },
    });
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* HEADER */}
      <View style={s.header}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Leave Test?', 'Your progress will be lost.', [
              { text: 'Stay', style: 'cancel' },
              {
                text: 'Leave',
                style: 'destructive',
                onPress: () => router.back(),
              },
            ])
          }
        >
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>AP JCJ Mains Preparation</Text>
      </View>

      {/* INFO PILLS */}
      <View style={s.pillsRow}>
        <View style={s.pillBlue}>
          <Text style={s.pillTxt}>Exam Type: {examType}</Text>
        </View>
        <View style={s.pillBlue}>
          <Text style={s.pillTxt}>Subject: {subjectName}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* QUESTION PAPER */}
        <View style={s.paperCard}>
          <View style={s.paperHeaderRow}>
            <Text style={s.paperTitle}>Question Paper</Text>
            <View style={s.timerPill}>
              <Text style={s.timerIcon}>🕐</Text>
              <Text style={[s.timerTxt, isGrace && s.timerTxtRed]}>
                Time Remaining {formatTime(secondsLeft)}
              </Text>
            </View>
          </View>

          {/* PDF VIEWER */}
          <View style={s.paperBody}>
            <Pdf
  source={require('../../../assets/demo.pdf')}
  style={s.pdf}
  enablePaging={false}
  horizontal={false}
  trustAllCerts={false}
  enableAntialiasing={true}
  enableAnnotationRendering={false}
  onError={(error) => console.log('PDF Error:', error)}
/>
          </View>
        </View>

        {/* UPLOAD BUTTON */}
        <TouchableOpacity style={s.uploadBtn} onPress={handleUpload}>
          <Text style={s.uploadIcon}>⬆</Text>
          <Text style={s.uploadTxt}>
            Upload Your Answer Script{'\n'}(PDF/JPG)
          </Text>
        </TouchableOpacity>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity style={s.submitBtn} onPress={handleSubmit}>
          <Text style={s.submitTxt}>SUBMIT</Text>
        </TouchableOpacity>

        <Text style={s.hint}>
          Ensure all answers uploaded before submitting
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* CONFIRM MODAL */}
      <Modal
        visible={submitModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSubmitModalVisible(false)}
      >
        <View style={s.overlay}>
          <View style={s.confirmModal}>
            <Text style={s.confirmTitle}>Submit Test?</Text>
            <Text style={s.confirmMsg}>
              {uploadedFile
                ? `Your file "${uploadedFile}" will be submitted.`
                : 'You have not uploaded any answer script. Are you sure you want to submit?'}
            </Text>
            <View style={s.confirmBtns}>
              <TouchableOpacity
                style={s.cancelBtn}
                onPress={() => setSubmitModalVisible(false)}
              >
                <Text style={s.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.okBtn} onPress={confirmSubmit}>
                <Text style={s.okTxt}>Submit</Text>
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
  },
  back: { fontSize: 28, color: C.textDark, marginRight: 10 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: C.textDark },

  pillsRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pillBlue: {
    backgroundColor: C.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pillTxt: { fontSize: 12, fontWeight: '700', color: '#fff' },

  scroll: { paddingHorizontal: 14 },

  paperCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
  },

  paperHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  paperTitle: { fontSize: 15, fontWeight: '800', color: C.textDark },

  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  timerIcon: { fontSize: 12 },
  timerTxt: { fontSize: 12, fontWeight: '700', color: '#C0392B' },
  timerTxtRed: { color: '#C0392B' },

  paperBody: { padding: 14 },

  pdf: {
  width: '100%',
  height: 800,   // increase height so more content is visible
  backgroundColor: '#f5f5f5',
},

  uploadBtn: {
    backgroundColor: '#E6A817',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },

  uploadIcon: { fontSize: 18, color: '#fff' },
  uploadTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },

  submitBtn: {
    backgroundColor: C.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },

  submitTxt: { fontSize: 15, fontWeight: '800', color: '#fff' },

  hint: {
    fontSize: 12,
    color: C.textMuted,
    textAlign: 'center',
    marginBottom: 8,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  confirmModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },

  confirmTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.textDark,
    marginBottom: 10,
  },

  confirmMsg: { fontSize: 14, color: '#555', marginBottom: 20 },

  confirmBtns: { flexDirection: 'row', gap: 12 },

  cancelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  cancelTxt: { fontSize: 14, fontWeight: '700', color: '#555' },

  okBtn: {
    flex: 1,
    backgroundColor: C.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  okTxt: { fontSize: 14, fontWeight: '700', color: '#fff' },
});