import { createLogger, type LoggerOptions } from "winston";
import { logger, logMessage } from "./interface/logger";

export class WinstonLogger implements logger{
  private logger;
  constructor(opt: LoggerOptions){
    this.logger = createLogger({...opt})
  }

  info(message: logMessage, verbose: number): void {
      this.logger.info(message);
  }
  warn(message: logMessage, verbose: number): void {
      this.logger.warn(message);
  }
  error(message: logMessage, verbose: number): void {
      this.logger.error(message);
  }
  fatal(message: logMessage, verbose: number): void {
      this.logger.error(message);
  }

}
