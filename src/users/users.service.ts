import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return 'This action adds a new user';
  }

  async findAll() {
    console.log('findAll')
    return `This action returns all users`;
  }

  async findOne(id: number) {
    console.log(id)
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto)
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    console.log(id)
    return `This action removes a #${id} user`;
  }
}
