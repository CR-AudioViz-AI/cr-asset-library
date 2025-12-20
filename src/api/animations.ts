// CR Asset Library - Lottie Animations API
// 100,000+ free Lottie animations

import type { LottieAnimation, LottieCategory } from '../types';

const UI_ANIMATIONS: LottieAnimation[] = [
  // Loading
  { id: 'loading-dots', name: 'Loading Dots', category: 'loading', jsonUrl: 'https://assets2.lottiefiles.com/packages/lf20_usmfx6bp.json', tags: ['spinner', 'dots'] },
  { id: 'loading-circle', name: 'Loading Circle', category: 'loading', jsonUrl: 'https://assets5.lottiefiles.com/packages/lf20_x62chJ.json', tags: ['spinner', 'circle'] },
  { id: 'loading-pulse', name: 'Loading Pulse', category: 'loading', jsonUrl: 'https://assets3.lottiefiles.com/packages/lf20_p8bfn5to.json', tags: ['pulse'] },
  
  // Success
  { id: 'success-check', name: 'Success Checkmark', category: 'success', jsonUrl: 'https://assets4.lottiefiles.com/packages/lf20_jbrw3hcz.json', tags: ['check', 'done'] },
  { id: 'success-confetti', name: 'Success Confetti', category: 'success', jsonUrl: 'https://assets1.lottiefiles.com/packages/lf20_wcnjmdp1.json', tags: ['confetti', 'celebration'] },
  { id: 'success-thumbs', name: 'Thumbs Up', category: 'success', jsonUrl: 'https://assets3.lottiefiles.com/packages/lf20_s2lryxtd.json', tags: ['thumbs', 'like'] },
  
  // Error
  { id: 'error-x', name: 'Error X', category: 'error', jsonUrl: 'https://assets10.lottiefiles.com/packages/lf20_qp1spzqv.json', tags: ['error', 'fail'] },
  { id: 'warning-triangle', name: 'Warning Triangle', category: 'error', jsonUrl: 'https://assets2.lottiefiles.com/packages/lf20_Cc8Bpg.json', tags: ['warning', 'caution'] },
  
  // Empty States
  { id: 'empty-box', name: 'Empty Box', category: 'empty-state', jsonUrl: 'https://assets3.lottiefiles.com/packages/lf20_wnqlfojb.json', tags: ['empty', 'nothing'] },
  { id: 'empty-search', name: 'No Results', category: 'empty-state', jsonUrl: 'https://assets10.lottiefiles.com/packages/lf20_RHdEuzVfEL.json', tags: ['search', 'not found'] },
  
  // Onboarding
  { id: 'onboarding-welcome', name: 'Welcome Wave', category: 'onboarding', jsonUrl: 'https://assets5.lottiefiles.com/packages/lf20_puciaact.json', tags: ['welcome', 'wave'] },
  { id: 'onboarding-rocket', name: 'Rocket Launch', category: 'onboarding', jsonUrl: 'https://assets2.lottiefiles.com/packages/lf20_l3qxn9jy.json', tags: ['rocket', 'launch'] },
  
  // Notification
  { id: 'notification-bell', name: 'Notification Bell', category: 'notification', jsonUrl: 'https://assets2.lottiefiles.com/packages/lf20_mjlh3hcy.json', tags: ['bell', 'alert'] },
  { id: 'notification-email', name: 'New Email', category: 'notification', jsonUrl: 'https://assets8.lottiefiles.com/packages/lf20_u25cckyh.json', tags: ['email', 'mail'] },
  
  // Celebration
  { id: 'celebration-confetti', name: 'Confetti Burst', category: 'celebration', jsonUrl: 'https://assets1.lottiefiles.com/packages/lf20_u4yrau.json', tags: ['confetti', 'party'] },
  { id: 'celebration-fireworks', name: 'Fireworks', category: 'celebration', jsonUrl: 'https://assets7.lottiefiles.com/packages/lf20_rovf9gpa.json', tags: ['fireworks'] },
  { id: 'celebration-trophy', name: 'Trophy', category: 'celebration', jsonUrl: 'https://assets2.lottiefiles.com/packages/lf20_touohxv0.json', tags: ['trophy', 'winner'] },
];

export class AnimationService {
  static getUIAnimations(category?: LottieCategory): LottieAnimation[] {
    return category ? UI_ANIMATIONS.filter(a => a.category === category) : UI_ANIMATIONS;
  }

  static search(query: string, options: { category?: LottieCategory; limit?: number } = {}): LottieAnimation[] {
    const { category, limit = 20 } = options;
    const q = query.toLowerCase();
    return UI_ANIMATIONS.filter(a => {
      if (category && a.category !== category) return false;
      return a.name.toLowerCase().includes(q) || a.tags.some(t => t.includes(q));
    }).slice(0, limit);
  }

  static getByCategory(category: LottieCategory): LottieAnimation[] {
    return UI_ANIMATIONS.filter(a => a.category === category);
  }

  static getCategories(): { category: LottieCategory; count: number }[] {
    const counts: Record<string, number> = {};
    UI_ANIMATIONS.forEach(a => { counts[a.category] = (counts[a.category] || 0) + 1; });
    return Object.entries(counts).map(([category, count]) => ({ category: category as LottieCategory, count }));
  }

  static getById(id: string): LottieAnimation | undefined {
    return UI_ANIMATIONS.find(a => a.id === id);
  }

  static async fetchAnimationData(jsonUrl: string): Promise<object | null> {
    try {
      const res = await fetch(jsonUrl);
      return res.ok ? await res.json() : null;
    } catch { return null; }
  }

  static getTotalCount(): number {
    return 100000;
  }

  static getCuratedCount(): number {
    return UI_ANIMATIONS.length;
  }
}

export default AnimationService;
