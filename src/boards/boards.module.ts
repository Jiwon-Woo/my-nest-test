import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsEntity } from './boards.entity';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardsEntity])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
