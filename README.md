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

# Архитектура проекта Web Larek Frontend

## 1. Описание типов данных

### 1.1 Интерфейс товара (IProduct):

- `id: string` - уникальный идентификатор товара
- `title: string` - название товара
- `price: number` - цена товара
- `description: string` - описание товара
- `image: string` - URL изображения товара
- `category: string` - категория товара
- `selected: boolean` - добавлен ли товар в корзину

### 1.2 Интерфейс формы заказа (IOrderForm):

- `payment: string` - способ оплаты
- `address: string` - адрес доставки
- `phone: string` - телефон покупателя
- `email: string` - email покупателя

### 1.3 Интерфейс элемента корзины (IBasketItem):

- `id: string` - идентификатор товара
- `title: string` - название товара
- `price: number` - цена товара
- `count: number` - количество товара в корзине

### 1.4 Интерфейс состояния приложения (IAppData):

- `catalog: IProduct[]` - список товаров в каталоге
- `basket: IProduct[]` - список товаров в корзине
- `order: IOrder` - данные заказа
- `formErrors: FormErrors` - ошибки форм
- `getTotalBasketPrice(): number` - получить общую стоимость корзины
- `addToBasket(value: IProduct[]): void` - добавить товар в корзину
- `deleteFromBasket(id: string): void` - удалить товар из корзины
- `getBasketAmount(): number` - получить количество товаров в корзине
- `setProducts(items: IProduct[]): void` - установить список товаров
- `setOrderField(field: keyof IOrderForm, value: string): void` - установить значение поля заказа
- `validateContacts(): void` - валидация контактных данных
- `validateOrder(): void` - валидация данных заказа
- `clearOrderData(): void` - очистка данных заказа

## 2. Описание классов

### 2.1 Модели данных

#### class AppData:

- **Назначение:** основная модель данных приложения, управляет каталогом товаров, корзиной и заказом
- **Поля:**
  - `catalog: IProduct[]` - каталог товаров
  - `basket: IProduct[]` - товары в корзине
  - `order: IOrderForm` - данные заказа (способ оплаты, адрес, телефон, email)
  - `formErrors: FormErrors` - ошибки валидации форм
- **Методы:**
  - `setProducts(items: IProduct[]): void` - устанавливает каталог товаров и отправляет событие 'items:changed'
  - `addToBasket(value: IProduct): void` - добавить товар в корзину
  - `deleteFromBasket(id: string): void` - удалить товар из корзины по ID
  - `clearBasket(): void` - очистить корзину (приватный метод)
  - `getTotalBasketPrice(): number` - получить общую стоимость товаров в корзине
  - `getBasketAmount(): number` - получить количество товаров в корзине
  - `setOrderField(field: keyof IOrderForm, value: string): void` - установить значение поля заказа и выполнить валидацию
  - `validateContacts(): void` - валидация контактных данных (email, phone)
  - `validateOrder(): void` - валидация данных заказа (address, payment)
  - `clearOrder(): void` - очистить данные заказа (приватный метод)
  - `resetSelected(): void` - сбросить выбранные товары в каталоге (приватный метод)
  - `clearOrderData(): void` - полная очистка данных заказа (корзина, заказ, сброс выбора)

#### class Api:

- **Назначение:** HTTP клиент для взаимодействия с внешним сервером
- **Поля:**
  - `baseUrl: string` - базовый URL сервера
  - `options: RequestInit` - настройки запросов
- **Методы:**
  - `get(uri: string): Promise<object>` - выполняет GET запрос
  - `post(uri: string, data: object, method?: ApiPostMethods): Promise<object>` - выполняет POST/PUT/DELETE запрос

### 2.2 Представления (Views):

#### class Card:

- **Назначение:** отображает товар в каталоге
- **Поля:**

  - `_title: HTMLElement` - элемент для отображения названия
  - `_category: HTMLElement` - элемент для отображения категории
  - `_image: HTMLImageElement` - элемент изображения товара
  - `_price: HTMLElement` - элемент для отображения цены
  - `_button: HTMLButtonElement` - кнопка действия
  - `_categoryColor: Record<string, string>` - реализация цвета

- **Свойства:**
  - `get/set id(value: string)` - идентификатор товара
  - `get/set title(value: string)` - название товара
  - `set price(value: number | null)` - цена товара
  - `set category(value: string)` - категория товара
  - `set image(value: string)` - изображение товара
  - `set selected(value: boolean)` - статус добавления в корзину

#### class CardPreview:

- **Назначение:** отображает детальную информацию о товаре в модальном окне
- **Поля:**
  - `_description: HTMLElement` - элемент для отображения описания
- **Свойства:**
  - `set description(value: string)` - описание товара

#### class Basket:

- **Назначение:** отображает корзину товаров
- **Поля:**
  - `_list: HTMLElement` - контейнер для списка товаров
  - `_price: HTMLElement` - элемент для отображения общей стоимости
  - `_button: HTMLButtonElement` - кнопка оформления заказа
- **Свойства:**
  - `set items(items: HTMLElement[])` - устанавливает список товаров
  - `set total(total: number)` - устанавливает общую стоимость
- **Методы:**
  - `setDisabledButton(value: boolean): void` - блокирует/разблокирует кнопку

#### class BasketItem:

- **Назначение:** отображает элемент товара в корзине
- **Поля:**
  - `_index: HTMLElement` - элемент для отображения порядкового номера
  - `_title: HTMLElement` - элемент для отображения названия
  - `_price: HTMLElement` - элемент для отображения цены
  - `_button: HTMLButtonElement` - кнопка удаления товара
- **Свойства:**
  - `set title(value: string)` - устанавливает название товара
  - `set index(value: number)` - устанавливает порядковый номер
  - `set price(value: number)` - устанавливает цену товара

#### class Order:

- **Назначение:** отображает форму заказа (способ оплаты и адрес)
- **Поля:**
  - `_card: HTMLButtonElement` - кнопка выбора оплаты картой
  - `_cash: HTMLButtonElement` - кнопка выбора оплаты наличными
- **Методы:**
  - `disableButtons(): void` - деактивирует обе кнопки выбора способа оплаты (убирает активный стиль)

#### class Contact:

- **Назначение:** форма для ввода контактных данных пользователя (телефон и email)
- **Наследование:** наследует от `Form<IContacts>`
- **Интерфейс данных:** `IContacts` - содержит поля:
  - `phone: string` - номер телефона
  - `email: string` - электронная почта

#### class Modal:

- **Назначение:** базовый функционал для модального окна
- **Поля:**
  - `_closeButton: HTMLButtonElement` - кнопка закрытия
  - `_content: HTMLElement` - контейнер для содержимого
- **Свойства:**
  - `set content(value: HTMLElement)` - устанавливает содержимое модального окна
- **Методы:**
  - `render(data: IModalData): HTMLElement` - отображает модальное окно
  - `open(): void` - открывает модальное окно
  - `close(): void` - закрывает модальное окно

#### class Page:

- **Назначение:** главная страница приложения
- **Поля:**
  - `_gallery: HTMLElement` - контейнер для каталога товаров
  - `_wrapper: HTMLElement` - основной контейнер страницы
  - `_counter: HTMLElement` - счетчик товаров в корзине
  - `_basket: HTMLElement` - ссылка на корзину
- **Свойства:**
  - `set counter(value: number)` - устанавливает значение счетчика
  - `set galery(items: HTMLElement[])` - обновляет содержимое каталога
  - `set locked(value: boolean)` - блокирует/разблокирует страницу

#### class Success:

- **Назначение:** отображает сообщение об успешном заказе
- **Поля:**
  - `_button: HTMLButtonElement` - кнопка закрытия
  - `_description: HTMLElement` - элемент для отображения описания
- **Свойства:**
  - `set total(value: number)` - устанавливает общую сумму заказа

### 2.3 Базовые классы (Base Classes):

#### class Component:

- **Назначение:** базовый класс для всех UI компонентов
- **Поля:**
  - `container: HTMLElement` - DOM контейнер компонента
- **Методы:**
  - `render(data?: Partial<T>): HTMLElement` - основной метод рендеринга
  - `setText(element: HTMLElement, value: unknown): void` - установить текстовое содержимое
  - `setImage(element: HTMLImageElement, src: string, alt?: string): void` - установить изображение
  - `toggleClass(element: HTMLElement, className: string, force?: boolean): void` - переключить CSS класс
  - `setDisabled(element: HTMLElement, state: boolean): void` - блокировать/разблокировать элемент
  - `setHidden(element: HTMLElement): void` - скрыть элемент
  - `setVisible(element: HTMLElement): void` - показать элемент
- `protected setImage(element: HTMLImageElement, src: string, alt?: string): void`
  - Устанавливает изображение с источником и альтернативным текстом

#### class Model:

- **Назначение:** базовый класс для всех моделей данных
- **Поля:**
  - `events: IEvents` - экземпляр системы событий
- **Методы:**
  - `emitChanges(event: string, payload?: object): void` - уведомление об изменениях

#### class EventEmitter:

- **Назначение:** реализует паттерн наблюдатель для работы с событиями
- **Поля:**
  - `_events: Map<EventName, Set<Subscriber>>` - карта событий и их обработчиков
- **Методы:**
  - `on<T extends object>(eventName: EventName, callback: (event: T) => void): void` - подписаться на событие
  - `emit<T extends object>(eventName: string, data?: T): void` - вызвать событие
  - `off(eventName: EventName, callback: Subscriber): void` - отписаться от события
  - `onAll(callback: (event: EmitterEvent) => void): void` - слушать все события
  - `offAll(): void` - сбросить все обработчики
  - `trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void` - создать триггер события

### 2.4 Классы для работы с API (API Classes):

#### class Api:

- **Назначение:** выполняет HTTP запросы к API
- **Методы:**
  - `get(uri: string): Promise<any>` - получает список товаров
  - `post(uri: string, data: object): Promise<any>` - отправляет заказ на сервер

### 2.5 Презентер (Presenter):

Сайт одностраничный достаточно одного презентера. Его код будет размещен в основном скрипте приложения index.ts, отдельный класс для него создаваться не будет.

Основные обязанности презентера:

- Связывает модель и представление

- Обрабатывает пользовательские действия

- Управляет потоком данных

- Координирует работу компонентов

#### Основная логика (index.ts):

- **Основные обработчики событий:**
  - `'items:changed'` - обновление каталога товаров
  - `'card:select'` - выбор товара
  - `'card:toBasket'` - добавление в корзину
  - `'card:deleteFromBasket'` - удаление из корзины
  - `'basket:open'` - открытие корзины
  - `'basket:delete'` - удаление из корзины
  - `'order:open'` - открытие формы заказа
  - `'order:submit'` - отправка данных оплаты
  - `'contacts:submit'` - отправка контактных данных
  - `'orderInput:change'` - изменение поля формы заказа
  - `'orderFormErrors:change'` - изменение ошибок валидации формы заказа
  - `'contactsFormErrors:change'` - изменение ошибок валидации формы контактов
  - `'order:submit'` - отправка формы заказа (переход к контактам)
  - `'contacts:submit'` - отправка формы контактов (оформление заказа)
  - `'success:open'` - открытие окна успешного завершения заказа
  - `'modal:open'` - открытие модального окна
  - `'modal:close'` - закрытие модального окна
  - `'basket:change'` - изменение корзины

## 3. Процессы (событийно-ориентированный подход):

### 3.1 Пример взаимодействия:

#### 3.1 Пример взаимодействия:

#### 1. Пользователь кликает на товар в каталоге:

- `Card` генерирует событие `'card:select'`
- Обработчик открывает `CardPreview` с деталями товара

#### 2. Пользователь нажимает кнопку "Добавить в корзину" в модальном окне товара:

- `CardPreview` генерирует событие `'card:toBasket'`
- Обработчик добавляет товар в корзину и обновляет счетчик

#### 3. Пользователь открывает корзину и нажимает "Оформить заказ":

- `Basket` генерирует событие `'order:open'`
- Обработчик открывает форму заказа (`Order`)

#### 4. Пользователь заполняет данные оплаты и адрес, нажимает "Далее":

- `Order` валидирует данные и генерирует событие `'order:submit'`
- Обработчик открывает форму контактов (`Contacts`)

#### 5. Пользователь заполняет контакты и нажимает "Оплатить":

- `Contacts` генерирует событие `'contacts:submit'`
- Обработчик отправляет заказ на сервер и при успехе генерирует `'success:open'`

#### 6. Пользователь видит подтверждение заказа:

- Обработчик показывает модальное окно успеха (`Success`)
- Данные заказа очищаются, корзина опустошается

### 3.2 События, которые используются:

- `'items:changed'`: изменение каталога товаров
- `'card:select'`: выбор товара
- `'card:toBasket'`: добавление в корзину
- `'card:deleteFromBasket'`: удаление из корзины
- `'basket:open'`: открытие корзины
- `'basket:delete'`: удаление из корзины
- `'order:open'`: открытие формы заказа
- `'orderInput:change'`: изменение поля формы заказа
- `'orderFormErrors:change'`: изменение ошибок валидации формы заказа
- `'order:submit'`: отправка формы заказа (переход к контактам)
- `'contactsFormErrors:change'`: изменение ошибок валидации формы контактов
- `'contacts:submit'`: отправка формы контактов (оформление заказа)
- `'success:open'`: открытие окна успешного завершения заказа
- `'modal:open'`: открытие модального окна
- `'modal:close'`: закрытие модального окна
- `'basket:change'` - изменение корзины

## 5. Архитектурные принципы:

- **MVP (Model-View-Presenter)** - разделение ответственности между слоями
- **ООП** - наследование, инкапсуляция, полиморфизм, абстракция
