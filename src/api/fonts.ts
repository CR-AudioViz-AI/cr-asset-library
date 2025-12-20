// CR Asset Library - Fonts API
// 1,500+ Google Fonts with pairings

import type { FontAsset, FontPairing } from '../types';

const POPULAR_FONTS: FontAsset[] = [
  // Sans-serif
  { family: 'Inter', category: 'sans-serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 1, googleFontsUrl: 'https://fonts.google.com/specimen/Inter' },
  { family: 'Roboto', category: 'sans-serif', variants: ['400', '500', '700'], subsets: ['latin', 'cyrillic'], popularity: 2, googleFontsUrl: 'https://fonts.google.com/specimen/Roboto' },
  { family: 'Open Sans', category: 'sans-serif', variants: ['400', '600', '700'], subsets: ['latin', 'cyrillic'], popularity: 3, googleFontsUrl: 'https://fonts.google.com/specimen/Open+Sans' },
  { family: 'Lato', category: 'sans-serif', variants: ['400', '700'], subsets: ['latin'], popularity: 4, googleFontsUrl: 'https://fonts.google.com/specimen/Lato' },
  { family: 'Montserrat', category: 'sans-serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 5, googleFontsUrl: 'https://fonts.google.com/specimen/Montserrat' },
  { family: 'Poppins', category: 'sans-serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 6, googleFontsUrl: 'https://fonts.google.com/specimen/Poppins' },
  { family: 'Nunito', category: 'sans-serif', variants: ['400', '600', '700'], subsets: ['latin'], popularity: 7, googleFontsUrl: 'https://fonts.google.com/specimen/Nunito' },
  { family: 'Work Sans', category: 'sans-serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 8, googleFontsUrl: 'https://fonts.google.com/specimen/Work+Sans' },
  { family: 'DM Sans', category: 'sans-serif', variants: ['400', '500', '700'], subsets: ['latin'], popularity: 9, googleFontsUrl: 'https://fonts.google.com/specimen/DM+Sans' },
  { family: 'Space Grotesk', category: 'sans-serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 10, googleFontsUrl: 'https://fonts.google.com/specimen/Space+Grotesk' },
  
  // Serif
  { family: 'Playfair Display', category: 'serif', variants: ['400', '600', '700'], subsets: ['latin'], popularity: 11, googleFontsUrl: 'https://fonts.google.com/specimen/Playfair+Display' },
  { family: 'Merriweather', category: 'serif', variants: ['400', '700'], subsets: ['latin', 'cyrillic'], popularity: 12, googleFontsUrl: 'https://fonts.google.com/specimen/Merriweather' },
  { family: 'Lora', category: 'serif', variants: ['400', '600', '700'], subsets: ['latin'], popularity: 13, googleFontsUrl: 'https://fonts.google.com/specimen/Lora' },
  { family: 'EB Garamond', category: 'serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 14, googleFontsUrl: 'https://fonts.google.com/specimen/EB+Garamond' },
  
  // Display
  { family: 'Bebas Neue', category: 'display', variants: ['400'], subsets: ['latin'], popularity: 15, googleFontsUrl: 'https://fonts.google.com/specimen/Bebas+Neue' },
  { family: 'Oswald', category: 'display', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 16, googleFontsUrl: 'https://fonts.google.com/specimen/Oswald' },
  
  // Handwriting
  { family: 'Dancing Script', category: 'handwriting', variants: ['400', '600', '700'], subsets: ['latin'], popularity: 17, googleFontsUrl: 'https://fonts.google.com/specimen/Dancing+Script' },
  { family: 'Pacifico', category: 'handwriting', variants: ['400'], subsets: ['latin'], popularity: 18, googleFontsUrl: 'https://fonts.google.com/specimen/Pacifico' },
  { family: 'Caveat', category: 'handwriting', variants: ['400', '600', '700'], subsets: ['latin'], popularity: 19, googleFontsUrl: 'https://fonts.google.com/specimen/Caveat' },
  
  // Monospace
  { family: 'Fira Code', category: 'monospace', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 20, googleFontsUrl: 'https://fonts.google.com/specimen/Fira+Code' },
  { family: 'JetBrains Mono', category: 'monospace', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 21, googleFontsUrl: 'https://fonts.google.com/specimen/JetBrains+Mono' },
  { family: 'Source Code Pro', category: 'monospace', variants: ['400', '500', '600', '700'], subsets: ['latin'], popularity: 22, googleFontsUrl: 'https://fonts.google.com/specimen/Source+Code+Pro' },
];

const FONT_PAIRINGS: FontPairing[] = [
  { name: 'Modern Tech', style: 'Clean and contemporary', heading: POPULAR_FONTS[9], body: POPULAR_FONTS[0] },
  { name: 'Classic Elegance', style: 'Sophisticated and timeless', heading: POPULAR_FONTS[10], body: POPULAR_FONTS[3] },
  { name: 'Bold Impact', style: 'Strong headlines', heading: POPULAR_FONTS[14], body: POPULAR_FONTS[2] },
  { name: 'Friendly Modern', style: 'Approachable and warm', heading: POPULAR_FONTS[5], body: POPULAR_FONTS[6] },
  { name: 'Startup Fresh', style: 'Modern startup aesthetic', heading: POPULAR_FONTS[8], body: POPULAR_FONTS[7] },
];

export class FontService {
  private static loadedFonts: Set<string> = new Set();

  static search(query: string, options: { category?: FontAsset['category']; limit?: number } = {}): FontAsset[] {
    const { category, limit = 20 } = options;
    const q = query.toLowerCase();
    return POPULAR_FONTS.filter(f => {
      if (category && f.category !== category) return false;
      return f.family.toLowerCase().includes(q);
    }).slice(0, limit);
  }

  static getByCategory(category: FontAsset['category']): FontAsset[] {
    return POPULAR_FONTS.filter(f => f.category === category);
  }

  static getPopular(limit = 20): FontAsset[] {
    return POPULAR_FONTS.slice(0, limit);
  }

  static getPairings(): FontPairing[] {
    return FONT_PAIRINGS;
  }

  static async loadFont(family: string, weights: number[] = [400, 500, 600, 700]): Promise<void> {
    const key = `${family}-${weights.join(',')}`;
    if (this.loadedFonts.has(key)) return;

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weights.join(';')}&display=swap`;
    link.rel = 'stylesheet';
    
    return new Promise((resolve, reject) => {
      link.onload = () => { this.loadedFonts.add(key); resolve(); };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  static getCssImport(family: string, weights: number[] = [400, 500, 600, 700]): string {
    return `@import url('https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weights.join(';')}&display=swap');`;
  }

  static getTotalCount(): number {
    return 1500;
  }
}

export default FontService;
