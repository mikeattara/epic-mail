import express, { urlencoded, json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rootpath from 'rootpath';
import auth from './v1/helpers/jwt';
import errorHandler from './v1/helpers/error-handler';
import userRoute from './v1/users/user.controller';

dotenv.config();

rootpath();
const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

// use JWT auth to secure the api
app.use(auth());

// api routes
app.use('/api/v1/users', userRoute);

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 3001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});
