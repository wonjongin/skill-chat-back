import { Module } from '@nestjs/common';
import { ChattingService } from '../chatting/chatting.service';
import { ChattingRoomGateway } from './chatting-room.gateway';

@Module({
  providers: [ChattingRoomGateway, ChattingService],
})
export class ChattingRoomModule {}
