interface _Consumer<T> {
  (arg: T): void;
}

interface _Function<T, R> {
  (arg: T): R;
}

/*interface _Supplier<T> {
  (): T;
}*/

export function pick<T>(fn: _Consumer<T>) {
  return function(item: T) {
    fn(item);
    return item;
  };
}

export function forClass<T>(constructor: Function, fn: _Function<T, T>) {
  return function(item: T) {
    if (item instanceof constructor) {
      return fn(item);
    }
    return item;
  };
}

export function forItem<T>(index: number | undefined, fn: _Function<T, T>) {
  return function(item: T, _index: number) {
    if (index === _index) {
      return fn(item);
    }
    return item;
  };
}

export function forItems<T>(indexes: Array<number>, fn: _Function<T, T>) {
  return function(item: T, index: number) {
    if (indexes.includes(index)) {
      return fn(item);
    }
    return item;
  };
}

export function pass() {}
