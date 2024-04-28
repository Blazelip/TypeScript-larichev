interface IUserService {
  users: number,
  getUsers(): number,
}

class UserService2 implements IUserService {
  @Max(100)
  users: number = 1000;

  getUsers(): number {
    return this.users;
  }
}

function Max(max: number) {
  return (
    target: Object,
    propertyKey: string | symbol,
  ) => {
    let value: number;
    const setter = function (newValue: number) {
      if (newValue > max) {
        console.log('Значение слишком большое')
      } else {
        value = newValue;
      }
    }

    const getter = function () {
      return value;
    }

    Object.defineProperty(target, propertyKey, {
      set: setter,
      get: getter,
    })
  }
}