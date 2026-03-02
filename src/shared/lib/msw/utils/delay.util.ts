import { delay } from 'msw';

/**
 * 지연 시간 범위 설정
 */
interface DelayRange {
  min: number;
  max: number;
}

/**
 * 사전 정의된 지연 프리셋 타입
 */
type DelayPreset = 'fast' | 'normal' | 'slow';

/**
 * MSW 핸들러용 네트워크 지연 시뮬레이션 유틸리티
 *
 * @description
 * 실제 API 응답 시간을 시뮬레이션하기 위한 랜덤 지연을 제공합니다.
 * 사전 정의된 프리셋(fast, normal, slow) 또는 커스텀 범위를 사용할 수 있습니다.
 *
 * @example
 * // 프리셋 사용
 * await MockDelayManager.random('fast');    // 50-150ms
 * await MockDelayManager.random('normal');  // 150-300ms (기본값)
 * await MockDelayManager.random('slow');    // 300-500ms
 *
 * // 커스텀 범위
 * await MockDelayManager.random({ min: 100, max: 500 });
 */
class MockDelayManager {
  /** 사전 정의된 지연 시간 프리셋 (ms) */
  private static readonly PRESETS = {
    fast: { min: 50, max: 150 },
    normal: { min: 150, max: 300 },
    slow: { min: 300, max: 500 },
  } as const;

  /**
   * 주어진 범위 내에서 랜덤 정수 생성
   * @param min - 최소값 (포함)
   * @param max - 최대값 (포함)
   * @returns 랜덤 정수
   */
  private static getRandomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * 랜덤 지연 시뮬레이션 실행
   * @param preset - 프리셋 이름('fast'|'normal'|'slow') 또는 커스텀 범위 {min, max}
   * @returns 지연 완료 시 resolve되는 Promise
   */
  static async random(preset: DelayPreset | DelayRange = 'normal'): Promise<void> {
    const range = typeof preset === 'string' ? this.PRESETS[preset] : preset;
    const ms = this.getRandomInRange(range.min, range.max);
    await delay(ms);
  }

  /**
   * 사용 가능한 지연 프리셋 조회
   * @returns 프리셋 객체 (fast, normal, slow 각각의 min/max 값)
   */
  static getPresets() {
    return this.PRESETS;
  }
}

export default MockDelayManager;
