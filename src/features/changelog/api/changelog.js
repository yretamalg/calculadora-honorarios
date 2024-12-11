// src/features/changelog/api/changelog.js
export async function getChangelog() {
  try {
    const data = await fs.readFile(CHANGELOG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading changelog:', error);
    return { entries: [] };
  }
}

export async function saveChangelog(entry) {
  try {
    const changelog = await getChangelog();
    changelog.entries.unshift({
      ...entry,
      id: Date.now(),
      date: new Date().toISOString()
    });
    await fs.writeFile(CHANGELOG_FILE, JSON.stringify(changelog, null, 2));
  } catch (error) {
    console.error('Error saving changelog:', error);
    throw error;
  }
}

export function validateEntry(entry) {
  if (!entry) return false;
  if (!entry.title || typeof entry.title !== 'string') return false;
  if (!entry.description || typeof entry.description !== 'string') return false;
  if (!entry.category || typeof entry.category !== 'string') return false;
  return true;
}