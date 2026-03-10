// app/combo/pmcombo/_layout.tsx
import { Stack } from 'expo-router';

export default function PmComboLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="civil-notes" />
      <Stack.Screen name="prelims" />
      <Stack.Screen name="section-list" />
      <Stack.Screen name="mains" />
      <Stack.Screen name="course-detail" />
    </Stack>
  );
}