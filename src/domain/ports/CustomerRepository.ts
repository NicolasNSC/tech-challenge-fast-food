import {Customer} from '../entities/Customer/Customer';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  findById(id: string): Promise<Customer | null>;
  findByDocumentNumber(documentNumber: string): Promise<Customer | null>;
}
