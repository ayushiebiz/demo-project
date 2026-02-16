import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'user_get' })
  getUser(@Payload() id: number) {
    return this.userService.findById(id);
  }
  @MessagePattern({ cmd: 'user_get_all' })
  getUserAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'user_create' })
  createUser(@Payload() data: any) {
    return this.userService.create(data);
  }
}
