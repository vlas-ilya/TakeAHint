export default class Association implements Comparable<Association> {
  public value: string | undefined;
  public valid: boolean | undefined;

  constructor(value: string, valid: boolean = true) {
    this.value = value;
    this.valid = valid;
  }

  compare = (item: Association): boolean => {
    return this.value === item.value;
  };
}
