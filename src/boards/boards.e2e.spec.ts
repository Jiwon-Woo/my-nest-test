import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BoardsModule } from './boards.module';
import { BoardsService } from './boards.service';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsEntity } from './boards.entity';

describe('Boards', () => {
  let app: INestApplication;
  let catsService;

  beforeAll(async () => {
    const modelRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: +process.env.MYSQL_PORT,
          username: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          entities: [BoardsEntity],
          synchronize: true,
        }),
        BoardsModule,
      ],
    })
      .overrideProvider(BoardsService)
      .useValue(catsService)
      .compile();

    app = modelRef.createNestApplication();
    await app.init();
  });

  describe('GET /boards', () => {
    it('GET /boards without page', () => {
      return request(app.getHttpServer()).get('/boards').expect(200);
    });

    it('GET /boards with page', () => {
      return request(app.getHttpServer()).get('/boards?page=1').expect(200);
    });

    it('GET /boards with wrong page', () => {
      return request(app.getHttpServer()).get('/boards?page=a').expect(400);
    });
  });

  describe('GET /boards', () => {
    it('GET /boards/:id', () => {
      return request(app.getHttpServer()).get('/boards/1').expect(404);
    });

    it('GET /boards/:id', () => {
      return request(app.getHttpServer()).get('/boards/2').expect(200);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
