import { Router } from 'express';
import User from '../models/User';

import AuthenticateUserService from '../services/AuthenticateUserService.';

const sessionsRouter = Router();

interface UserDtoPre {
  email: string;
  password?: string;
}

interface UserDto {
  user: UserDtoPre;
}

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user }: UserDto = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
