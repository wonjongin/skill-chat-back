import { IsString } from 'class-validator';

export class EnterDto {
  @IsString()
  readonly roomId: string;

  @IsString()
  readonly uid: string;
}
