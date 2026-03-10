// app/(tabs)/userdetails/_layout.tsx

import { Stack } from 'expo-router';

export default function UserDetailsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="admin-consult" />
      <Stack.Screen name="educational-info" />
      <Stack.Screen name="id-proofs" />
      <Stack.Screen name="submitted" />
    </Stack>
  );
}