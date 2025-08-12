//Типов данных с которыми будете работать в приложении. Как минимум у вас должны быть описаны объекты приходящие к вам через API и объекты выводимые на экране. Ваши модели в итоге должны будут трансформировать один тип в другой.
//Интерфейс API-клиента
//Интерфейсы модели данных
//Интерфейсы отображений
//Интерфейсы базовых классов
//Перечисление событий и их интерфейсы (если используете брокер)
//Любые другие типы и интерфейсы если вы заложили их в архитектуру

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
export interface IOrderForm {
	payment: string;
	address: string;
	phone: string;
	email: string;
}

export type TBasketModal = Pick<IProduct, 'title' | 'price'>;

export type TPaymentModal = Pick<IOrderForm, 'payment' | 'address'>;

export type TContactsModal = Pick<IOrderForm, 'email' | 'phone'>;
