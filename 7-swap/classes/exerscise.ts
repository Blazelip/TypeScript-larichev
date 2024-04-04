class User {
  constructor(
    public skills: string[] = [],
  ) {}

  addSkill(skill: string): void;
  addSkill(skill: string[]): void;
  addSkill(skill: string | string[]): void {
    if (typeof skill === 'string') {
      this.skills.push(skill);
    } else {
      this.skills = this.skills.concat(skill);
    }
  }
}


// Необходимо сделать корзину (Cart) на сайте,

// которая имееет список продуктов (Product), добавленных в корзину

// и переметры доставки (Delivery). Для Cart реализовать методы:

// Добавить продукт в корзину
// Удалить продукт из корзины по ID
// Посчитать стоимость товаров в корзине
// Задать доставку
// Checkout - вернуть что всё ок, если есть продукты и параметры доставки
// Product: id, название и цена

// Delivery: может быть как до дома (дата и адрес) или до пункта выдачи (дата = Сегодня и Id магазина)

class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
  ) {}
}

class Delivery {
  constructor(
    public data: Date,
  ) {}
}

class HomeDelivery extends Delivery {
  constructor(date: Date, public address: Date) {
    super(date);
  }
}

class ShopDelivery extends Delivery {
  constructor(public storeId: number) {
    super(new Date());
  }
}

type DeliveryChoice = HomeDelivery | ShopDelivery;

class Cart {
  constructor(
    private _products: Product[] = [],
    private _delivery?: DeliveryChoice,
  ) {}

  addProduct(item: Product): void {
    this._products.push(item);
  }

  removeProductByID(id: number): void {
    this._products = this._products.filter((item) => item.id != id);
  }

  countOrderPrice(): number {
    return this._products.reduce((sum, item) => sum + item.price, 0)
  }

  chooseDelivery(delivery: DeliveryChoice): void {
    this._delivery = delivery;
  }

  checkOut() {
    if (this._products.length === 0) {
      throw Error('Cart has no products');
    }

    if (!this._delivery) {
      throw Error('Cart has no chosen delivery option');
    }
    return { status: 'success' };
  }
}

const cart = new Cart();

cart.addProduct({ id: 1, title: 'Cookie1', price: 100 });
cart.addProduct({ id: 2, title: 'Cookie2', price: 200 });
cart.addProduct({ id: 3, title: 'Cookie3', price: 300 });

cart.countOrderPrice();
console.log("🚀 ~ cart.countOrderPrice();:", cart.countOrderPrice());
cart.checkOut();
cart.chooseDelivery(new ShopDelivery(5));
console.log(cart.checkOut());

// Необходимо реализовать абстрактный класс Logger с 2-мя методами абстрактным - log(message): void и printDate - выводящий в log дату.
// К нему необходимо сделать реальный класс, который бы имел метод: logWithDate,выводящий сначала дату, а потом заданное сообщение

abstract class Logger {
  abstract log(message: string): void;

  printDate() {
    this.log(new Date().toString());
  }
}

class RealLogger extends Logger {
  log(message: string): void {
    console.log(message);
  }

  logWithDate(message: string) {
    this.printDate();
    this.log(message);
  }
}
