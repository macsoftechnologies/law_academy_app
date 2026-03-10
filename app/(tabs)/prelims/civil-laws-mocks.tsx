// app/(tabs)/prelims/civil-laws-mocks.tsx
// Image 2: AP Civil Laws Mocks — list of subjects (Civil Procedure Code, Indian Evidence Act, Transfer of Property)
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

const SUBJECTS = [
  { id: 'cpc',  label: 'Civil Procedure Code',   questions: 200, mins: 150 },
  { id: 'iev',  label: 'Indian Evidence Act',     questions: 200, mins: 150 },
  { id: 'top',  label: 'Transfer of Property',    questions: 200, mins: 150 },
];

export default function CivilLawsMocksScreen() {
  const { title = 'Civil Laws' } = useLocalSearchParams<{ title?: string }>();

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>AP {title} Mocks</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Hero blurred text background — mimics the blurred text shown in Image 2 */}
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
      {/* Blurred background text block */}
      <View style={s.blurredBg}>
        <Text style={s.blurredText} numberOfLines={6}>
          {LOREM}
        </Text>
      </View>

      {/* Subject info row */}
      <View style={s.infoRow}>
        <Text style={s.subjectLabel}>{subject.label}</Text>
        <View style={s.metaRow}>
          <View style={s.metaChip}>
            <Text style={s.metaIcon}>📋</Text>
            <Text style={s.metaText}>{subject.questions} Ques</Text>
          </View>
          <View style={s.metaChip}>
            <Text style={s.metaIcon}>⏱</Text>
            <Text style={s.metaText}>{subject.mins} mins</Text>
          </View>
        </View>
      </View>

      {/* View button */}
      <TouchableOpacity
        style={s.viewBtn}
        onPress={() =>
          router.push({
            pathname: '/(tabs)/prelims/mock-tests-list',
            params: { subject: subject.label, subjectId: subject.id },
          })
        }
      >
        <Text style={s.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  );
}

const LOREM =
  '(b) The "participatory model" which emphasizes a constructive participation of the community in the mainstreaming of the strong premises and the mainstreaming of legal information in their lives.\n\nPrinciple under the Juvenile Justice (Care and Protection of Children) Act 2015:\nThe Act has dedicated one chapter to Principles, thus emphasizing the significance of reading the Act in light of the principles while implementing the same.\n\n1 Principles of presumption of innocence:\nAny child shall be presumed to be an innocent of any man-like or criminal actions up to the age of eighteen years. The three principles of criminal jurisprudence in India are—\n\na) The same law differently as the presumption to prove by case beyond reasonable doubt and it cannot derive any benefit from testimony or failure of the release whereas while growing in years.\nb) That a criminal act the accused must be presumed to be innocent unless he is proved to be guilty; and\nc) That the onus of the prosecution shifts.\n\nArticle 11 of the Universal Declaration of Human Rights (UNDHR) states, "Everyone charged with a penal offence has the right to be presumed innocent until proved guilty according to law in a public trial at which he has had all the guarantees necessary for his defence."';

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8EBF3' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#E8EBF3',
  },
  back: { fontSize: 28, marginRight: 10, color: '#1a1a2e' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1a1a2e', flexShrink: 1 },

  scroll: { padding: 14, gap: 16, paddingBottom: 32 },

  card: {
    backgroundColor: '#fff',
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
    // React Native doesn't support CSS blur natively, so we use low opacity to simulate
  },

  infoRow: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 4,
  },
  subjectLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#C9A227',
    marginBottom: 6,
  },
  metaRow: { flexDirection: 'row', gap: 12, marginBottom: 4 },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaIcon: { fontSize: 13 },
  metaText: { fontSize: 12, color: '#555' },

  viewBtn: {
    backgroundColor: '#0513A0',
    marginHorizontal: 14,
    marginBottom: 14,
    borderRadius: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});