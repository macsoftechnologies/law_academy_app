// app/(tabs)/userdashboard/_layout.tsx
import { Stack } from 'expo-router';

export default function UserDashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="study-analysis" />
      <Stack.Screen name="prelims-prep" />
      <Stack.Screen name="mains-prep" />
    </Stack>
  );
}