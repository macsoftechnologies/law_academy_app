// app/mycourses/detail.tsx

import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    ScrollView, StatusBar, StyleSheet,
    Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const GOLD = '#C9A227';
const CRIMSON = '#8B1A1A';

export default function CourseDetailScreen() {
  const { status = 'active', title = 'Andhra Pradesh Junior Civil Judge Course' } =
    useLocalSearchParams<{ id?: string; status?: string; title?: string }>();

  const isCompleted = status === 'completed';

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Andhra Pradesh JCJ Course</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Course image */}
        <View style={s.courseImgWrap}>
          <View style={s.courseImgPlaceholder}>
            <Text style={s.courseImgEmoji}>🏛️</Text>
          </View>
        </View>

        {/* Title + status badge */}
        <View style={s.titleRow}>
          <Text style={s.courseTitle}>Andhra Pradesh Junior Civil{'\n'}Judge Course</Text>
          <View style={[s.statusBadge, isCompleted ? s.badgeCompleted : s.badgeInProgress]}>
            <Text style={s.statusTxt}>{isCompleted ? 'Completed' : 'In Progress'}</Text>
          </View>
        </View>

        {/* Tags */}
        <View style={s.tagsRow}>
          {isCompleted ? (
            <>
              <View style={s.tagYellow}>
                <Text style={s.tagYellowTxt}>Purchased on 26th Jan 2023</Text>
              </View>
              <View style={s.tagGrey}>
                <Text style={s.tagGreyTxt}>Completed on 26th Jan 2025</Text>
              </View>
            </>
          ) : (
            <>
              <View style={s.tagYellow}>
                <Text style={s.tagYellowTxt}>2 years Course</Text>
              </View>
              <View style={s.tagGrey}>
                <Text style={s.tagGreyTxt}>2 months left</Text>
              </View>
              <View style={s.tagGrey}>
                <Text style={s.tagGreyTxt}>Ends on 26th Jan</Text>
              </View>
            </>
          )}
        </View>

        {/* About section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>About the course</Text>
          <Text style={s.aboutTxt}>
            Prepare effectively for the AP Junior Civil Judge Exam (Prelims & Mains) with our
            comprehensive course designed by expert faculty. The course offers separate classes
            for Civil Laws and Criminal Laws, ensuring clear understanding and focused learning.
          </Text>
        </View>

        {/* Learning materials */}
        <View style={s.materialsCard}>
          <View style={s.materialsTop}>
            <Text style={s.playIcon}>▶</Text>
            <View>
              <Text style={s.materialsBig}>100+ Learning Materials</Text>
              <Text style={s.materialsSub}>250 files, 200 Video, 500 Tests</Text>
            </View>
          </View>
          <View style={s.bulletList}>
            {[
              'Separate classes for Civil & Criminal Laws',
              'Covers Prelims and Mains',
              'Comprehensive notes provided',
              'Expert guidance for complete exam preparation',
            ].map((b, i) => (
              <View key={i} style={s.bulletRow}>
                <Text style={s.bullet}>•</Text>
                <Text style={s.bulletTxt}>{b}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Additional things */}
        <View style={s.additionalCard}>
          <Text style={s.additionalTitle}>what additional things will you get?</Text>
          <View style={s.additionalRow}>
            <View style={s.additionalItem}>
              <Text style={s.additionalIcon}>👨‍⚖️</Text>
              <Text style={s.additionalLabel}>Guest Lectures</Text>
              <Text style={s.additionalSub}>Learn by top advocates</Text>
            </View>
            <View style={s.additionalItem}>
              <Text style={s.additionalIcon}>💻</Text>
              <Text style={s.additionalLabel}>Available on PC</Text>
              <Text style={s.additionalSub}>Wider screen, sharper quality</Text>
            </View>
          </View>
        </View>

        {/* Footer text */}
        <Text style={s.footerTxt}>
          Start your journey to becoming a Junior Civil Judge in Andhra Pradesh with the right
          guidance and resources!
        </Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  back: { fontSize: 28, color: '#1A1A2E', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A2E', flexShrink: 1 },

  scroll: { paddingHorizontal: 14, gap: 14 },

  courseImgWrap: { height: 200, borderRadius: 14, overflow: 'hidden' },
  courseImgPlaceholder: {
    flex: 1, backgroundColor: '#C8D8E8',
    alignItems: 'center', justifyContent: 'center',
  },
  courseImgEmoji: { fontSize: 72 },

  titleRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', gap: 10,
  },
  courseTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: '#1A1A2E', lineHeight: 24 },
  statusBadge: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 8, alignSelf: 'flex-start',
  },
  badgeInProgress: { backgroundColor: CRIMSON },
  badgeCompleted: { backgroundColor: GOLD },
  statusTxt: { fontSize: 12, fontWeight: '700', color: '#fff' },

  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagYellow: {
    backgroundColor: '#FDF3D8', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  tagYellowTxt: { fontSize: 11, fontWeight: '700', color: GOLD },
  tagGrey: {
    backgroundColor: '#E8EAF0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  tagGreyTxt: { fontSize: 11, fontWeight: '600', color: '#555' },

  section: { gap: 8 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A2E' },
  aboutTxt: { fontSize: 13, color: '#555', lineHeight: 20 },

  materialsCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
  },
  materialsTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  playIcon: { fontSize: 20, color: NAVY },
  materialsBig: { fontSize: 14, fontWeight: '800', color: '#1A1A2E' },
  materialsSub: { fontSize: 12, color: '#888' },
  bulletList: { gap: 6 },
  bulletRow: { flexDirection: 'row', gap: 6 },
  bullet: { fontSize: 13, color: '#555' },
  bulletTxt: { fontSize: 13, color: '#555', flex: 1, lineHeight: 18 },

  additionalCard: {
    backgroundColor: '#FDF9ED', borderRadius: 14, padding: 16,
  },
  additionalTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', marginBottom: 14 },
  additionalRow: { flexDirection: 'row', gap: 14 },
  additionalItem: { flex: 1, gap: 4 },
  additionalIcon: { fontSize: 24 },
  additionalLabel: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  additionalSub: { fontSize: 11, color: '#888' },

  footerTxt: {
    fontSize: 13, fontWeight: '600', color: '#1A1A2E',
    textAlign: 'center', lineHeight: 20,
  },
});