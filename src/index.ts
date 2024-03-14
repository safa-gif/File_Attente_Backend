import { AppDataSource } from "./data-source";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction} from "express";
import { userRouter } from "./routes/user.routes";
import { bureauRouter } from "./routes/bureau.routes";
import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { feedbackRouter } from "./routes/feedback.routes";
import { guichetRouter } from "./routes/guichet.routes";
import { productRouter } from "./routes/product.routes";
// var cors = require('cors');

dotenv.config();


const app = express();
const corsOptions = {
  origin : "*",
  credentials : true,
  optionsSuccessStatus : 200
}  
app.use(cors(corsOptions));
const { PORT = 4000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// app.use(cors);
app.use(errorHandler);
app.use("/auth", userRouter);
app.use("/brx", bureauRouter);
app.use("/feed", feedbackRouter);
app.use("/gchts", guichetRouter);
app.use("/prods", productRouter);






app.use(express.json());

// Security configuration
app.use((req: Request, res: Response, next: NextFunction) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Origin', '*', "http://localhost:4200")
    
    res.setHeader(
      "Access-Control-Allow-Methods","GET, POST, DELETE,  PATCH, PUT"
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'w-auth-token');

    res.setHeader('Access-Control-Allow-Credentials', true);
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

}).catch(error => console.log("Hello from this error "+error))
