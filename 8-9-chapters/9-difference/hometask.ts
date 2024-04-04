// type ModifiedObj<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

function removeKeysFromObject<T extends object, K extends object>(sourceObj: T, keysObj: K): Omit<T, keyof K> {
  const keysToRemove = Object.keys(keysObj);
  const sourceObject = { ...sourceObj }

  // Итерируем по ключам и удаляем их из первого объекта, если они там есть
  keysToRemove.forEach(key => {
    if (key in sourceObject) {
      delete sourceObject[key];
    }
  });

  return sourceObject;
}

const user = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  username: 'johndoe'
};

const keysToRemove = {
  email: true,
  username: true
};

console.log(removeKeysFromObject(user, keysToRemove));
