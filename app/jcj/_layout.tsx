import { Stack } from 'expo-router';

export default function JCJLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,       // 👈 Enables swipe back
        fullScreenGestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="course-detail" />
      <Stack.Screen name="subjects" />
      <Stack.Screen name="subject-list" />
      <Stack.Screen name="lectures" />
      <Stack.Screen name="lecture-player" />
    </Stack>
  );
}