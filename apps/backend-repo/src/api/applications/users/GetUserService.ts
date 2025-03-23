import { GenericFilter } from "../../../shared/infrastructure/express/filter/GenericFilter";
import { User } from "../../domains/users/entity/User.entity";
import { UserRepository } from "../../domains/users/UserRepository";

export class GetUserService {
  constructor(private userRepository: UserRepository) {}

  async invoke(filter: GenericFilter): Promise<[User[], number]> {
    return this.userRepository.getAll(filter);
  }
}
