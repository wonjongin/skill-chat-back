import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { ChattingController } from './chatting/chatting.controller';
import { UserService } from './user/user.service';
import { ChattingService } from './chatting/chatting.service';
import { ChattingModule } from './chatting/chatting.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ChattingModule,
    UserModule,
  ],
  controllers: [AppController, UserController, ChattingController],
  providers: [AppService, UserService, ChattingService],
})
export class AppModule {}
