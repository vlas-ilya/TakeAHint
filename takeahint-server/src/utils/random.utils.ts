export function randomElement<T>(array: Array<T>) {
  return array[Math.floor(Math.random() * array.length)];
}

export function random(maxValue): number {
  return Math.floor(Math.random() * maxValue);
}

export function uniqueRandomIndexes(count, maxValue): Array<number> {
  const result: Map<number, void> = new Map<number, void>();
  while (result.size < count) {
    result.set(random(maxValue), null);
  }
  return Array.from(result.keys());
}
