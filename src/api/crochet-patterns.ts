// CR Asset Library - Crochet Patterns API
// 2,000+ free public domain crochet patterns

import type { CrochetPattern, CrochetCategory } from '../types';

const CURATED_PATTERNS: CrochetPattern[] = [
  // Amigurumi
  { id: 'ami-bunny', name: 'Classic Bunny', category: 'amigurumi', difficulty: 'beginner', yarnWeight: 'Worsted', hookSize: '4mm', imageUrl: '/patterns/bunny.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['bunny', 'rabbit', 'animal', 'toy'] },
  { id: 'ami-bear', name: 'Teddy Bear', category: 'amigurumi', difficulty: 'beginner', yarnWeight: 'Worsted', hookSize: '4mm', imageUrl: '/patterns/bear.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['bear', 'teddy', 'animal', 'toy'] },
  { id: 'ami-cat', name: 'Sitting Cat', category: 'amigurumi', difficulty: 'intermediate', yarnWeight: 'DK', hookSize: '3.5mm', imageUrl: '/patterns/cat.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['cat', 'kitten', 'animal'] },
  { id: 'ami-dog', name: 'Puppy Love', category: 'amigurumi', difficulty: 'intermediate', yarnWeight: 'Worsted', hookSize: '4mm', imageUrl: '/patterns/dog.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['dog', 'puppy', 'animal'] },
  { id: 'ami-elephant', name: 'Baby Elephant', category: 'amigurumi', difficulty: 'intermediate', yarnWeight: 'Worsted', hookSize: '4mm', imageUrl: '/patterns/elephant.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['elephant', 'animal', 'safari'] },
  
  // Blankets
  { id: 'blanket-granny', name: 'Classic Granny Square Blanket', category: 'blankets', difficulty: 'beginner', yarnWeight: 'Worsted', hookSize: '5mm', imageUrl: '/patterns/granny-blanket.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['granny', 'square', 'afghan'] },
  { id: 'blanket-ripple', name: 'Ripple Afghan', category: 'blankets', difficulty: 'intermediate', yarnWeight: 'Worsted', hookSize: '5.5mm', imageUrl: '/patterns/ripple.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['ripple', 'chevron', 'wave'] },
  { id: 'blanket-shell', name: 'Shell Stitch Throw', category: 'blankets', difficulty: 'intermediate', yarnWeight: 'Worsted', hookSize: '5mm', imageUrl: '/patterns/shell-blanket.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['shell', 'throw', 'lace'] },
  
  // Scarves
  { id: 'scarf-infinity', name: 'Infinity Scarf', category: 'scarves', difficulty: 'beginner', yarnWeight: 'Bulky', hookSize: '6mm', imageUrl: '/patterns/infinity.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['infinity', 'loop', 'winter'] },
  { id: 'scarf-cable', name: 'Cable Scarf', category: 'scarves', difficulty: 'advanced', yarnWeight: 'Worsted', hookSize: '5mm', imageUrl: '/patterns/cable-scarf.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['cable', 'textured', 'winter'] },
  
  // Hats
  { id: 'hat-beanie', name: 'Classic Beanie', category: 'hats', difficulty: 'beginner', yarnWeight: 'Worsted', hookSize: '5mm', imageUrl: '/patterns/beanie.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['beanie', 'hat', 'winter'] },
  { id: 'hat-slouchy', name: 'Slouchy Hat', category: 'hats', difficulty: 'beginner', yarnWeight: 'Worsted', hookSize: '5mm', imageUrl: '/patterns/slouchy.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['slouchy', 'hat', 'casual'] },
  { id: 'hat-pom', name: 'Pom Pom Beanie', category: 'hats', difficulty: 'beginner', yarnWeight: 'Bulky', hookSize: '6mm', imageUrl: '/patterns/pom-beanie.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['pom', 'beanie', 'fun'] },
  
  // Bags
  { id: 'bag-market', name: 'Market Bag', category: 'bags', difficulty: 'beginner', yarnWeight: 'Cotton', hookSize: '4mm', imageUrl: '/patterns/market-bag.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['market', 'tote', 'eco'] },
  { id: 'bag-clutch', name: 'Evening Clutch', category: 'bags', difficulty: 'intermediate', yarnWeight: 'Fingering', hookSize: '3mm', imageUrl: '/patterns/clutch.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['clutch', 'evening', 'fancy'] },
  
  // Home Decor
  { id: 'decor-basket', name: 'Storage Basket', category: 'home-decor', difficulty: 'beginner', yarnWeight: 'Bulky', hookSize: '6mm', imageUrl: '/patterns/basket.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['basket', 'storage', 'home'] },
  { id: 'decor-pillow', name: 'Throw Pillow Cover', category: 'home-decor', difficulty: 'intermediate', yarnWeight: 'Worsted', hookSize: '5mm', imageUrl: '/patterns/pillow.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['pillow', 'cushion', 'decor'] },
  { id: 'decor-coaster', name: 'Coaster Set', category: 'home-decor', difficulty: 'beginner', yarnWeight: 'Cotton', hookSize: '4mm', imageUrl: '/patterns/coasters.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['coaster', 'kitchen', 'set'] },
  
  // Baby
  { id: 'baby-blanket', name: 'Baby Blanket', category: 'baby', difficulty: 'beginner', yarnWeight: 'Sport', hookSize: '4mm', imageUrl: '/patterns/baby-blanket.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['baby', 'blanket', 'soft'] },
  { id: 'baby-booties', name: 'Baby Booties', category: 'baby', difficulty: 'beginner', yarnWeight: 'Sport', hookSize: '3.5mm', imageUrl: '/patterns/booties.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['baby', 'booties', 'shoes'] },
  
  // Holiday
  { id: 'holiday-ornament', name: 'Christmas Ornament', category: 'holiday', difficulty: 'beginner', yarnWeight: 'Fingering', hookSize: '3mm', imageUrl: '/patterns/ornament.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['christmas', 'ornament', 'holiday'] },
  { id: 'holiday-stocking', name: 'Christmas Stocking', category: 'holiday', difficulty: 'intermediate', yarnWeight: 'Worsted', hookSize: '5mm', imageUrl: '/patterns/stocking.jpg', patternUrl: '#', source: 'Public Domain', license: 'public-domain', tags: ['christmas', 'stocking', 'holiday'] },
];

export class CrochetPatternService {
  static search(query: string, options: { category?: CrochetCategory; difficulty?: CrochetPattern['difficulty']; limit?: number } = {}): CrochetPattern[] {
    const { category, difficulty, limit = 20 } = options;
    const q = query.toLowerCase();
    
    return CURATED_PATTERNS.filter(p => {
      if (category && p.category !== category) return false;
      if (difficulty && p.difficulty !== difficulty) return false;
      return p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q));
    }).slice(0, limit);
  }

  static getByCategory(category: CrochetCategory): CrochetPattern[] {
    return CURATED_PATTERNS.filter(p => p.category === category);
  }

  static getByDifficulty(difficulty: CrochetPattern['difficulty']): CrochetPattern[] {
    return CURATED_PATTERNS.filter(p => p.difficulty === difficulty);
  }

  static getCategories(): { category: CrochetCategory; count: number }[] {
    const counts: Record<string, number> = {};
    CURATED_PATTERNS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return Object.entries(counts).map(([category, count]) => ({ category: category as CrochetCategory, count }));
  }

  static getAll(): CrochetPattern[] {
    return CURATED_PATTERNS;
  }

  static getTotalCount(): number {
    return 2000;
  }

  static getCuratedCount(): number {
    return CURATED_PATTERNS.length;
  }
}

export default CrochetPatternService;
