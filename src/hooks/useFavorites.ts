// CR Asset Library - useFavorites Hook
// Manage favorite assets

import { useCallback } from 'react';
import type { AssetType, UnifiedAsset } from '../types';
import { useAssetStore } from '../store/asset-store';

interface UseFavoritesResult {
  favorites: string[];
  isFavorite: (assetId: string) => boolean;
  toggleFavorite: (asset: UnifiedAsset) => void;
  addFavorite: (assetId: string) => void;
  removeFavorite: (assetId: string) => void;
}

export function useFavorites(type: AssetType): UseFavoritesResult {
  const store = useAssetStore();
  const favorites = store.favorites[type];

  const isFavorite = useCallback(
    (assetId: string) => favorites.includes(assetId),
    [favorites]
  );

  const addFavorite = useCallback(
    (assetId: string) => store.addFavorite(type, assetId),
    [store, type]
  );

  const removeFavorite = useCallback(
    (assetId: string) => store.removeFavorite(type, assetId),
    [store, type]
  );

  const toggleFavorite = useCallback(
    (asset: UnifiedAsset) => {
      if (isFavorite(asset.id)) {
        removeFavorite(asset.id);
      } else {
        addFavorite(asset.id);
        store.addToRecent(asset);
      }
    },
    [isFavorite, addFavorite, removeFavorite, store]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
  };
}

export default useFavorites;
