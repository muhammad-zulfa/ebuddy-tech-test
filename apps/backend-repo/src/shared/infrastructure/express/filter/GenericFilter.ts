import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { SortOrder } from "../../../domain/SortOrder";

export class GenericFilter {
  @IsOptional()
  public search?: string;

  @Transform(({ value }) => parseInt(value || "1"))
  @IsNumber({}, { message: ' "page" atrribute should be a number' })
  public page: number = 1;

  @Transform(({ value }) => parseInt(value || "10"))
  @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
  public pageSize: number = 10;

  @IsOptional()
  public orderBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}
