import { TypeGuard } from '@/shared/lib';
import { CustomModel } from '@/shared/model';

import type { CacheData } from '../types';

interface State<T extends CacheData = null> {
  data: T;
  // NOTE: null 인 경우, 기한없는 캐싱
  expiredAt: number | null;
}

interface Props<T extends CacheData = null> {
  data: T;
  // Time To Live (milliseconds)
  ttlMs?: number;
}

class CacheModel<T extends CacheData = null> extends CustomModel<State<T>> {
  private state: State<T>;

  constructor(props: Props<T>) {
    super();
    const { data, ttlMs } = props;
    const now = Date.now();

    this.state = {
      data,
      expiredAt: TypeGuard.checkUndefined(ttlMs) ? null : Math.max(now + ttlMs, now),
    };
  }

  get isExpired(): boolean {
    const { expiredAt } = this.state;

    if (TypeGuard.checkNull(expiredAt)) {
      return false;
    }

    return expiredAt < Date.now();
  }

  get data(): T {
    return this.state.data;
  }

  toJSON(): State<T> {
    return this.state;
  }

  clone(): CacheModel<T> {
    const { data, expiredAt } = this.state;

    return new CacheModel({
      data,
      ttlMs: !TypeGuard.checkNull(expiredAt) ? Math.max(expiredAt - Date.now(), 0) : undefined,
    });
  }
}

export default CacheModel;
