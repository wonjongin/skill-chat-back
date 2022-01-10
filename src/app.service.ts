import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  serverDateTime() {
    const now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    return now;
  }
}
