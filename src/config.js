// Public (client-side) config. Expo inlines EXPO_PUBLIC_* variables at build time.
// NOTE: anything bundled into a mobile app can be extracted by users, so only use a
// free/low-privilege NewsAPI key here. For production, proxy requests via your own backend.
export const NEWS_API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY ?? '';

export const NEWS_API_URL = 'https://newsapi.org/v2/everything';
export const SEARCH_QUERY = 'cryptocurrency';
export const PAGE_SIZE = 30;
// NewsAPI's free plan only serves roughly the last 30 days, so we always query a rolling window.
export const LOOKBACK_DAYS = 7;
