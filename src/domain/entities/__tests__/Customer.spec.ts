import {Uuid} from 'src/shared/domain/value-objects/uuid.value-object';
import {Customer} from '../Customer/Customer';
import {Cpf} from 'src/shared/domain/value-objects/cpf.value-object';

describe('Customer', () => {
  test('should be defined', () => {
    const customer = Customer.create({
      name: 'Jhon Doe',
      email: 'jhon@doe.com',
    });

    expect(customer).toBeDefined();
  });

  describe('Constructor of Customer', () => {
    test('constructor', () => {
      const id = new Uuid();

      let customer = Customer.create({
        customerId: id,
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
      });

      expect(customer.customerId).toBeInstanceOf(Uuid);
      expect(customer.name).toBe('Jhon Doe');
      expect(customer.email).toBe('jhon@doe.com');
      expect(customer.cpf).toBe(undefined);
      expect(customer.createdAt).toBeInstanceOf(Date);

      const cpf = new Cpf('48934098830');

      customer = Customer.create({
        customerId: id,
        name: 'Jhon Doe',
        email: 'jhon@doe.com',
        cpf,
      });

      expect(customer.customerId).toBeInstanceOf(Uuid);
      expect(customer.name).toBe('Jhon Doe');
      expect(customer.email).toBe('jhon@doe.com');
      expect(customer.cpf.getValue()).toBe('48934098830');
      expect(customer.createdAt).toBeInstanceOf(Date);
    });

    describe('customerId field', () => {
      const arrange = [{customerId: new Uuid()}];

      test.each(arrange)('should be %j', props => {
        const category = Customer.create(props as any);
        expect(category.customerId).toBeInstanceOf(Uuid);
      });
    });
  });
});
