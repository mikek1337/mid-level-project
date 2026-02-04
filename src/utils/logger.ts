import { WinstonLogger } from "./winstonLogger";

enum loggerType{
  winston,
  pino,
}
export function loggerFactory(key:'winston'|'pino', opt:any){
  switch(key){
    case 'winston':
      return new WinstonLogger(opt);
    default:
      throw new Error('Logger not implemented');
  }
}



