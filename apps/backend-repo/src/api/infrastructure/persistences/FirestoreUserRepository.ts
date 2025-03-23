import {
  CollectionReference,
  Firestore,
  Query,
} from "firebase-admin/firestore";
import { IUuidGenerator } from "../../../shared/domain/IUuidGenerator";
import { GenericFilter } from "../../../shared/infrastructure/express/filter/GenericFilter";
import { PageService } from "../../../shared/infrastructure/pagination";
import { User } from "../../domains/users/entity/User.entity";
import { UserRepository } from "../../domains/users/UserRepository";

export class FirebaseUserRepository
  extends PageService
  implements UserRepository
{
  constructor(
    private db: Firestore,
    private uuidGenerator: IUuidGenerator,
  ) {
    super();
  }
  async getAll(filter: GenericFilter): Promise<[User[], number]> {
    const collection = this.createWhereQuery(filter.search)(
      this.db.collection("USERS"),
    );

    const [users, count] = await this.paginate(collection, filter);

    return [users, count];
  }

  save(user: User): Promise<User> {
    return new Promise(async (resolve) => {
      const id = this.uuidGenerator.generate();
      const payload = { ...user, id, recentlyActive: new Date() };
      await this.db.collection("USERS").add(payload);
      resolve(
        Object.assign(user, {
          id,
        }),
      );
    });
  }

  private createWhereQuery(search?: string) {
    return (ref: CollectionReference | Query) => {
      if (search) {
        return ref.where("numberOfRents", ">=", Number(search));
      }
      return ref;
    };
  }
}
