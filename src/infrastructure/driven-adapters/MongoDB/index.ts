import { connect, set } from 'mongoose';

class MongoDB {
    private readonly DB_URI: string;

    constructor(DB_URI: string) {
        this.DB_URI = DB_URI;
    }

    async Connect() {
        try {
            set('strictQuery', false);
            await connect(this.DB_URI);
            console.log("MongoDB running as database");
        } catch(err) {
            console.log("No se pudo conectar a la base de datos");
            console.log(err);
        }
    }
}

export default MongoDB;