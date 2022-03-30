import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router as controllerRouter } from './controllers/decorators/Controller';
import './controllers/LoginController';
import { AppRouter } from './AppRouter';
import './controllers/RootController';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controllerRouter);
app.use(AppRouter.getInstance());
app.use(cookieSession({ keys: ['stav'] }));
app.listen(3000, () => {
  console.log('On port 3000');
});
