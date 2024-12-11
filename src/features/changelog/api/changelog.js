import fs from 'fs/promises';
import path from 'path';
import type { Changelog, ChangelogEntry } from '../types/changelog';

const CHANGELOG_PATH = path.join(process.cwd(), 'src/features/changelog/data/changelog.json');

/**
 * Obtiene todas las entradas del changelog
 */
export async function getChangelog(): Promise<Changelog> {
  try {
    const data = await fs.readFile(CHANGELOG_PATH, 'utf-8');
    return JSON.parse(data) as Changelog;
  } catch (error) {
    console.error('Error reading changelog:', error);
    return { entries: [] };
  }
}

/**
 * Guarda una nueva entrada en el changelog
 */
export async function saveChangelog(entry: ChangelogEntry): Promise<void> {
  try {
    const changelog = await getChangelog();
    changelog.entries.unshift(entry);
    await fs.writeFile(CHANGELOG_PATH, JSON.stringify(changelog, null, 2));
  } catch (error) {
    console.error('Error saving changelog:', error);
    throw new Error('Failed to save changelog');
  }
}

/**
 * Valida una entrada del changelog
 */
export function validateEntry(entry: ChangelogEntry): boolean {
  return !!(
    entry.version &&
    entry.date &&
    entry.changes &&
    Array.isArray(entry.changes.new) &&
    Array.isArray(entry.changes.improved) &&
    Array.isArray(entry.changes.fixed)
  );
}