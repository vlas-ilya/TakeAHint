export function getDuplicateIndexes<T extends Comparable<T>>(array: Array<T>): Array<number> {
  const duplicates = array.filter((item, index) => array.findIndex(item.compare) !== index);
  return array.flatMap((item, index) => (duplicates.findIndex(item.compare) !== -1 ? [index] : []));
}

export function shuffle<T>(array: Array<T>) {
  array.sort(() => Math.random() - 0.5);
}
