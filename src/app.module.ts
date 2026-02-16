import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'USER_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672',
            ],
            queue: process.env.USER_QUEUE || 'user_queue',
          },
        }),
    },
    {
      provide: 'ORDER_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [
              process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672',
            ],
            queue: process.env.ORDER_QUEUE || 'order_queue',
          },
        }),
    },
  ],
})
export class AppModule {}
