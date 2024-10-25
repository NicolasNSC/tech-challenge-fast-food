import {Customer} from '../../../domain/entities/Customer/Customer';
import {CustomerRepository} from '../../../domain/ports/CustomerRepository';

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(customerInfomation: Customer): Promise<Customer> {
    const customer = new Customer(
      customerInfomation.id,
      customerInfomation.name,
      customerInfomation.email,
      customerInfomation.documentNumber,
    );

    const customerAlreadyExists =
      await this.customerRepository.findByDocumentNumber(customer.documentNumber);

    if (customerAlreadyExists) {
      throw new Error('Customer already exists');
    }

    await this.customerRepository.save(customer);

    return customer;
  }
}
