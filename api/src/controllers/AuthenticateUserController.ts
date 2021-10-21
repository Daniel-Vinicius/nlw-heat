import { Request, Response } from 'express';

import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.body;

    if (!code) {
      return response.status(400).json({ error: 'code is missing' });
    }

    const service = new AuthenticateUserService();

    try {
      const result = await service.execute(code as string);
      return response.json(result);
    } catch (error) {
      return response.status(error.response.status).json({ error: error.message });
    }
  }
}

export { AuthenticateUserController };
