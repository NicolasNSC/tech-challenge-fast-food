import {Client} from '../../../domain/entities/Client';
import {ClientRepository} from '../../../domain/ports/ClientRepository';

export class CreateClientUseCase {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(clientInfomation: Client): Promise<Client> {
    const client = new Client(
      clientInfomation.id,
      clientInfomation.name,
      clientInfomation.email,
      clientInfomation.documentNumber,
    );

    const clientAlreadyExists =
      await this.clientRepository.findByDocumentNumber(client.documentNumber);

    if (clientAlreadyExists) {
      throw new Error('Client already exists');
    }

    await this.clientRepository.save(client);

    return client;
  }
}
