// CR Asset Library - Stock Photos API
// Unified access to Unsplash, Pexels, Pixabay (5M+ free photos)

import type { StockPhoto, PhotoProvider, PhotoSearchOptions, PhotoSearchResult } from '../types';

const API_KEYS = {
  unsplash: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || process.env.UNSPLASH_ACCESS_KEY,
  pexels: process.env.NEXT_PUBLIC_PEXELS_API_KEY || process.env.PEXELS_API_KEY,
  pixabay: process.env.NEXT_PUBLIC_PIXABAY_API_KEY || process.env.PIXABAY_API_KEY,
};

async function searchUnsplash(query: string, page = 1, perPage = 20): Promise<PhotoSearchResult> {
  if (!API_KEYS.unsplash) return { photos: [], totalResults: 0, page, perPage, hasMore: false };

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
    { headers: { Authorization: `Client-ID ${API_KEYS.unsplash}` } }
  );
  if (!res.ok) throw new Error('Unsplash API error');
  const data = await res.json();

  return {
    photos: data.results.map((p: any): StockPhoto => ({
      id: `unsplash-${p.id}`,
      provider: 'unsplash',
      url: p.urls.regular,
      thumbnailUrl: p.urls.thumb,
      downloadUrl: p.urls.full,
      width: p.width,
      height: p.height,
      alt: p.alt_description || query,
      photographer: p.user.name,
      photographerUrl: p.user.links.html,
      color: p.color,
      tags: p.tags?.map((t: any) => t.title) || [],
      license: 'unsplash',
    })),
    totalResults: data.total,
    page,
    perPage,
    hasMore: page * perPage < data.total,
  };
}

async function searchPexels(query: string, page = 1, perPage = 20): Promise<PhotoSearchResult> {
  if (!API_KEYS.pexels) return { photos: [], totalResults: 0, page, perPage, hasMore: false };

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
    { headers: { Authorization: API_KEYS.pexels } }
  );
  if (!res.ok) throw new Error('Pexels API error');
  const data = await res.json();

  return {
    photos: data.photos.map((p: any): StockPhoto => ({
      id: `pexels-${p.id}`,
      provider: 'pexels',
      url: p.src.large,
      thumbnailUrl: p.src.small,
      downloadUrl: p.src.original,
      width: p.width,
      height: p.height,
      alt: p.alt || query,
      photographer: p.photographer,
      photographerUrl: p.photographer_url,
      color: p.avg_color,
      tags: [],
      license: 'pexels',
    })),
    totalResults: data.total_results,
    page,
    perPage,
    hasMore: !!data.next_page,
  };
}

async function searchPixabay(query: string, page = 1, perPage = 20): Promise<PhotoSearchResult> {
  if (!API_KEYS.pixabay) return { photos: [], totalResults: 0, page, perPage, hasMore: false };

  const res = await fetch(
    `https://pixabay.com/api/?key=${API_KEYS.pixabay}&q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&image_type=photo&safesearch=true`
  );
  if (!res.ok) throw new Error('Pixabay API error');
  const data = await res.json();

  return {
    photos: data.hits.map((p: any): StockPhoto => ({
      id: `pixabay-${p.id}`,
      provider: 'pixabay',
      url: p.webformatURL,
      thumbnailUrl: p.previewURL,
      downloadUrl: p.largeImageURL,
      width: p.imageWidth,
      height: p.imageHeight,
      alt: p.tags || query,
      photographer: p.user,
      photographerUrl: `https://pixabay.com/users/${p.user}-${p.user_id}/`,
      tags: p.tags?.split(', ') || [],
      license: 'pixabay',
    })),
    totalResults: data.totalHits,
    page,
    perPage,
    hasMore: page * perPage < data.totalHits,
  };
}

export class StockPhotoService {
  static async search(options: PhotoSearchOptions): Promise<PhotoSearchResult> {
    const { query, page = 1, perPage = 20, providers = ['unsplash', 'pexels', 'pixabay'] } = options;
    const perProvider = Math.ceil(perPage / providers.length);

    const results = await Promise.all([
      providers.includes('unsplash') ? searchUnsplash(query, page, perProvider).catch(() => ({ photos: [], totalResults: 0, page, perPage, hasMore: false })) : null,
      providers.includes('pexels') ? searchPexels(query, page, perProvider).catch(() => ({ photos: [], totalResults: 0, page, perPage, hasMore: false })) : null,
      providers.includes('pixabay') ? searchPixabay(query, page, perProvider).catch(() => ({ photos: [], totalResults: 0, page, perPage, hasMore: false })) : null,
    ].filter(Boolean) as Promise<PhotoSearchResult>[]);

    const allPhotos: StockPhoto[] = [];
    const maxLen = Math.max(...results.map(r => r.photos.length));
    for (let i = 0; i < maxLen; i++) {
      for (const r of results) {
        if (r.photos[i]) allPhotos.push(r.photos[i]);
      }
    }

    return {
      photos: allPhotos.slice(0, perPage),
      totalResults: results.reduce((s, r) => s + r.totalResults, 0),
      page,
      perPage,
      hasMore: results.some(r => r.hasMore),
    };
  }

  static getConfiguredProviders(): PhotoProvider[] {
    const configured: PhotoProvider[] = [];
    if (API_KEYS.unsplash) configured.push('unsplash');
    if (API_KEYS.pexels) configured.push('pexels');
    if (API_KEYS.pixabay) configured.push('pixabay');
    return configured;
  }
}

export default StockPhotoService;
