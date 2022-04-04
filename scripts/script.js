class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable() {
        if (this.available === true) {
            this.available = false;
        } else {
            this.available = true;
        }
    }
}


class GoodsList {
    #goods
    constructor(goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {
        return this.#goods
    }

    get listFiltered() {
        const regexp = new RegExp(`${this.filter}`, 'i')
        let newGoods = this.#goods.filter(product => regexp.test(product.name) && product.available)
        newGoods.sort((a, b) => {
            if (this.sortPrice && this.sortDir) {
                return a.price - b.price;
            } else if (this.sortPrice && !this.sortDir) {
                return b.price - a.price;
            }
        })
        return newGoods
    }

    add (newProduct) {
        if (newProduct instanceof Good) {
            this.#goods.push(newProduct);
        } else {console.log('Сюда нельзя добавлять что попало!')}
    }

    remove (id) {
        for (let i = 0; i < this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                delete this.#goods[i];
                return console.log(`Товар с id №${id} успешно удален из каталога.`)
            }
        }
        return console.log(`Товара с id №${id} в каталоге нет.`)
    }
}   


class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}


class Basket {
    constructor(goods) {
        this.goods = goods;
    }

    add (good, amount) {
        if (good.available) {
            if (this.goods.includes(good)) {
                this.goods.forEach(element => {
                    if (element.id === good.id) {
                        element.amount = element.amount + amount;
                    }
                });  
            } else {
                this.goods.push(good);
            }
        }
        return this.goods
    }

    get totalAmount() {
        const allPrices = []
        this.goods.forEach(element => {
            allPrices.push(element.price * element.amount)
        });
        var res = allPrices.reduce((sum, current) => (sum + current));
        return `Товаров в корзине на сумму ${res} у.е.`
    }

    get totalSum() {
        var commonAmount = 0
        this.goods.forEach(element => {
            commonAmount = commonAmount + element.amount
        });
        return `Всего товаров в корзине ${commonAmount} шт.`
    }

    remove (good, amount) {
        if (this.goods.includes(good)) {
            this.goods.forEach(element => {
                if (element.id === good.id) {
                    element.amount = element.amount - amount;
                    if (element.amount === 0) {
                        delete this.goods[this.goods.indexOf(element)]
                    }
                }
            });  
        } 
        return this.goods
    }

    clear () {
        this.goods.forEach(element => {
            delete this.goods[this.goods.indexOf(element)]
        });
        return this.goods
    }

    removeUnavailable() {
        let unavailableList = this.goods.filter(good => good.available === false)
        this.goods.forEach(element => {
            unavailableList.forEach(el => {
                if (element.id === el.id) {
                    delete this.goods[this.goods.indexOf(element)]
                }
            }) 
        });
        return this.goods
    }
}


const goods = [
    {
        id: 1,
        name: 'Шапка',
        description: 'Some description',
        sizes: [1, 2, 3],
        price: 120,
        available: true,
    },
    {
        id: 2,
        name: 'Шорты',
        description: 'Some description',
        sizes: [1, 2, 3],
        price: 140,
        available: false,
    },
    {
        id: 3,
        name: 'Штыны',
        description: 'Some description',
        sizes: [1, 2, 3],
        price: 200,
        available: false,
    },
    {
        id: 4,
        name: 'Футболка',
        description: 'Some description',
        sizes: [1, 2, 3],
        price: 150,
        available: true,
    },
    {
        id: 5,
        name: 'Куртка',
        description: 'Some description',
        sizes: [1, 2, 3],
        price: 700,
        available: true,
    },
    {
        id: 6,
        name: 'Куртка',
        description: 'Some description',
        sizes: [1, 2, 3],
        price: 400,
        available: true,
    },
]


//Создаем экземпляры класса Good (товар)

// const products = []
// for (let i = 0; i < goods.length; i++) {
//     const product = new Good(goods[i].id, goods[i].name, goods[i].description, goods[i].sizes, goods[i].price, goods[i].available)
//     products.push(product)
// }


//Меняем признак доступности для продажи

// products[1].setAvailable()
// console.log(products)


//Создаем экземпляр класса GoodsList (список товаров), одновременно с этим используя фильтрацию товаров с доступными для нее свойствами (3 и 4 аргументы)

// const goodsList = new GoodsList(products, 'Куртка', true, false)
// console.log(goodsList.listFiltered)


//Добавляем новый товар в созданный выше список

// const newProduct = new Good(8, 'Носки', 'Some description', [1, 2, 3], 25, true)
// const notProduct = 6
// goodsList.add(notProduct)
// console.log(goodsList.list)


//Удаляем товар из списка

// goodsList.remove(1)
// console.log(goodsList.list)


//Создаем экземпляры класса BasketGood (товар в корзине) и экземпляр класса Basket (корзина)

// const basketGood1 = new BasketGood(products[0].id, products[0].name, products[0].description, products[0].sizes, products[0].price, products[0].available, 10)
// const basketGood2 = new BasketGood(products[5].id, products[5].name, products[5].description, products[5].sizes, products[5].price, products[5].available, 4)
// const basket = new Basket([])


//Добавляем товары в корзину

// basket.add(basketGood1, 10)
// basket.add(basketGood2, 4)
// basket.add(basketGood2, 10)


//Удаляем товары из корзины

// basket.remove(basketGood2, 10)
// console.log(basket)
// basket.remove(basketGood2, 14)
// console.log(basket)


//Очищаем корзину

// basket.clear()
// console.log(basket)


//Удаляем товары из корзины по признаку их доступности

// basket.removeUnavailable()
// console.log(basket)


//Считаем общее количество товаров и их общую сумму

// console.log(basket.totalAmount)
// console.log(basket.totalSum)
