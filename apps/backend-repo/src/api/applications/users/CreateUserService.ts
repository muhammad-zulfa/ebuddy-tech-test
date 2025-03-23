import { CreateDto } from "../../domains/users/dto/CreateDto";
import { User } from "../../domains/users/entity/User.entity";
import { UserRepository } from "../../domains/users/UserRepository";

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async invoke(user: CreateDto): Promise<User> {
    return this.userRepository.save(user);
  }
}
