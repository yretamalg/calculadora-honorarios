export const ANALYTICS_CONFIG = {
    GA_MEASUREMENT_ID: 'G-NKZ7YSQQ61', // El ID que ya existe en tu código
    ENVIRONMENT: import.meta.env.PROD ? 'production' : 'development',
    TRACKING_ENABLED: import.meta.env.PROD, // Solo habilitado en producción
    OPTIONS: {
        send_page_view: true,
        allow_google_signals: true,
        allow_ad_personalization_signals: false
    }
};

// Configuraciones adicionales de eventos personalizados
export const ANALYTICS_EVENTS = {
    CALCULO_HONORARIOS: 'calculo_honorarios',
    CALCULO_IVA: 'calculo_iva',
    EXPORTAR_PDF: 'exportar_pdf',
    COPIAR_RESULTADO: 'copiar_resultado'
};

// Helper para el tracking de eventos
export const trackEvent = (eventName, eventParams = {}) => {
    if (window.gtag && ANALYTICS_CONFIG.TRACKING_ENABLED) {
        window.gtag('event', eventName, eventParams);
    }
};