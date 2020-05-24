import { v4 as uuid } from 'uuid';

export default class Association implements Comparable<Association> {
  public id: string = uuid();
  public value: string | undefined;
  public valid: boolean = true;
  public markedAsValid: boolean = true;

  constructor(value: string, valid: boolean = true) {
    this.value = value;
    this.valid = valid;
  }

  compare = (item: Association): boolean => {
    return this.value.trim().toLowerCase() === item.value.trim().toLowerCase();
  };
}
