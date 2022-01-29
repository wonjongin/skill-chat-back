import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { queryToDB, replaceObjectToCamelCase } from 'src/func/basic';

@Injectable()
export class DevService {
  async getUserDataDB() {
    try {
      const res = await queryToDB(`SELECT * FROM userdata`);
      const resw = replaceObjectToCamelCase(res.rows);
      return resw;
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getChattingDB() {
    try {
      const res = await queryToDB(`SELECT * FROM chattingroomid`);
      const resw = replaceObjectToCamelCase(res.rows);
      return resw;
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
