// dto/external-api-response.dto.ts
import { LocationVehicles, VehiclesResponse } from 'src/types/vehicles.type';
import { VehiclesResponseDto } from './response-vehicles.dto';

export class VehiclesFormatterDto {
  content: {
    vehicles: VehiclesResponseDto[];
    locationVehicles: LocationVehicles[];
    totalPages: number;
    page: number;
    perPage: number;
  };

  constructor(data: VehiclesResponse) {
    this.content = {
      vehicles: (data.content.vehicles || []).map(
        (vehicle) => new VehiclesResponseDto(vehicle),
      ),
      locationVehicles: data.content.locationVehicles || [],
      totalPages: data.content.totalPages,
      page: data.content.page,
      perPage: Number(data.content.perPage),
    };
  }
}
