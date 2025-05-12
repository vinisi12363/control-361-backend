import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), VehiclesModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
