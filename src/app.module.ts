import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './modules/vehicles/vehicles.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), VehiclesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
