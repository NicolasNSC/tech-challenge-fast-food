import {Uuid} from 'src/shared/domain/value-objects/uuid.value-object';
import {Product} from '../entities/Product';

export interface ProductPort {
  save(item: Product): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findItemsByCategory(category: string): Promise<Product[]>;
  editItem(itemId: Uuid, itemInfomation: Product): Promise<void>;
  listAllItems(): Promise<Product[]>;
}
