interface INumberService {
  number: number,
}

class NumberService implements INumberService {
  @AllowFunc((a: number) => a > 0)
  number: number = 1000;
}

function AllowFunc(func: (val: any) => boolean ) {
  return (
    target: Object,
    propertyKey: string | symbol,
  ) => {
    let value: number;
    const setter = function (newValue: number) {
      if (func(newValue)) {
        value = newValue;
      } else {
        throw new Error(`The transfered ${newValue} isn't complied with requirements`)
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

// Цель задания: Разработать декоратор allowFunc для свойств класса, который будет контролировать присваивание значений свойствам на основе предоставленной функции.

// Основные моменты:

// Что делает декоратор allowFunc?
// Декоратор принимает функцию, которая возвращает true или false. Эта функция определяет, можно ли присвоить новое значение свойству класса.
// Пример: Если функция проверяет, что значение больше нуля, то только такие значения могут быть присвоены свойству.