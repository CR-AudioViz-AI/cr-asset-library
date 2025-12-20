// CR Asset Library - Sounds API
// 500K+ free sound effects from Freesound, Zapsplat, Mixkit

import type { SoundAsset, SoundCategory, SoundProvider } from '../types';

const FREESOUND_API_KEY = process.env.NEXT_PUBLIC_FREESOUND_API_KEY || process.env.FREESOUND_API_KEY;

export class SoundService {
  static async searchFreesound(query: string, options: { page?: number; perPage?: number } = {}): Promise<SoundAsset[]> {
    if (!FREESOUND_API_KEY) return [];
    const { page = 1, perPage = 20 } = options;
    
    try {
      const res = await fetch(
        `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(query)}&page=${page}&page_size=${perPage}&fields=id,name,duration,previews,tags,license`,
        { headers: { Authorization: `Token ${FREESOUND_API_KEY}` } }
      );
      if (!res.ok) return [];
      const data = await res.json();
      
      return (data.results || []).map((s: any): SoundAsset => ({
        id: `freesound-${s.id}`,
        name: s.name,
        provider: 'freesound',
        category: this.categorizeSound(s.tags || []),
        duration: s.duration,
        previewUrl: s.previews?.['preview-lq-mp3'] || s.previews?.['preview-hq-mp3'],
        downloadUrl: `https://freesound.org/people/${s.username}/sounds/${s.id}/download/`,
        license: s.license,
        tags: s.tags || [],
      }));
    } catch { return []; }
  }

  private static categorizeSound(tags: string[]): SoundCategory {
    const tagStr = tags.join(' ').toLowerCase();
    if (tagStr.includes('notification') || tagStr.includes('alert') || tagStr.includes('beep')) return 'notification';
    if (tagStr.includes('ui') || tagStr.includes('click') || tagStr.includes('button')) return 'ui';
    if (tagStr.includes('nature') || tagStr.includes('bird') || tagStr.includes('water')) return 'nature';
    if (tagStr.includes('ambient') || tagStr.includes('atmosphere')) return 'ambient';
    if (tagStr.includes('music') || tagStr.includes('melody')) return 'music';
    if (tagStr.includes('game') || tagStr.includes('arcade')) return 'game';
    return 'foley';
  }

  static getTotalCount(): number {
    return 500000;
  }
}

export default SoundService;
