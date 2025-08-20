import './scss/styles.scss';
import { Api, ApiListResponse } from './components/base/api';
import { IOrderForm, IProduct, IProductResponse } from './types';
import { API_URL } from './utils/constants';
import { AppData } from './components/AppData';
import { EventEmitter } from './components/base/events';
import { Card, CardPreview } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Page } from './components/Page';
import { Modal } from './components/Modal';
import { Basket, BasketItem } from './components/Basket';
import {Order} from './components/Order';
import { Contacts } from './components/Contact';
import { Success } from './components/Success';

const api = new Api(API_URL);
const events = new EventEmitter();

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const page = new Page(document.body, events);
const appData = new AppData({}, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		events.emit('modal:close');
		modal.close();
	}
})

// Запрашиваем каталог продуктов
api
	.get('/product')
	.then((res: IProductResponse) => {
		const items = res.items;
		appData.setProducts(items);
	})
	.catch((err) => {
		console.error(err);
	});

function renderPreview(item: IProduct) {
	const preview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit(item.selected ? 'card:deleteFromBasket' : 'card:toBasket', item)
	});

	modal.render({
		content: preview.render({
			id: item.id,
			title: item.title,
			image: item.image,
			category: item.category,
			description: item.description,
			price: item.price,
			selected: item.selected,
		}),
	});
}

// Обработчик изменения элементов каталога
events.on('items:changed', (data) => {
	page.galery = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});

		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
});

// Обработчик выбора элемента каталога
events.on('card:select', (item: IProduct) => {
	renderPreview(item);
});

// Обработчик добавления в корзину элемента каталога
events.on('card:toBasket', (item: IProduct) => {
	item.selected = true;
	appData.addToBasket(item);
	page.counter = appData.getBasketAmount();

	renderPreview(item);
});

// Обработчик удаления из корзины элемента каталога
events.on('card:deleteFromBasket', (item: IProduct) => {
	item.selected = false;
	appData.deleteFromBasket(item.id);
	page.counter = appData.getBasketAmount();

	renderPreview(item);
});

// Обработчик открытия корзины
events.on('basket:open', () => {
	const items = appData.basket.map((item, index) => {
		const basketItem = new BasketItem(
			cloneTemplate(cardBasketTemplate),
			{ onClick: () => events.emit('basket:delete', item) }
		);

		return basketItem.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});

	modal.render({
		content: basket.render({
			items,
			total: appData.getTotalBasketPrice(),
		}),
	});
})

// Обработчик удаления элемента из корзины
events.on('basket:delete', (item: IProduct) => {
	appData.deleteFromBasket(item.id);
	item.selected = false;
	basket.total = appData.getTotalBasketPrice();
	page.counter = appData.getBasketAmount();
	basket.refreshIndexes();
	if (!appData.basket.length) {
		basket.setDisabledButton(true);
	}
})

// Обработчик открытия модального окна заказа
events.on('order:open', () => {
	console.log('render open order');
	modal.render({
		content: order.render(
			{
				address: '',
				valid: false,
				errors: []
			}
		),
	});
})

// Обработчик изменения поля заказа
events.on('orderInput:change', (data: { field: keyof IOrderForm, value: string }) => {
	appData.setOrderField(data.field, data.value);
})

// Обработчик изменения ошибок полей заказа
events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

// Обработчик сабмита модального окна заказа
events.on('order:submit', () => {
	modal.render({
		content: contacts.render(
			{
				valid: false,
				errors: []
			}
		),
	});
})

// Обработчик изменения ошибок полей контактов пользователя
events.on('contactsFormErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
});

// Обработчик сабмита модального окна конактов пользователя
events.on('contacts:submit', () => {
	appData.order.total = appData.getTotalBasketPrice();
	appData.order.items = appData.basket.map(item => item.id);

	api.post('/order', appData.order)
		.then((res) => {
			events.emit('success:open', res);
			appData.clearOrderData();
			order.disableButtons();
			page.counter = 0;
		})
		.catch((err) => {
			console.log(err)
		})
})

// Обработчик открытия окна об успешном завершении заказа
events.on('success:open', (res: ApiListResponse<string>) => {
	modal.render({
		content: success.render({
			total: res.total
		})
	})
})

// Обработчик открытия модального окна
events.on('modal:open', () => {
	page.locked = true;
});

// Обработчик закрытия модального окна
events.on('modal:close', () => {
	page.locked = false;
});