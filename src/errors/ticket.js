export class VehicleAlreadyParkedError extends Error {
  constructor(licensePlate) {
    super(`Vehicle with license plates ${licensePlate} is alredy parked.`);
    this.name = 'VehicleAlreadyParkedError';
  }
}
