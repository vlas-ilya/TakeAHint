export function throwIf(condition: boolean, throwMessage: string) {
  if (condition) {
    throw throwMessage;
  }
}
