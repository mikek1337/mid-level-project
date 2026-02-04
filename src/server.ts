import express, { Request, Response } from "express";
import { errorHandler } from "./middleware/ErrorHandler";
import { loadEnvFile } from "node:process"
import { logHandler } from "./middleware/LogHandler";
import { toNodeHandler } from 'better-auth/node';
import { auth } from "./utils/auth";
import { v1Router } from "./v1/";
loadEnvFile();
const app = express();

app.use(logHandler);

app.all("/api/auth/*splat", toNodeHandler(auth))

app.use(express.json());
app.use("/api", v1Router);
app.use(errorHandler);

app.listen(process.env.PORT, ()=>{
  console.log(`Server running on port ${process.env.PORT}`)
});

export default app;
