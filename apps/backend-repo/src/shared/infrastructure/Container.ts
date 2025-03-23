import {
  asClass,
  asFunction,
  asValue,
  AwilixContainer,
  createContainer,
  InjectionMode,
} from "awilix";
import { Router } from "./Router";
import { Server } from "./Server";

//Import injectables from api bounded context
import * as ApiServices from "../../api/applications";
import * as ApiControllers from "../../api/infrastructure/controllers";

//Shared infrastructure implementations
import { config } from "../../../config";
import { FirebaseUserRepository } from "../../api/infrastructure/persistences/FirestoreUserRepository";
import { ApiRouter } from "../../api/infrastructure/router/apiRouter";
import { ErrorMiddleware } from "./express/ErrorMiddleware";
import { auth, db } from "./firebaseAdmin/firebase";
import { ServerLogger } from "./logger";
import { Authorizer } from "./middleware/Authorizer";
import { FirebaseTokenVerifier } from "./middleware/FirebaseTokenVerifier";
import { Uuidv7Generator } from "./uuid";

//--------------------------AUTO-GENERATED-IMPORT
//--------------------------END-AUTO-GENERATED-IMPORT

export class Container {
  private readonly container: AwilixContainer;

  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC,
    });

    this.register();
  }

  public register(): void {
    this.container
      .register({
        server: asClass(Server).singleton(),
        config: asValue(config),
        router: asFunction(Router).singleton(),
        logger: asClass(ServerLogger).singleton(),
        db: asValue(db),
        auth: asValue(auth),
      })
      // router and error middleware
      .register({
        errorMiddleware: asClass(ErrorMiddleware).singleton(),
        apiRouter: asFunction(ApiRouter).singleton(),
      })
      // Authentication Middleware
      .register({
        authorizer: asClass(Authorizer).singleton(),
        jwtVerifier: asClass(FirebaseTokenVerifier).singleton(),
      })
      .register({
        uuidGenerator: asClass(Uuidv7Generator).singleton(),
      })
      .register({
        getUserController: asClass(
          ApiControllers.GetUserController,
        ).singleton(),
        createUserController: asClass(
          ApiControllers.CreateUserController,
        ).singleton(),
        userRepository: asClass(FirebaseUserRepository).singleton(),
        getUserService: asClass(ApiServices.GetUserService).singleton(),
        createUserService: asClass(ApiServices.CreateUserService).singleton(),
      });
  }

  public invoke(): AwilixContainer {
    return this.container;
  }
}
