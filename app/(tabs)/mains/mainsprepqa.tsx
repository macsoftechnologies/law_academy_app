import React from 'react';
import { PYQ_ITEMS } from '../../../data/mock/mains.mock';
import SectionDetail from './SectionDetails';
export default function MainsprepScreen() {
  return <SectionDetail title="AP JCJ Mains Preparation Q & A" items={PYQ_ITEMS} />;
}