import {Entity} from 'src/shared/domain/Entity';
import {Uuid} from 'src/shared/domain/value-objects/uuid.value-object';
import {ValueObject} from 'src/shared/domain/ValueObject';

export enum CategoryType {
  FOOD = 'food',
  SIDES = 'sides',
  DRINK = 'drink',
  DESSERT = 'dessert',
}

export type ProductProps = {
  productId?: Uuid;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  createdAt?: Date;
};

export class Product extends Entity {
  public productId: Uuid;
  public name: string;
  public description: string;
  public price: number;
  public category: CategoryType;
  public createdAt: Date;

  constructor(props: ProductProps) {
    super();
    this.productId = props.productId ?? new Uuid();
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.category = props.category;
    this.createdAt = props.createdAt || new Date();
  }

  get entityId(): ValueObject {
    return this.productId;
  }

  toJSON() {
    return {
      id: this.productId.id,
      name: this.name,
      description: this.description,
      price: this.price,
      itemType: this.category,
      createdAt: this.createdAt,
    };
  }
}
