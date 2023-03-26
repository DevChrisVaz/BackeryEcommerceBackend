import * as dotenv from 'dotenv';
import path from 'path';
import App from './app';

try {
    dotenv.config({
        path: path.resolve(__dirname, "../../../../.env")
    });

    const app = new App();
    app.start();
    app.startDatabase();
} catch(error) {
    console.log(error);
}