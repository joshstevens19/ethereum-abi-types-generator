export default class Helpers {
  public static capitalize(str: string): string {
    if (str == null) {
      return str;
    }

    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }
}
