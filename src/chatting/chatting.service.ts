import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  generateUid,
  queryToDB,
  replaceObjectToCamelCase,
} from '../func/basic';
import { CreateChattingRoomDto } from './dto/create-chattingroom.dto';
import { GoOutDto } from './dto/goOut.dto';
import { SpeakDto } from './dto/speak.dto';

@Injectable()
export class ChattingService {
  async speak(speakData: SpeakDto) {
    try {
      const res = await queryToDB(
        `SELECT content FROM chattingroomid WHERE roomid='${speakData.roomId}'`,
      );
      const contents = res.rows[0].content;
      console.log(contents);
      const contentData = {
        sender: speakData.sender,
        type: speakData.type,
        content: speakData.content,
        dateTime: speakData.dateTime,
      };
      contents.push(contentData);
      await queryToDB(
        `UPDATE chattingroomid SET content='${JSON.stringify(
          contents,
        )}' WHERE roomid='${speakData.roomId}';`,
      );
      return {
        success: true,
        message: 'You spoke successfully!',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getChattingData(roomId: string) {
    try {
      const res = await queryToDB(
        `SELECT content FROM chattingroomid WHERE roomId='${roomId}'`,
      );
      return replaceObjectToCamelCase(res.rows[0].content);
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
      await queryToDB(
        `INSERT INTO chattingroomid (roomid, users, displayroomname) VALUES ('${roomId}', '${JSON.stringify(
          chattingRoomData.users,
        )}', '${chattingRoomData.displayRoomName}');`,
      );
      const addChattingRoom = async (uid: string, roomId: string) => {
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
        } catch (err) {
          throw new HttpException(
            'Internal Server Error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      };
      chattingRoomData.users.map(async (element) => {
        await addChattingRoom(element, roomId);
      });
      return new Object({
        chattingRoomId: roomId,
      });
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async goOut(goOutData: GoOutDto) {
    try {
      const res = await queryToDB(
        `SELECT users FROM chattingroomid WHERE roomid='${goOutData.roomId}';`,
      );
      const beforeUsers: Array<string> = res.rows[0].users;
      const afterUsers = beforeUsers.filter((e) => e !== goOutData.uid);
      await queryToDB(
        `UPDATE chattingroomid SET users='${JSON.stringify(
          afterUsers,
        )}' WHERE roomid='${goOutData.roomId}';`,
      );
      return {
        success: true,
        message: 'You exited from the chatting room successfully!',
      };
    } catch (err) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
