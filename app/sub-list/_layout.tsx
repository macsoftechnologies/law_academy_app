// app/sub-list/_layout.tsx
import { Stack } from 'expo-router';

export default function SubListLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="choose-subject" />
      <Stack.Screen name="subject-subjects" />
      <Stack.Screen name="subject-course-detail" />
    </Stack>
  );
}