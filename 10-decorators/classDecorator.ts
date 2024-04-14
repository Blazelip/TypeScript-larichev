interface IUserService {
  users: number,
  getUsers(): number,
}

@CreatedAt
class UserService implements IUserService {
  users: number = 1000;

  getUsers(): number {
    return this.users;
  }
}

function CreatedAt<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt: Date = new Date();
  }
}

type CreatedAt = {
  createdAt: Date;
}

console.log((new UserService() as IUserService & CreatedAt));

// Срабатывает до инициализации декорируемого класса, так как тут код выполняется
// на этапе инициализации декоратора
function nullUsers(target: Function) {
  target.prototype.users = 0;
}

// Срабатывает после инициализации декорируемого класса
// Так как код отрабатывает уже после инициализации декоратора
function nullUserAdvanced<T extends { new (...args: any[]): {} }>(con: T) {
  return class extends con {
    users = 3;
  }
}

function setUsers(number: number) {
  return (target: Function) => {
    target.prototype.users = 0;
  }
}

function setUserAdvanced(users: number) {
  return <T extends { new (...args: any[]): {} }>(con: T) => {
    return class extends con {
      users = users;
    }
  }
}

