import { NextFunction, Request, Response } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';
function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!');
  next();
}
@controller('/')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
        
          <form method="POST">
              <div>
              <label>Enter Email</label>
              <input name="email />
              </div>
              <div>
              <label>Enter password</label>
              <input name="password"type="password" />
              </div>
              <button>Submit Form</button>
          </form>
        `);
  }
  @post('login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password && email === 'hi@hi.com' && password === 'password') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Inavlid email or password');
    }
  }
  @get('logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
