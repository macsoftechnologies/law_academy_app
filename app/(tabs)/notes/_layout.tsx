// app/(tabs)/notes/_layout.tsx
import { Stack } from 'expo-router';

export default function NotesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="detail" />
      <Stack.Screen name="subjects" />
      <Stack.Screen name="subject-items" />
    </Stack>
  );
}