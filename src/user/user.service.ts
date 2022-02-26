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

  async getAllUserInfo(uid: string) {
    try {
      const res = await queryToDB(`SELECT * FROM userdata WHERE uid='${uid}'`);
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

  async getUserByEmail(email: string) {
    try {
      const res = await queryToDB(
        `SELECT uid FROM userdata WHERE email='${email}'`,
      );
      if (res.rowCount == 0) {
        return null;
      }
      return replaceObjectToCamelCase(res.rows[0]);
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addFriend(uid1: string, uid2: string) {
    try {
      const res = await queryToDB(
        `SELECT friendlist FROM userdata WHERE uid='${uid1}'`,
      );
      const friendList: Array<string> = res.rows[0].friendlist;
      friendList.push(uid2);
      await queryToDB(
        `UPDATE userdata SET friendlist='${JSON.stringify(
          friendList,
        )}' WHERE uid='${uid1}';`,
      );
      return {
        success: true,
        message: 'The user now has one more friend!',
      };
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addChattingRoom(uid: string, roomId: string) {
    try {
      const res = await queryToDB(
        `SELECT chatlist FROM userdata WHERE uid='${uid}'`,
      );
      const chatList: Array<string> = res.rows[0].chatlist;
      chatList.push(roomId);
      await queryToDB(
        `UPDATE userdata SET chatlist='${JSON.stringify(
          chatList,
        )}' WHERE uid='${uid}';`,
      );
      return {
        success: true,
        message: 'The user now has one more chatting room!',
      };
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
      return {
        success: true,
        message: 'The user is deleted!',
      };
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
