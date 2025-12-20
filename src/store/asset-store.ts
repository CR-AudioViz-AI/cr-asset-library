// CR Asset Library - Zustand Store
// Manages favorites, recent assets, search history

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AssetType, UnifiedAsset } from '../types';

interface AssetStoreState {
  favorites: Record<AssetType, string[]>;
  recentlyUsed: UnifiedAsset[];
  searchHistory: string[];
  
  addFavorite: (type: AssetType, assetId: string) => void;
  removeFavorite: (type: AssetType, assetId: string) => void;
  isFavorite: (type: AssetType, assetId: string) => boolean;
  addToRecent: (asset: UnifiedAsset) => void;
  addSearchTerm: (term: string) => void;
  clearHistory: () => void;
}

export const useAssetStore = create<AssetStoreState>()(
  persist(
    (set, get) => ({
      favorites: {
        photo: [],
        icon: [],
        font: [],
        animation: [],
        texture: [],
        sound: [],
        'crochet-pattern': [],
        scrapbook: [],
      },
      recentlyUsed: [],
      searchHistory: [],

      addFavorite: (type, assetId) => {
        set((state) => ({
          favorites: {
            ...state.favorites,
            [type]: [...state.favorites[type], assetId],
          },
        }));
      },

      removeFavorite: (type, assetId) => {
        set((state) => ({
          favorites: {
            ...state.favorites,
            [type]: state.favorites[type].filter((id) => id !== assetId),
          },
        }));
      },

      isFavorite: (type, assetId) => {
        return get().favorites[type].includes(assetId);
      },

      addToRecent: (asset) => {
        set((state) => {
          const filtered = state.recentlyUsed.filter((a) => a.id !== asset.id);
          return {
            recentlyUsed: [asset, ...filtered].slice(0, 50),
          };
        });
      },

      addSearchTerm: (term) => {
        set((state) => {
          const filtered = state.searchHistory.filter((t) => t !== term);
          return {
            searchHistory: [term, ...filtered].slice(0, 20),
          };
        });
      },

      clearHistory: () => {
        set({ searchHistory: [], recentlyUsed: [] });
      },
    }),
    {
      name: 'cr-asset-library-store',
    }
  )
);

export default useAssetStore;
