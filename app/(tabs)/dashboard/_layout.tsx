// app/(tabs)/dashboard/_layout.tsx
import { Stack } from 'expo-router';

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="side-menu"
        options={{
          presentation: 'transparentModal',
          animation: 'none',
        }}
      />
    </Stack>
  );
}