// CR Asset Library - useAssetSearch Hook
// Unified search across all asset types

import { useState, useCallback } from 'react';
import type { AssetType, UnifiedAsset } from '../types';
import { StockPhotoService } from '../api/stock-photos';
import { IconService } from '../api/icons';
import { FontService } from '../api/fonts';
import { AnimationService } from '../api/animations';
import { TextureService } from '../api/textures';
import { CrochetPatternService } from '../api/crochet-patterns';
import { useAssetStore } from '../store/asset-store';

interface UseAssetSearchOptions {
  types?: AssetType[];
  limit?: number;
}

interface UseAssetSearchResult {
  results: UnifiedAsset[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clear: () => void;
}

export function useAssetSearch(options: UseAssetSearchOptions = {}): UseAssetSearchResult {
  const { types = ['photo', 'icon', 'font', 'animation'], limit = 20 } = options;
  const [results, setResults] = useState<UnifiedAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addSearchTerm = useAssetStore((s) => s.addSearchTerm);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    addSearchTerm(query);

    try {
      const allResults: UnifiedAsset[] = [];
      const perType = Math.ceil(limit / types.length);

      if (types.includes('photo')) {
        const photos = await StockPhotoService.search({ query, perPage: perType });
        allResults.push(...photos.photos.map(p => ({
          id: p.id,
          type: 'photo' as const,
          name: p.alt,
          previewUrl: p.thumbnailUrl,
          downloadUrl: p.downloadUrl,
          provider: p.provider,
          license: p.license,
          tags: p.tags || [],
        })));
      }

      if (types.includes('icon')) {
        const icons = IconService.search(query, { limit: perType });
        allResults.push(...icons.map(i => ({
          id: i.id,
          type: 'icon' as const,
          name: i.name,
          previewUrl: '',
          provider: i.provider,
          license: 'MIT',
          tags: i.tags,
        })));
      }

      if (types.includes('font')) {
        const fonts = FontService.search(query, { limit: perType });
        allResults.push(...fonts.map(f => ({
          id: f.family,
          type: 'font' as const,
          name: f.family,
          previewUrl: '',
          provider: 'google',
          license: 'OFL',
          tags: [f.category],
        })));
      }

      if (types.includes('animation')) {
        const animations = AnimationService.search(query, { limit: perType });
        allResults.push(...animations.map(a => ({
          id: a.id,
          type: 'animation' as const,
          name: a.name,
          previewUrl: a.previewUrl || '',
          downloadUrl: a.jsonUrl,
          provider: 'lottiefiles',
          license: 'free',
          tags: a.tags,
        })));
      }

      if (types.includes('texture')) {
        const textures = await TextureService.searchAllTextures(query, { limit: perType });
        allResults.push(...textures.map(t => ({
          id: t.id,
          type: 'texture' as const,
          name: t.name,
          previewUrl: t.previewUrl,
          downloadUrl: t.downloadUrl,
          provider: t.provider,
          license: 'CC0',
          tags: t.tags,
        })));
      }

      if (types.includes('crochet-pattern')) {
        const patterns = CrochetPatternService.search(query, { limit: perType });
        allResults.push(...patterns.map(p => ({
          id: p.id,
          type: 'crochet-pattern' as const,
          name: p.name,
          previewUrl: p.imageUrl,
          downloadUrl: p.patternUrl,
          provider: p.source,
          license: p.license,
          tags: p.tags,
        })));
      }

      setResults(allResults.slice(0, limit));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  }, [types, limit, addSearchTerm]);

  const clear = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, isLoading, error, search, clear };
}

export default useAssetSearch;
