import { integerToHangeulId } from 'hangeul-id';
import { v4 as uuidv4 } from 'uuid';
import { connection } from '../db';
// import Hashids from 'hashids';
// const Hashids = require('hashids');

export function generateUid(): string {
  // const hashids = new Hashids('Skill Chat UUID');
  const uuid = uuidv4().replace(/-/g, '');
  const res = integerToHangeulId(parseInt(uuid, 16));
  // const res = hashids.encodeHex(uuid);
  return res;
}

export function serverNowDateTime(): string {
  const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  return now;
}

export function replaceStrToCamelCase(str: string): string {
  const rules: Record<string, string> = {
    displayusername: 'displayUserName',
    chatlist: 'chatList',
    friendlist: 'friendList',
    signdate: 'signDate',
    datetime: 'dateTime',
    roomid: 'roomId',
    displayroomname: 'displayRoomName',
  };
  for (const key in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, key)) {
      const element = rules[key];
      const re = new RegExp(key, 'gi');
      str = str.replace(re, element);
    }
  }
  // console.log(str)
  return str;
}

export function replaceObjectToCamelCase(obj: Object): Object {
  const str = JSON.stringify(obj);
  const res = replaceStrToCamelCase(str);
  return JSON.parse(res);
}

export async function queryToDB(sql: string) {
  const db = await connection.connect();
  const res = await db.query(sql);
  db.release();
  return res;
}
