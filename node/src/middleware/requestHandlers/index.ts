import { Login } from '../requestHandlers/login';
import { Signup } from '../requestHandlers/signup';

const login = new Login(),
  signup = new Signup();

export { login, signup };
