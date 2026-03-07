class CustomSearchParams {
  static toQueryString(params: object): string {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    }
    return searchParams.toString();
  }

  static buildURL(base: string, params: object): string {
    const qs = this.toQueryString(params);
    return qs ? `${base}?${qs}` : base;
  }
}

export default CustomSearchParams;
