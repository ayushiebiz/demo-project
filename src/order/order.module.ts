import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.ORDER_DB_NAME || 'order',
      entities: [Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [
    OrderService,
    {
      provide: 'USER_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.USER_SERVICE_PORT || '3001'),
          },
        }),
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
