// Tipos para el changelog
export interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    new: string[];
    improved: string[];
    fixed: string[];
  };
}

export interface Changelog {
  entries: ChangelogEntry[];
}

// Schema JSON para validación (si se necesita)
export const changelogSchema = {
  type: 'object',
  properties: {
    entries: {
      type: 'array',
      items: {
        type: 'object',
        required: ['version', 'date', 'changes'],
        properties: {
          version: { type: 'string' },
          date: { type: 'string' },
          changes: {
            type: 'object',
            properties: {
              new: { type: 'array', items: { type: 'string' } },
              improved: { type: 'array', items: { type: 'string' } },
              fixed: { type: 'array', items: { type: 'string' } }
            }
          }
        }
      }
    }
  }
};