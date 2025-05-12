import { Vehicle } from 'src/types/vehicles.type';

export class VehiclesResponseDto {
  id: string;
  plate: string;
  fleet: string | null;
  type: string;
  model: string;
  nameOwner: string;
  status: string;
  createdAt: string;

  constructor(data: Vehicle) {
    this.id = data.id;
    this.plate = data.plate;
    this.fleet = data.fleet ?? 'Sem frota';
    this.type = data.type;
    this.model = data.model;
    this.nameOwner = data.nameOwner;
    this.status = data.status;
    this.createdAt = data.createdAt;
  }
}
