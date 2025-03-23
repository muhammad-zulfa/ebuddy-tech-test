import { IsNotEmpty } from "class-validator";

export class User {
  @IsNotEmpty()
  numberOfRents!: number;
  @IsNotEmpty()
  recentlyActive!: number;
  @IsNotEmpty()
  totalAverageWeightRatings!: number;
}
