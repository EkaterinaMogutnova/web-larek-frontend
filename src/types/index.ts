
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
export interface IBasketItem {
    id: string;
    title: string;
    price: number;
    count: number;
}

export type TBasketModal = Pick<IProduct, 'title' | 'price'>;

export type TPaymentModal = Pick<IOrderForm, 'payment' | 'address'>;

export type TContactsModal = Pick<IOrderForm, 'email' | 'phone'>;
