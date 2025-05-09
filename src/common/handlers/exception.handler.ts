import {
  Logger,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AxiosError } from 'axios';

export class HttpRequestHandler {
  private static logger = new Logger(HttpRequestHandler.name);

  static handle(error: unknown): never {
    // Se for um erro do Axios
    if (error instanceof AxiosError) {
      const status = error.response?.status || 500;
      const data: unknown = error.response?.data || error.message;

      this.logger.error(`Axios error: ${JSON.stringify(data)}`, error.stack);

      throw new HttpException(String(data), status);
    }

    if (error instanceof Error) {
      this.logger.error(`Erro genérico: ${error.message}`, error.stack);
      throw new InternalServerErrorException(error.message);
    }

    const stringified = String(error);
    this.logger.error(`Erro desconhecido: ${stringified}`);
    throw new InternalServerErrorException(stringified);
  }
}
