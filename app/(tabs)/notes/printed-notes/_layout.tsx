// app/(tabs)/notes/printed-notes/_layout.tsx
import { Stack } from 'expo-router';

export default function PrintedNotesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="detail" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="payment-methods" />
      <Stack.Screen name="shipping-addresses" />
      <Stack.Screen name="add-address" />
      <Stack.Screen name="success" />
    </Stack>
  );
}