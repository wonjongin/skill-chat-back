import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  generateUid,
  queryToDB,
  replaceObjectToCamelCase,
} from 'src/func/basic';
import { CreateChattingRoomDto } from './dto/create-chattingroom.dto';
import { SpeakDto } from './dto/speak.dto';

@Injectable()
export class ChattingService {
  async speak(speakData: SpeakDto) {
    try {
      await queryToDB(
        `INSERT INTO ${speakData.roomId}
          (sender, content, datetime) VALUES 
          ('${speakData.sender}', '${speakData.content}', '${speakData.dateTime}');`,
      );
      return 'COMPLETE';
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getChattingData(roomId: string) {
    try {
      const res = await queryToDB(
        `SELECT sender, content, datetime FROM ${roomId}`,
      );
      return replaceObjectToCamelCase(res.rows);
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getChattingRoomData(roomId: string) {
    try {
      const res = await queryToDB(
        `SELECT users, displayroomname FROM chattingroomid WHERE roomid='${roomId}';`,
      );
      return replaceObjectToCamelCase(res.rows[0]);
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createChattingRoom(chattingRoomData: CreateChattingRoomDto) {
    try {
      const roomId: string = generateUid();
      const res = await queryToDB(
        `INSERT INTO chattingroomid (roomid, users, displayroomname) VALUES ('${roomId}', '${JSON.stringify(
          chattingRoomData.users,
        )}', '${chattingRoomData.displayRoomName}');`,
      );
      const res2 = await queryToDB(
        // CREATE TABLE chattingRoomData (
        // id SERIAL PRIMARY KEY,
        // sender TEXT NOT NULL,
        // content TEXT NOT NULL,
        // dateTime TIMESTAMP NOT NULL);
        `CREATE TABLE "${roomId}" (
        id SERIAL PRIMARY KEY,
        sender TEXT NOT NULL,
        content TEXT NOT NULL,
        dateTime TIMESTAMP NOT NULL
        );`,
      );
      console.log(res, res2);
      return new Object({
        chattingRoomId: roomId,
      });
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
