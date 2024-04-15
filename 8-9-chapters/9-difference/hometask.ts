// type ModifiedObj<T, K> = Pick<T, Exclude<keyof T, keyof K>>;

function removeKeysFromObject<T extends Record<string, any>, K extends Record<string, any>>(sourceObj: T, keysObj: K): Omit<T, keyof K> {
  const keysToRemove = Object.keys(keysObj);
  const sourceObject = { ...sourceObj }

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
