import {Cpf} from 'src/shared/domain/value-objects/cpf.value-object';
import {Entity} from '../../../shared/domain/Entity';
import {Uuid} from '../../../shared/domain/value-objects/uuid.value-object';
import {ValueObject} from '../../../shared/domain/ValueObject';
import { CustomerProps } from './types';

export class Customer extends Entity {
  public customerId: Uuid;
  public name: string;
  public email: string;
  public cpf: Cpf | null;
  public createdAt: Date;

  private constructor(props: CustomerProps) {
    super();
    this.customerId = props.customerId;
    this.name = props.name;
    this.email = props.email;
    this.cpf = props.cpf;
    this.createdAt = props.createdAt || new Date();
  }

  static create(props: CustomerProps): Customer {
    return new Customer({
      customerId: props.customerId,
      name: props.name,
      email: props.email,
      cpf: props.cpf,
      createdAt: props.createdAt,
    });
  }

  get entityId(): ValueObject {
    return this.customerId;
  }

  toJSON() {
    return {
      id: this.customerId.id,
      name: this.name,
      email: this.email,
      cpf: this.cpf?.getValue(),
      createdAt: this.createdAt,
    };
  }
}
