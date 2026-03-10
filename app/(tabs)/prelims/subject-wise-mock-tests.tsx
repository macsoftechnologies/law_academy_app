// app/(tabs)/prelims/subject-wise-mock-tests.tsx  (UPDATED)
// Image 1: AP JCJ Subject Wise Mocks — Civil Laws and Criminal Laws cards
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SUBJECTS = [
  {
    id: 'civil',
    title: 'Civil Laws',
    image: '⚖️',
    bg: '#FFF8E1',
  },
  {
    id: 'criminal',
    title: 'Criminal Laws',
    image: '🔒',
    bg: '#FFF0F0',
  },
];

export default function SubjectWiseMockScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.title}>AP JCJ Subject Wise Mocks</Text>
      </View>

      <ScrollView contentContainerStyle={s.container}>
        {SUBJECTS.map((subj) => (
          <MockCard
            key={subj.id}
            title={subj.title}
            image={subj.image}
            bg={subj.bg}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/prelims/civil-laws-mocks',
                params: { title: subj.title },
              })
            }
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function MockCard({
  title,
  image,
  bg,
  onPress,
}: {
  title: string;
  image: string;
  bg: string;
  onPress: () => void;
}) {
  return (
    <View style={s.card}>
      <View style={[s.imagePlaceholder, { backgroundColor: bg }]}>
        <Text style={s.cardImage}>{image}</Text>
      </View>

      <View style={{ padding: 14 }}>
        <Text style={s.cardTitle}>{title}</Text>

        <TouchableOpacity style={s.primaryBtn} onPress={onPress}>
          <Text style={s.primaryBtnText}>Explore More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8EBF3' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  back: { fontSize: 26, marginRight: 10, color: '#1a1a2e' },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a2e',
  },

  container: {
    padding: 16,
    gap: 16,
  },

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

  imagePlaceholder: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: { fontSize: 70 },

  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12,
    color: '#1a1a2e',
  },

  primaryBtn: {
    backgroundColor: '#0513A0',
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});