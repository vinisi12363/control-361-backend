// vehicles.controller.ts
import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { VehiclesService } from '../services/vehicles.service';
import { GetVehiclesDto } from '../dtos/get-vehicles.dto';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Headers } from '@nestjs/common';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @ApiOperation({ summary: 'Recupera a lista de veículos atualizada.' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'Chave de API para autenticação',
    required: true,
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Tipo do veículo',
    enum: ['others', 'tracked'],
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({
    name: 'perPage',
    required: false,
    description: 'Número de itens por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de veículos carregada com sucesso',
    schema: {
      example: {
        success: true,
        data: [
          {
            statusCode: 200,
            message: 'Lista de veículos',
            content: {
              vehicles: [
                {
                  id: 'd0222403-8842-4c6a-a0d5-a3acff3777a6',
                  plate: 'DXV0D74',
                  fleet: null,
                  type: 'vehicle',
                  model: 'UNO',
                  nameOwner: 'ISA',
                  status: 'active',
                  createdAt: '2025-05-06T14:32:09.499Z',
                },
              ],
              locationVehicles: [
                {
                  id: 'dc507b40-be68-443c-a7e3-100101bd25bd',
                  fleet: '672',
                  equipmentId: '1899087',
                  name: 'SASCAR',
                  plate: 'DXV0D74',
                  ignition: 'Ligado',
                  lat: -23.3231208,
                  lng: -46.7537495,
                  createdAt: '2025-05-09T20:05:01.610Z',
                },
              ],
              totalPages: 13,
              page: 1,
              perPage: 3,
            },
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: {
      example: {
        statusCode: 401,
        error: 'Unauthorized',
        message: 'API Key inválida ou ausente',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'bad Request' })
  async getVehicles(@Query() query: GetVehiclesDto) {
    try {
      const { type, page, perPage } = query;
      const vehicles = await this.vehiclesService.getExternalVehicles(
        type,
        page,
        perPage,
      );
      return {
        success: true,
        message: 'Lista de veículos carregada com sucesso',
        data: vehicles,
      };
    } catch (error) {
      console.error('Erro ao obter veículos:', error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
