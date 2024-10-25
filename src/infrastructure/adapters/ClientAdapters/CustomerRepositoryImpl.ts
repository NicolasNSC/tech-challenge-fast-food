import {Customer} from '../../../domain/entities/Customer/Customer';
import {CustomerRepository} from '../../../domain/ports/CustomerRepository';

export class CustomerRepositoryImpl implements CustomerRepository {
  private customers: Map<string, Customer> = new Map();

  async save(customer: Customer): Promise<void> {
    this.customers.set(customer.customerId.id, customer);
  }

  async findById(id: string): Promise<Customer | null> {
    return this.customers.get(id) ?? null;
  }

  async findByDocumentNumber(documentNumber: string): Promise<Customer | null> {
    const customers = Array.from(this.customers.values());

    return (
      customers.find(customer => customer.cpf.getValue() === documentNumber) ?? null
    );
  }

  get customersList(): Map<string, Customer> {
    return this.customers;
  }
}
