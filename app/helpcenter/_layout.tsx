
import { Stack } from 'expo-router';
export default function HelpCenterLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="tickets" />
    </Stack>
  );
}