

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Colors from '../../constants/colors';

const C = Colors;
// ─── Colors ───────────────────────────────────────────────────────────────────
// const NAVY      = '#1B3080';   // main nav background
// const GOLD      = '#C9A331';   // active gold
// const WHITE     = '#FFFFFF';
// const INACTIVE  = 'rgba(255,255,255,0.70)';

// ─── Dimensions ───────────────────────────────────────────────────────────────
const { width: W } = Dimensions.get('window');
const TAB_COUNT    = 5;
const TAB_W        = W / TAB_COUNT;

// Nav bar height (visual, excluding safe area)
const BAR_VIS_H    = 62;
// How far the circle centre sits above the bar top
const FLOAT_ABOVE  = 4;
// Circle diameter
const CIR_D        = 60;
const CIR_R        = CIR_D / 2;
// Notch radius — slightly larger than circle so there's breathing room
const NOTCH_R      = CIR_R + 18;   // 38

const BOTTOM_PAD   = Platform.OS === 'ios' ? 28 : 0;
const BAR_TOTAL_H  = BAR_VIS_H + BOTTOM_PAD;

// ─── Tab config ───────────────────────────────────────────────────────────────
type TabName = 'dashboard' | 'notes' | 'prelims' | 'mains' | 'chat';

interface TabCfg {
  name:       TabName;
  label:      string;
  iconActive:   keyof typeof Ionicons.glyphMap;
  iconInactive: keyof typeof Ionicons.glyphMap;
}

const TABS: TabCfg[] = [
  {
    name:        'dashboard',
    label:       'Home',
    iconActive:   'home',
    iconInactive: 'home-outline',
  },
  {
    name:        'notes',
    label:       'Notes',
    iconActive:   'create',
    iconInactive: 'create-outline',
  },
  {
    name:        'prelims',
    label:       'Prelims',
    iconActive:   'clipboard',
    iconInactive: 'clipboard-outline',
  },
  {
    name:        'mains',
    label:       'Mains',
    iconActive:   'document-text',
    iconInactive: 'document-text-outline',
  },
  {
    name:        'chat',
    label:       'Chat',
    iconActive:   'chatbubble-ellipses',
    iconInactive: 'chatbubble-ellipses-outline',
  },
];

// ─── SVG notch bar ────────────────────────────────────────────────────────────
/**
 * Draws the full nav bar as an SVG shape:
 *   - Rounded top corners
 *   - A true semicircular notch at position `cx` on the top edge
 *
 * The notch is constructed with:
 *   arc from (cx - NOTCH_R, 0) sweeping DOWN around centre (cx, 0) to (cx + NOTCH_R, 0)
 *   i.e. a semicircle that dips INTO the bar.
 */
function NotchBarSVG({ cx }: { cx: number }) {
  const height = BAR_TOTAL_H + 10;
  const r      = NOTCH_R;
  const cornerR = 20;

  // Full path:
  // Start top-left corner → go right until notch left tangent point
  // → arc around notch semicircle (downward) → continue right to top-right corner
  // → down → bottom-right → bottom-left → back up → top-left
  const d = [
    // Top-left rounded corner
    `M ${cornerR} 0`,
    // Line to notch left
    `L ${cx - r} 0`,
    // Notch semicircle arc: large-arc=0, sweep=0 (clockwise going down = sweep=1 in SVG coords)
    `A ${r} ${r} 0 0 1 ${cx + r} 0`,
    // Line to top-right area
    `L ${W - cornerR} 0`,
    // Top-right corner
    `Q ${W} 0 ${W} ${cornerR}`,
    // Right side down
    `L ${W} ${height}`,
    // Bottom
    `L 0 ${height}`,
    // Left side up
    `L 0 ${cornerR}`,
    // Top-left corner
    `Q 0 0 ${cornerR} 0`,
    `Z`,
  ].join(' ');

  return (
    <Svg
      width={W}
      height={height}
      style={[StyleSheet.absoluteFillObject, { top: 0 }]}
      pointerEvents="none"
    >
      <Path d={d} fill={C.primary} />
    </Svg>
  );
}

// ─── Animated notch wrapper ───────────────────────────────────────────────────
function AnimatedNotchBar({ notchAnim }: { notchAnim: Animated.Value }) {
  const [cx, setCx] = useState<number>(
    (notchAnim as any)._value ?? TAB_W / 2
  );

  useEffect(() => {
    const id = notchAnim.addListener(({ value }) => setCx(value));
    return () => notchAnim.removeListener(id);
  }, [notchAnim]);

  return <NotchBarSVG cx={cx} />;
}

// ─── Single tab button ────────────────────────────────────────────────────────
function TabButton({
  cfg,
  focused,
  onPress,
}: {
  cfg:     TabCfg;
  focused: boolean;
  onPress: () => void;
}) {
  // Animate circle: scale + vertical lift
  const scale = useRef(new Animated.Value(focused ? 1 : 0)).current;
  const lift  = useRef(new Animated.Value(focused ? 0 : CIR_R + 4)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue:       focused ? 1 : 0,
        useNativeDriver: true,
        tension:       200,
        friction:      14,
      }),
      Animated.spring(lift, {
        toValue:       focused ? 0 : CIR_R + 4,
        useNativeDriver: true,
        tension:       200,
        friction:      14,
      }),
    ]).start();
  }, [focused]);

  const iconName = focused ? cfg.iconActive : cfg.iconInactive;
  const iconColor = focused ? C.primary : C.white;
  const iconSize  = 24;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.tabBtn}
    >
      {/* Floating circle (only rendered for active; animates in/out) */}
      <Animated.View
        style={[
          styles.floatCircleWrap,
          {
            transform: [
              { scale },
              { translateY: lift },
            ],
          },
        ]}
        pointerEvents="none"
      >
        <View style={styles.floatCircle}>
          <Ionicons name={iconName} size={iconSize + 2} color={C.primary} />
        </View>
      </Animated.View>

      {/* Always-visible icon area (shown when not active) */}
      {!focused && (
        <View style={styles.inactiveIcon}>
          <Ionicons name={iconName} size={iconSize} color={C.white} />
        </View>
      )}

      {/* Label */}
      <Text
        style={[
          styles.label,
          {
            color:      focused ? C.gold      : C.white,
            fontWeight: focused ? '700'     : '500',
            marginTop:  focused ? CIR_D + 4 : 6,
          },
        ]}
      >
        {cfg.label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Custom tab bar ───────────────────────────────────────────────────────────
function CustomTabBar({ state, navigation }: any) {
  const notchAnim = useRef(
    new Animated.Value(TAB_W * state.index + TAB_W / 2)
  ).current;

  useEffect(() => {
    Animated.spring(notchAnim, {
      toValue:         TAB_W * state.index + TAB_W / 2,
      useNativeDriver: false,  
      tension:         180,
      friction:        14,
    }).start();
  }, [state.index]);

  const visibleRoutes = state.routes.filter((r: any) =>
    TABS.some((t) => t.name === r.name)
  );

  return (
    <View style={styles.bar} pointerEvents="box-none">
      {/* SVG notched background */}
      <AnimatedNotchBar notchAnim={notchAnim} />

      {/* Tab row */}
      <View style={styles.row} pointerEvents="box-none">
        {visibleRoutes.map((route: any) => {
          const cfg     = TABS.find((t) => t.name === route.name)!;
          const focused = state.routes[state.index]?.name === route.name;

          return (
            <TabButton
              key={route.key}
              cfg={cfg}
              focused={focused}
              onPress={() => {
                const evt = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!focused && !evt.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

// ─── Root layout ──────────────────────────────────────────────────────────────
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {TABS.map((t) => (
        <Tabs.Screen key={t.name} name={t.name} />
      ))}
      <Tabs.Screen name="userdetails"   options={{ href: null }} />
      <Tabs.Screen name="userdashboard" options={{ href: null }} />
    </Tabs>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  bar: {
    position:  'absolute',
    bottom:    0,
    left:      0,
    right:     0,
    height:    BAR_TOTAL_H,
    overflow:  'visible',
    shadowColor:   '#000',
    shadowOffset:  { width: 0, height: -5 },
    shadowOpacity: 0.25,
    shadowRadius:  14,
    elevation:     20,
  },

  row: {
    position:       'absolute',
    bottom:         0,
    left:           0,
    right:          0,
    height:         BAR_TOTAL_H,
    flexDirection:  'row',
    alignItems:     'flex-start',
    overflow:       'visible',
  },

  tabBtn: {
    flex:           1,
    height:         BAR_TOTAL_H,
    alignItems:     'center',
    justifyContent: 'flex-start',
    overflow:       'visible',
    paddingTop:     0,
  },

  
  floatCircleWrap: {
    position:   'absolute',
    top:        -(FLOAT_ABOVE + CIR_R),  
    alignItems: 'center',
    overflow:   'visible',
  },

  floatCircle: {
    width:          CIR_D,
    height:         CIR_D,
    borderRadius:   CIR_R,
    backgroundColor: C.gold,
    borderWidth:    3,
    borderColor:    C.white,
    alignItems:     'center',
    justifyContent: 'center',
    // Glow shadow
    shadowColor:    C.gold,
    shadowOffset:   { width: 0, height: 4 },
    shadowOpacity:  0.55,
    shadowRadius:   10,
    elevation:      18,
  },

  inactiveIcon: {
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    position:     'absolute',
    bottom:       BOTTOM_PAD + 8,
    fontSize:     10,
    letterSpacing: 0.3,
    textAlign:    'center',
  },
});