import {
  LOOKBACK_DAYS,
  NEWS_API_KEY,
  NEWS_API_URL,
  PAGE_SIZE,
  SEARCH_QUERY,
} from '../config';

export class MissingApiKeyError extends Error {
  constructor() {
    super('Missing NewsAPI key');
    this.name = 'MissingApiKeyError';
  }
}

const isoDate = (date) => date.toISOString().slice(0, 10);

function buildUrl() {
  const from = new Date(Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    q: SEARCH_QUERY,
    from: isoDate(from),
    sortBy: 'popularity',
    language: 'en',
    pageSize: String(PAGE_SIZE),
  });
  return `${NEWS_API_URL}?${params.toString()}`;
}

// Drops removed/incomplete articles and duplicates so list keys are always unique.
function normalize(articles = []) {
  const seen = new Set();
  const result = [];
  for (const a of articles) {
    if (!a?.url || !a.title || a.title === '[Removed]' || seen.has(a.url)) continue;
    seen.add(a.url);
    result.push({
      id: a.url,
      url: a.url,
      title: a.title,
      description: a.description || '',
      imageUrl: a.urlToImage || null,
      source: a.source?.name || '',
      publishedAt: a.publishedAt || null,
    });
  }
  return result;
}

export async function fetchArticles({ signal } = {}) {
  if (!NEWS_API_KEY) throw new MissingApiKeyError();

  // Key goes in a header rather than the URL so it doesn't end up in logs/history.
  const response = await fetch(buildUrl(), {
    signal,
    headers: { 'X-Api-Key': NEWS_API_KEY },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.status === 'error') {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return normalize(data.articles);
}
