class TypeGuard {
  static checkString(value: unknown): value is string {
    return typeof value === 'string';
  }

  static checkNumber(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  static checkBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
  }

  static checkNull(value: unknown): value is null {
    return value === null;
  }

  static checkUndefined(value: unknown): value is undefined {
    return value === undefined;
  }

  static checkFunction(value: unknown): value is Function {
    return typeof value === 'function';
  }
}

export default TypeGuard;
