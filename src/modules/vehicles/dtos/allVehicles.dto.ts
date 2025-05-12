// dto/external-api-response.dto.ts
import { LocationVehicles, VehiclesResponse } from 'src/types/vehicles.type';
import { VehiclesResponseDto } from './response-vehicles.dto';

export class VehiclesFormatterDto {
  vehicles: VehiclesResponseDto[];
  locationVehicles: LocationVehicles[];
  totalPage: number;
  page: number;
  perPage: number;

  constructor(data: VehiclesResponse) {
    this.vehicles = (data.content.vehicles || []).map(
      (vehicle) => new VehiclesResponseDto(vehicle),
    );
    this.locationVehicles = data.content.locationVehicles || [];
    this.totalPage = data.totalPage;
    this.page = data.page;
    this.perPage = data.perPage;
  }
}
