import fs from 'fs/promises';
import path from 'path';

const CHANGELOG_PATH = path.join(process.cwd(), 'src/constants/changelog.json');

export async function getChangelog() {
  try {
    const data = await fs.readFile(CHANGELOG_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading changelog:', error);
    return { entries: [] };
  }
}

export async function saveChangelog(entry) {
  try {
    const changelog = await getChangelog();
    changelog.entries.unshift(entry);
    await fs.writeFile(CHANGELOG_PATH, JSON.stringify(changelog, null, 2));
  } catch (error) {
    console.error('Error saving changelog:', error);
    throw new Error('Failed to save changelog');
  }
}