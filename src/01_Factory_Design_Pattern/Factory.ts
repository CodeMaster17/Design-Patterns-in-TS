// base class Car
abstract class Car {
  constructor(public model: string, public engine: string) {}

  abstract displayInfo(): void;
}

// concrete class
class Sedan extends Car {
  constructor() {
    super("Sedan", "V6");
  }

  displayInfo(): void {
    console.log(`Model: ${this.model}, Engine: ${this.engine}`);
  }
}

class SUV extends Car {
  constructor() {
    super("SUV", "V8");
  }

  displayInfo(): void {
    console.log(`Model: ${this.model}, Engine: ${this.engine}`);
  }
}

class Truck extends Car {
  constructor() {
    super("Truck", "V12");
  }

  displayInfo(): void {
    console.log(`Model: ${this.model}, Engine: ${this.engine}`);
  }
}

class CarFactory {
  static createCar(type: string): Car {
    switch (type.toLowerCase()) {
      case "sedan":
        return new Sedan();
      case "suv":
        return new SUV();
      case "truck":
        return new Truck();
      default:
        throw new Error("Unknown car type");
    }
  }
}

// Usage
const sedan = CarFactory.createCar("sedan");
sedan.displayInfo(); // Output: Model: Sedan, Engine: V6

const suv = CarFactory.createCar("suv");
suv.displayInfo(); // Output: Model: SUV, Engine: V8

const truck = CarFactory.createCar("truck");
truck.displayInfo(); // Output: Model: Truck, Engine: V12
