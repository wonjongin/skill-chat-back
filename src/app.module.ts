import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ChattingModule } from './chatting/chatting.module';
import { UserModule } from './user/user.module';
import { DevModule } from './dev/dev.module';
import { ChattingRoomModule } from './chatting-room/chatting-room.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ChattingModule,
    UserModule,
    DevModule,
    ChattingRoomModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
