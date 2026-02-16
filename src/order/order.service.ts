import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async findById(id: number) {
    const order = await this.repo.findOneBy({ id });
    if (!order) return null;

    if (!order.userId) {
      return { ...order, user: null };
    }

    try {
      type UserDto = { id: number; [key: string]: any } | null;
      const user = await lastValueFrom(
        this.userClient.send<UserDto>({ cmd: 'user_get' }, order.userId),
      );
      return { ...order, user };
    } catch (err) {
      return {
        ...order,
        user: null,
        userError: (err as Error).message ?? 'Something went wrong',
      };
    }
  }

  async create(data: Partial<Order>) {
    // optional: validate user exists in user-service
    type UserDto = { id: number; [key: string]: any } | null;
    const userExists = await lastValueFrom(
      this.userClient.send<UserDto>({ cmd: 'user_get' }, data.userId),
    );
    if (!userExists) {
      throw new Error('User not found');
    }
    const order = this.repo.create(data);
    return this.repo.save(order);
  }
}
