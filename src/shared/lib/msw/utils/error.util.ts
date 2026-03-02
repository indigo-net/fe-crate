import MockResponseManager from './response.util';

import type { ErrorCode } from '../errors/error-codes';

/**
 * MSW 핸들러용 랜덤 에러 시뮬레이션 유틸리티
 *
 * @description
 * 실제 서버 에러 상황을 시뮬레이션하기 위해 확률 기반으로 에러를 발생시킵니다.
 * 기본 확률은 1/50 (2%)이며, 핸들러에서 랜덤 에러 테스트에 사용합니다.
 *
 * @example
 * // 기본 확률 (1/50)로 에러 발생
 * const randomError = MockErrorSimulator.maybeError('SERVICE_UNAVAILABLE');
 * if (randomError) return randomError;
 *
 * // 커스텀 확률 (10%)로 에러 발생
 * const randomError = MockErrorSimulator.maybeError('VALIDATION_ERROR', 0.1);
 * if (randomError) return randomError;
 */
class MockErrorSimulator {
  /** 기본 에러 발생 확률 (1/50 = 2%) */
  private static readonly DEFAULT_PROBABILITY = 1 / 50;

  /**
   * 확률 기반 에러 발생 여부 결정
   * @param probability - 에러 발생 확률 (0-1 범위)
   * @returns 에러 발생 여부
   */
  private static shouldTrigger(probability: number): boolean {
    return Math.random() < probability;
  }

  /**
   * 확률 기반 랜덤 에러 응답 생성
   * @param errorCode - 발생시킬 에러 코드 (ErrorCodes에 정의된 키)
   * @param probability - 에러 발생 확률 (기본값: 1/50)
   * @returns 에러 발생 시 Response 객체, 미발생 시 null
   */
  static maybeError(
    errorCode: ErrorCode,
    probability: number = this.DEFAULT_PROBABILITY,
  ): Response | null {
    if (this.shouldTrigger(probability)) {
      return MockResponseManager.error(errorCode);
    }
    return null;
  }

  /**
   * 기본 에러 발생 확률 조회
   * @returns 기본 확률 값 (0.02)
   */
  static getDefaultProbability(): number {
    return this.DEFAULT_PROBABILITY;
  }
}

export default MockErrorSimulator;
