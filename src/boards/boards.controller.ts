import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto, UpdateBoardDto } from './boards.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async getBoards(@Query('page') page: string) {
    console.log('boards controller getBoards', page);
    return await this.boardsService.getBoards();
  }

  @Get(':id')
  async getBoard(@Param('id') id: string) {
    console.log('boards controller getBoard', id);
    return await this.boardsService.getBoard(+id);
  }

  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    console.log('boards controller createBoard', createBoardDto);
    return await this.boardsService.createBoard(createBoardDto);
  }

  @Patch(':id')
  async updateBoard(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    console.log('boards controller updateBoard', updateBoardDto);
    return await this.boardsService.updateBoard(+id, updateBoardDto);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string) {
    console.log('boards controller deleteBoard', id);
    return await this.boardsService.deleteBoard(+id);
  }
}
