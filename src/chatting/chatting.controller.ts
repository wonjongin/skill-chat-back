import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { ChattingService } from './chatting.service';
import { CreateChattingRoomDto } from './dto/create-chattingroom.dto';
import { SpeakDto } from './dto/speak.dto';

@Controller('chatting')
export class ChattingController {
  constructor(private readonly appService: ChattingService) {}

  @Post('createChattingRoom')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  createChattingRoom(@Body() chattingRoomData: CreateChattingRoomDto) {
    return this.appService.createChattingRoom(chattingRoomData);
  }

  @Post('speak')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  speak(@Body() speakData: SpeakDto) {
    return this.appService.speak(speakData);
  }

  @Get('getChattingData/:roomId')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  getChattingData(@Param('roomId') roomId: string) {
    return this.appService.getChattingData(roomId);
  }

  @Get('getChattingRoomData/:roomId')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  getChattingRoomData(@Param('roomId') roomId: string) {
    return this.appService.getChattingRoomData(roomId);
  }
}
