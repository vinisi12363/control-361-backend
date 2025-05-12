import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    const VALID_API_KEY = process.env.API_KEY;

    if (!apiKey || apiKey !== VALID_API_KEY) {
      throw new UnauthorizedException('API Key inválida ou ausente');
    }

    next();
  }
}
