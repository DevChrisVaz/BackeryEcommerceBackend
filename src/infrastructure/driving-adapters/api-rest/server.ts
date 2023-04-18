import express from 'express';
import * as http from 'http';
import cors from 'cors';
import fileUpload from "express-fileupload";
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import router from './routes';
// import swaggerUI from 'swagger-ui-express';
// import docs from '../../../../docs';

class Server {
    private readonly port: string | number;
    private readonly app: express.Express;
    private httpServer?: http.Server;

    constructor(port: string | number) {
        this.port = port;
        this.app = express();
        this.app.use(express.static("public"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ 
            origin(origin, callback) {
                const allowedOrigins = ["https://deleitelzt-admin.vercel.app", "https://deleitedlillian.vercel.app/", "http://localhost:5173", "http://localhost:3000"];
                if (allowedOrigins.includes(origin ?? "")) {
                    callback(null, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            methods: "GET, POST, PUT, DELETE",
            credentials: true
        }));
        this.app.use(helmet());
        this.app.use(fileUpload());
        this.app.use(cookieParser());
        this.app.use("/api", router);
        // this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));
    }

    async listen(): Promise<void> {
        return await new Promise(resolve => {
            this.httpServer = this.app.listen(this.port, () => {
                console.log("Server on port", this.port);
            })
        })
    }

    async stop(): Promise<void> {
        return await new Promise((resolve, reject) => {
            if (this.httpServer != null) {
                this.httpServer.close(error => {
                    if (error != null) {
                        return reject(error);
                    }
                    return resolve();
                })
            }
        })
    }
}

export default Server;