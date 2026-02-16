import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUser(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return lastValueFrom(this.userClient.send({ cmd: 'user_get' }, id));
  }
  async getAllUsers() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return lastValueFrom(this.userClient.send({ cmd: 'user_get_all' }, {}));
  }

  async createUser(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return lastValueFrom(this.userClient.send({ cmd: 'user_create' }, data));
  }

  async getOrder(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return lastValueFrom(this.orderClient.send({ cmd: 'order_get' }, id));
  }

  async createOrder(data: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return lastValueFrom(this.orderClient.send({ cmd: 'order_create' }, data));
  }
}
