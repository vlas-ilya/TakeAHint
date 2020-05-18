interface Comparable<T extends Comparable<T>> {
  compare: (item: T) => boolean;
}
