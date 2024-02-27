import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction} from "express";
import { userRouter } from "./routes/user.routes";
import { bureauRouter } from "./routes/bureau.routes";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import {cors} from 'cors';

dotenv.config();


const app = express();
app.use(express.json());
const { PORT = 4000 } = process.env;

// app.use(cors);
app.use(errorHandler);
app.use("/auth", userRouter);
app.use("/api", bureauRouter);


// Security configuration
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
  });

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

AppDataSource.initialize().then(async () => {

    app.listen(PORT, () => {
        console.log("Server is running on http://localhost:" + PORT);
      });
      console.log("Data Source has been initialized!");

}).catch(error => console.log(error))
