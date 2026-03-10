import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';

const C = Colors;

const SUBJECTS = [
  { id: 'cpc', label: 'Mains Test-1', questions: 200, mins: 150 },
  { id: 'iev', label: 'Mains Test-2', questions: 200, mins: 150 },
  { id: 'top', label: 'Mains Test-3', questions: 200, mins: 150 },
];

export default function MainsTestScreen() {
  const { title = 'Civil Laws' } = useLocalSearchParams<{ title?: string }>();

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>AP {title} Mocks</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {SUBJECTS.map((subj) => (
          <SubjectCard key={subj.id} subject={subj} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function SubjectCard({ subject }: { subject: typeof SUBJECTS[0] }) {
  return (
    <View style={s.card}>
      {/* Blurred background */}
      <View style={s.blurredBg}>
        <Text style={s.blurredText} numberOfLines={6}>
          {DATA}
        </Text>
      </View>

      {/* Info Section */}
      <View style={s.infoRow}>
        <Text style={s.subjectLabel}>{subject.label}</Text>

        {/* Tags — Same as First Screen */}
        <View style={s.tagsRow}>
          <View style={s.tagRed}>
            <Text style={s.tagRedTxt}>🔴 {subject.questions} Ques</Text>
          </View>

          <View style={s.tagGold}>
            <Text style={s.tagGoldTxt}>🕐 {subject.mins} mins</Text>
          </View>
        </View>
      </View>

      {/* Primary Button — Same as First Screen */}
      <TouchableOpacity
        style={s.viewBtn}
        onPress={() =>
          router.push({
            pathname: '/(tabs)/mains/testlist',
            params: { subject: subject.label, subjectId: subject.id },
          })
        }
      >
        <Text style={s.viewBtnText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
}

const DATA =
  '(b) The "participatory model" which emphasizes a constructive participation of the community in the mainstreaming of the strong premises and the mainstreaming of legal information in their lives.\n\nPrinciple under the Juvenile Justice (Care and Protection of Children) Act 2015:\nThe Act has dedicated one chapter to Principles, thus emphasizing the significance of reading the Act in light of the principles while implementing the same.\n\n1 Principles of presumption of innocence:\nAny child shall be presumed to be an innocent of any man-like or criminal actions up to the age of eighteen years. The three principles of criminal jurisprudence in India are—\n\na) The same law differently as the presumption to prove by case beyond reasonable doubt and it cannot derive any benefit from testimony or failure of the release whereas while growing in years.\nb) That a criminal act the accused must be presumed to be innocent unless he is proved to be guilty; and\nc) That the onus of the prosecution shifts.\n\nArticle 11 of the Universal Declaration of Human Rights (UNDHR) states, "Everyone charged with a penal offence has the right to be presumed innocent until proved guilty according to law in a public trial at which he has had all the guarantees necessary for his defence."';

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.screenBg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: C.screenBg,
  },
  back: {
    fontSize: 28,
    marginRight: 10,
    color: C.textDark,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.textDark,
    flexShrink: 1,
  },

  scroll: { padding: 14, gap: 16, paddingBottom: 32 },

  card: {
    backgroundColor: C.cardBg,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  blurredBg: {
    height: 140,
    overflow: 'hidden',
    padding: 10,
    backgroundColor: '#f9f9f9',
    opacity: 0.7,
  },
  blurredText: {
    fontSize: 10,
    color: '#555',
    lineHeight: 14,
  },

  infoRow: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 6,
  },

  subjectLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: C.primary,
    marginBottom: 8,
  },

  tagsRow: {
    flexDirection: 'row',
    gap: 10,
  },

  tagRed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagRedTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: C.crimson,
  },

  tagGold: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagGoldTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: C.gold,
  },

  viewBtn: {
    backgroundColor: C.primary,
    marginHorizontal: 14,
    marginBottom: 14,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: C.white,
  },
});