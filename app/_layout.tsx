import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" />
  <Stack.Screen name="(tabs)" />
  <Stack.Screen name="jcj" />
  <Stack.Screen name="mycourses" />
  <Stack.Screen name="mydownloads" />
  <Stack.Screen name="mypayments" />
  <Stack.Screen name="termsprivacy" />
  <Stack.Screen name="wishlist" />
<Stack.Screen name="mycart" />
<Stack.Screen name="helpcenter" />
<Stack.Screen name="referandearn" />
  <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
</Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}