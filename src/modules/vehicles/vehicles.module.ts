import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VehiclesController } from './controllers/vehicles.controller';
import { VehiclesService } from './services/vehicles.service';
import { ConfigModule } from '@nestjs/config';
import { CommonCacheModule } from 'src/common/services/cache.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    CommonCacheModule,
  ],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
