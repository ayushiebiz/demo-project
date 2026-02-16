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
          transport: Transport.TCP,
          options: {
            port: parseInt(process.env.USER_SERVICE_PORT || '3001'),
            host: process.env.DB_HOST || 'localhost',
          },
        }),
    },
    {
      provide: 'ORDER_SERVICE',
      useFactory: () =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            port: parseInt(process.env.ORDER_SERVICE_PORT || '3002'),
            host: process.env.DB_HOST || 'localhost',
          },
        }),
    },
  ],
})
export class AppModule {}
