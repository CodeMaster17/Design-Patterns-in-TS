// Creational design pattern
// -- Helps creating complex objects
// -- Helps with immutable classes
// -- Less need for exposing setters


class Computer {
  private parts: string[] = [];

  public addPart(part: string): void {
    this.parts.push(part);
  }

  public showParts(): void {
    console.log(`Computer parts: ${this.parts.join(", ")}`);
  }
}

// Builder interface
// Builder Interface (ComputerBuilder): Provides methods for building different parts of the product.
interface ComputerBuilder {
  buildCPU(): void;
  buildRAM(): void;
  buildStorage(): void;
  getResult(): Computer;
}

// Concrete Builder
// ConcreteBuilder (GamingComputerBuilder): Implements the specific steps to build a gaming computer.
class GamingComputerBuilder implements ComputerBuilder {
  private computer: Computer = new Computer();

  public buildCPU(): void {
    this.computer.addPart("Intel Core i9");
  }

  public buildRAM(): void {
    this.computer.addPart("16GB RAM");
  }

  public buildStorage(): void {
    this.computer.addPart("1TB SSD");
  }

  public getResult(): Computer {
    return this.computer;
  }
}

// Director
// Director (ComputerDirector): Manages the construction process and directs the builder on how to construct the product.
class ComputerDirector {
  private builder: ComputerBuilder;

  constructor(builder: ComputerBuilder) {
    this.builder = builder;
  }

  public construct(): void {
    this.builder.buildCPU();
    this.builder.buildRAM();
    this.builder.buildStorage();
  }
}
