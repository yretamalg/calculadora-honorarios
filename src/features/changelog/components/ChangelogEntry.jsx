import React from 'react';
import ChangelogCategory from './ChangelogCategory';

const ChangelogEntry = ({ entry }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-orange-500">
          Versión {entry.version}
        </h2>
        <span className="text-sm text-slate-400">
          {new Date(entry.date).toLocaleDateString('es-CL')}
        </span>
      </div>
      <div className="space-y-4">
        <ChangelogCategory
          title="Novedades"
          items={entry.changes.new}
          category="new"
        />
        <ChangelogCategory
          title="Mejoras"
          items={entry.changes.improved}
          category="improved"
        />
        <ChangelogCategory
          title="Correcciones"
          items={entry.changes.fixed}
          category="fixed"
        />
      </div>
    </div>
  );
};

export default ChangelogEntry;