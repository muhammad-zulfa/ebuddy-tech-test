import * as dotenv from "dotenv";
import * as http from "http";
import { AddressInfo } from "net";
import { Configuration } from "../../../config";
import { ServerLogger } from "./logger";
dotenv.config();

import express from "express";
export class Server {
  private readonly express: express.Application;
  private http: http.Server | any;

  constructor(
    private router: express.Router,
    private logger: ServerLogger,
    private config: Configuration,
  ) {
    this.express = express();
    this.express.use(this.logger.stream());
    this.express.use(this.router);
  }

  public start = async (): Promise<void> => {
    this.http = this.express.listen(this.config.PORT, () => {
      const { port } = this.http.address() as AddressInfo;
      this.logger.info(
        `🚀 Application ${this.config.APP_NAME} running on PORT ${port}`,
      );
    });
  };

  public stop = async (): Promise<void> => {
    this.logger.info("Stopping http server...");
    await this.http.close();
  };

  public invoke = (): express.Application => this.express;
}
