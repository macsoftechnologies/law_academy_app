import { Stack } from 'expo-router';

export default function ComboLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="subject-list" />
      <Stack.Screen name="lectures" />
      <Stack.Screen name="lecture-detail" />
      <Stack.Screen name="course-detail" />
      <Stack.Screen name="pmcombo" />
    </Stack>
  );
}