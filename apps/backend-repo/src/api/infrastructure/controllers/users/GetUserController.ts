import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { GenericFilter } from "../../../../shared/infrastructure/express/filter/GenericFilter";
import { GetUserService } from "../../../applications";

export class GetUserController {
  constructor(private getUserService: GetUserService) {}

  public async invoke(req: Request, res: Response): Promise<Response> {
    const filter = plainToInstance(GenericFilter, req.query);
    validate(filter).then((errors) => {
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }
    });
    const [data, total] = await this.getUserService.invoke(filter);
    return res.json({ data, meta: { total, ...filter } });
  }
}
