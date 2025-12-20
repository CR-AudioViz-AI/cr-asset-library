// CR Asset Library - AssetPicker Component
// Universal tabbed asset selector

'use client';

import React, { useState } from 'react';
import { Search, Heart, Clock, Image, Type, Sparkles, Grid3X3 } from 'lucide-react';
import { useAssetSearch } from '../hooks/useAssetSearch';
import { useAssetStore } from '../store/asset-store';
import type { AssetType, UnifiedAsset } from '../types';

interface AssetPickerProps {
  types?: AssetType[];
  onSelect?: (asset: UnifiedAsset) => void;
  className?: string;
}

const TYPE_ICONS: Record<AssetType, React.ReactNode> = {
  photo: <Image className="w-4 h-4" />,
  icon: <Grid3X3 className="w-4 h-4" />,
  font: <Type className="w-4 h-4" />,
  animation: <Sparkles className="w-4 h-4" />,
  texture: <Grid3X3 className="w-4 h-4" />,
  sound: <Sparkles className="w-4 h-4" />,
  'crochet-pattern': <Heart className="w-4 h-4" />,
  scrapbook: <Image className="w-4 h-4" />,
};

const TYPE_LABELS: Record<AssetType, string> = {
  photo: 'Photos',
  icon: 'Icons',
  font: 'Fonts',
  animation: 'Animations',
  texture: 'Textures',
  sound: 'Sounds',
  'crochet-pattern': 'Patterns',
  scrapbook: 'Elements',
};

export function AssetPicker({ 
  types = ['photo', 'icon', 'font', 'animation'], 
  onSelect,
  className = ''
}: AssetPickerProps) {
  const [activeTab, setActiveTab] = useState<AssetType | 'recent' | 'favorites'>('photo');
  const [query, setQuery] = useState('');
  const { results, isLoading, search } = useAssetSearch({ types, limit: 30 });
  const { recentlyUsed, favorites } = useAssetStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(query);
    }
  };

  const handleSelect = (asset: UnifiedAsset) => {
    onSelect?.(asset);
  };

  const displayAssets = activeTab === 'recent' 
    ? recentlyUsed 
    : activeTab === 'favorites'
    ? [] // Would need to fetch favorites
    : results.filter(r => r.type === activeTab);

  return (
    <div className={`flex flex-col h-full bg-white rounded-xl shadow-lg ${className}`}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>

      {/* Tabs */}
      <div className="flex gap-1 p-2 border-b overflow-x-auto">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === type
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {TYPE_ICONS[type]}
            {TYPE_LABELS[type]}
          </button>
        ))}
        <button
          onClick={() => setActiveTab('recent')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            activeTab === 'recent'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          Recent
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            activeTab === 'favorites'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          Favorites
        </button>
      </div>

      {/* Results Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayAssets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <Search className="w-8 h-8 mb-2" />
            <p className="text-sm">Search for {TYPE_LABELS[activeTab as AssetType] || 'assets'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {displayAssets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => handleSelect(asset)}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all group"
              >
                {asset.previewUrl ? (
                  <img
                    src={asset.previewUrl}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    {TYPE_ICONS[asset.type]}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-3 border-t text-center text-xs text-gray-500">
        5M+ photos • 60K+ icons • 1.5K fonts • 100K+ animations
      </div>
    </div>
  );
}

export default AssetPicker;
