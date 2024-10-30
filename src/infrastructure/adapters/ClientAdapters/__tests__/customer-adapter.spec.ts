import { CustomerProps } from 'src/domain/entities/Customer/types';
import {CustomerAdapter} from '../CustomerAdapter'
import { Customer } from 'src/domain/entities/Customer/Customer';
import { Uuid } from 'src/shared/domain/value-objects/uuid.value-object';
import { Cpf } from 'src/shared/domain/value-objects/cpf.value-object';

describe('Customer Adapter Unit Tests', () => {
  it('should return a domain entity', () => {
    const dto: CustomerProps = {
      email: 'jhon doe',
      name: 'jhon@doe.com',
      cpf: new Cpf('489.340.988-30'),
    }

    const customer = CustomerAdapter.toDomain(dto);

    expect(customer).toBeDefined();
    expect(customer).toBeInstanceOf(Customer);
    expect(customer).toHaveProperty('customerId');
    expect(customer).toHaveProperty('name');
    expect(customer).toHaveProperty('email');
    expect(customer).toHaveProperty('cpf');
    expect(customer).toHaveProperty('createdAt');
    expect(customer.customerId).toBeInstanceOf(Uuid);
    expect(customer.cpf).toBe(dto.cpf);
    expect(customer.email).toBe(dto.email);
    expect(customer.name).toBe(dto.name);
  })

  it('should return a DTO', () => {
    const customer = Customer.create({
      customerId: new Uuid(),
      email: 'jhon doe',
      name: 'jhon doe name',
      cpf: new Cpf('489.340.988-30'),
      createdAt: new Date(),
    });

    const dto = CustomerAdapter.toDTO(customer);

    expect(dto).toBeDefined();
    expect(dto).toHaveProperty('customerId');
    expect(dto).toHaveProperty('name');
    expect(dto).toHaveProperty('email');
    expect(dto).toHaveProperty('cpf');
    expect(dto).toHaveProperty('createdAt');
    expect(dto.customerId).toBe(customer.customerId);
    expect(dto.customerId).toBeInstanceOf(Uuid);
    expect(dto.email).toBe(customer.email);
    expect(dto.name).toBe(customer.name);
    expect(dto.cpf).toBe(customer.cpf);
    expect(dto.createdAt).toBe(customer.createdAt);
  })
});