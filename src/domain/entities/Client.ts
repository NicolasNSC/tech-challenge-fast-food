export class Client {
  public id: string;
  public name: string;
  public email: string;
  public documentNumber: string;

  constructor(id: string, name: string, email: string, documentNumber: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.documentNumber = documentNumber;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getDocumentNumber(): string {
    return this.documentNumber;
  }
}
