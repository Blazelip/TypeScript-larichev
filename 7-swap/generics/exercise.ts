function toString<T>(value: T): string | undefined {
  if (Array.isArray(value)) {
    return value.toString();
  }

  switch (typeof value) {
    case 'string':
      return value;
    case 'number':
    case 'symbol':
    case 'bigint':
    case 'boolean':
    case 'function':
      return value.toString();
    case 'object':
      return JSON.stringify(value);
    default:
      return undefined;
  }
}

interface Item {
  id: number,
}

function sorting<T extends Item>(col: T[], asc: boolean = true): T[] {
  return col.sort((a, b) => asc ? a.id - b.id : b.id - a.id);
}


type SomeType<T, V> = {
  id: T,
  number: V,
}