import express, { RequestHandler } from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

// A custom logging middleware
const customLogger =
  (message: string): RequestHandler =>
  (req, res, next) => {
    console.log(message);
    next();
  };

app.use(cors());

// Logging middleware
// Every request comes through this API will be logged in the 'dev' format
app.use(morgan('dev'));

// Allow the client to send JSON body data
app.use(express.json());

// Encode and decode query string parameters
app.use(express.urlencoded({ extended: true }));

app.use(customLogger('Request received'));

app.get('/', (req, res, next) => {
  res.status(200);
  res.json({ message: 'Hello, World!' });
  // setTimeout(() => {
  // next(new Error('Async Broken!'));
  // }, 1000);
});

app.use('/api', protect, router);

app.post('/user', createNewUser);
app.post('/signin', signin);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: `Internal Server Error: ${err.message}` });
  }
);

export default app;
