interface IUserService {
  users: number,
  getUsers(): number,
}

function Catch(rethrow = false) {
  return (
    target: Object,
    _: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
  ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
    const originalMethod = descriptor.value;
    descriptor.value = async (...args: any[]) => {
      try {
        return await originalMethod?.apply(target, args);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);

          if (rethrow) {
            throw error;
          }
        }
      }
    }
  }
}

class UserService1 implements IUserService {
  users: number = 1000;

  @Catch(true)
  getUsers(): number {
    return this.users;
  }
}



