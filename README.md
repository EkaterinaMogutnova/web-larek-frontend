# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

##Данные и типы данных используемых в приложении

Карточка товара

```
export interface IProduct {
id: string;
description: string;
image: string;
title: string;
category: string;
price: number | null;
}
```

Форма заказа

```
export interface IOrderForm {
payment: string;
address: string;
phone: string;
email: string;
}
```
interface IBasketItem {
    id: string;
    title: string;
    price: number;
    count: number;
}

Данные корзины

```
export type TBasketModal = Pick<IProduct, 'title' | 'price'>;
```

Данные выбора метода оплаты

```
export type TPaymentModal = Pick<IOrderForm, 'payment' | 'address'>;
```

Контактные данные пользователя

```
export type TContactsModal = Pick<IOrderForm, 'email' | 'phone'>;
```

```
Архитектура приложения

Используемые подходы:

- Событийно-ориентированная архитектура

- Паттерн MVP (Model-View-Presenter)
```


Опишите сами классы.

Классы слоя Модели:

Класс такой-то. Отвечает за то-то и то-то.
Поля класса

catalog: IProduct[] - Массив товаров каталога
....

Методы класса:

setProducts(items: IProduct[]): void - Метод для сохранения массива товаров в Модели
getProducts(): IProduct[] - Получения массива товаров каталога
...

И вот так все поля и методы с типами данных.

Классы слоя Представления:

Класс Basket отвечает за отображение списка купленных товаров, общей суммы покупки и кнопки оформления покупки

Поля:
....

Методы: 
....

И т.д.

## Базовый код

### Класс Api

Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Методы:

- 'get' - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер

- 'post' - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется POST запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

### Класс EventEmitter

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.

Основные методы, реализуемые классом описаны интерфейсом IEvents:

- 'on' - подписка на событие

- 'emit' - инициализация события

- 'trigger' - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

### Слой данных

#### Класс ProductData

Класс ProductData отвечает за хранения массива товаров

Поля класса:

catalog: IProduct[] - Массив товаров каталога\

events: IEvents - экземпляр класса EventEmitter для инициализации событий при изменении данных

preview: IProduct -  поле в котором будет сохраняться карточка

constructor(protected events: IEvents) {}

Методы класса:

    // Метод для сохранения массива товаров в Модели
    setProducts(items: IProduct[]): void

    // Получения массива товаров каталога
    getProducts(): IProduct[]

        //Просмотр товара
    setPreview(value: IProduct) {}

...

#### Класс Order

Класс Order отвечает за хранение данных заказа

Поля класса:

order: IOrderForm - хранения данных о заказе\
events: IEvents - экземпляр класса EventEmitter для инициализации событий при изменении данных

constructor(protected events: IEvents) {}

Методы класса:

    // Метод для сохранения данных о заказе
    setOrderField(field: keyof IOrderForm, value: string): void

    // Получение данных заказа
    getOrder(): IOrderForm

    // Метод очистки формы
    clearOrder(): void

    // Валидация формы
    checkValidation(field: keyof IOrderForm, value: string): boolean

#### Класс BasketData  

class BasketData 
   _items: IBasketItem[] = [];
    events: IEvents;
    order: IOrder 
    formErrors



    constructor(events: IEvents) {}

Методы класса:
    // Добавить товар в корзину
     add(product: IProduct): void  

    // Удалить товар 
    deleteProduct(product: IProduct): void 

    // Получить список товаров
     get items(): IBasketItem[] {}  

    // Получить общую стоимость
    get total(): number {}  

    // Получить общее количество товаров  
    get totalItems(): number {}

    

### Слой представления
<!-- 
Получается, что у тебя будут классы:
Товар (тут или один обрабатывающий 3 темплейта или три разных, но у них общий родитель)
Модалка
Форма подтверждения покупки
2 класса форм с данными покупателя (у них общий класс родитель Form)
Корзина 
Страница -->

#### Базовый Класс Component

Класс является дженериком и родителем всех компонентов слоя представления. В дженерик принимает тип объекта, в котором данные будут передаваться в метод render для отображения данных в компоненте. В конструктор принимает элемент разметки, являющийся основным родительским контейнером компонента. Содержит метод render, отвечающий за сохранение полученных в параметре данных в полях компонентов через их сеттеры, возвращает обновленный контейнер компонента.
Методы:
- `toggleClass` - удаление/добавления класса DOM-элементу
- `setText` - установить текстовое содержимое
- `setDisabled` - включение/отключение кнопки
- `setHidden` - устанавливает DOM-элементу CSS-свойство display в значение 'none'
- `setVisible` - удаляет CSS-свойство display у элемента
- `setImage` - устанавливает элементу Image значения атрибута src и alt
- `render` - отрисовка DOM-элементов 

#### Класс Modal

Реализует модальное окно. Предоставляет методы открытия и закрытия модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по ESC, на клик в overlay и кнопку крестик.

Конструктор:

    constructor(container: HTMLElement, protected events: IEvents)

Принимает селектор по которому в разметке будет идентифицировано модальное окно и экземпляр класса EventEmitter для возможности инициации событий.

Поля класса:  
\_closeButton: HTMLButtonElement;  
\_content: HTMLElement;

Методы класса:

    // Установить данные
    set content(value: HTMLElement)
    // Открыть модальное окно
    open(): void {}
    // Закрыть модальное окно
    close(): void {}
    // рендер
    render(data): HTMLElement

### Класс Form

// родитель для форм 
 class Form 
 Поля класса:

	_buttons: HTMLButtonElement;
	_inputs: HTMLInputElement[];	
	_errors: HTMLElement;


Методы класса:

    // Устанавливает состояние валидности формы  
	set valid(value: boolean);  

    // Устанавливает текст ошибок формы  
	set errors(value: string);  

    // Рендерит форму  
	render(): HTMLElement;



#### Класс PaymentForm

Модальное окно для выбора способа оплаты и адреса доставки

PaymentForm extends Form

Конструктор:

    constructor(container: HTMLElement, events: IEvents)

Поля класса:  
\_payment: HTMLButtonElemen;  
\_address: HTMLInputElement;  


Методы класса:

    //рендер
    render(data): HTMLElement

#### Класс ContactsForm

Модальное окно для ввода контактных данных пользователя.
ContactsForm extends Form

Конструктор:

    constructor(container: HTMLElement, events: IEvents)

Поля класса:  
\_email: HTMLElementg;  
\_phone: HTMLElement;  


Методы класса:
   
    //рендер
    render(data): HTMLElement

#### Класс SuccessForm

Модальное окно для отображения успешного выполнения операции.
SuccessForm расширяет класс Modal

Конструктор:

    constructor(container: HTMLElement, events: IEvents)

Поля класса:  
\_description: HTMLElement;  
\_buttons: HTMLButtonElement

#### Класс Basket

Класс Basket 
Отвечает за отображение списка купленных товаров, общей суммы покупки и кнопки оформления покупки

Поля класса:

\_container: HTMLElement;\
\_list: HTMLElement;\
\_totalPrice: HTMLElement;\
\_checkoutButton: HTMLButtonElement;\
\_closeButton: HTMLButtonElement;\
\_counter: HTMLElement;

Конструктор:

    constructor(container: HTMLElement,  events: IEvents)

Методы класса:

    // Основной метод рендеринга
    render(): void {}

    // Рендер списка товаров
    renderList(): void {}

    // Рендер общей суммы
    renderTotal(): void {}

    // Рендер счетчика товаров
    renderCounter(): void {}

    // Обработка оформления заказа
    handleCheckout(): void {}

#### Класс Page

Отвечает за отображение данных страницы: каталог, корзина

Конструктор:

    constructor(container: HTMLElement, events: IEvents)

Поля класса:

\_counter: HTMLElement;  
\_catalog: HTMLElement;  
\_wrapper: HTMLElement;  
\_basket: HTMLElement;

Методы класса:

    // Устанавливает значение счетчика товаров в корзине
    set counter(value: number)

    // Обновляет содержимое каталога
    set catalog(items: HTMLElement[])

    // Управляет состоянием блокировки страницы
    set locked(value: boolean)

#### Класс Card

Поля класса:

\_title: HTMLElement;  
\_category: HTMLElement;  
\_image: HTMLImageElement;  
\_price: HTMLElement;

Конструктор:

    constructor(container: HTMLElement, events: IEvents)

Методы:

    // Устанавливает название товара
    set title(value: string)
    // Устанавливает категорию товара
    set category(value: string)
    // Устанавливает изображение товара
    set image(value: string)
    // Устанавливает цену товара
    set price(value: string)

### Презентер

Сайт одностраничный достаточно одного презентера. Его код будет размещен в основном скрипте приложения index.ts, отдельный класс для него создаваться не будет.

Основные обязанности презентера:

- Связывает модель и представление

- Обрабатывает пользовательские действия

- Управляет потоком данных

- Координирует работу компонентов

Список событий возникающих при взаимодействии с интерфейсом:

- 'catalog:changed' - Изменение списка товаров в каталоге (например, после загрузки с сервера)

- 'product:select' - Пользователь выбрал конкретный товар для просмотра

- 'product:addToBasket' - Товар добавлен в корзину (содержит данные товара)

- 'product:removeFromBasket' - Товар удален из корзины

- 'product:preview' - Открытие предпросмотра товара

- 'basket:open' - Открытие модального окна корзины

- 'basket:close' - Закрытие модального окна корзины

- 'basket:changed' - Изменение состава корзины

- 'basket:checkout' - Нажатие кнопки "Оформить" в корзине

- 'order:paymentChange' - Изменение способа оплаты в форме заказа

- 'order:addressChange' - Изменение адреса доставки в форме заказа

- 'order:contactsChange' - Изменение контактных данных (email/телефон)

- 'order:submit' - Отправка данных заказа на сервер

- 'order:success' - Успешное оформление заказа

- 'order:error' - Ошибка при оформлении заказа (содержит описание ошибки)

- 'modal:open' - Открытие любого модального окна

- 'modal:close' - Закрытие любого модального окна

- 'payment:submit' - Отправка данных оплаты

- 'formErrors:change' - Изменение ошибок валидации форм
