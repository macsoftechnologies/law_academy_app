import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SW } = Dimensions.get('window');
const MENU_W = SW * 0.78;

const MENU_ITEMS = [
  { icon: '👤', label: 'Profile',           route: '/(tabs)/userdetails/profile' },
  { icon: '📊', label: 'Dashboard',         route: '/(tabs)/userdashboard' },
  { icon: '🎓', label: 'My Courses',         route: '/mycourses' },
  { icon: '⬇️',  label: 'My Downloads',      route: '/mydownloads' },
  { icon: '💳', label: 'Billing & Payments', route: '/mypayments' },
  { icon: '❤️', label: 'Wishlist',  route: '/wishlist' },
  { icon: '🛒', label: 'My Cart',   route: '/mycart' },
  { icon: '❓', label: 'FAQs',              route: '/(tabs)/dashboard' },
  { icon: '🌙', label: 'Dark Mode',         route: null },
  { icon: '💬', label: 'Help Center',  route: '/helpcenter' },
{ icon: '🎁', label: 'Refer & Earn', route: '/referandearn' },
  { icon: '📄', label: 'Terms & Conditions', route: '/termsprivacy/terms' },
  { icon: '🔒', label: 'Privacy Policy', route: '/termsprivacy/privacy' },
];

export default function SideMenuScreen() {
  const slideAnim = useRef(new Animated.Value(-MENU_W)).current;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 80,
      friction: 12,
      useNativeDriver: true,
    }).start();
  }, []);

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: -MENU_W,
      duration: 220,
      useNativeDriver: true,
    }).start(() => router.back());
  };

  const handleNav = (route: string | null) => {
    if (!route) return;
    close();
    setTimeout(() => router.push(route as any), 250);
  };

  return (
    <Modal transparent animationType="none" statusBarTranslucent>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={s.overlay}>
        <TouchableWithoutFeedback onPress={close}>
          <View style={s.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View style={[s.drawer, { transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>

            {/* User info */}
            <View style={s.userSection}>
              <View style={s.avatarWrap}>
                <View style={s.avatarBg}>
                  <Text style={s.avatarEmoji}>👤</Text>
                </View>
              </View>
              <Text style={s.userName}>Sandeep Roy</Text>
              <Text style={s.userId}>216T1FO89</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={s.menuList}>
              {MENU_ITEMS.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={s.menuItem}
                  onPress={() => handleNav(item.route)}
                  activeOpacity={0.7}
                >
                  <Text style={s.menuIcon}>{item.icon}</Text>
                  <Text style={s.menuLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={[s.menuItem, { marginTop: 10 }]}
                onPress={() => setShowLogoutModal(true)}
                activeOpacity={0.7}
              >
                <Text style={s.menuIcon}>🚪</Text>
                <Text style={[s.menuLabel, { color: '#B00020' }]}>Logout</Text>
              </TouchableOpacity>

              <View style={{ height: 30 }} />
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>

      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
      >
        <View style={s.logoutOverlay}>
          <View style={s.logoutCard}>
            <TouchableOpacity
              style={s.closeBtn}
              onPress={() => setShowLogoutModal(false)}
            >
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>

            <Text style={s.logoutTitle}>Logout</Text>
            <Text style={s.logoutMsg}>Are you sure want to Logout?</Text>
            <Text style={s.logoutSub}>Thank you and see you again ❤️</Text>

            <View style={s.logoutActions}>
              <TouchableOpacity
                style={s.cancelBtn}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={s.cancelTxt}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={s.confirmBtn}
                onPress={() => {
  setShowLogoutModal(false);
  close();
  router.replace('/auth/login');
}}
              >
                <Text style={s.confirmTxt}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, flexDirection: 'row' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },

  drawer: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: MENU_W,
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 4, height: 0 },
  },

  userSection: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginHorizontal: 16,
  },
  avatarWrap: { marginBottom: 10 },
  avatarBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF6B00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 40 },
  userName: { fontSize: 16, fontWeight: '800', color: '#1A1A2E', marginBottom: 2 },
  userId: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },

  menuList: { flex: 1, paddingTop: 8 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    gap: 14,
  },
  menuIcon: { fontSize: 20, width: 26, textAlign: 'center' },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1A1A2E' },

  /* Logout Modal Styles */
  logoutOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  logoutCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  closeBtn: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  logoutTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#B00020',
    marginBottom: 10,
  },
  logoutMsg: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
  },
  logoutSub: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
    marginVertical: 6,
  },
  logoutActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#F2EAD3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmBtn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelTxt: { fontWeight: '700', color: '#555' },
  confirmTxt: { fontWeight: '800', color: '#fff' },
});