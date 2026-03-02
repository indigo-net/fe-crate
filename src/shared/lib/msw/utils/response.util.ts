import { HttpResponse } from 'msw';

import { ErrorCodes, type ErrorCode } from '../errors/error-codes';

/**
 * 성공 응답 옵션
 */
interface SuccessOptions {
  status?: number;
  pagination?: { page: number; limit: number; total: number };
}

/**
 * 성공 응답 메타데이터
 */
interface SuccessMeta {
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 성공 응답 형식
 */
interface SuccessResponse<T> {
  success: true;
  data: T;
  meta: SuccessMeta;
}

/**
 * 에러 응답 형식
 */
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    status: number;
    message: string;
    details?: Record<string, unknown>;
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}

/**
 * MSW 핸들러용 HTTP 응답 생성 유틸리티
 *
 * @description
 * MSW 핸들러에서 일관된 형식의 성공/에러 응답을 생성합니다.
 * 표준화된 응답 구조(success, data, meta, error)를 따릅니다.
 *
 * @example
 * // 성공 응답
 * return MockResponseManager.success(data);
 * return MockResponseManager.success(data, { status: 201 });
 * return MockResponseManager.success(data, { pagination: { page: 1, limit: 10, total: 100 } });
 *
 * // 에러 응답
 * return MockResponseManager.error('FORM_NOT_FOUND');
 * return MockResponseManager.error('VALIDATION_ERROR', { field: 'title' });
 */
class MockResponseManager {
  /**
   * 페이지네이션 메타데이터 생성
   * @param page - 현재 페이지 번호 (1부터 시작)
   * @param limit - 페이지당 항목 수
   * @param total - 전체 항목 수
   * @returns 페이지네이션 정보 객체
   */
  private static createPagination(page: number, limit: number, total: number) {
    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * 성공 응답 생성
   * @template T - 응답 데이터 타입
   * @param data - 응답에 포함할 데이터
   * @param options - 추가 옵션 (status, pagination)
   * @param options.status - HTTP 상태 코드 (기본값: 200)
   * @param options.pagination - 페이지네이션 정보 (page, limit, total)
   * @returns MSW Response 객체
   */
  static success<T>(data: T, options?: SuccessOptions): Response {
    const meta: SuccessMeta = {
      timestamp: new Date().toISOString(),
    };

    if (options?.pagination) {
      meta.pagination = this.createPagination(
        options.pagination.page,
        options.pagination.limit,
        options.pagination.total,
      );
    }

    const body: SuccessResponse<T> = {
      success: true,
      data,
      meta,
    };

    return HttpResponse.json(body, { status: options?.status ?? 200 });
  }

  /**
   * 에러 응답 생성
   * @param errorCode - 에러 코드 (ErrorCodes에 정의된 키)
   * @param details - 추가 에러 상세 정보 (선택)
   * @returns MSW Response 객체 (에러 상태 코드 포함)
   */
  static error(errorCode: ErrorCode, details?: Record<string, unknown>): Response {
    const errorInfo = ErrorCodes[errorCode];

    const body: ErrorResponse = {
      success: false,
      error: {
        code: errorInfo.code,
        status: errorInfo.status,
        message: errorInfo.message,
        ...(details && { details }),
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID(),
      },
    };

    return HttpResponse.json(body, { status: errorInfo.status });
  }
}

export default MockResponseManager;
