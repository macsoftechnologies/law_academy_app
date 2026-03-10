
import { Stack } from 'expo-router';
export default function ReferAndEarnLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="earnings" />
      <Stack.Screen name="coupon-detail" />
    </Stack>
  );
}