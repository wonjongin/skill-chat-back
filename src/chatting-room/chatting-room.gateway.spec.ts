import { Test, TestingModule } from '@nestjs/testing';
import { ChattingService } from '../chatting/chatting.service';
import { ChattingRoomGateway } from './chatting-room.gateway';

describe('ChattingRoomGateway', () => {
  let gateway: ChattingRoomGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChattingRoomGateway, ChattingService],
    }).compile();

    gateway = module.get<ChattingRoomGateway>(ChattingRoomGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
