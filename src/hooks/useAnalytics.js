import { useCallback, useEffect } from 'react';
import { ANALYTICS_CONFIG, trackEvent, trackPageView, trackError } from '@/core/analytics/analytics';

export const useAnalytics = () => {
  // Tracking de eventos
  const track = useCallback((eventName, eventParams = {}) => {
    if (ANALYTICS_CONFIG.TRACKING_ENABLED) {
      trackEvent(eventName, eventParams);
    }
  }, []);

  // Tracking de páginas
  const trackPage = useCallback((path, title) => {
    if (ANALYTICS_CONFIG.TRACKING_ENABLED) {
      trackPageView(path, title);
    }
  }, []);

  // Tracking de calculadoras
  const trackCalculator = useCallback((calculatorType, params = {}) => {
    track(`${calculatorType}_calculate`, {
      ...params,
      category: ANALYTICS_CONFIG.EVENT_CATEGORIES.CALCULATOR
    });
  }, [track]);

  // Tracking de PDFs
  const trackPdfExport = useCallback((pdfType, params = {}) => {
    track(`pdf_${pdfType}_export`, {
      ...params,
      category: ANALYTICS_CONFIG.EVENT_CATEGORIES.PDF
    });
  }, [track]);

  // Tracking de compartir
  const trackShare = useCallback((platform, params = {}) => {
    track(`share_${platform}`, {
      ...params,
      category: ANALYTICS_CONFIG.EVENT_CATEGORIES.SHARE
    });
  }, [track]);

  // Tracking de errores
  const trackErrorEvent = useCallback((error, context = {}) => {
    if (error) {
      trackError(error, context);
    }
  }, []);

  return {
    track,
    trackPage,
    trackCalculator,
    trackPdfExport,
    trackShare,
    trackError: trackErrorEvent
  };
};

// Hook para tracking automático de páginas
export const usePageTracking = () => {
  const { trackPage } = useAnalytics();

  useEffect(() => {
    // Track inicial de la página
    trackPage(window.location.pathname);

    // Observar cambios en la navegación
    const handleRouteChange = () => {
      trackPage(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [trackPage]);
};