// vehicles.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class VehiclesService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getExternalVehicles(): Promise<any> {
    const url = this.configService.get<string>('VEHICLE_API_URL');
    const token = this.configService.get<string>('VEHICLE_API_TOKEN');

    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
    console.log(response.data);
    return response.data;
  }
}
