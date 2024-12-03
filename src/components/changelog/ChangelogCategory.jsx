import React from 'react';

const ChangelogCategory = ({ title, items, category, onRemove }) => {
  if (items.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium text-slate-300 mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between text-slate-400">
            <span>{item}</span>
            {onRemove && (
              <button
                onClick={() => onRemove(index)}
                className="text-red-400 hover:text-red-300 ml-2"
                aria-label="Eliminar"
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChangelogCategory;