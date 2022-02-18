import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChattingService } from '../chatting/chatting.service';
import { SpeakDto } from '../chatting/dto/speak.dto';
import { EnterDto } from './dto/enter.dto';

@WebSocketGateway({
  transports: ['websocket'],
  namespace: 'chattingRoom',
  cors: { origin: '*' },
})
export class ChattingRoomGateway {
  constructor(private readonly appService: ChattingService) {}

  @WebSocketServer()
  server: Server;

  public handleConnect(client: Socket) {
    client.leave(client.id);
  }

  public handleDisconnect(client: Socket) {
    client.leave(client.id);
  }

  @SubscribeMessage('enter')
  async handleEnter(client: Socket, data: EnterDto) {
    client.leave(client.id);
    client.data.roomId = data.roomId;
    client.data.uid = data.uid;
    client.join(data.roomId);
  }

  @SubscribeMessage('speak')
  async handleSpeak(client: Socket, data: SpeakDto) {
    if (data.roomId == client.data.roomId) {
      this.appService.speak(data);
      client.to(data.roomId).emit('listen', data);
      return {
        success: true,
        message: 'Success speaking',
      };
    } else {
      return client.data.roomId == undefined
        ? {
            success: false,
            errorName: 'NoEnteredRoom',
            message: 'There is no entered room!',
          }
        : {
            success: false,
            errorName: 'RoomIdNotMatched',
            message: 'Entered roomId and roomId of message are not matched!',
          };
    }
  }
}
