import { config } from "dotenv";
config();
import express from "express";
import { router } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

class App {
    app: express.Application;
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(router);
        this.app.use(cookieParser());
        this.app.use(cors());

        this.app.listen(process.env.SRPORT, () => {
            console.log(`Server init in port ${process.env.SRPORT}`);
        });
    }
}

const app = new App();
