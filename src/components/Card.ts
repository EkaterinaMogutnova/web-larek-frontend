import { Component } from './base/component';
import { ensureElement, handlePrice } from '../utils/utils';
import { CDN_URL } from '../utils/constants';
import { IProduct } from '../types';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
	protected _category: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _categoryColor = <Record<string, string>>{
		'софт-скил': 'soft',
		другое: 'other',
		дополнительное: 'additional',
		кнопка: 'button',
		'хард-скил': 'hard',
	};
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._button = container.querySelector('.card__button');
		this._category = container.querySelector('.card__category');
		this._price = container.querySelector('.card__price');
		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}
	set title(value: string) {
		this.setText(this._title, value);
	}
	get title(): string {
		return this._title.textContent || '';
	}
	set price(value: number | null) {
		this._price.textContent = value
			? handlePrice(value) + ' синапсов'
			: 'Бесценно';
		if (this._button && !value) {
			this._button.disabled = true;
		}
	}
	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = `card__category card__category_${this._categoryColor[value]}`;
	}

	set image(value: string) {
		this.setImage(this._image, CDN_URL + value, this.title);
	}
	set selected(value: boolean) {
		this.setText(this._button, value ? 'Удалить из корзины' : 'Купить');
	}
}
export class CardPreview extends Card {
	protected _description: HTMLElement;
	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container, actions);
		this._description = container.querySelector('.card__text');
	}
	set description(value: string) {
		this._description.textContent = value;
	}
}
