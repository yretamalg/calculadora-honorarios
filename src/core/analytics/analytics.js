export const ANALYTICS_CONFIG = {
  GA_MEASUREMENT_ID: 'G-NKZ7YSQQ61',
  TRACKING_ENABLED: import.meta.env.PROD,
  OPTIONS: {
    send_page_view: true,
    page_title: true,
    page_location: true,
    anonymize_ip: true,
    cookie_domain: 'auto',
    cookie_expires: 63072000, // 2 años en segundos
    allow_google_signals: true,
    allow_ad_personalization_signals: false
  },
  CUSTOM_EVENTS: {
    // Eventos de calculadoras
    HONORARIOS_CALCULATE: 'honorarios_calculate',
    IVA_CALCULATE: 'iva_calculate',
    PORCENTAJES_CALCULATE: 'porcentajes_calculate',
    INDICADORES_CONVERT: 'indicadores_convert',
    
    // Eventos de PDF
    PDF_HONORARIOS_EXPORT: 'pdf_honorarios_export',
    PDF_IVA_EXPORT: 'pdf_iva_export',
    PDF_PORCENTAJES_EXPORT: 'pdf_porcentajes_export',
    PDF_INDICADORES_EXPORT: 'pdf_indicadores_export',
    
    // Eventos de compartir
    SHARE_WHATSAPP: 'share_whatsapp',
    SHARE_FACEBOOK: 'share_facebook',
    SHARE_TWITTER: 'share_twitter',
    SHARE_COPY_LINK: 'share_copy_link',
    
    // Eventos de error
    CALCULATION_ERROR: 'calculation_error',
    VALIDATION_ERROR: 'validation_error',
    API_ERROR: 'api_error',
    
    // Eventos de navegación
    PAGE_VIEW: 'page_view',
    NAVIGATION_CLICK: 'navigation_click'
  },
  EVENT_CATEGORIES: {
    CALCULATOR: 'calculator',
    PDF: 'pdf',
    SHARE: 'share',
    ERROR: 'error',
    NAVIGATION: 'navigation'
  }
};

// Función para enviar eventos
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const enrichedParams = {
      ...eventParams,
      event_category: eventParams.category || 'uncategorized',
      timestamp: new Date().toISOString(),
      environment: import.meta.env.PROD ? 'production' : 'development'
    };

    window.gtag('event', eventName, enrichedParams);
    
    // Log en desarrollo para debugging
    if (!import.meta.env.PROD) {
      console.log('Analytics Event:', { eventName, ...enrichedParams });
    }
  }
};

// Función para trackear vistas de página
export const trackPageView = (path, title = '') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title
    });
    
    // Log en desarrollo
    if (!import.meta.env.PROD) {
      console.log('Page View:', { path, title });
    }
  }
};

// Función para manejar errores
export const trackError = (error, context = {}) => {
  trackEvent(ANALYTICS_CONFIG.CUSTOM_EVENTS.CALCULATION_ERROR, {
    error_message: error.message,
    error_type: error.name,
    error_stack: import.meta.env.DEV ? error.stack : undefined,
    ...context,
    category: ANALYTICS_CONFIG.EVENT_CATEGORIES.ERROR
  });
};