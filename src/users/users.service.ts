import { Injectable } from '@nestjs/common';
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
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOneBy({id_user: id});
    } catch (error) {
      console.log(error);
    }
  }
  async fineOneByEmail(email: string) {
    return await this.userRepository.findOneBy({email}); 
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this. userRepository.update({id_user: id}, updateUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.softDelete({id_user: id});
    } catch (error) {
      console.log(error);
    }
  }
}
