import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsEntity } from './boards.entity';
import { CreateBoardDto, UpdateBoardDto } from './boards.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsEntity)
    private boardsRepository: Repository<BoardsEntity>,
  ) {}

  async getBoards() {
    const boards = await this.boardsRepository.find();
    console.log('boards service getBoards', boards);
    return boards;
  }

  async getBoard(id: number) {
    const board = await this.boardsRepository.findOne({
      where: { id },
    });
    console.log('boards service getBoard', board);
    if (!board) {
      return `Board with ID ${id} not found`;
    }
    return board;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const board = new BoardsEntity();
    board.title = createBoardDto.title;
    board.content = createBoardDto.content;
    const result = await this.boardsRepository.save(board);
    console.log('boards service createBoard', board, result);
    return result;
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardsRepository.findOne({
      where: { id },
    });
    if (!board) {
      return `Board with ID ${id} not found`;
    }
    console.log('boards service updateBoard BEFORE', board);
    Object.assign(board, updateBoardDto);
    console.log('boards service updateBoard AFTER', board);
    return this.boardsRepository.save(board);
  }

  async deleteBoard(id: number) {
    const board = await this.boardsRepository.findOne({
      where: { id },
    });
    console.log('boards service deleteBoard', board);
    if (!board) {
      return `Board with ID ${id} not found`;
    }
    const result = await this.boardsRepository.remove(board);
    return result;
  }
}
