import { IsString, IsArray } from 'class-validator';

export class CreateChattingRoomDto {
  @IsString()
  readonly displayRoomName: string;

  @IsArray()
  readonly users: string[];
}
