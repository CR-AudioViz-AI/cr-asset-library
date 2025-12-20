// CR Asset Library - Photo Editor Integration
// Stock photo panel for inserting images as layers

'use client';

import React, { useState } from 'react';
import { Search, Heart, Image, Loader2 } from 'lucide-react';
import { StockPhotoService } from '../../src/api/stock-photos';
import type { StockPhoto } from '../../src/types';

interface StockPhotoPanelProps {
  onInsertAsLayer?: (photo: StockPhoto) => void;
  onInsertAsBackground?: (photo: StockPhoto) => void;
  className?: string;
}

export function StockPhotoPanel({ onInsertAsLayer, onInsertAsBackground, className = '' }: StockPhotoPanelProps) {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<StockPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<StockPhoto | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const result = await StockPhotoService.search({ query, perPage: 30 });
      setPhotos(result.photos);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-gray-900 text-white ${className}`}>
      <div className="p-3 border-b border-gray-700">
        <h3 className="font-semibold text-sm mb-2">Stock Photos</h3>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search millions of photos..."
              className="w-full pl-9 pr-3 py-2 bg-gray-800 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>

      <div className="flex gap-1 p-2 overflow-x-auto">
        {['Nature', 'Business', 'People', 'Food', 'Travel', 'Tech'].map((cat) => (
          <button key={cat} onClick={() => setQuery(cat.toLowerCase())} className="px-2 py-1 bg-gray-800 rounded text-xs hover:bg-gray-700 whitespace-nowrap">
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <Image className="w-8 h-8 mb-2" />
            <p className="text-xs">Search for stock photos</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1">
            {photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square rounded overflow-hidden group cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
                <img src={photo.thumbnailUrl} alt={photo.alt} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-1 bg-gradient-to-t from-black/70 text-[10px] truncate">
                  {photo.photographer}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div className="p-3 border-t border-gray-700 space-y-2">
          <p className="text-xs truncate">{selectedPhoto.alt}</p>
          <div className="flex gap-2">
            <button onClick={() => { onInsertAsLayer?.(selectedPhoto); setSelectedPhoto(null); }} className="flex-1 py-2 bg-blue-600 rounded text-xs hover:bg-blue-700">
              Insert as Layer
            </button>
            <button onClick={() => { onInsertAsBackground?.(selectedPhoto); setSelectedPhoto(null); }} className="flex-1 py-2 bg-gray-700 rounded text-xs hover:bg-gray-600">
              Set Background
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StockPhotoPanel;
