import type { ReactNode } from 'react';

export interface UspItem {
  id: string;
  title: string;
  description: ReactNode;
  points: ReactNode[];
}

export interface ComparisonCell {
  description: ReactNode;
}

export interface ComparisonRow {
  id: string;
  title: string;
  subtitle: string;
  agyr: ComparisonCell;
  proxy: ComparisonCell;
}
