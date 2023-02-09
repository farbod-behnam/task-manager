import mongoose from "mongoose";



export class DatabaseConnection {


    constructor() {

    }

    connect(url: string) {
        return mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    }

}


