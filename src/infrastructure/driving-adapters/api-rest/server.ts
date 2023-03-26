import express, { NextFunction, Request, Response } from 'express';
import * as http from 'http';
import cors from 'cors';
import fileUpload from "express-fileupload";
import helmet from 'helmet';
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
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(express.static("public"));
        this.app.use(helmet());
        this.app.use(fileUpload());
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