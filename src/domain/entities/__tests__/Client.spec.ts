import { Client } from '../Client';

describe('Client', () => {
  test('should instantiate the class', () => {
    const client = new Client(
      '1',
      'John Doe',
      '',
      '12345678900'
    );

    expect(client).toBeInstanceOf(Client);
  })
});

