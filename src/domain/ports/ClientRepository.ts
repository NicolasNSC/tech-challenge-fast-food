import {Client} from '../entities/Client';

export interface ClientRepository {
  save(client: Client): Promise<void>;
  findById(id: string): Promise<Client | null>;
  findByDocumentNumber(documentNumber: string): Promise<Client | null>;
}
