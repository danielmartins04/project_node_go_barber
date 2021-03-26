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
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token }: UserDto = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
