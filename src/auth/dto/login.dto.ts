import { IsEmail, IsJWT } from 'class-validator';

export class LoginDto {
  @IsJWT()
  readonly id_token: string;

  @IsJWT()
  readonly access_token: string;

  @IsEmail()
  readonly email: string;
}
