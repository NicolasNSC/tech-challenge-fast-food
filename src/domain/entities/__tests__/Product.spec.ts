import {Uuid} from 'src/shared/domain/value-objects/uuid.value-object';
import {Product, CategoryType} from '../Product';

describe('Product Entity Unit Tests', () => {
  it('should create an instance of Product', () => {
    const item = new Product({
      name: 'Burger',
      description: 'A delicious burger',
      price: 10,
      category: CategoryType.FOOD,
    });

    expect(item).toBeInstanceOf(Product);
  });

  it('should create an instance of Product with an id', () => {
    const item = new Product({
      productId: new Uuid('123e4567-e89b-12d3-a456-426614174000'),
      name: 'Burger',
      description: 'A delicious burger',
      price: 10,
      category: CategoryType.FOOD,
    });

    expect(item).toBeInstanceOf(Product);
    expect(item.productId.id).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  it('should return an object with the correct properties', () => {
    const item = new Product({
      name: 'Burger',
      description: 'A delicious burger',
      price: 10,
      category: CategoryType.FOOD,
    });

    expect(item.toJSON()).toEqual({
      id: item.productId.id,
      name: 'Burger',
      description: 'A delicious burger',
      price: 10,
      itemType: 'food',
      createdAt: item.createdAt,
    });
  });
});
