// Класс ProductData отвечает за хранения массива товаров

// Поля класса:

// catalog: IProduct[] - Массив товаров каталога\

// events: IEvents - экземпляр класса EventEmitter для инициализации событий при изменении данных

// preview: IProduct -  поле в котором будет сохраняться карточка

// constructor(protected events: IEvents) {}

// Методы класса:

//     // Метод для сохранения массива товаров в Модели
//     setProducts(items: IProduct[]): void

//     // Получения массива товаров каталога
//     getProducts(): IProduct[]

//         //Просмотр товара
//     setPreview(value: IProduct) {}
