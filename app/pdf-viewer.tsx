// app/pdf-viewer.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
// import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf';
import { Asset } from 'expo-asset';
import Colors from '../constants/colors';

const C = Colors;

export default function PdfViewerScreen() {
  const { assetId } = useLocalSearchParams<{ assetId: string }>();

  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        if (!assetId) return;

        const asset = Asset.fromModule(Number(assetId));
        await asset.downloadAsync();

        setPdfUri(asset.localUri ?? null);
      } catch (error) {
        console.log('PDF Load Error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [assetId]);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>PDF Viewer</Text>
      </View>

      <View style={s.container}>
  {loading && (
    <View style={s.loader}>
      <ActivityIndicator size="large" color={C.primary} />
    </View>
  )}

  {!loading && pdfUri && (
    <Pdf
      source={{ uri: pdfUri }}
      style={{ flex: 1 }}
      trustAllCerts={false}
    />
  )}

  {!loading && !pdfUri && (
    <View style={s.errorBox}>
      <Text style={s.errorText}>Unable to load PDF.</Text>
    </View>
  )}
</View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.screenBg },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: C.screenBg,
  },

  backArrow: {
    fontSize: 28,
    color: C.textDark,
    fontWeight: '300',
    marginRight: 12,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: C.textDark,
  },

  container: { flex: 1 },

  loader: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
  },

  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    fontSize: 16,
    color: C.textMuted,
  },
});