import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { OAuth2Client } from 'google-auth-library';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

export interface JwtPayload {
  email: string;
}
export interface JwtRefreshPayload {
  email: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async loginDev(loginData: LoginDto) {
    const accessToken = await this.createAccessToken(loginData.email);
    const refreshToken = await this.createRefreshToken(loginData.email);
    await this.userService.setRefreshToken(
      refreshToken.refreshToken,
      loginData.email,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(uid: string) {
    return this.userService.logoutRefreshToken(uid);
  }

  async login(loginData: LoginDto) {
    if (await this.verifyIdToken(loginData)) {
      const accessToken = await this.createAccessToken(loginData.email);
      const refreshToken = await this.createRefreshToken(loginData.email);
      await this.userService.setRefreshToken(
        refreshToken.refreshToken,
        loginData.email,
      );
      return {
        accessToken,
        refreshToken,
      };
    } else {
      throw new HttpException('Fail to authorize', HttpStatus.UNAUTHORIZED);
    }
  }

  async createAccessToken(email: string) {
    const user: JwtPayload = { email: email };
    const accessToken = this.jwtService.sign(user, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });
    return {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
      accessToken,
    };
  }

  async createRefreshToken(email: string) {
    const user: JwtPayload = { email: email };
    const refreshToken = this.jwtService.sign(user, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
    return {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
      refreshToken,
    };
  }

  async refresh(email: string) {
    return this.createAccessToken(email);
  }

  async validateUser(payload: JwtPayload) {
    return this.userService.getUserByEmail(payload.email);
  }

  async verifyIdToken(loginData: LoginDto) {
    try {
      const CLIENT_ID: string = process.env.GOOGLE_API_CLIENT_ID;
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: loginData.id_token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const email = payload['email'];
      if (loginData.email == email) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}
