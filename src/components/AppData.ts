import { IProduct, IOrder, FormErrors, IOrderForm, IAppData } from '../types';
import { Model } from '../components/base/Model';

const EMPTY_ORDER: IOrder = {
  payment: undefined,
  address: '',
  email: '',
  phone: '',
  total: 0,
  items: [],
}

export class AppData extends Model<IAppData> {
  catalog: IProduct[] = [];
  basket: IProduct[] = [];
  order: IOrder = { ...EMPTY_ORDER };
  formErrors: FormErrors = {};

  getTotalBasketPrice(): number {
    return this.basket.reduce((sum, next) => sum + next.price, 0);
  }

  addToBasket(value: IProduct) {
    this.basket.push(value);
  }

  deleteFromBasket(id: string) {
    this.basket = this.basket.filter(item => item.id !== id);
  }

  getBasketAmount(): number {
    return this.basket.length;
  }

  setProducts(items: IProduct[]) {
   this.catalog = items;
   this.emitChanges('items:changed', { catalog: this.catalog });
  }

  setOrderField(field: keyof IOrderForm, value: string) {
    this.order[field] = value;

    this.validateContacts();
    this.validateOrder();
  }

  validateContacts() {
    const errors: typeof this.formErrors = {};

    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }

    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }

    this.formErrors = errors;
    this.events.emit('contactsFormErrors:change', this.formErrors);
  }

  validateOrder() {
    const errors: typeof this.formErrors = {};

    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }

    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }

    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
  }

  private clearBasket() {
    this.basket.length = 0;
  }

  private clearOrder() {
    this.order = { ...EMPTY_ORDER };
  }

  private resetSelected() {
    this.catalog.forEach(item => item.selected = false)
  }

  clearOrderData() {
    this.clearBasket();
    this.clearOrder();
    this.resetSelected();
    this.formErrors = {}
  }
}