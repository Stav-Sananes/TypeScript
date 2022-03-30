import 'reflect-metadata';
import express, {
  NextFunction,
  RequestHandler,
  Request,
  Response,
} from 'express';
import { Methods } from './Methods';
import { AppRouter } from '../../AppRouter';
import { MetadataKeys } from './MetadataKeys';

function bodyValidator(key: string): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send('Inavlid request');
      return;
    }
    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('inavlid request');
        return;
      }
    }
  };
}
export const router = AppRouter.getInstance();

export function controller(routerPrefix: string) {
  return function (target: Function) {
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];
      const validator = bodyValidator(requiredBodyProps);
      if (path) {
        router[method](
          `${routerPrefix}${path}`,
          ...middlewares,
          validator,
          router
        );
      }
    }
  };
}
