import React from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Button } from './button';

const BotonesControl = ({ 
  onCalcular, 
  onLimpiar, 
  onAgregar,
  tipo = 'default',
  disabled = false,
  textoCalcular = 'Calcular',
  textoLimpiar = 'Limpiar',
  textoAgregar = 'Agregar Item'
}) => {
  const { trackCalculator } = useAnalytics();

  const handleSubmit = (e) => {
    e.preventDefault();
    trackCalculator('button_calculate_click', {
      tipo,
      estado: disabled ? 'disabled' : 'enabled'
    });
    onCalcular?.();
  };

  const renderBotones = () => {
    switch (tipo) {
      case 'iva':
        return (
          <>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={disabled}
              variant="default"
              className="flex-1"
            >
              {textoCalcular}
            </Button>
            <Button
              type="button"
              onClick={() => {
                trackCalculator('button_clear_click', { tipo });
                onLimpiar?.();
              }}
              variant="secondary"
              className="flex-1"
            >
              {textoLimpiar}
            </Button>
            <Button
              type="button"
              onClick={() => {
                trackCalculator('button_add_click', { tipo });
                onAgregar?.();
              }}
              variant="default"
              className="flex-1"
            >
              {textoAgregar}
            </Button>
          </>
        );

      case 'porcentajes':
        return (
          <>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={disabled}
              variant="default"
              size="lg"
              className="flex-1"
            >
              {textoCalcular}
            </Button>
            <Button
              type="button"
              onClick={() => {
                trackCalculator('button_clear_click', { tipo });
                onLimpiar?.();
              }}
              variant="secondary"
              size="lg"
              className="flex-1"
            >
              {textoLimpiar}
            </Button>
          </>
        );

      case 'indicadores':
        return (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={disabled}
            variant="default"
            className="w-full"
          >
            {textoCalcular}
          </Button>
        );

      default:
        return (
          <>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={disabled}
              variant="default"
              className="flex-1"
            >
              {textoCalcular}
            </Button>
            <Button
              type="button"
              onClick={() => {
                trackCalculator('button_clear_click', { tipo });
                onLimpiar?.();
              }}
              variant="secondary"
              className="flex-1"
            >
              {textoLimpiar}
            </Button>
          </>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      {renderBotones()}
    </form>
  );
};

export default BotonesControl;