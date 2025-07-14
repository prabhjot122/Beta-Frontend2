import { useCallback } from 'react';
import analytics from './analytics';

export function useAnalytics() {
  const trackPage = useCallback((pageName?: string) => {
    if (!analytics) return;
    
    if (pageName) {
      analytics.page({ name: pageName });
    } else {
      analytics.page();
    }
  }, []);

  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (!analytics) return;
    analytics.track(eventName, properties);
  }, []);

  const identifyUser = useCallback((userId: string, traits?: Record<string, any>) => {
    if (!analytics) return;
    analytics.identify(userId, traits);
  }, []);

  return {
    trackPage,
    trackEvent,
    identifyUser,
    analytics
  };
} 