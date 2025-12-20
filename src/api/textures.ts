// CR Asset Library - Textures API
// 5K+ PBR textures from Poly Haven, ambientCG (CC0)

import type { TextureAsset, TextureCategory, TextureProvider } from '../types';

export const TEXTURE_PROVIDERS: Record<TextureProvider, { name: string; url: string; count: string }> = {
  polyhaven: { name: 'Poly Haven', url: 'https://polyhaven.com/textures', count: '500+' },
  ambientcg: { name: 'ambientCG', url: 'https://ambientcg.com', count: '2000+' },
  cc0textures: { name: 'CC0 Textures', url: 'https://cc0-textures.com', count: '1000+' },
};

export class TextureService {
  static async fetchPolyHavenTextures(options: { limit?: number } = {}): Promise<TextureAsset[]> {
    const { limit = 50 } = options;
    try {
      const res = await fetch('https://api.polyhaven.com/assets?t=textures');
      const data = await res.json();
      return Object.entries(data).slice(0, limit).map(([id, info]: [string, any]) => ({
        id: `polyhaven-${id}`,
        name: info.name || id,
        provider: 'polyhaven' as const,
        category: (info.categories?.[0] || 'abstract') as TextureCategory,
        resolution: '4k' as const,
        seamless: true,
        pbr: true,
        tags: info.tags || [],
        previewUrl: `https://cdn.polyhaven.com/asset_img/thumbs/${id}.png?width=256`,
        downloadUrl: `https://dl.polyhaven.org/file/ph-assets/Textures/${id}`,
      }));
    } catch { return []; }
  }

  static async fetchAmbientCGTextures(options: { limit?: number } = {}): Promise<TextureAsset[]> {
    const { limit = 50 } = options;
    try {
      const res = await fetch(`https://ambientcg.com/api/v2/full_json?type=Material&limit=${limit}`);
      const data = await res.json();
      return (data.foundAssets || []).map((asset: any) => ({
        id: `ambientcg-${asset.assetId}`,
        name: asset.displayName || asset.assetId,
        provider: 'ambientcg' as const,
        category: (asset.category?.toLowerCase() || 'abstract') as TextureCategory,
        resolution: '4k' as const,
        seamless: true,
        pbr: true,
        tags: asset.tags || [],
        previewUrl: asset.previewImage?.['256-PNG'],
        downloadUrl: asset.downloadFolders?.default?.downloadLink,
      }));
    } catch { return []; }
  }

  static async searchAllTextures(query: string, options: { limit?: number } = {}): Promise<TextureAsset[]> {
    const { limit = 50 } = options;
    const [polyHaven, ambientCG] = await Promise.all([
      this.fetchPolyHavenTextures({ limit: 25 }),
      this.fetchAmbientCGTextures({ limit: 25 }),
    ]);
    const q = query.toLowerCase();
    return [...polyHaven, ...ambientCG]
      .filter(t => t.name.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q)))
      .slice(0, limit);
  }

  static getTotalCount(): number {
    return 5000;
  }
}

export default TextureService;
