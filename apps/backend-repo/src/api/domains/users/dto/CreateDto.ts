export class CreateDto {
  public numberOfRents: number;
  public totalAverageWeightRatings: number;

  constructor(numberOfRents: number, totalAverageWeightRatings: number) {
    this.numberOfRents = numberOfRents;
    this.totalAverageWeightRatings = totalAverageWeightRatings;
  }
}
