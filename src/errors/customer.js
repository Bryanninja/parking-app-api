export class CustomerAlredyExistError extends Error {
  constructor(message = 'Alredy Exist a customer with this phone.') {
    super(message);
    this.name = 'CustomerAlredyExistError';
  }
}
