class UUID {
  /**
   * @description
   * - 16바이트(128bit) 난수 배열을 반환
   * - 브라우저 환경: Web Crypto API (crypto.getRandomValues) 사용
   * - Node.js 환경: crypto.randomBytes 사용
   */
  private static getRandomBytes16(): Uint8Array {
    if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
      const out = new Uint8Array(16);
      globalThis.crypto.getRandomValues(out);
      return out;
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodeCrypto = require('crypto') as typeof import('crypto');
    return new Uint8Array(nodeCrypto.randomBytes(16));
  }

  static v4(): string {
    const randomBytes = this.getRandomBytes16();
    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;
    const hex = Array.from(randomBytes, byte => byte.toString(16).padStart(2, '0')).join('');
    return [
      hex.slice(0, 8),
      hex.slice(8, 12),
      hex.slice(12, 16),
      hex.slice(16, 20),
      hex.slice(20),
    ].join('-');
  }

  static isValidV4(uuid: string): boolean {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(uuid);
  }
}
export default UUID;
