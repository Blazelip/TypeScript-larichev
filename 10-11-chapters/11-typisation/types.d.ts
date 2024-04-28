declare module 'sort-by' {
  type Key = string;
  type MapFunction = (key: string, value: any) => any;
  type Comparator<T> = (obj1: T, obj2: T) => number;

  export default function sortBy<T>(...args: Array<Key | MapFunction>): Comparator<T>;
}