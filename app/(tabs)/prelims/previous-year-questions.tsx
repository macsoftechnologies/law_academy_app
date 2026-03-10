// app/(tabs)/prelims/previous-year-questions.tsx
import React from 'react';
import { PYQ_ITEMS } from '../../../data/mock/prelims.mock';
import SectionDetail from './SectionDetail';
export default function PreviousYearQuestionsScreen() {
  return <SectionDetail title="AP Previous Year Questions" items={PYQ_ITEMS} />;
}