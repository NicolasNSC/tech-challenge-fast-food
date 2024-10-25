import { Cpf } from "src/shared/domain/value-objects/cpf.value-object";
import { Uuid } from "src/shared/domain/value-objects/uuid.value-object";

export type CustomerProps = {
  customerId?: Uuid;
  name: string;
  email: string;
  cpf?: Cpf;
  createdAt?: Date;
};