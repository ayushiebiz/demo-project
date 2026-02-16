import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'order_get' })
  getOrder(@Payload() id: number) {
    return this.orderService.findById(id);
  }

  @MessagePattern({ cmd: 'order_create' })
  createOrder(@Payload() data: any) {
    return this.orderService.create(data);
  }
}
