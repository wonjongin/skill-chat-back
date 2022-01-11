import { IsString } from 'class-validator';

export class SpeakDto {
  @IsString()
  readonly roomId: string;

  @IsString()
  readonly sender: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly dateTime: string;
}
