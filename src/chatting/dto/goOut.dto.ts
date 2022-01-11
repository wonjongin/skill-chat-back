import { IsString } from 'class-validator';

export class GoOutDto {
  @IsString()
  readonly uid: string;

  @IsString()
  readonly roomId: string;
}
