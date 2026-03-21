import { TypeGuard } from '@/shared/lib';

import { CacheModel } from '../model';

import type { CacheData } from '../types';

class CachedService {
  static CACHE_MAP = new Map<string, CacheModel<CacheData>>();

  static get<T extends CacheData>(key: string): T | null {
    const cached = this.CACHE_MAP.get(key);
    if (TypeGuard.checkUndefined(cached) || cached.isExpired) {
      this.CACHE_MAP.delete(key);
      return null;
    } else {
      return cached.data as T;
    }
  }

  static set<T extends CacheData>(key: string, data: T, ttlMs?: number): boolean {
    if (this.CACHE_MAP.has(key)) {
      return false;
    }

    this.CACHE_MAP.set(key, new CacheModel({ data, ttlMs }));
    return true;
  }

  static invalidate(key: string) {
    this.CACHE_MAP.delete(key);
  }
}

export default CachedService;
