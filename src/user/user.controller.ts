import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('getName/:uid')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  getName(@Param('uid') uid: string) {
    return this.appService.getName(uid);
  }

  @Get('deleteUser/:uid')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  deleteUser(@Param('uid') uid: string) {
    return this.appService.deleteUser(uid);
  }

  @Get('getUserInfo/:uid')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  getUserInfo(@Param('uid') uid: string) {
    return this.appService.getUserInfo(uid);
  }

  @Get('getFriendList/:uid')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  getFriendList(@Param('uid') uid: string) {
    return this.appService.getFriendList(uid);
  }

  @Get('getChatList/:uid')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  getChatList(@Param('uid') uid: string) {
    return this.appService.getChatList(uid);
  }

  @Post('addFriend/:uid1/:uid2')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  addFriend(@Param('uid1') uid1: string, @Param('uid2') uid2: string) {
    return this.appService.addFriend(uid1, uid2);
  }

  @Post('addChattingRoom/:uid/:roomId')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  addChattingRoom(@Param('uid') uid: string, @Param('roomId') roomId: string) {
    return this.appService.addChattingRoom(uid, roomId);
  }

  @Post('createUser')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Headers', '*')
  createUser(@Body() userData: CreateUserDto) {
    return this.appService.createUser(userData);
  }
}
