enum VehicleType {
  MOTORCYCLE = "MOTORCYCLE",
  CAR_TYPE = "CAR",
  TRUCK_TYPE = "TRUCK",
}

abstract class Vehicle {
  protected licensePlate: string;
  protected vehicleType: VehicleType;

  constructor(licensePlate: string, vehicleType: VehicleType) {
    this.licensePlate = licensePlate;
    this.vehicleType = vehicleType;
  }

  public getVehicleType(): VehicleType {
    return this.vehicleType;
  }

  public getLicensePlate(): string {
    return this.licensePlate;
  }
}

class Car extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.CAR_TYPE);
  }
}

class Motorcycle extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.MOTORCYCLE);
  }
}

class Truck extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.TRUCK_TYPE);
  }
}

class ParkingSpot {
  private spotType: VehicleType;
  private currentVehicle: Vehicle | null;

  constructor(spotType: VehicleType) {
    this.spotType = spotType;
    this.currentVehicle = null;
  }

  public isAvailable(): boolean {
    return this.currentVehicle === null;
  }

  public canFitVehicle(vehicle: Vehicle): boolean {
    return vehicle.getVehicleType() === this.spotType;
  }

  public parkVehicle(vehicle: Vehicle): void {
    if (!this.canFitVehicle(vehicle)) {
      throw new Error("Vehicle does not match spot type.");
    }
    this.currentVehicle = vehicle;
  }

  public unparkVehicle(): void {
    this.currentVehicle = null;
  }

  public getCurrentVehicle(): Vehicle | null {
    return this.currentVehicle;
  }
}
