import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VehiclesController } from './controllers/vehicles.controller';
import { VehiclesService } from './services/vehicles.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
