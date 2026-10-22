'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

// Function to send Core Web Vitals to Google Analytics
function sendToAnalytics(metric: Metric) {
  // Check if gtag is available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

export default function WebVitalsTracker() {
  useEffect(() => {
    // Track Core Web Vitals
    // Note: onFID is deprecated, replaced by onINP
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics); // Replaces onFID
  }, []);

  return null;
}
