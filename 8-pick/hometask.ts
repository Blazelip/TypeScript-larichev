type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
}

function pickObjectKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): MyPick<T, K> {
  return keys.reduce((result, key) => { // Не совсем понятно, как тут исправить ошибку, не видел в курсе.
    if (key in obj) {
      result[key] = obj[key]; // И тут не понятно, в чем ошибка
    }
    return result;
  }, {});
}