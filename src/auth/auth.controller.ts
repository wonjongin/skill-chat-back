import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.appService.login(loginData);
  }

  // @Post('loginDev')
  // async loginDev(@Body() loginData: LoginDto) {
  //   return this.appService.loginDev(loginData);
  // }

  @Get('refresh/:email')
  @UseGuards(JwtRefreshGuard)
  async refresh(@Param('email') email: string) {
    return this.appService.refresh(email);
  }

  @Get('logout/:uid')
  @UseGuards(JwtRefreshGuard)
  async logout(@Param('uid') uid: string) {
    return this.appService.logout(uid);
  }

  @Get('test')
  @UseGuards(JwtAccessGuard)
  async data() {
    return 'SUCCESS';
  }
}
