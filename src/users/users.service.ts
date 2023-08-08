import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
    
  ) { } 
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOneBy({id_user: id});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async fineOneByEmail(email: string) {
    return await this.userRepository.findOneBy({email}); 
  }
  async fineByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where:{
        email
      },
      select: ['id_user', 'name', 'email', 'password', 'role']
    }); 
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this. userRepository.update({id_user: id}, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.softDelete({id_user: id});
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
