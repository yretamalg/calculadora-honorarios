import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';

const ChangelogAdmin = () => {
    const [version, setVersion] = useState('');
    const [date, setDate] = useState('');
    const [changes, setChanges] = useState({
        new: [],
        improved: [],
        fixed: []
    });
    const [newItem, setNewItem] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('new');

    const handleAddItem = () => {
        if (!newItem.trim()) return;
        
        setChanges(prev => ({
            ...prev,
            [selectedCategory]: [...prev[selectedCategory], newItem.trim()]
        }));
        setNewItem('');
    };

    const handleRemoveItem = (category, index) => {
        setChanges(prev => ({
            ...prev,
            [category]: prev[category].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        if (!version || !date) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        const changelogEntry = {
            version,
            date,
            changes
        };

        try {
            const response = await fetch('/api/changelog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(changelogEntry)
            });

            if (!response.ok) {
                throw new Error('Error al guardar los cambios');
            }

            // Limpiar el formulario
            setVersion('');
            setDate('');
            setChanges({
                new: [],
                improved: [],
                fixed: []
            });
            alert('Cambios guardados exitosamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar los cambios');
        }
    };

    return (
        <div className="container max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-300 mb-8">Administrar Changelog</h1>
            
            <div className="bg-slate-800 rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Versión
                        </label>
                        <input
                            type="text"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white"
                            placeholder="1.2.9"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Fecha
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex gap-4 mb-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white"
                        >
                            <option value="new">Nuevo</option>
                            <option value="improved">Mejorado</option>
                            <option value="fixed">Corregido</option>
                        </select>
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            className="flex-1 bg-slate-700 border border-slate-600 rounded-md p-2 text-white"
                            placeholder="Descripción del cambio"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                        />
                        <Button onClick={handleAddItem}>Agregar</Button>
                    </div>

                    {Object.entries(changes).map(([category, items]) => (
                        <div key={category} className="mb-4">
                            <h3 className="text-lg font-medium text-slate-300 mb-2">
                                {category === 'new' ? 'Nuevo' : 
                                 category === 'improved' ? 'Mejorado' : 'Corregido'}
                            </h3>
                            <ul className="space-y-2">
                                {items.map((item, index) => (
                                    <li key={index} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                                        <span className="text-slate-300">{item}</span>
                                        <button
                                            onClick={() => handleRemoveItem(category, index)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleSubmit}>Guardar Cambios</Button>
                </div>
            </div>
        </div>
    );
};

export default ChangelogAdmin;