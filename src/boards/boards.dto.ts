import { PartialType } from '@nestjs/swagger';

export class CreateBoardDto {
  title: string;
  content: string;
}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
