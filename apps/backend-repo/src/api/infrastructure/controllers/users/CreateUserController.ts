import { instanceToPlain, plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { ErrorHandler } from "../../../../shared/domain/ErrorHandler";
import { RequestValidator } from "../../../../shared/infrastructure/express/RequestValidator";
import { CreateUserService } from "../../../applications";
import { CreateDto } from "../../../domains/users/dto/CreateDto";
import { ResponseDto } from "../../../domains/users/dto/ResponseDto";
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  public validate = [
    body(["numberOfRents"])
      .notEmpty()
      .withMessage("number of rents must be set")
      .isInt()
      .withMessage("number of rents must be an integer"),
    body(["totalAverageWeightRatings"])
      .notEmpty()
      .withMessage("total average weight ratings must be set")
      .isInt()
      .withMessage("total average weight ratings must be an integer"),
    RequestValidator,
  ];

  public async invoke(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const userCreateDto: CreateDto = new CreateDto(
        req.body.numberOfRents,
        req.body.totalAverageWeightRatings,
      );
      const User = await this.createUserService.invoke(userCreateDto);
      return res
        .json({
          save: true,
          data: instanceToPlain(
            plainToInstance(ResponseDto, User, {
              excludeExtraneousValues: true,
            }),
          ),
        })
        .status(201);
    } catch (e) {
      console.error(e);
      if (e instanceof ErrorHandler) {
        next(e);
      }

      next(new ErrorHandler("Error creating User list", 400));
    }
  }
}
