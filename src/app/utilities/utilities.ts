export class Utilities {
  public static IsNullOrEmptyStr(value: string): boolean {
    return value === null || value === undefined || value.trim() === '';
  }
}
