export interface logMessage{
  eventTime: Date;
  corrolationID?: string;
  message: string;
  ip?: string;
  service?: string;
  endpoint?: string;
  method?: string;
  scriptName?: string;
  userIp?:string;
  clientId: string;
  machineId?:string;
}
export interface logger{
  info(message: logMessage, verbose?:number):void;
  warn(message: logMessage, verbose?:number):void;
  error(message: logMessage, verbose?:number):void;
  fatal(message: logMessage, verbose?:number):void;
}
