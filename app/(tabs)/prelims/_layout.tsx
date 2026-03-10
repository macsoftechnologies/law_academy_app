// app/(tabs)/prelims/_layout.tsx
// Updated layout with all screens for mock tests, grand tests, and quizzes flows
import { Stack } from 'expo-router';

export default function PrelimsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Existing screens */}
      <Stack.Screen name="index" />
      <Stack.Screen name="course-detail" />
      <Stack.Screen name="sections" />
      <Stack.Screen name="previous-year-questions" />

      {/* ── Subject Wise Mock Tests flow ── */}
      <Stack.Screen name="subject-wise-mock-tests" />
      {/* Image 1: Subject list (Civil Laws, Criminal Laws) */}

      <Stack.Screen name="civil-laws-mocks" />
      {/* Image 2: Subject categories (Civil Procedure Code, Evidence Act, Transfer of Property) */}

      <Stack.Screen name="mock-tests-list" />
      {/* Image 3: List of mock tests with attempts + Start Test */}

      <Stack.Screen name="attempt-history" />
      {/* Image 4: History of attempts for a single test with View Result */}

      <Stack.Screen name="mock-test-result" />
      {/* Image 5: Mock test result — performance overview + teacher feedback */}

      {/* ── Grand Tests flow ── */}
      <Stack.Screen name="grand-tests" />
      {/* Grand test list */}

      <Stack.Screen name="grand-test-info" />
      {/* Image 15 left: Grand test info with Results + Start Test */}

      {/* ── Quizzes flow ── */}
      <Stack.Screen name="quizzes" />
      {/* Image 16 left: Quiz list with search */}

      <Stack.Screen name="quiz-attempts" />
      {/* Image 16 middle: Past attempts for a quiz */}

      {/* ── Shared test-taking flow (used by all test types) ── */}
      <Stack.Screen name="terms-conditions" />
      {/* Image 6 / Image 15 middle: Terms before starting test */}

      <Stack.Screen name="test-instructions" />
      {/* Image 7 / Image 15 right / Image 16 right: Test instructions */}

      <Stack.Screen name="take-test" />
      {/* Images 8, 9, 10, 11: Active test with timer + navigator + submit */}

      <Stack.Screen name="test-performance" />
      {/* Image 12: Overall performance summary */}

      <Stack.Screen name="view-solutions" />
      {/* Images 13, 14: View solutions with correct answers */}
    </Stack>
  );
}