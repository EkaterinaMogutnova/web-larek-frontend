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

1. Компонент товара (Product)

```
Ответственность:
•	Отображение карточек товаров в каталоге
•	Визуализация ключевых характеристик: названия, цены, категории и изображения
Функционал:
•	Рендеринг карточки товара по переданным данным
•	Обработка кликов для открытия детализированного просмотра
•	Визуальное выделение категорий товаров
```

2. Компонент оформления заказа (Order)

```
Ответственность:
•	Реализация процесса оформления покупки
•	Взаимодействие с пользователем на финальном этапе
Функционал:
•	Валидация контактных данных (email, телефон)
•	Проверка обязательных полей (адрес доставки)
•	Выбор способа оплаты (онлайн/при получении)
•	Отправка собранных данных на сервер
•	Отображение статуса выполнения заказа
•	Показ подтверждения успешного оформления

```

Model: отвечает за хранение данных

```
•	Данные

o	Список товаров (название, категория, цена, изображение).
o	 Данные заказа (адрес, email, телефон, способ оплаты, итоговая сумма).
```

View: отвечает за отображение данных на странице

```
•	страница:
o	Рендер списка товаров.
```

Presenter: отвечает за связь представления и данных.

```
•	действия:
o	Обновление каталога.
o	Валидация форм.
o	Отправка заказа в API.

```

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

#### Класс AppData

Класс AppData отвечает за хранения массива товаров

Поля класса:

catalog: IProduct[] - Массив товаров каталога\

events: IEvents - экземпляр класса EventEmitter для инициализации событий при изменении данных

constructor(protected events: IEvents) {}

Методы класса:

    // Метод для сохранения массива товаров в Модели
    setProducts(items: IProduct[]): void

    // Получения массива товаров каталога
    getProducts(): IProduct[]

    // Поиск товара по id
    getProductById(id: string): IProduct

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

### Слой представления

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

#### Класс PaymentModal

Модальное окно для выбора способа оплаты и адреса доставки

PaymentModal расширяет класс Modal

Конструктор:

    constructor(container: HTMLElement, events: IEvents)

Поля класса:  
\_payment: string;  
\_address: string;  
\_buttons: HTMLButtonElement  
\_inputs: HTMLInputElement

Методы класса:

    //сеттер, который позволяет контролировать и изменять состояние валидности
    set valid(value: boolean)

    //сеттер, предназначен для хранения и обработки сообщений об ошибках
    set errors(value: string)

    //рендер
    render(data): HTMLElement

#### Класс ContactsModal

Модальное окно для ввода контактных данных пользователя.
ContactsModal расширяет класс Modal

Конструктор:

    constructor(container: HTMLElement, events: IEvents)

Поля класса:  
\_email: string;  
\_phone: string;  
\_buttons: HTMLButtonElement  
\_inputs: HTMLInputElement

Методы класса:

    //сеттер, который позволяет контролировать и изменять состояние валидности
    set valid(value: boolean)

    //сеттер, предназначен для хранения и обработки сообщений об ошибках
    set errors(value: string)

    //рендер
    render(data): HTMLElement

#### Класс SuccessModal

Модальное окно для отображения успешного выполнения операции.
SuccessModal расширяет класс Modal

Конструктор:

    constructor(container: HTMLElement, events: IEvents)

Поля класса:  
\_description: string;  
\_buttons: HTMLButtonElement

#### Класс Basket

Класс Basket extends Modal
Отвечает за отображение списка купленных товаров, общей суммы покупки и кнопки оформления покупки

Поля класса:

\_container: HTMLElement;\
\_list: HTMLElement;\
\_totalPrice: HTMLElement;\
\_checkoutButton: HTMLButtonElement;\
\_closeButton: HTMLButtonElement;\
\_counter: HTMLElement;

Конструктор:

    constructor(container: HTMLElement, model: AppData)

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
