// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';  // Importando ConfigModule
import { VehiclesModule } from './vehicles/vehicles.module'; // Seu módulo de veículos

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    VehiclesModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
