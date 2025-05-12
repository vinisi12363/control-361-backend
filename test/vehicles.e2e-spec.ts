import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { VehiclesModule } from './../src/modules/vehicles/vehicles.module';

describe('VehiclesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [VehiclesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/vehicles (GET) deve retornar lista com "sem frota" quando fleet for null', async () => {
    const response = await request(app.getHttpServer())
      .get('/vehicles')
      .query({ type: 'tracked', page: 1, perPage: 10 })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      'Lista de veículos carregada com sucesso',
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
