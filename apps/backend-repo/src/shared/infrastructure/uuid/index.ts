import { IUuidGenerator } from "../../domain/IUuidGenerator";
import { v7 as uuidv7 } from "uuid";

export class Uuidv7Generator implements IUuidGenerator {
  private uuidv7: typeof uuidv7;

  constructor() {
    this.uuidv7 = uuidv7;
  }

  public generate(): string {
    return this.uuidv7();
  }
}
