import React from 'react';
import { createRoot } from 'react-dom/client';
import { CalculadoraPorcentajes } from './CalculadoraPorcentajes';

// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('calculadora-container');
    if (container) {
        const root = createRoot(container);
        root.render(<CalculadoraPorcentajes />);
    }
});