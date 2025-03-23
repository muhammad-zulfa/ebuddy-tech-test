import { Router } from "express";
import * as controllers from "../controllers";

export const ApiRouter = (
  getUserController: controllers.GetUserController,
  createUserController: controllers.CreateUserController,
): Router => {
  const apiRouter = Router();

  apiRouter.get("/users", getUserController.invoke.bind(getUserController));
  apiRouter.post(
    "/users",
    createUserController.invoke.bind(createUserController),
  );

  return apiRouter;
};
