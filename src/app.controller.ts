/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.appService.getUser(Number(id));
  }
  @Get('users')
  async getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Post('users')
  async createUser(@Body() body: any) {
    return this.appService.createUser(body);
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    return this.appService.getOrder(Number(id));
  }

  @Post('orders')
  async createOrder(@Body() body: any) {
    return this.appService.createOrder(body);
  }
}
