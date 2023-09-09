import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardsEntity } from './boards.entity';
import { ConfigModule } from '@nestjs/config';

describe('BoardsController', () => {
  let boardsController: BoardsController;
  let boardsService: BoardsService;

  /*
   ** beforeEach는 테스트 실행전 일괄적으로 필요한 작업을 넣어둔다.
   ** compile() 메서드는 비동기적이므로 기다려야 한다.
   ** 모듈이 컴파일되면 get() 메서드를 사용하여 모듈이 선언한 정적 인스턴스(컨트롤러 및 프로바이더)를 검색할 수 있다.
   */
  beforeEach(async () => {
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
        TypeOrmModule.forFeature([BoardsEntity]),
      ],
      controllers: [BoardsController],
      providers: [BoardsService],
    }).compile();

    boardsService = modelRef.get<BoardsService>(BoardsService);
    boardsController = modelRef.get<BoardsController>(BoardsController);
  });

  describe('GET', () => {
    const result: BoardsEntity = new BoardsEntity();
    result.id = 1;
    result.title = 'board title';
    result.content = 'board content';
    result.createdAt = new Date();
    result.updatedAt = new Date();

    it('get boards', async () => {
      /* jest.spyOn
       ** 테스트 중에 boardsService의 getBoards 메서드가 호출될 때 해당 메서드를 가로채서 result 값을 반환하도록 설정하는 코드.
       ** 이렇게 하면 실제 데이터베이스 호출을 피하고 테스트용 가짜 데이터를 사용할 수 있다.
       ** 즉, 실제로 데이터베이스에 액세스하지 않고도 테스트를 수행할 수 있습니다.
       */
      jest
        .spyOn(boardsService, 'getBoards')
        .mockImplementation(() => Promise.resolve([result]));
      expect(await boardsController.getBoards('1')).toEqual([result]);
    });

    it('get boards', async () => {
      jest
        .spyOn(boardsService, 'getBoard')
        .mockImplementation(() => Promise.resolve(result));
      expect(await boardsController.getBoard('1')).toEqual(result);
    });
  });

  describe('POST', () => {
    const result: BoardsEntity = new BoardsEntity();
    result.id = 1;
    result.title = 'board title';
    result.content = 'board content';
    result.createdAt = new Date();
    result.updatedAt = new Date();

    it('create boards', async () => {
      jest
        .spyOn(boardsService, 'createBoard')
        .mockImplementation(() => Promise.resolve(result));
      expect(
        await boardsController.createBoard({
          title: result.title,
          content: result.content,
        }),
      ).toEqual(result);
    });
  });

  describe('UPDATE', () => {
    const result: BoardsEntity = new BoardsEntity();
    result.id = 1;
    result.title = 'board title2';
    result.content = 'board content2';
    result.createdAt = new Date();
    result.updatedAt = new Date();

    it('update board title and content', async () => {
      jest
        .spyOn(boardsService, 'updateBoard')
        .mockImplementation(() => Promise.resolve(result));
      expect(
        await boardsController.updateBoard(String(result.id), {
          title: result.title,
          content: result.content,
        }),
      ).toEqual(result);
    });

    it('update only board title', async () => {
      jest
        .spyOn(boardsService, 'updateBoard')
        .mockImplementation(() => Promise.resolve(result));
      expect(
        await boardsController.updateBoard(String(result.id), {
          title: result.title,
        }),
      ).toEqual(result);
    });

    it('update only board content', async () => {
      jest
        .spyOn(boardsService, 'updateBoard')
        .mockImplementation(() => Promise.resolve(result));
      expect(
        await boardsController.updateBoard(String(result.id), {
          content: result.content,
        }),
      ).toEqual(result);
    });
  });

  describe('DELETE', () => {
    const result: BoardsEntity = new BoardsEntity();
    result.id = 1;
    result.title = 'board title';
    result.content = 'board content';
    result.createdAt = new Date();
    result.updatedAt = new Date();

    it('delete board', async () => {
      jest
        .spyOn(boardsService, 'deleteBoard')
        .mockImplementation(() => Promise.resolve(result));
      expect(await boardsController.deleteBoard(String(result.id))).toEqual(
        result,
      );
    });
  });
});
