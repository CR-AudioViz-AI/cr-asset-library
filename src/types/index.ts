// CR Asset Library - TypeScript Definitions
// Timestamp: Saturday, December 20, 2025

// ============================================
// STOCK PHOTOS
// ============================================

export type PhotoProvider = 'unsplash' | 'pexels' | 'pixabay';

export interface StockPhoto {
  id: string;
  provider: PhotoProvider;
  url: string;
  thumbnailUrl: string;
  downloadUrl: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
  photographerUrl?: string;
  color?: string;
  tags?: string[];
  license: 'unsplash' | 'pexels' | 'pixabay' | 'cc0';
}

export interface PhotoSearchOptions {
  query: string;
  page?: number;
  perPage?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
  color?: string;
  providers?: PhotoProvider[];
}

export interface PhotoSearchResult {
  photos: StockPhoto[];
  totalResults: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}

// ============================================
// ICONS
// ============================================

export type IconProvider = 'lucide' | 'heroicons' | 'hugeicons' | 'tabler' | 'phosphor';

export interface IconAsset {
  id: string;
  name: string;
  provider: IconProvider;
  category: IconCategory;
  tags: string[];
  svg?: string;
  reactImport?: string;
}

export const ICON_CATEGORIES = [
  'arrows', 'navigation', 'actions', 'communication', 'media',
  'files', 'editing', 'social', 'weather', 'commerce',
  'devices', 'charts', 'shapes', 'brands', 'misc',
] as const;

export type IconCategory = typeof ICON_CATEGORIES[number];

// ============================================
// FONTS
// ============================================

export interface FontAsset {
  family: string;
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';
  variants: string[];
  subsets: string[];
  popularity: number;
  googleFontsUrl: string;
}

export interface FontPairing {
  heading: FontAsset;
  body: FontAsset;
  name: string;
  style: string;
}

// ============================================
// ANIMATIONS (LOTTIE)
// ============================================

export interface LottieAnimation {
  id: string;
  name: string;
  category: LottieCategory;
  jsonUrl: string;
  previewUrl?: string;
  tags: string[];
}

export const LOTTIE_CATEGORIES = [
  'loading', 'success', 'error', 'empty-state', 'onboarding',
  'notification', 'celebration', 'social', 'business', 'technology',
] as const;

export type LottieCategory = typeof LOTTIE_CATEGORIES[number];

// ============================================
// TEXTURES
// ============================================

export type TextureProvider = 'polyhaven' | 'ambientcg' | 'cc0textures';

export interface TextureAsset {
  id: string;
  name: string;
  provider: TextureProvider;
  category: TextureCategory;
  resolution: '1k' | '2k' | '4k' | '8k';
  seamless: boolean;
  pbr: boolean;
  tags: string[];
  previewUrl: string;
  downloadUrl: string;
}

export const TEXTURE_CATEGORIES = [
  'wood', 'metal', 'stone', 'brick', 'concrete',
  'fabric', 'ground', 'tiles', 'organic', 'abstract',
] as const;

export type TextureCategory = typeof TEXTURE_CATEGORIES[number];

// ============================================
// SOUNDS
// ============================================

export type SoundProvider = 'freesound' | 'zapsplat' | 'mixkit';

export interface SoundAsset {
  id: string;
  name: string;
  provider: SoundProvider;
  category: SoundCategory;
  duration: number;
  previewUrl: string;
  downloadUrl: string;
  license: string;
  tags: string[];
}

export const SOUND_CATEGORIES = [
  'ui', 'notification', 'nature', 'ambient', 'music', 'foley', 'game',
] as const;

export type SoundCategory = typeof SOUND_CATEGORIES[number];

// ============================================
// CROCHET PATTERNS
// ============================================

export interface CrochetPattern {
  id: string;
  name: string;
  category: CrochetCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  yarnWeight: string;
  hookSize: string;
  imageUrl: string;
  patternUrl: string;
  source: string;
  license: 'public-domain' | 'cc0' | 'cc-by' | 'free';
  tags: string[];
}

export const CROCHET_CATEGORIES = [
  'amigurumi', 'blankets', 'scarves', 'hats', 'bags',
  'home-decor', 'clothing', 'accessories', 'baby', 'holiday',
] as const;

export type CrochetCategory = typeof CROCHET_CATEGORIES[number];

// ============================================
// SCRAPBOOK ELEMENTS
// ============================================

export interface ScrapbookElement {
  id: string;
  name: string;
  type: 'paper' | 'frame' | 'sticker' | 'embellishment' | 'border' | 'alphabet';
  theme: string;
  imageUrl: string;
  transparentPng: boolean;
  colors: string[];
  tags: string[];
}

// ============================================
// UNIFIED ASSET
// ============================================

export type AssetType = 
  | 'photo' | 'icon' | 'font' | 'animation' 
  | 'texture' | 'sound' | 'crochet-pattern' | 'scrapbook';

export interface UnifiedAsset {
  id: string;
  type: AssetType;
  name: string;
  previewUrl: string;
  downloadUrl?: string;
  provider: string;
  license: string;
  tags: string[];
}
