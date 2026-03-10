
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '../../../components/ScreenWrapper';
import UnlockPopup from '../../../components/ui/UnlockPopup';
import Colors from '../../../constants/colors';
import { PMCOMBO_CIVIL_NOTES } from '../../../data/mock/pmcombo.mock';

const C = Colors;
const DETAIL_ROUTE = '/combo/pmcombo/course-detail';

export default function PmComboCivilNotesScreen() {
  const [popupVisible, setPopupVisible] = useState(false);

  const onRefresh = async () => {
    await new Promise(res => setTimeout(res, 1200));
  };

  const handlePress = (item: any) => {
    if (item.locked) {
      setPopupVisible(true);
      return;
    }

    router.push({
      pathname: '/pdf-viewer',
      params: { assetId: String(item.pdf) }, // pass require() safely
    });
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>AP Civil Laws Notes</Text>
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
        <View style={s.container}>
          {PMCOMBO_CIVIL_NOTES.map(item => (
            <TouchableOpacity
              key={item.id}
              style={s.subjectCard}
              activeOpacity={0.9}
              onPress={() => handlePress(item)}
            >
              {/* Clean Preview Area */}
              <View style={s.previewWrap}>
                <View style={s.previewBox}>
                  <Text style={s.previewTxt}>
                    {item.locked ? 'Locked Content' : 'Tap to View PDF'}
                  </Text>
                </View>

                {item.locked && (
                  <View style={s.lockOverlay}>
                    <Text style={s.lockEmoji}>🔒</Text>
                  </View>
                )}
              </View>

              {/* Footer */}
              <View style={s.cardFooter}>
                <View style={s.cardLeft}>
                  <Text style={s.cardTitle}>{item.title}</Text>

                  <View style={s.tagRow}>
                    <View style={s.tagOrange}>
                      <Text style={s.tagOrangeTxt}>
                        🕐 Real Time examples
                      </Text>
                    </View>

                    <View style={s.tagBlue}>
                      <Text style={s.tagBlueTxt}>
                        👁 100+ Views
                      </Text>
                    </View>
                  </View>
                </View>

                <Text style={s.bookmarkIcon}>🔖</Text>
                
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScreenWrapper>

      <UnlockPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        detailRoute={DETAIL_ROUTE}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.screenBg },

  container: {
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: C.screenBg,
  },

  backBtn: { marginRight: 12 },

  backArrow: {
    fontSize: 28,
    color: C.textDark,
    fontWeight: '300',
    lineHeight: 32,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.textDark,
  },

  subjectCard: {
    backgroundColor: C.cardBg,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    minHeight: 220,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  previewWrap: {
    height: 140,
    position: 'relative',
  },

  previewBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  previewTxt: {
    fontSize: 14,
    color: C.textMuted,
  },

  lockOverlay: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  lockEmoji: { fontSize: 30 },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },

  cardLeft: { flex: 1 },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: C.textDark,
    marginBottom: 8,
  },

  tagRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },

  tagOrange: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  tagOrangeTxt: {
    fontSize: 11,
    color: '#E65100',
    fontWeight: '600',
  },

  tagBlue: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  tagBlueTxt: {
    fontSize: 11,
    color: '#1565C0',
    fontWeight: '600',
  },

  bookmarkIcon: {
    fontSize: 20,
    marginLeft: 8,
  },
});