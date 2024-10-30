import {Product} from 'src/domain/entities/Product';
import {ProductPort} from 'src/domain/ports/ProductPort';
import {Uuid} from 'src/shared/domain/value-objects/uuid.value-object';

export class ProductPortImpl implements ProductPort {
  private items: Map<string, Product> = new Map();

  async save(item: Product): Promise<void> {
    this.items.set(item.productId.id, item);
  }

  async findById(id: string): Promise<Product | null> {
    return this.items.get(id) ?? null;
  }

  async findItemsByCategory(category: string): Promise<Product[]> {
    const items = Array.from(this.items.values());

    return items.filter(item => item.category === category);
  }

  async editItem(itemId: Uuid, itemInfomation: Product): Promise<void> {
    const item = this.items.get(itemId.id);

    if (!item) {
      throw new Error('Item not found');
    }

    this.items.set(itemId.id, itemInfomation);
  }

  async findByName(name: string): Promise<Product | null> {
    const items = Array.from(this.items.values());

    return items.find(item => item.name === name) ?? null;
  }

  async listAllItems(): Promise<Product[]> {
    return Array.from(this.items.values());
  }

  get itemsList(): Map<string, Product> {
    return this.items;
  }
}
