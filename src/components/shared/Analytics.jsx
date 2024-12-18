import { useEffect, useCallback } from 'react';
import { ANALYTICS_CONFIG } from '@/core/analytics/analytics';

const Analytics = () => {
  const initializeGA = useCallback(() => {
    if (!ANALYTICS_CONFIG.TRACKING_ENABLED) return;

    try {
      // Cargar el script de Google Analytics
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, ANALYTICS_CONFIG.OPTIONS);

        // Configurar el manejo de errores global
        window.addEventListener('error', (event) => {
          gtag('event', 'javascript_error', {
            error_message: event.message,
            error_url: event.filename,
            error_line: event.lineno,
            error_column: event.colno,
            category: ANALYTICS_CONFIG.EVENT_CATEGORIES.ERROR
          });
        });

        // Configurar el manejo de promesas rechazadas
        window.addEventListener('unhandledrejection', (event) => {
          gtag('event', 'unhandled_promise_rejection', {
            error_message: event.reason?.message || 'Unknown Promise Rejection',
            category: ANALYTICS_CONFIG.EVENT_CATEGORIES.ERROR
          });
        });
      };

      script.onerror = () => {
        console.error('Error loading Google Analytics');
      };
    } catch (error) {
      console.error('Error initializing Analytics:', error);
    }
  }, []);

  useEffect(() => {
    initializeGA();

    // Cleanup
    return () => {
      const script = document.querySelector(`script[src*="googletagmanager"]`);
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [initializeGA]);

  return null;
};

export default Analytics;