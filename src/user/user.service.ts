import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findById(id: number) {
    return this.repo.findOneBy({ id });
  }
  async findAll() {
    return this.repo.find();
  }

  async create(data: Partial<User>) {
    const user = this.repo.create({ name: data.name ?? 'Unnamed' });
    return this.repo.save(user);
  }
}
