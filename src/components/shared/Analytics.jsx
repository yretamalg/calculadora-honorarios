import { useEffect } from 'react';
import { ANALYTICS_CONFIG } from '../../core/analytics/analytics';

const Analytics = () => {
  useEffect(() => {
    if (!ANALYTICS_CONFIG.TRACKING_ENABLED) return;

    const loadGoogleAnalytics = () => {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, ANALYTICS_CONFIG.OPTIONS);
      };
    };

    loadGoogleAnalytics();
  }, []);

  return null;
};

export default Analytics;