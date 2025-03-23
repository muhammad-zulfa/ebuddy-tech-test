import { GenericFilter } from "../../../shared/infrastructure/express/filter/GenericFilter";
import { CreateDto } from "./dto/CreateDto";
import { User } from "./entity/User.entity";

export interface UserRepository {
  getAll(filter: GenericFilter): Promise<[User[], number]>;
  save(user: CreateDto): Promise<User>;
}
