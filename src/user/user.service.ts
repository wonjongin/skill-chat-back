import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  replaceObjectToCamelCase,
  generateUid,
  queryToDB,
} from '../func/basic';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  async getName(uid: string) {
    try {
      const res = await queryToDB(
        `select displayusername from userdata where uid='${uid}'`,
      );
      return replaceObjectToCamelCase(res.rows[0]);
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserInfo(uid: string) {
    try {
      const res = await queryToDB(
        `select email,signdate,chatlist,friendlist from userdata where uid='${uid}'`,
      );
      const resw = replaceObjectToCamelCase(res.rows[0]);
      return resw;
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getChatList(uid: string) {
    try {
      const res = await queryToDB(
        `select chatlist from userdata where uid='${uid}'`,
      );
      return replaceObjectToCamelCase(res.rows[0]);
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFriendList(uid: string) {
    try {
      const res = await queryToDB(
        `select friendlist from userdata where uid='${uid}'`,
      );
      return replaceObjectToCamelCase(res.rows[0]);
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(userData: CreateUserDto) {
    try {
      const uid: string = generateUid();
      const res = await queryToDB(
        `INSERT INTO userdata (uid, displayusername, email, chatlist, friendlist, signdate) VALUES ('${uid}', '${userData.displayUserName}', '${userData.email}', '[]', '[]', '${userData.signDate}');`,
      );
      console.log(res);
      return new Object({
        uid: uid,
      });
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(uid: string) {
    try {
      const res = await queryToDB(`DELETE FROM userdata where uid='${uid}'`);
      console.log(res);
      return 'DELETE SUCCESS';
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
