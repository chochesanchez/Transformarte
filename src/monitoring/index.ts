export function reportWebVitals(metric: any) {
  // Report to Vercel Analytics
  if (metric.label === 'web-vital') {
    console.log('Web Vital', metric);
    // You can send this to your analytics
  }
  
  // Report errors
  if (metric.name === 'TTFB') {
    console.log('Time to First Byte:', metric.value);
  }

  if (metric.name === 'FCP') {
    console.log('First Contentful Paint:', metric.value);
  }

  if (metric.name === 'LCP') {
    console.log('Largest Contentful Paint:', metric.value);
  }

  if (metric.name === 'FID') {
    console.log('First Input Delay:', metric.value);
  }

  if (metric.name === 'CLS') {
    console.log('Cumulative Layout Shift:', metric.value);
  }
}

// Error monitoring
export function monitorErrors(error: Error) {
  console.error('Application Error:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'server-side',
  });
} 