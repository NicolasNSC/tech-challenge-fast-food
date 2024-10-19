import {Client} from '../../../domain/entities/Client';
import {ClientRepository} from '../../../domain/ports/ClientRepository';

export class ClientRepositoryImpl implements ClientRepository {
  private clients: Map<string, Client> = new Map();

  async save(client: Client): Promise<void> {
    this.clients.set(client.id, client);
  }

  async findById(id: string): Promise<Client | null> {
    return this.clients.get(id) ?? null;
  }

  async findByDocumentNumber(documentNumber: string): Promise<Client | null> {
    const clients = Array.from(this.clients.values());

    return (
      clients.find(client => client.documentNumber === documentNumber) ?? null
    );
  }
}
