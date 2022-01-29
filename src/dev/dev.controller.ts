import { Controller, Get, Header, Param } from '@nestjs/common';
import { DevService } from './dev.service';

@Controller('dev')
export class DevController {
  constructor(private readonly appService: DevService) {}

  @Get('getUserDataDB')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  getUserDataDB() {
    return this.appService.getUserDataDB();
  }

  @Get('getChattingDB')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  getChattingDB() {
    return this.appService.getChattingDB();
  }
}
