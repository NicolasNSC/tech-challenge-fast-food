import {CategoryType, Product} from 'src/domain/entities/Product';
import {Uuid} from 'src/shared/domain/value-objects/uuid.value-object';
import {ProductPortImpl} from '../ProductPortImpl';

describe('Item Port Implentation', () => {
  let productPort: ProductPortImpl;

  beforeEach(() => {
    productPort = new ProductPortImpl();
  });

  describe('save', () => {
    it('should save item', async () => {
      const item = new Product({
        productId: new Uuid(),
        name: 'X-Burger',
        description: 'Delicoso X-Burger, com carne, queijo e molho barbecue',
        price: 10.0,
        category: CategoryType.FOOD,
      });

      await productPort.save(item);

      const itemsFromPort = productPort.itemsList;

      expect(itemsFromPort.get(item.productId.id)).toEqual(item);
    });
  });

  describe('findById', () => {
    it('should find item by id', async () => {
      const item = new Product({
        productId: new Uuid(),
        name: 'X-Salada',
        price: 13.0,
        description:
          'Delicoso X-Salada, com carne, queijo, salada, tomate e molho especial',
        category: CategoryType.FOOD,
      });

      const itemsFromPort = productPort.itemsList;

      itemsFromPort.set(item.productId.id, item);

      const itemIdFromPort = itemsFromPort.get(item.productId.id).productId.id;

      const result = await productPort.findById(itemIdFromPort);

      expect(result).toEqual(item);
    });

    it('should return null if item not found', async () => {
      const result = await productPort.findById('invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('findItemsByCategory', () => {
    it('should find items by category', async () => {
      const item1 = new Product({
        productId: new Uuid(),
        name: 'X-Salada',
        price: 13.0,
        description:
          'Delicoso X-Salada, com carne, queijo, salada, tomate e molho especial',
        category: CategoryType.FOOD,
      });

      const item2 = new Product({
        productId: new Uuid(),
        name: 'Coca-Cola',
        price: 5.0,
        description: 'Refrigerante Coca-Cola 350ml',
        category: CategoryType.DRINK,
      });

      const item3 = new Product({
        productId: new Uuid(),
        name: 'Fanta',
        price: 5.0,
        description: 'Refrigerante Fanta 350ml',
        category: CategoryType.DRINK,
      });

      productPort.save(item1);
      productPort.save(item2);
      productPort.save(item3);

      const result = await productPort.findItemsByCategory(CategoryType.DRINK);

      expect(result).toEqual([item2, item3]);
    });
  });

  describe('editItem', () => {
    it('should edit item', async () => {
      const item = new Product({
        productId: new Uuid(),
        name: 'X-Salada',
        price: 13.0,
        description:
          'Delicoso X-Salada, com carne, queijo, salada, tomate e molho especial',
        category: CategoryType.FOOD,
      });

      productPort.save(item);

      const newItemInformation = new Product({
        productId: item.productId,
        name: 'X-Bacon',
        price: 15.0,
        description:
          'Delicoso X-Bacon, com carne, queijo, bacon, salada, tomate e molho especial',
        category: CategoryType.FOOD,
      });

      await productPort.editItem(item.productId, newItemInformation);

      const itemsFromPort = productPort.itemsList;
      const editedItem = itemsFromPort.get(item.productId.id);

      expect(editedItem).toEqual(newItemInformation);
    });

    it('should throw error if item not found', async () => {
      const item = new Product({
        productId: new Uuid(),
        name: 'X-Salada',
        price: 13.0,
        description:
          'Delicoso X-Salada, com carne, queijo, salada, tomate e molho especial',
        category: CategoryType.FOOD,
      });

      const newItemInformation = new Product({
        productId: item.productId,
        name: 'X-Bacon',
        price: 15.0,
        description:
          'Delicoso X-Bacon, com carne, queijo, bacon, salada, tomate e molho especial',
        category: CategoryType.FOOD,
      });

      await expect(
        productPort.editItem(item.productId, newItemInformation),
      ).rejects.toThrow('Item not found');
    });
  });

  describe('findByName', () => {
    it('should find item by name', async () => {
      const item = new Product({
        productId: new Uuid(),
        name: 'X-Salada',
        price: 13.0,
        description:
          'Delicoso X-Salada, com carne, queijo, salada, tomate e molho especial',
        category: CategoryType.FOOD,
      });

      const itemsFromPort = productPort.itemsList;

      itemsFromPort.set(item.productId.id, item);

      const result = await productPort.findByName(item.name);

      expect(result).toEqual(item);
    });

    it('should return null if item not found', async () => {
      const result = await productPort.findByName('invalid-name');

      expect(result).toBeNull();
    });
  });

  describe('listAllItems', () => {
    it('should list all items', async () => {
      const item1 = new Product({
        productId: new Uuid(),
        name: 'X-Salada',
        price: 13.0,
        description:
          'Delicoso X-Salada, com carne, queijo, salada, tomate e molho especial',
        category: CategoryType.FOOD,
      });

      const item2 = new Product({
        productId: new Uuid(),
        name: 'Coca-Cola',
        price: 5.0,
        description: 'Refrigerante Coca-Cola 350ml',
        category: CategoryType.DRINK,
      });

      const item3 = new Product({
        productId: new Uuid(),
        name: 'Fanta',
        price: 5.0,
        description: 'Refrigerante Fanta 350ml',
        category: CategoryType.DRINK,
      });

      productPort.save(item1);
      productPort.save(item2);
      productPort.save(item3);

      const result = await productPort.listAllItems();

      expect(result).toEqual([item1, item2, item3]);
    });
  });
});
