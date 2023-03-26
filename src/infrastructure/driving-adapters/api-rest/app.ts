import MongoDB from "../../driven-adapters/MongoDB";
import Server from "./server";

class App {
    private server?: Server;
    private database?: MongoDB;

    async startDatabase(): Promise<void> {
        const db_uri: string = process.env.DB_URI ?? "";
        this.database = new MongoDB(db_uri);
        return await this.database.Connect();
    }

    async start(): Promise<void> {
        const port: string | number = process.env.PORT ?? 5000;
        this.server = new Server(port);
        return await this.server.listen();
    }

    async stop(): Promise<void> {
        return await this.server?.stop();
    }
}

export default App;