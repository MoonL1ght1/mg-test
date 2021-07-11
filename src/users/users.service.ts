import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindStrictnessDto } from './dto/findStrictness.dto'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'

type findOptions = {
  where?: { email?: string, phone?: string },
  limit?: number,
  offset?: number
}

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

  async findAll(findStrictness: FindStrictnessDto) {
    const { email, phone, pageSize, pageIndex } = findStrictness
    const options: findOptions = { where: {} }
    if (email) {
      options.where.email = email
    }
    if (phone) {
      options.where.phone = phone
    }
    if ((pageSize || pageSize === 0) && (pageIndex || pageIndex === 0)) {
      options.limit = pageSize
      options.offset = pageSize * pageIndex
    }
    
    return this.usersRepository.findAndCountAll<User>(options)
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
