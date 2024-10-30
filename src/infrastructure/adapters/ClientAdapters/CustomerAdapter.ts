import { Customer } from "src/domain/entities/Customer/Customer";
import { CustomerProps } from "src/domain/entities/Customer/types";
import { Cpf } from "src/shared/domain/value-objects/cpf.value-object";
import { Uuid } from "src/shared/domain/value-objects/uuid.value-object";

export class CustomerAdapter {
  static toDomain(dto: CustomerProps): Customer {
    return Customer.create({
      customerId: new Uuid(),
      email: dto.email,
      name: dto.name,
      cpf: dto.cpf,
      createdAt: new Date(),
    })
  }

  static toDTO(customer: Customer): CustomerProps {
    return {
      customerId: customer.customerId,
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
      createdAt: customer.createdAt,
    };
  }
}
