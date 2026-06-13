import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '🏔️ Sistema de Registro Turístico de Bolivia - Backend v2.0.0 (Con Soft Delete)';
  }
}
