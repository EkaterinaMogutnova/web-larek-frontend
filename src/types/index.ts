export interface IProductResponse {
	total: number;
	items: IProduct[];
}

export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	selected: boolean;
}

export interface IOrderForm {
	payment: string;
	address: string;
	phone: string;
	email: string;
}

export type FormErrors = Partial<Record<keyof IOrderForm, string>>;

export interface IOrder extends IOrderForm {
	total: number;
	items: string[];
}

export interface IBasketItem {
	id: string;
	title: string;
	price: number;
	count: number;
}

export interface IProductResponse {
	total: number;
	items: IProduct[];
}

export interface IAppData {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder;
	formErrors: FormErrors;
	getTotalBasketPrice(): number;
	addToBasket(value: IProduct[]): void;
	deleteFromBasket(value: IProduct[]): void;
	getBasketAmount(): number;
	setProducts(items: IProduct[]): void;
	setOrderField(field: keyof IOrderForm, value: string): void;
	validateContacts(): void;
	validateOrder(): void;
	clearOrderData(): void;
}
