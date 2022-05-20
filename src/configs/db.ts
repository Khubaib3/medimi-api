import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Promise from 'bluebird';

dotenv.config();

mongoose.Promise = Promise;


const dbString: string = process.env.DB_URL;
const dbOptions: object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(dbString,dbOptions).then(() => {
    console.info('Connected to db');
}).catch((error) => {
    console.info('Error caught while connnecting to db: ', error);
    process.exit(1);
});
