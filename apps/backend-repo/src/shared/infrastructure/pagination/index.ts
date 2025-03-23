// import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { CollectionReference, Query } from "firebase-admin/firestore";
import { GenericFilter } from "../express/filter/GenericFilter";
import { User } from "../../../api/domains/users/entity/User.entity";

export class PageService {
  protected async paginate(
    repository: CollectionReference | Query,
    filter: GenericFilter,
  ): Promise<[User[], number]> {
    const users = await repository.get();
    const orderedUsers: User[] = users.docs
      .map((user) => ({
        ...(user.data() as User),
        recentlyActive: user.data().recentlyActive.seconds,
      }))
      .sort(
        (a, b) =>
          b.totalAverageWeightRatings - a.totalAverageWeightRatings ||
          b.numberOfRents - a.numberOfRents ||
          b.recentlyActive - a.recentlyActive,
      )
      .slice(
        (filter.page - 1) * filter.pageSize,
        (filter.page - 1) * filter.pageSize + filter.pageSize,
      );
    const count = users.size;

    // allow option to bypass cache

    return [orderedUsers, count];
  }
}
