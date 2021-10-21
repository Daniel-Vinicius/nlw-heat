import { Request, Response } from "express";

import { GetLast3MessagesService } from "../services/GetLast3MessagesService";

class GetLast3MessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetLast3MessagesService();
    try {
      const result = await service.execute();
      return response.json(result);
    } catch (error) {
      return response.status(error.response.status).json({ error: error.message });
    }
  }
}

export { GetLast3MessagesController };
