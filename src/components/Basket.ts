import { createElement, ensureElement, handlePrice } from '../utils/utils';
import { Component } from './base/component';
import { EventEmitter } from './base/events';
import { IProduct } from '../types';

interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}
export class Basket extends Component<IBasketView> {
	protected _list: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._price = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');
		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.setDisabledButton(false);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.setDisabledButton(true);
		}
	}

	set total(total: number) {
		this.setText(this._price, handlePrice(total) + ' синапсов');
	}
	refreshIndexes() {
		Array.from(this._list.children).forEach(
			(item, index) =>
				(item.querySelector(`.basket__item-index`)!.textContent = (
					index + 1
				).toString())
		);
	}
	setDisabledButton(value: boolean) {
		this.setDisabled(this._button, value);
	}
}
export interface IBasketItem extends IProduct {
	index: number;
}
export class BasketItem extends Component<IBasketItem> {
	protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	constructor(
		container: HTMLElement,
		actions?: {
			onClick: (event: MouseEvent) => void;
		}
	) {
		super(container);
		this._title = container.querySelector('.card__title');
		this._index = container.querySelector('.basket__item-index');
		this._price = container.querySelector('.card__price');
		this._button = container.querySelector('.basket__item-delete');
		if (this._button) {
			this._button.addEventListener('click', (evt) => {
				this.container.remove();
				actions?.onClick(evt);
			});
		}
	}
	set title(value: string) {
		this._title.textContent = value;
	}
	set index(value: number) {
		this._index.textContent = value.toString();
	}
	set price(value: number) {
		this._price.textContent = handlePrice(value) + ' синапсов';
	}
}
