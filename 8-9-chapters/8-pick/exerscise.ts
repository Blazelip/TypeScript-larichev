// Необходимо написать функцию группировки, которая принимает массив объектов и его ключ, производит группировку по указанному ключу и возращает сгруппированный объект.

// Пример:

const col = [
  { group: 1, name: 'a' },
  { group: 1, name: 'b' },
  { group: 2, name: 'c' },
];

// ```При группироке по 'group'

// ```ts
// {
// '1': [ { group: 1, name: 'a' }, { group: 1, name: 'b' } ],
// '2': [ { group: 2, name: 'c' } ]
// }

interface IGroup<T> {
  [key: string]: T[];
}

type key = string | number | symbol;

function group<T extends Record<key, any>>(col: T[], key: keyof T): IGroup<T> {
  return col.reduce<IGroup<T>>((result: IGroup<T>, item) => {
    // Получаем значение ключа для текущего элемента
    const itemKey = item[key];
    // Добавляем элемент в группу в результате
    if (!result[itemKey]) {
      result[itemKey] = [];
    }
    result[itemKey].push(item);
    return result;
  }, {}); // Инициализируем результат как объект с ключами типа T[K] и значениями типа массивов T
}

interface IForm {
  name: string,
  password: string,
}

const data: IForm = {
  name: 'Vasya',
  password: 'qwerty'
};

const formValidation = {
  name: {
    isValid: true,
  },
  password: {
    isValid: false,
    errorMessage: 'Has to be longer that 5 symbols'
  }
}

type IFormValidation<T> = {
  [ key in keyof T]: {
    isValid: boolean,
  } | {
    isValid: boolean,
    errorMessage: string,
  }
} 