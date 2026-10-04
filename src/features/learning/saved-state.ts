// Treat saved browser data as untrusted input, including after a curriculum change.
export function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function boundedText(value: unknown, limit: number): string {
  return typeof value === "string" && value.length <= limit ? value : "";
}
