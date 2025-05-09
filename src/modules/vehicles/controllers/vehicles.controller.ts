// vehicles.controller.ts
import { Controller, Get } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async getVehicles() {
    return await this.vehiclesService.getExternalVehicles();
  }
}
