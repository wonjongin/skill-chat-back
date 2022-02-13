import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ChattingModule } from './chatting/chatting.module';
import { UserModule } from './user/user.module';
import { DevModule } from './dev/dev.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ChattingModule,
    UserModule,
    DevModule,
  ],
  controllers: [AppController],
  exports: [AppService],
})
export class AppModule {}
