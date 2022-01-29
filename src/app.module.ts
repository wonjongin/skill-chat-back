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
import { DevController } from './dev/dev.controller';
import { DevService } from './dev/dev.service';
import { DevModule } from './dev/dev.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ChattingModule,
    UserModule,
    DevModule,
  ],
  controllers: [
    AppController,
    UserController,
    ChattingController,
    DevController,
  ],
  providers: [AppService, UserService, ChattingService, DevService],
})
export class AppModule {}
