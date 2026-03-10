import { Stack } from 'expo-router';

export default function MainsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Existing screens */}
      <Stack.Screen name="index" />
       
        <Stack.Screen name="course-detail" />
        <Stack.Screen name="sections" />
        <Stack.Screen name="mainsprepqa" />
        <Stack.Screen name="main-test-series" />
        <Stack.Screen name="testlist" />
        <Stack.Screen name="testpaper" />
        <Stack.Screen name="testsubmitted" />
         </Stack>
  );
}