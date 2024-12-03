// src/types/changelog.ts
export type ChangeCategory = 'new' | 'improved' | 'fixed';

export interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    [K in ChangeCategory]: string[];
  };
}

export interface Changelog {
  entries: ChangelogEntry[];
}

export interface ChangelogViewerProps {
  entries: ChangelogEntry[];
}

export interface ChangelogAdminProps {
  onSave: (entry: ChangelogEntry) => Promise<void>;
}

export interface ChangelogCategoryProps {
  title: string;
  items: string[];
  category: ChangeCategory;
  onRemove?: (index: number) => void;
}

export interface ChangelogEntryProps {
  entry: ChangelogEntry;
}