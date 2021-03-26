import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService.';

const sessionsRouter = Router();

interface UserDtoPre {
  email: string;
  password?: string;
}

interface UserDto {
  user: UserDtoPre;
  token: string;
}

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token }: UserDto = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
