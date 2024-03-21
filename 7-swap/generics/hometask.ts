// Написать функцию, которая меняет местами у объекта все пары ключ значение.
// При этом они там одного типа


function swapKeysAndValues<T extends Record<string | number, string | number>>(obj: T): Record<string | number, string | number> {
  const result: Record<string | number, string | number> = {};
  Object.entries(obj).forEach(([key, value]) => {
      result[value] = key;
  });
  return result;
}


// Example usage
const original = { a: "1", b: "2", c: "3" };
const swapped = swapKeysAndValues(original);
console.log(swapped);
