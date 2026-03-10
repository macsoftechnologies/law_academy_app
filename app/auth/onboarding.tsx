
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions, FlatList, Image, StatusBar, StyleSheet,
  Text, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';

const { width: SW } = Dimensions.get('window');

const SLIDES = [
  {
    id: 's1',
    image: require('../../assets/images/splash1.png') as any,
    title: 'Crime Happens',
    subtitle: "As shown here, b bootlegger is running away\nafter stealing a woman's purse",
  },
  {
    id: 's2',
    image: require('../../assets/images/splash2.png') as any,
    title: 'Investigation Under BNSS',
    subtitle: 'Proceedings under BNSS are conducted by the\nInvestigation Team.',
  },
  {
    id: 's3',
    image: require('../../assets/images/splash3.png') as any,
    title: 'Court Justice',
    subtitle:
      'Step into the world of law—where every case,\nevery decision, and every voice shapes\njustice. Learn, explore, and grow with us.',
  },
];

export default function OnboardingScreen() {
  const [activeIdx, setActiveIdx] = useState(0);
  
  const [listHeight, setListHeight] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const goNext = () => {
    if (activeIdx < SLIDES.length - 1) {
      const next = activeIdx + 1;
      flatRef.current?.scrollToIndex({ index: next, animated: true });
      setActiveIdx(next);
    } else {
      router.replace('/auth/login' as any);
    }
  };

  const skip = () => router.replace('/auth/login' as any);

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      
      {/* <View style={s.brandWrap}>
        <Text style={s.brandName}>JCJ Academy</Text>
      </View> */}

      <TouchableOpacity style={s.skipBtn} onPress={skip}>
        <Text style={s.skipTxt}>Skip Now</Text>
      </TouchableOpacity>

      <View
        style={s.listWrap}
        onLayout={e => setListHeight(e.nativeEvent.layout.height)}
      >
        {listHeight > 0 && (
          <FlatList
            ref={flatRef}
            data={SLIDES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={i => i.id}
            onMomentumScrollEnd={e => {
              const idx = Math.round(e.nativeEvent.contentOffset.x / SW);
              setActiveIdx(idx);
            }}
            renderItem={({ item }) => (
              <View style={[s.slide, { width: SW, height: listHeight }]}>

  <Text style={s.brandName}>RAO’S Law Academy</Text>

  <Image source={item.image} style={s.slideImage} resizeMode="contain" />
                <Text style={s.slideTitle}>{item.title}</Text>
                <Text style={s.slideSub}>{item.subtitle}</Text>
              </View>
            )}
          />
        )}
      </View>

      <View style={s.bottomRow}>
        <TouchableOpacity onPress={goNext}>
          <Text style={s.nextTxt}>NEXT</Text>
        </TouchableOpacity>

        <View style={s.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[s.dot, i === activeIdx && s.dotActive]} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },

  brandWrap: {
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 4,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 0.6,
  },

  skipBtn: {
  position: 'absolute',
  top: 40,   
  right: 20,
  zIndex: 10,
  paddingVertical: 6,
  paddingHorizontal: 4,
},
  skipTxt: { fontSize: 14, fontWeight: '600', color: '#555' },

  listWrap: { flex: 1 },

  slide: {
    alignItems: 'center',
    justifyContent: 'center',   
    paddingHorizontal: 32,
  },
  slideImage: {
    width: '100%',
    height: SW * 0.68,
    marginBottom: 28,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1A1A2E',
    textAlign: 'center',
    marginBottom: 12,
  },
  slideSub: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingBottom: 36,
    paddingTop: 14,
  },
  nextTxt: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1A2E',
    letterSpacing: 1,
  },

  dots: { flexDirection: 'row', gap: 6 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D0D0D0',
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 28,
    borderRadius: 5,
  },
});