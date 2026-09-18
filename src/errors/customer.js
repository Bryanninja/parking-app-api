export class CustomerAlredyExistError extends Error {
  constructor(message = 'Alredy Exist a customer with this phone.') {
    super(message);
    this.name = 'CustomerAlredyExistError';
  }
}

export class CustomerNotFoundError extends Error {
  constructor(customerId) {
    super(`Customer with id: ${customerId} not found.`);
    this.name = 'CustomerNotFound';
  }
}
