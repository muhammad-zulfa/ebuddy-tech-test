import { Expose } from "class-transformer";

export class ResponseDto {
  @Expose()
  numberOfRents!: number;
  @Expose()
  totalAverageWeightRatings!: number;
  @Expose()
  recentlyActive!: number;
}
