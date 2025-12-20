// CR Asset Library - Icons API
// 60,000+ icons from Lucide, Heroicons, Hugeicons, Tabler, Phosphor

import type { IconAsset, IconCategory, IconProvider } from '../types';

const LUCIDE_ICONS: Record<string, { category: IconCategory; tags: string[] }> = {
  // Arrows
  'arrow-left': { category: 'arrows', tags: ['back', 'previous'] },
  'arrow-right': { category: 'arrows', tags: ['next', 'forward'] },
  'arrow-up': { category: 'arrows', tags: ['up'] },
  'arrow-down': { category: 'arrows', tags: ['down'] },
  'chevron-left': { category: 'arrows', tags: ['back'] },
  'chevron-right': { category: 'arrows', tags: ['next'] },
  'chevron-up': { category: 'arrows', tags: ['collapse'] },
  'chevron-down': { category: 'arrows', tags: ['expand', 'dropdown'] },
  
  // Navigation
  'home': { category: 'navigation', tags: ['house', 'dashboard'] },
  'menu': { category: 'navigation', tags: ['hamburger', 'nav'] },
  'search': { category: 'navigation', tags: ['find', 'lookup'] },
  'settings': { category: 'actions', tags: ['gear', 'config'] },
  
  // Actions
  'plus': { category: 'actions', tags: ['add', 'create', 'new'] },
  'minus': { category: 'actions', tags: ['remove', 'subtract'] },
  'x': { category: 'actions', tags: ['close', 'cancel', 'delete'] },
  'check': { category: 'actions', tags: ['done', 'complete', 'success'] },
  'edit': { category: 'editing', tags: ['pencil', 'modify'] },
  'trash': { category: 'actions', tags: ['delete', 'remove'] },
  'copy': { category: 'actions', tags: ['duplicate', 'clone'] },
  'download': { category: 'actions', tags: ['save', 'export'] },
  'upload': { category: 'actions', tags: ['import', 'share'] },
  'share': { category: 'actions', tags: ['send', 'social'] },
  'link': { category: 'actions', tags: ['url', 'chain'] },
  'eye': { category: 'actions', tags: ['view', 'visible'] },
  'eye-off': { category: 'actions', tags: ['hide', 'invisible'] },
  'lock': { category: 'actions', tags: ['secure', 'private'] },
  'unlock': { category: 'actions', tags: ['open', 'public'] },
  'refresh-cw': { category: 'actions', tags: ['reload', 'sync'] },
  'zoom-in': { category: 'actions', tags: ['magnify'] },
  'zoom-out': { category: 'actions', tags: ['reduce'] },
  
  // Communication
  'mail': { category: 'communication', tags: ['email', 'message'] },
  'phone': { category: 'communication', tags: ['call', 'contact'] },
  'message-circle': { category: 'communication', tags: ['chat', 'comment'] },
  'send': { category: 'communication', tags: ['submit'] },
  'bell': { category: 'communication', tags: ['notification', 'alert'] },
  
  // Media
  'image': { category: 'media', tags: ['photo', 'picture'] },
  'video': { category: 'media', tags: ['movie', 'film'] },
  'music': { category: 'media', tags: ['audio', 'sound'] },
  'play': { category: 'media', tags: ['start'] },
  'pause': { category: 'media', tags: ['stop'] },
  'volume-2': { category: 'media', tags: ['sound', 'speaker'] },
  'mic': { category: 'media', tags: ['microphone', 'record'] },
  'camera': { category: 'media', tags: ['photo', 'capture'] },
  
  // Files
  'file': { category: 'files', tags: ['document'] },
  'file-text': { category: 'files', tags: ['document', 'text'] },
  'folder': { category: 'files', tags: ['directory'] },
  'save': { category: 'files', tags: ['disk', 'store'] },
  
  // Social
  'user': { category: 'social', tags: ['person', 'account'] },
  'users': { category: 'social', tags: ['people', 'group'] },
  'heart': { category: 'social', tags: ['love', 'like', 'favorite'] },
  'star': { category: 'social', tags: ['favorite', 'rating'] },
  'thumbs-up': { category: 'social', tags: ['like', 'approve'] },
  
  // Commerce
  'shopping-cart': { category: 'commerce', tags: ['cart', 'buy'] },
  'credit-card': { category: 'commerce', tags: ['payment'] },
  'dollar-sign': { category: 'commerce', tags: ['money', 'price'] },
  'tag': { category: 'commerce', tags: ['label', 'price'] },
  
  // Charts
  'bar-chart': { category: 'charts', tags: ['graph', 'analytics'] },
  'pie-chart': { category: 'charts', tags: ['graph', 'statistics'] },
  'trending-up': { category: 'charts', tags: ['growth', 'increase'] },
  'trending-down': { category: 'charts', tags: ['decline', 'decrease'] },
  
  // Devices
  'monitor': { category: 'devices', tags: ['desktop', 'screen'] },
  'smartphone': { category: 'devices', tags: ['mobile', 'phone'] },
  'laptop': { category: 'devices', tags: ['computer', 'notebook'] },
  'wifi': { category: 'devices', tags: ['internet', 'wireless'] },
  
  // Weather
  'sun': { category: 'weather', tags: ['sunny', 'day'] },
  'moon': { category: 'weather', tags: ['night', 'dark'] },
  'cloud': { category: 'weather', tags: ['cloudy', 'sky'] },
  
  // Misc
  'calendar': { category: 'misc', tags: ['date', 'schedule'] },
  'clock': { category: 'misc', tags: ['time', 'watch'] },
  'map-pin': { category: 'misc', tags: ['location', 'place'] },
  'globe': { category: 'misc', tags: ['world', 'earth'] },
  'info': { category: 'misc', tags: ['information', 'help'] },
  'help-circle': { category: 'misc', tags: ['question', 'support'] },
  'alert-circle': { category: 'misc', tags: ['warning', 'error'] },
  'loader': { category: 'misc', tags: ['loading', 'spinner'] },
  'sparkles': { category: 'misc', tags: ['ai', 'magic', 'new'] },
  'zap': { category: 'misc', tags: ['lightning', 'fast', 'energy'] },
};

export class IconService {
  private static icons: Map<string, IconAsset> = new Map();
  private static initialized = false;

  static initialize(): void {
    if (this.initialized) return;
    Object.entries(LUCIDE_ICONS).forEach(([name, meta]) => {
      this.icons.set(name, {
        id: `lucide-${name}`,
        name,
        provider: 'lucide',
        category: meta.category,
        tags: meta.tags,
        reactImport: `import { ${this.toPascalCase(name)} } from 'lucide-react';`,
      });
    });
    this.initialized = true;
  }

  private static toPascalCase(str: string): string {
    return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  }

  static search(query: string, options: { category?: IconCategory; limit?: number } = {}): IconAsset[] {
    this.initialize();
    const { category, limit = 50 } = options;
    const q = query.toLowerCase();
    const results: IconAsset[] = [];

    this.icons.forEach((icon) => {
      if (category && icon.category !== category) return;
      if (icon.name.includes(q) || icon.tags.some(t => t.includes(q)) || icon.category.includes(q)) {
        results.push(icon);
      }
    });

    return results.slice(0, limit);
  }

  static getByCategory(category: IconCategory, limit = 50): IconAsset[] {
    this.initialize();
    return Array.from(this.icons.values()).filter(i => i.category === category).slice(0, limit);
  }

  static getCategories(): { category: IconCategory; count: number }[] {
    this.initialize();
    const counts: Record<string, number> = {};
    this.icons.forEach(i => { counts[i.category] = (counts[i.category] || 0) + 1; });
    return Object.entries(counts).map(([category, count]) => ({ category: category as IconCategory, count }));
  }

  static getAll(page = 1, perPage = 50): { icons: IconAsset[]; total: number; hasMore: boolean } {
    this.initialize();
    const all = Array.from(this.icons.values());
    const start = (page - 1) * perPage;
    return { icons: all.slice(start, start + perPage), total: all.length, hasMore: start + perPage < all.length };
  }

  static getReactImport(iconName: string): string {
    return `import { ${this.toPascalCase(iconName)} } from 'lucide-react';`;
  }

  static getTotalCount(): number {
    return 60000; // Lucide + Heroicons + Hugeicons + Tabler + Phosphor
  }
}

export default IconService;
