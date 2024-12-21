// src/hooks/useErrorTracking.js
import { useEffect } from 'react';
import { useAnalytics } from './useAnalytics';

export const useErrorTracking = (errorType, errorDetails = {}) => {
  const { track } = useAnalytics();

  useEffect(() => {
    track('error_page_view', {
      error_type: errorType,
      page_url: window.location.pathname,
      referrer: document.referrer,
      ...errorDetails,
      category: 'error',
      timestamp: new Date().toISOString()
    });
  }, [errorType, errorDetails, track]);
};