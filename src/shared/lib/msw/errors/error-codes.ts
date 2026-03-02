/**
 * MSW Error Codes
 * 표준화된 에러 코드 정의
 */

export const ErrorCodes = {
  // Generic Errors
  SERVICE_UNAVAILABLE: {
    code: 'SERVICE_UNAVAILABLE',
    status: 503,
    message: '서비스가 일시적으로 이용 불가합니다.',
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    status: 400,
    message: '요청 데이터가 유효하지 않습니다.',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    status: 403,
    message: '해당 작업을 수행할 권한이 없습니다.',
  },

  // Form Errors
  FORM_NOT_FOUND: {
    code: 'FORM_NOT_FOUND',
    status: 404,
    message: '공고를 찾을 수 없습니다.',
  },
  FORM_NOT_DRAFT: {
    code: 'FORM_NOT_DRAFT',
    status: 409,
    message: '작성 중(Draft) 상태의 공고만 수정할 수 있습니다.',
  },
  FORM_NOT_ACTIVE: {
    code: 'FORM_NOT_ACTIVE',
    status: 409,
    message: '모집 중(Active) 상태의 공고만 종료할 수 있습니다.',
  },
  FORM_NOT_CLOSED: {
    code: 'FORM_NOT_CLOSED',
    status: 403,
    message: '모집 종료(Closed) 상태의 공고에서만 가능합니다.',
  },
  FORM_INCOMPLETE: {
    code: 'FORM_INCOMPLETE',
    status: 422,
    message: '게시 조건을 충족하지 않습니다. 필수 항목을 확인해주세요.',
  },
  FORM_CLOSED: {
    code: 'FORM_CLOSED',
    status: 410,
    message: '마감된 공고입니다.',
  },

  // Question Errors
  QUESTION_NOT_FOUND: {
    code: 'QUESTION_NOT_FOUND',
    status: 404,
    message: '질문을 찾을 수 없습니다.',
  },
  QUESTION_LOCKED: {
    code: 'QUESTION_LOCKED',
    status: 409,
    message: '게시된 공고의 질문은 수정할 수 없습니다.',
  },

  // Application Errors
  APPLICATION_NOT_FOUND: {
    code: 'APPLICATION_NOT_FOUND',
    status: 404,
    message: '지원서를 찾을 수 없습니다.',
  },

  // Evaluation Errors
  ALREADY_EVALUATED: {
    code: 'ALREADY_EVALUATED',
    status: 409,
    message: '이미 평가가 완료된 지원서입니다.',
  },
  NOT_ASSIGNED: {
    code: 'NOT_ASSIGNED',
    status: 403,
    message: '배정되지 않은 평가입니다.',
  },

  // Evaluator Errors
  EVALUATOR_NOT_FOUND: {
    code: 'EVALUATOR_NOT_FOUND',
    status: 404,
    message: '평가자를 찾을 수 없습니다.',
  },
  HAS_EVALUATIONS: {
    code: 'HAS_EVALUATIONS',
    status: 409,
    message: '평가 데이터가 존재하는 평가자는 삭제할 수 없습니다.',
  },
  NO_APPLICATIONS: {
    code: 'NO_APPLICATIONS',
    status: 400,
    message: '배정할 지원서가 없습니다.',
  },
} as const;

export type ErrorCode = keyof typeof ErrorCodes;
