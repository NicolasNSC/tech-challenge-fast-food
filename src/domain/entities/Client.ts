import { Entity } from "../../shared/domain/Entity";
import { Uuid } from "../../shared/domain/value-objects/uuid.value-object";
import { ValueObject } from "../../shared/domain/ValueObject";

export type ClientProps = {
  clientId?: Uuid;
  name: string;
  email: string;
  documentNumber?: string;
  createdAt?: Date;
};

export class Client extends Entity{
  public clientId: Uuid;
  public name: string;
  public email: string;
  public documentNumber: string | null;
  public createdAt: Date;

  constructor(props: ClientProps) {
    super();
    this.clientId = props.clientId ?? new Uuid();
    this.name = props.name;
    this.email = props.email;
    this.documentNumber = props.documentNumber || null;
    this.createdAt = props.createdAt || new Date();
  }

  get entityId(): ValueObject {
    return this.clientId;
  }

  toJSON() {
    return {
      id: this.clientId.id,
      name: this.name,
      email: this.email,
      documentNumber: this.documentNumber,
      createdAt: this.createdAt,
    }
  }
}
