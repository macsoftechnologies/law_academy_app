// app/mydownloads/index.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal, ScrollView, StatusBar, StyleSheet,
    Text, TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const GOLD = '#C9A227';

type VideoItem = { id: string; lecture: string; title: string; instructor: string };
type NoteItem  = { id: string; title: string; lecture: string };

const MOCK_VIDEOS: VideoItem[] = [
  { id: 'v1', lecture: 'LECTURE 1', title: 'Introduction Of Civil Procedure Code', instructor: 'By Srinivas' },
  { id: 'v2', lecture: 'LECTURE 2', title: 'Title Description', instructor: 'By Srinivas' },
  { id: 'v3', lecture: 'LECTURE 3', title: 'Section 1 – Section 25', instructor: 'By Srinivas' },
];

const MOCK_NOTES: NoteItem[] = [
  { id: 'n1', title: 'Introduction Notes', lecture: 'Lecture 1' },
  { id: 'n2', title: 'Introduction Notes', lecture: 'Lecture 2' },
  { id: 'n3', title: 'Introduction Notes', lecture: 'Lecture 3' },
  { id: 'n4', title: 'Introduction Notes', lecture: 'Lecture 4' },
];

// Thumbnail colors per lecture
const THUMB_COLORS = ['#E53935', '#1565C0', '#F9A825'];

export default function MyDownloadsScreen() {
  const [tab, setTab] = useState<'videos' | 'notes'>('videos');
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    setVideos(prev => prev.filter(v => v.id !== deleteTarget));
    setDeleteTarget(null);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>My Downloads</Text>
      </View>

      {/* Tab switcher */}
      <View style={s.tabBar}>
        <TouchableOpacity
          style={[s.tabBtn, tab === 'videos' && s.tabBtnActive]}
          onPress={() => setTab('videos')}
        >
          <Text style={[s.tabTxt, tab === 'videos' && s.tabTxtActive]}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.tabBtn, tab === 'notes' && s.tabBtnActive]}
          onPress={() => setTab('notes')}
        >
          <Text style={[s.tabTxt, tab === 'notes' && s.tabTxtActive]}>Notes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {tab === 'videos' ? (
          videos.map((item, idx) => (
            <View key={item.id} style={s.videoCard}>
              {/* Thumbnail */}
              <View style={[s.thumb, { backgroundColor: THUMB_COLORS[idx % THUMB_COLORS.length] }]}>
                <Text style={s.thumbEmoji}>▶</Text>
              </View>
              {/* Info */}
              <View style={s.videoInfo}>
                <Text style={s.lectureLabel}>{item.lecture}</Text>
                <Text style={s.videoTitle}>{item.title}</Text>
                <Text style={s.videoInstructor}>{item.instructor}</Text>
              </View>
              {/* Delete */}
              <TouchableOpacity
                style={s.deleteBtn}
                onPress={() => setDeleteTarget(item.id)}
                hitSlop={8}
              >
                <Text style={s.deleteIcon}>🗑</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={s.notesGrid}>
            {MOCK_NOTES.map(note => (
              <TouchableOpacity key={note.id} style={s.noteCard} activeOpacity={0.8}>
                <View style={s.pdfIconWrap}>
                  <Text style={s.pdfIcon}>📄</Text>
                  <View style={s.pdfBadge}>
                    <Text style={s.pdfBadgeTxt}>PDF</Text>
                  </View>
                </View>
                <Text style={s.noteTitle}>{note.title}</Text>
                <View style={s.lecturePill}>
                  <Text style={s.lecturePillTxt}>{note.lecture}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Delete confirm modal */}
      <Modal
        visible={!!deleteTarget}
        transparent
        animationType="slide"
        onRequestClose={() => setDeleteTarget(null)}
      >
        <View style={s.modalOverlay}>
          <View style={s.modalBox}>
            <TouchableOpacity style={s.modalClose} onPress={() => setDeleteTarget(null)}>
              <Text style={s.modalCloseTxt}>✕</Text>
            </TouchableOpacity>
            <Text style={s.modalDeleteTitle}>Delete</Text>
            <Text style={s.modalQuestion}>Are you sure want to Delete?</Text>
            <Text style={s.modalSub}>Thank you and see you again!❤️</Text>
            <View style={s.modalBtns}>
              <TouchableOpacity
                style={s.cancelBtn}
                onPress={() => setDeleteTarget(null)}
              >
                <Text style={s.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.confirmDeleteBtn}
                onPress={handleDeleteConfirm}
              >
                <Text style={s.confirmDeleteTxt}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },

  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16, marginBottom: 14,
    backgroundColor: '#fff',
    borderRadius: 12, padding: 4,
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
  },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabBtnActive: { backgroundColor: NAVY },
  tabTxt: { fontSize: 14, fontWeight: '700', color: NAVY },
  tabTxtActive: { color: '#fff' },

  scroll: { paddingHorizontal: 14, gap: 12 },

  // Video row
  videoCard: {
    backgroundColor: '#fff', borderRadius: 12,
    flexDirection: 'row', alignItems: 'center',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
  },
  thumb: {
    width: 110, height: 80,
    alignItems: 'center', justifyContent: 'center',
  },
  thumbEmoji: { fontSize: 28, color: '#fff' },
  videoInfo: { flex: 1, padding: 12, gap: 3 },
  lectureLabel: { fontSize: 11, fontWeight: '800', color: GOLD },
  videoTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', lineHeight: 18 },
  videoInstructor: { fontSize: 12, color: '#888' },
  deleteBtn: { paddingHorizontal: 14, paddingVertical: 10 },
  deleteIcon: { fontSize: 20 },

  // Notes grid
  notesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
  },
  noteCard: {
    width: '47%',
    backgroundColor: '#fff', borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
    alignItems: 'center',
    paddingBottom: 12,
  },
  pdfIconWrap: {
    width: '100%', height: 110,
    backgroundColor: '#C62828',
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  pdfIcon: { fontSize: 48 },
  pdfBadge: {
    position: 'absolute', top: 10, left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: 4,
  },
  pdfBadgeTxt: { fontSize: 10, fontWeight: '800', color: '#C62828' },
  noteTitle: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', marginBottom: 8, textAlign: 'center', paddingHorizontal: 8 },
  lecturePill: {
    backgroundColor: GOLD,
    paddingHorizontal: 16, paddingVertical: 5,
    borderRadius: 6,
  },
  lecturePillTxt: { fontSize: 11, fontWeight: '700', color: '#fff' },

  // Delete modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 36,
    alignItems: 'center',
  },
  modalClose: { position: 'absolute', top: 16, left: 20 },
  modalCloseTxt: { fontSize: 18, color: '#555', fontWeight: '600' },
  modalDeleteTitle: { fontSize: 20, fontWeight: '800', color: NAVY, marginBottom: 12 },
  modalQuestion: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 6 },
  modalSub: { fontSize: 13, color: '#888', marginBottom: 28 },
  modalBtns: { flexDirection: 'row', gap: 12, width: '100%' },
  cancelBtn: {
    flex: 1, borderWidth: 1.5, borderColor: '#E0E0E0',
    paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
  cancelTxt: { fontSize: 14, fontWeight: '700', color: GOLD },
  confirmDeleteBtn: {
    flex: 1, backgroundColor: GOLD,
    paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
  confirmDeleteTxt: { fontSize: 14, fontWeight: '700', color: '#fff' },
});