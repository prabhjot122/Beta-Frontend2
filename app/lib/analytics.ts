import Analytics from 'analytics'
// @ts-expect-error - Missing type declarations for @analytics/google-analytics
import googleAnalytics from '@analytics/google-analytics'

// Only initialize analytics on the client side
let analytics: ReturnType<typeof Analytics> | null = null;

if (typeof window !== 'undefined') {
  analytics = Analytics({
    app: 'BetaLawvriksh-Frontend',
    plugins: [
      googleAnalytics({
        measurementIds: ['G-TQJEZES4ET']
      })
    ]
  });
}

export default analytics; 