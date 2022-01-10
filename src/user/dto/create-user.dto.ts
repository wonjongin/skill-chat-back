import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly displayUserName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly signDate: string;
}
