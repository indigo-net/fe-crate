type FormQuestionType =
  | 'SINGLE_CHOICE' // 단일 선택
  | 'MULTIPLE_CHOICE' // 복수 선택
  | 'SHORT_TEXT' // 단답형
  | 'LONG_TEXT'; // 장답형

type FormStatusType =
  | 'DRAFT' // 작성 중, 임시저장
  | 'SCHEDULED' // 모집 예정
  | 'PUBLISHED' // 모집 중
  | 'CLOSED'; // 모집 종료

type SelectionMethodType =
  | 'QUANTITATIVE' // 정량평가
  | 'LOTTERY' // 추첨제
  | 'FIRST_COME_FIRST_SERVED'; // 선착순

export type { FormQuestionType, FormStatusType, SelectionMethodType };
