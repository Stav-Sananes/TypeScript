import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    return next();
  }
  res.status(403);
  res.send('Not Premitted');
}
@controller('/')
class RootController {
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
    <div>
    <div>You are logged in</div>
      <a href="/logout">Logout</a>
    </div>
    
    `);
    } else {
      res.send(`
      <div>
      <div>You are not logged in</div>
        <a href="/login">login</a>
      </div>
      
      `);
    }
  }
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to the protected route');
  }
}
