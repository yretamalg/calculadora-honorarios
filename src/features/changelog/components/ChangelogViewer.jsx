import React, { useState, useEffect } from 'react';

const ChangelogViewer = () => {
    const [changes, setChanges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChanges = async () => {
            try {
                const response = await fetch('/api/changelog');
                const data = await response.json();
                setChanges(data.entries);
            } catch (error) {
                console.error('Error fetching changelog:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChanges();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500" />
            </div>
        );
    }

    return (
        <div className="container max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-300 mb-8">
                Historial de Cambios
            </h1>
            
            <div className="space-y-8">
                {changes.map((version) => (
                    <div key={version.version} className="bg-slate-800 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-orange-500">
                                Versión {version.version}
                            </h2>
                            <span className="text-sm text-slate-400">
                                {version.date}
                            </span>
                        </div>
                        
                        {Object.entries(version.changes).map(([category, items]) => (
                            items.length > 0 && (
                                <div key={category} className="mb-4">
                                    <h3 className="text-lg font-medium text-slate-300 mb-2">
                                        {category === 'new' ? 'Novedades' :
                                         category === 'improved' ? 'Mejoras' : 'Correcciones'}
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        {items.map((item, index) => (
                                            <li key={index} className="text-slate-400">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChangelogViewer;