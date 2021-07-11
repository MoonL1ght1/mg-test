import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async create(createUserDto: CreateUserDto) {
    // кол-во символом рандомной соли?
    const passwordHash: string = await bcrypt.hash(createUserDto.password, 4)
    const newUser = {...createUserDto, passwordHash: passwordHash }
    delete newUser.password
    return this.usersRepository.create(newUser)
  }

  async findAll(): Promise<User[]>  {
    return this.usersRepository.findAll<User>()
  }

  async findOne(id: number) {
    return this.usersRepository.findByPk(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let updateUser
    if (updateUserDto.password) {
      updateUser = { ...updateUserDto, passwordHash: await bcrypt.hash(updateUserDto.password, 4)}
    } else {
      updateUser = { ...updateUserDto }
    }
    delete updateUser.password
    return this.usersRepository.update(updateUser, { where: { id }})
  }

  async remove(id: number) {
    return this.usersRepository.destroy({ where: { id }})
  }
}
