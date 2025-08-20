import { handlePrice } from '../utils/utils';
import { Component } from "./base/component";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected _button: HTMLButtonElement;
    protected _description: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this._button = container.querySelector('.order-success__close');
        this._description = container.querySelector('.order-success__description');

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick)
            }
        }
    }

    set total(value: number) {
        this._description.textContent = 'Списано ' + handlePrice(value) + ' синапсов!'
    }
}