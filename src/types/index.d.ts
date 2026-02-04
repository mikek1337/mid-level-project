import { logMessage } from "../utils/interface/logger";
import { loggerFactory } from "../utils/logger";

declare global{
declare namespace Express{
  export interface Request{
    logMessage: logMessage,
    logger: ReturnType<loggerFactory>,
    user:{
      id: string;
    createdAt: Date,
    updatedAt: Date,
    email: string,
    emailVerified: boolean,
    name: string,
    image?: string | null | undefined,
    }
  }
}
}

