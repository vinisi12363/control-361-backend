import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { VehiclesResponse } from '../../../types/vehicles.type';
import { HttpRequestHandler } from '../../../common/handlers/exception.handler';
import { VehiclesFormatterDto } from '../dtos/allVehicles.dto';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getExternalVehicles(
    type?: 'others' | 'tracked',
    page?: number,
    perPage?: number,
  ): Promise<VehiclesFormatterDto | null> {
    const urlWithoutParams =
      this.configService.get<string>('VEHICLE_API_URL') || '';
    const urlDefaultParams =
      this.configService.get<string>('VEHICLE_API_URL_DEFAULT_PARAMS') || '';
    // const token = this.configService.get<string>('VEHICLE_API_TOKEN') || '';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0MTVmOWE3LTk0ZmEtNDBmYy04Nzc3LWU3YTMxNzVjYmYwZCIsIm5hbWUiOiJJc2FiZWxsaSBOYXZhcnJvIiwiZG9jdW1lbnQiOiIzNTgwNzI0NTI1MyIsImVtYWlsIjoidGVzdGVAdHJhLmNvbSIsInBob25lIjoiMTE5Nzc4OTY1NDMiLCJzdGF0dXMiOiJhY3RpdmUiLCJpc01hc3RlciI6dHJ1ZSwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9jbmQtdHJ1Y2tlcnBheS5zZm8zLmRpZ2l0YWxvY2VhbnNwYWNlcy5jb20vcm90b2dyYW1hLzZlOWFjYjIxMWI4NTFjYjBiMGZiZGNkMTVjZTFiODFjLndlYnAiLCJjb3Jwb3JhdGVJZCI6IjEzM2MzZWVlLTA2NDktNDY1Yi1hZWUyLWQ1N2FjZjViNWIyZiIsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTFUMTM6MDA6MjMuNjk3WiIsInBlcm1pc3Npb25zIjpbImRyaXZlci1saW5rLWRlbGV0ZSIsImRhc2hib2FyZCIsImRyaXZlciIsImRyaXZlci1yZWdpc3RyYXRpb25zLWludml0ZSIsImRyaXZlci11bmxpbmsiLCJkcml2ZXItbGluay1jcmVhdGUiLCJkcml2ZXItbGluay1lZGl0IiwidmVoaWNsZS1yZWdpc3RyYXRpb25zIiwidmVoaWNsZS1yZWdpc3RyYXRpb25zLXZpZXciLCJ2ZWhpY2xlLXJlZ2lzdHJhdGlvbnMtZWRpdCIsInZlaGljbGUtcmVnaXN0cmF0aW9ucy1yZWdpc3RlciIsInZlaGljbGUtcmVnaXN0cmF0aW9ucy1kZWxldGUiLCJwbGFjZXMiLCJwbGFjZXMtdmlldyIsInBsYWNlcy1lZGl0IiwicGxhY2VzLXJlZ2lzdGVyIiwicGxhY2VzLWRlbGV0ZSIsInJvdXRlcyIsInJvdXRlcy1yZWdpc3RlciIsInJvdXRlcy1kZWxldGUiLCJyb3V0ZXMtZWRpdCIsInJvdXRlcy12aWV3IiwidHJpcHMiLCJ0cmlwcy12aWV3IiwidHJpcHMtY2FuY2VsIiwidHJpcHMtZWRpdCIsInRyaXBzLWRlbGV0ZSIsInRyaXBzLWNoYXQiLCJyZXBvcnRzIiwicmVwb3J0cy12aWV3IiwicmVwb3J0cy1kb3dubG9hZCIsImFsZXJ0LWNvbmZpZ3VyYXRpb24iLCJhbGVydC1jb25maWd1cmF0aW9uLXZpZXciLCJvcGVyYXRvcnMiLCJvcGVyYXRvcnMtY3JlYXRlIiwib3BlcmF0b3JzLXZpZXciLCJhbGVydHMiLCJhbGVydHMtdmlldyIsIm9wZXJhdG9ycy1lZGl0Iiwib3BlcmF0b3JzLWRlbGV0ZSIsInBlcm1pc3Npb25zIiwicGVybWlzc2lvbnMtdmlldyIsInBlcm1pc3Npb25zLWVkaXQiLCJwZXJtaXNzaW9ucy1kZWxldGUiLCJwZXJtaXNzaW9ucy1jcmVhdGUiLCJpcy1jYXJyaWVyIiwidHJpcHMtY3JlYXRlIiwiY2hlY2tsaXN0IiwiY2hlY2tsaXN0LXZpZXciLCJjaGVja2xpc3QtdG8tY29tcGxldGUiXSwiaWF0IjoxNzQ2NTg0NTEyLCJleHAiOjE3NDc0NDg1MTJ9.qFYx9A8CDyvnYQlKItnaAsfulDhdE2aWeaTAoycS-yY';
    const url = `${type ? urlWithoutParams : urlDefaultParams}${type ? `?type=${type}&page=${page}&perPage=${perPage}` : ' '}`;
    try {
      const response = await firstValueFrom(
        this.httpService.get<VehiclesResponse>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      const formatedResponse = new VehiclesFormatterDto(response.data);
      return formatedResponse;
    } catch (error) {
      HttpRequestHandler.handle(error);
    }
  }
}
