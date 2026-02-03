/**
 * @description
 * - 프로젝트 전역적으로 사용될 Date 사용 규칙
 * - [저장]: ISO 8601 UTC string
 * - [계산]: Date object
 */
class DateStandard {
  /** 현재 시간 (ISO 8601 UTC) */
  static now(): string {
    return new Date().toISOString();
  }

  /** Date → ISO 8601 UTC string */
  static toISO(date: Date): string {
    return date.toISOString();
  }

  /** ISO 8601 UTC string → Date */
  static fromISO(value: string): Date {
    return new Date(value);
  }
}

export default DateStandard;
