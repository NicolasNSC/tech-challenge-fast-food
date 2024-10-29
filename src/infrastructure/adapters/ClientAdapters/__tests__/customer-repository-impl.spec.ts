import { CustomerAdapter } from "../CustomerAdapter";
import { Uuid } from "src/shared/domain/value-objects/uuid.value-object";
import { CustomerRepositoryImpl } from "../CustomerRepositoryImpl";
import { Cpf } from "src/shared/domain/value-objects/cpf.value-object";

describe('CustomerRepositoryImpl Unit Test', () => {
  it('should save a new customer', async () => {
    const customerAdapter = CustomerAdapter.toDomain({
      customerId: new Uuid(),
      name: 'John Doe',
      email: 'jhon@doe.com',
      cpf: new Cpf('48934098830'),
    })

    const customerRepository = new CustomerRepositoryImpl();

    await customerRepository.save(customerAdapter);

    expect(customerRepository.customersList.size).toBe(1);
    expect(customerRepository.customersList.get(customerAdapter.customerId.id)).toBe(customerAdapter);
  });

  it('should find a customer by id', async () => {
    const customerAdapter = CustomerAdapter.toDomain({
      customerId: new Uuid(),
      name: 'John Doe',
      email: 'jhon@doe.com',
      cpf: new Cpf('48934098830'),
    })

    const customerRepository = new CustomerRepositoryImpl();

    await customerRepository.save(customerAdapter);

    const customerFound = await customerRepository.findById(customerAdapter.customerId.id);

    expect(customerFound).toBe(customerAdapter);
    expect(customerFound?.customerId.id).toBe(customerAdapter.customerId.id);
    expect(customerFound?.name).toBe(customerAdapter.name);
    expect(customerFound?.email).toBe(customerAdapter.email);
    expect(customerFound?.cpf).toBe(customerAdapter.cpf);
    expect(customerFound?.customerId).toBeInstanceOf(Uuid);
  });
});